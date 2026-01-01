

type WhereClause = {
    field: string;
    op: string;
    value: unknown;
}

type OrderByType = {
    col: string;
    dir: 'ASC' | 'DESC'
}

type AstType = {
    table: string;
    cols: string[];
    wheres: WhereClause[];
    orWheres: ((q: QueryBuilder) => QueryBuilder)[];
    orderBy: OrderByType | null;
    limit: number | null;
}


class QueryBuilder {
    ast: AstType = {
        table: '',
        cols: ['*'],
        wheres: [],
        orWheres: [],
        orderBy: null,
        limit: null
    }

    select(cols: string | string[], table: string): this {
        this.ast.table = table;
        this.ast.cols = Array.isArray(cols) ? cols : [cols];
        return this;
    }

    where(field: string, op: string, value: string | number): this {
        this.ast.wheres?.push({ field, op, value });
        return this;
    }

    orWhere(cb: (q: QueryBuilder) => QueryBuilder): this {
        this.ast.orWheres.push(cb);
        return this;
    }

    orderBy(col: string, dir: OrderByType['dir']): this {
        this.ast.orderBy = { col, dir }
        return this;
    }

    limit(n: number): this {
        if (typeof(n) != 'number') {
            throw this.error(`expected number, got ${typeof(n)}`);
        }
        this.ast.limit = n;
        return this;
    }

    build(): string {
        let sql = 'SELECT';
        sql += ` ${this.ast.cols.join(', ')}`
        sql += ` FROM ${this.ast.table}`

        let rootWhere = '';
        if (this.ast.wheres && this.ast.wheres.length) {
            const whereGrp: string[] = [];
            this.ast.wheres.forEach(({ field, op, value }) => {
                whereGrp.push(` ${field} ${op} ${this.valString(value)}`);
            })
            rootWhere = whereGrp.join(' AND')
        }
        
        let ors = '';
        if (this.ast.orWheres.length) {
            const orGrps: string[] = [];
            this.ast.orWheres.forEach((cb) => {
                const childBuilder = new QueryBuilder();
                childBuilder.ast.table = this.ast.table;
                const childAst = cb(childBuilder)
                if (childAst.ast.wheres.length) {
                    const andGrps = childAst.ast.wheres.map((w) => {
                        return `${w.field} ${w.op} ${this.valString(w.value)}`
                    });
                    orGrps.push(`(${andGrps.join(' AND ')})`)
                }
            });
            ors = orGrps.join(' OR ');
        }

        if (rootWhere || ors) {
            if (rootWhere && ors) {
                sql += ` WHERE ${rootWhere} AND (${ors})`
            } else if (rootWhere) {
                sql += ` WHERE ${rootWhere}`
            } else {
                sql += ` WHERE ${ors}`
            }
        }

        if (this.ast.orderBy?.col) {
            sql += ` ORDER BY ${this.ast.orderBy.col}`
            if (this.ast.orderBy?.dir) {
                sql += ` ${this.ast.orderBy.dir}`
            }
        }

        if (this.ast.limit) {
            sql += ` LIMIT ${this.ast.limit}`
        }
        return sql
    }

    valString(val: unknown): string | number {
        if (typeof(val) === null) {
            return 'NULL'
        } else if (typeof(val) === 'number') {
            return val;
        }
        return `'${val}'`;
    }

    error(msg: string) {
        return new Error(msg);
    }
}

const orm = new QueryBuilder()
const query = orm
    .select(['role', 'age'], 'users')
    .where('age', '>=', 50)
    .orWhere((q) => q.where('role', '=', 'admin'))
    .orWhere((q) => q.where('name', 'LIKE', '%bob%'))
    .orderBy('age', 'ASC')
    .limit(2)
    .build()

console.log(query)
type WhereClause = {
    field: string;
    op: string; // TODO: enum these to specific ops
    value: unknown
}

type AstType = {
    cols: string[];
    wheres: string[];
}

class QueryBuilder {
    ast: AstType = {
        cols: ['*'],
        wheres: [],
    }

    select(cols: string | string[], table: string): this {
        return this
    }


    build(): string {
        let sql = ['SELECT'];
        sql.push(`${this.ast.cols.join(', ')}`)
        sql.push(`FROM ${this.ast.table}`)
        
        let wheres = '';
        if (this.ast.wheres.length) {
            wheres = this.ast.wheres
                .reduce((acc, { field, op, value }): string[] => {
                    acc.push(`${field} ${op} ${this.parseVal(value)}`)
                    return acc;
                }, [])
                .join(' AND')
        }

        if (wheres) {
            sql.push(`WHERE ${wheres}`);
        }

        if (this.ast.orderBy?.col) {
            sql.push(`ORDER BY ${this.ast.orderBy.col}`)
            if (this.ast.orderBy?.dir) {
                sql.push(`${this.ast.orderBy.dir}`)
            }
        }

        if (this.ast.limit) {
            sql.push(`LIMIT ${this.ast.limit}`)
        }
        return sql.join(' ')
    }

    parseVal(v: unknown): string | number {
        if (typeof(v) === null) {
            return 'NULL'
        } else if (typeof(v) === 'number') {
            return v
        }
        return `'${v}'`
    }
}
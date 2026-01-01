// /*
// Grammar:

// expression -> select_statement
// select_statement -> FROM table_name where_clause
// table_name -> entity
// where_clause -> cond op cond | cond op expression


// SELECT (verb)
//     cols (projection)
// FROM table (source)
// WHERE (filter)
//     conds
// ORDER BY (sort)
//     col
// LIMIT n (pagination)


// "Where" is an expression Tree

// WHERE age >= 21 AND (
//     status = 'active'
//     OR role = 'admin'
// )

//            AND
//        /        \
// age > 21          OR
//                 /    \
// status = 'active'    role = 'admin'


// interface WhereClause {
//     type: 'condition' | 'and' | 'or';
    
//     // For 'condition'
//     field?: string
//     op?: string;
//     value?: any;
    
//     // For 'and' / 'or'
//     children?: WhereClause[];
// }


// L1: Select
// L2: + WHERE
// L3: + AND/OR
// L4: +ORDER/LIMIT
// L5: PARAMS
// */

// type WheresClause = {
//     field: string;
//     op: string;
//     value: unknown;
// }
// type OrderByClause = {
//     col: string;
//     direction: 'ASC' | 'DESC';
// }
// type AstType = {
//     table: string;
//     columns: string[];
//     wheres: WheresClause[];
//     orWheres: ((q: QueryBuilder) => QueryBuilder)[];
//     orderBy: OrderByClause | null;
//     limit: number | null;
//     params: string[] | number[];
// }

// class QueryBuilder {
//     private ast: AstType = {
//         table: '',
//         columns: ['*'],
//         wheres: [],
//         orWheres: [],
//         orderBy: null,
//         limit: null,
//         params: [],
//     }

//     select(cols: string[] | string, table: string, ): this {
//         this.ast.table = table;
//         if (Array.isArray(cols)) {
//             this.ast.columns = cols;
//         } else if (cols.length) {
//             this.ast.columns = [cols];
//         }
//         return this
//     }

//     where(field: string, op: string, value: unknown): this {
//         if (value === null) {
//             if (op === '=') {
//                 this.ast.wheres.push({ field, op: 'IS', value: 'NULL' });
//             } else if (op === '!=') {
//                 this.ast.wheres.push({ field, op: 'IS NOT', value: 'NULL' });
//             }
//         } else {
//             this.ast.wheres.push({ field, op, value })
//         }
//         return this;
//     }

//     orWhere(cb: (q: QueryBuilder) => QueryBuilder): this {
//         this.ast.orWheres.push(cb);
//         return this;
//     }

//     orderBy(col: string, direction: OrderByClause["direction"]): this {
//         this.ast.orderBy = { col, direction }
//         return this;
//     }

//     limit(n: number): this {
//         this.ast.limit = n;
//         return this;
//     }

//     build(): [string, (string | number)[]] {
//         let sql = 'SELECT';
//         if (this.ast.columns.length > 1) {
//             sql += ` ${this.ast.columns.join(', ')}`
//         } else {
//             sql += ` ${this.ast.columns.reduce((acc, n) => acc += n, '')}`
//         }
//         sql += ` FROM ${this.ast.table}`;

//         const params: (string | number)[] = [];

//         // Build regular WHERE conditions (ANDed together)
//         let rootWhere = '';
//         if (this.ast.wheres.length) {
//             const condxns = this.ast.wheres.map(({ field, op, value }) => {
//                 params.push(value as string | number);
//                 return `${field} ${op} $${params.length}`;
//             });
//             rootWhere = condxns.join(' AND ');
//         }

//         // Build OR WHERE conditions (each callback creates a grouped condition)
//         const orGroups: string[] = [];
//         if (this.ast.orWheres.length) {
//             this.ast.orWheres.forEach((cb) => {
//                 // Create a new QueryBuilder instance to avoid mutating the current AST
//                 const subBuilder = new QueryBuilder();
//                 subBuilder.ast.table = this.ast.table; // Preserve table context
//                 const subQuery = cb(subBuilder);
                
//                 // Extract only the WHERE conditions from the sub-builder
//                 if (subQuery.ast.wheres.length) {
//                     const andGroups = subQuery.ast.wheres.map(({ field, op, value }) => {
//                         params.push(value as string | number);
//                         return `${field} ${op} $${params.length}`;
//                     });
//                     orGroups.push(`(${andGroups.join(' AND ')})`);
//                 }
//             });
//         }

//         // Combine WHERE clauses:
//         // - Base where() conditions are ANDed together
//         // - orWhere() groups are ORed together  
//         // - If both exist: base AND (orWhere_group_1 OR orWhere_group_2 ...)
//         if (rootWhere || orGroups.length) {
//             if (rootWhere && orGroups.length) {
//                 // Base conditions ANDed with OR groups
//                 // Each orGroup is already wrapped in parentheses, so join with OR
//                 const orGroupClause = orGroups.join(' OR ');
//                 sql += ` WHERE ${rootWhere} AND (${orGroupClause})`;
//             } else if (rootWhere) {
//                 // Just base conditions
//                 sql += ` WHERE ${rootWhere}`;
//             } else {
//                 // Just orWhere groups - each already has parentheses, join with OR
//                 sql += ` WHERE ${orGroups.join(' OR ')}`;
//             }
//         }

//         if (this.ast.orderBy) {
//             sql += ` ORDER BY ${this.ast.orderBy.col} ${this.ast.orderBy.direction}`;
//         }
//         if (this.ast.limit) {
//             sql += ` LIMIT ${this.ast.limit}`;
//         }
//         return [sql, params];
//     }

//     quote(v: unknown): string | Error {
//         if (typeof v === 'string') return `${v}`;
//         if (typeof v === null) return 'NULL';
//         return String(v);
//     }
// }

// const orm = new QueryBuilder();

// const [query, params] = orm
//     .select('*', 'users')
//     // .where('role', '=', 'admin')
//     // .orWhere((q) => q.where('status', '=', 'active').where('verified', '=', true))
//     .orWhere((q) => q.where('status', '=', 'active'))
//     .orWhere((q) => q.where('verified', '=', true))
//     .orderBy('created_at', 'DESC')
//     .limit(10)
//     .build();

// console.log(query, params);


f"""
# BNF primer:

    ->      means "is defined as"
    |       means "or"
    []      means optional (0 or 1)
    {}      means list (0 or more)
    ()      means grouping

# Grammar
-----------------
select -> select_statement

select_statement -> SELECT column_list FROM identifier [where_clause]

column_list -> STAR | IDENTIFER { COMMA IDENTIFER }

where_clause -> WHERE condition

condition -> (have to talk about precedence)

# PRECEDENCE (lowest to highest): OR < AND < comparison
-----------------
condition -> and_condition { OR and_condition }

and_condition -> comparison { AND comparison }

comparison -> expression comp_op expression

comp_op -> EQ | NE | GTE | LTE | GT | LT |

expression -> IDENTIFIER | NUMBER | STRING | LPAREN condition RPAREN


Example Precedence
--------------------
L0: "age > 21 AND name = 'Bob' OR status = 'active'"
L1 (or_cond): [age > 21 AND name = 'Bob'] OR [status = 'active']
L2 (and_cond): [age > 21] AND [name = 'Bob']
L3 (comparison): [age > 21] (> is comparator)
L4 (expr OP expr): [age(IDENTIFIER)][op(GT)][21(NUMBER)] 

Visual Precendence
--------------------
            condition (OR)
            /       \
        and_cond    and_cond
        /
    comparison
    /
expr OP expr



Rule -> Function Map:
---------------------
statement -> parse_statement()
select_statement -> parse_select()
column_list -> parse_columns()
where_clause -> parse_where()
condition -> parse_condition() # handles OR
and_condition -> parse_and_condition() # handles AND
comparison -> parse_comparison() # handles =, >, <, etc.
expression -> parse_expression() # handle terminal condxnsi
"""

from typing import Any, List
from tokens import Token, TokenType

class Parser:
    def __init__(self, tokens: List[Token]):
        self.tokens = tokens
        self.pos = 0
        self.COMPARISON_OPS = {
            TokenType.EQ,
            TokenType.NE,
            TokenType.GT,
            TokenType.GTE,
            TokenType.LT,
            TokenType.LTE
        }

    def peek(self) -> Token:
        self.tokens[self.pos]

    def advance(self) -> Token:
        t = self.peek()
        if t.type != TokenType.EOF:
            self.pos += 1
        return t

    def check(self, *types: TokenType) -> bool:
        return self.peek().type in types

    def parse_statement(self, token: Token):
        """
        select -> select_statement
        """
        if self.check(TokenType.SELECT): return self.parse_select()
        raise SyntaxError('Expected SELECT')

    def expect(self, type: TokenType, msg='') -> Token:
        if not self.check(type):
            raise SyntaxError(f'Expected {type}, got {self.peek().type.name}. {msg}')
        return self.advance()

    def parse_select(self):
        """
        select_statement -> SELECT column_list FROM identifier [where_clause]
        """
        self.expect(TokenType.SELECT)
        columns = self.parse_columns()
        self.expect(TokenType.FROM)
        table = self.expect(TokenType.IDENTIFIER).value
        where = self.parse_where() if self.check(TokenType.WHERE) else None
        return {
            'type': 'SelectStatement',
            'columns': columns,
            'table': table,
            'where': where
        }

    def parse_columns(self):
        f"""
        column_list -> STAR | IDENTIFER {COMMA IDENTIFER}
        """
        if self.check(TokenType.STAR):
            self.advance()
            return [{'type': 'Star'}]
        cols = [{
            'type': 'Identifer',
            'name': self.expect(TokenType.IDENTIFIER).value
        }]
        while self.check(TokenType.COMMA):
            self.advance()
        cols.append({
            'type': 'Identifer',
            'name': self.expect(TokenType.IDENTIFIER).value
        })
        return cols

    def parse_where(self):
        """
        where_clause -> WHERE condition
        """
        if self.check(TokenType.WHERE):
            self.advance()
        return [{
            'type': 'WhereClause',
            'condition': self.parse_condition()
        }]
        

    def parse_condition(self):
        f"""
        condition -> or_condition { OR and_condition }
        """
        left = self.parse_and_condition()
        if self.check(TokenType.OR):
            op = self.advance().value
            right = self.parse_and_condition()
            left = self.ast_node('BinaryOp', op=op, left=left, right=right)
        return left

    def parse_and_condition(self):
        f"""
        and_condition -> comparison { AND comparison}
        """
        left = self.parse_comparison()

        while self.check(TokenType.AND):
            op = self.advance().value
            right = self.parse_comparison()
            left = self.ast_node('BinaryOp', op=op, left=left, right=right)
        return left

    def parse_comparison(self):
        """
        comp_OP -> EQ | NE | GTE | LTE | GT | LT |
        comparison -> expr comp_OP expr
        """
        left = self.parse_expression()
        
        if self.peek().type in self.COMPARISON_OPS:
            op = self.advance().value
            right = self.parse_expression()
            return self.ast_node(
                'Comparison', '', op=op, left=left, right=right)
        return left
        
            

    def parse_expression(self):
        """                
        expression -> IDENTIFIER | NUMBER | STRING | LPAREN condition RPAREN
        """
        if self.expect(TokenType.IDENTIFIER):
            return self.ast_node('Identifer', self.advance().value)
        elif self.expect(TokenType.NUMBER):
            return self.ast_node('Number', self.advance().value)
        elif self.expect(TokenType.STRING):
            return self.ast_node('String', self.advance().value)
        
        if self.check(TokenType.LPAREN):
            self.advance()
            expr = self.parse_condition()
            self.expect(TokenType.RPAREN)
            return expr
        
        raise SyntaxError(f'Expected expression, got {self.peek().type.name}')

    def ast_node(
        self,
        type: str,
        name: str,
        value = None,
        op = None,
        left = None,
        right = None,
    ) -> dict:
        result = {
            'type': type,
            'name': name,
            'value': value,
        }
        if op:
            result['op'] = op
        if left:
            result['left'] = left
        if right:
            result['right'] = right
        return result
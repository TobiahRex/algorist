from typing import List, Any
from tokens import Token, TokenType, KEYWORDS

class Lexer:
    def __init__(self, src):
        self.src = src
        self.pos = 0
        self.eof = '\0'
        self.tokens: List[Token] = []

    def peek(self) -> str:
        if self.pos >= len(self.src):
            return self.eof
        return self.src[self.pos]

    def is_at_end(self) -> bool:
        if self.pos >= len(self.src):
            return True
        return False

    def advance(self) -> None:
        ch = self.peek()
        if not self.is_at_end():
            self.pos += 1
        return ch

    def scan_identifier(self) -> Token:
        """
        1. check if it's alphanumeric or underscore, 
            if so advance, else break
        2. collect text
        3. if keyword, return such, else retun identifier
        """
        p = self.pos
        while self.peek().isalnum() or self.peek() == '_':
            self.advance()

        raw_text = self.src[p:self.pos]
        text = raw_text.upper()

        if text in KEYWORDS:
            return Token(KEYWORDS[text], text, p)
        return Token(TokenType.IDENTIFIER, raw_text, p)

    def scan_number(self) -> Token:
        """
        1. check if it's digit, then consume, watch for decimals
        2. return token as number
        """
        p = self.pos

        while self.peek().isdigit():
            self.advance()

        digit_ahead = self.src[self.pos+1:self.pos+2].isdigit()
        while digit_ahead and self.peek() == '.':
            self.advance()
            while self.peek().isdigit():
                self.advance()

        number = float(self.src[p:self.pos])
        return Token(TokenType.NUMBER, number, p)

    def scan_string(self):
        """
        1. scan for quoted values without capturing quotes.
        2. watch out for eof.
        """
        p = self.pos
        def is_quote(c):
            return c in ['\'', '\"']

        if is_quote(self.peek()):
            self.advance()

        while not is_quote(self.peek()) and not self.is_at_end():
            self.advance()

        if self.is_at_end():
            raise SyntaxError(f'Unterminated string at position: ${self.pos}')

        self.advance()
        val = self.src[p+1:self.pos-1]
        return Token(TokenType.STRING, val, p)

    def skip_whitespace(self) -> None:
        if self.src[self.pos] in ' \n\t\r':
            self.advance()

    def peek_next(self) -> str:
        if self.is_at_end():
            return ''
        if self.pos + 1 >= len(self.src):
            return ''
        return self.src[self.pos + 1]

    def tokenize(self) -> List[Token]:
        """
        1. while consumable, skip whitespace then
        2. if alpha, check identifier, else,
        3. if number, check nums, else, 
        4. if escaped char, check str, else,
        5. if two-char ops, parse, else,
        6. if one-char ops, parse, else raise
        7. append eof token and return
        """
        while not self.is_at_end():
            self.skip_whitespace()
            if self.is_at_end():
                break

            p = self.pos
            ch = self.peek()

            if ch.isalpha() or ch == '_':
                self.tokens.append(self.scan_identifier())
            elif ch.isdigit():
                self.tokens.append(self.scan_number())
            elif ch in '"\'':
                self.tokens.append(self.scan_string())
            elif ch == '!' and self.peek_next() == '=':
                self.advance()
                self.advance()
                self.tokens.append(Token(TokenType.NE, '!=', p))
            elif ch == '<' and self.peek_next() == '=':
                self.advance()
                self.advance()
                self.tokens.append(Token(TokenType.LTE, '<=', p))
            elif ch == '>' and self.peek_next() == '=':
                self.advance()
                self.advance()
                self.tokens.append(Token(TokenType.GTE, '>=', p))
            elif ch == '=':
                self.tokens.append(Token(TokenType.EQ, self.advance(), p))
            elif ch == '<':
                self.tokens.append(Token(TokenType.LT, self.advance(), p))
            elif ch == '>':
                self.tokens.append(Token(TokenType.GT, self.advance(), p))
            elif ch == ',':
                self.tokens.append(Token(TokenType.COMMA, self.advance(), p))
            elif ch == '*':
                self.tokens.append(Token(TokenType.STAR, self.advance(), p))
            elif ch == '(':
                self.tokens.append(Token(TokenType.LPAREN, self.advance(), p))
            elif ch == ')':
                self.tokens.append(Token(TokenType.RPAREN, self.advance(), p))
            else:
                raise SyntaxError(f'Unexpected token {ch} at position {self.pos}')

        self.tokens.append(Token(TokenType.EOF, None, self.pos))
        return self.tokens


if __name__ == '__main__':
    l = Lexer('WHERE 2 <= 3')
    [print(t) for t in l.tokenize()]

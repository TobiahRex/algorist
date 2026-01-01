from enum import Enum, auto


class TokenType(Enum):
    # keywords
    SELECT = auto()
    FROM = auto()
    WHERE = auto()
    AND = auto()
    OR = auto()

    # identifiers & literals
    IDENTIFIER = auto()
    NUMBER = auto()
    STRING = auto()
    COMMA = auto()

    # operators
    EQ = auto()  # ==
    NE = auto()  # !=
    LT = auto()  # <
    GT = auto()  # >
    LTE = auto()  # <=
    GTE = auto()  # >=

    # punctuation
    COMMA = auto()  # ,
    STAR = auto()  # *
    LPAREN = auto()  # (
    RPAREN = auto()

    EOF = auto()


from dataclasses import dataclass
from typing import Any


@dataclass
class Token:
    type: TokenType
    value: Any
    pos: int  # position in source for err feedback


KEYWORDS = {
    "SELECT": TokenType.SELECT,
    "FROM": TokenType.FROM,
    "WHERE": TokenType.WHERE,
    "AND": TokenType.AND,
    "OR": TokenType.OR,
}

if __name__ == "__main__":
    t = Token(TokenType.SELECT, "SELECT", 0)
    print(f"Token: {t}, Value: {t.value}, Type: {t.type}, Position: {t.pos}")

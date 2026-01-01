class NQueensSolver:
    def __init__(self, n: int):
        self.n = n
        self.solutions = []

        self.cols = set()
        self.ned = set() # / > r-c
        self.nwd = set() # \ > r+c

        self.board = [['*' for _ in range(n)] for _ in range(n)]

    def is_safe(self, row: int, col: int) -> bool:
        """
        Verify no queens are present on the (row, col), col, ned, nwd
        Using set's turns this from O(n) to O(1)r000
        """
        violations = [
            col in self.cols,
            (row - col) in self.nwd,
            (row + col) in self.ned,
        ]
        return True not in violations

    def place_queen(self, row, col):
        """
        Add queen, then propagate
        "propagation" = adding to constraint sets.
        position on the board becomes a live constraint.
        """
        self.cols.add(col)
        self.nwd.add(row-col)
        self.ned.add(row+col)
        self.board[row][col] = 'Q'

    def remove_queen(self, row, col):
        """
        Remove queen, then undo propagation
        """
        self.cols.remove(col)
        self.nwd.remove(row - col)
        self.ned.remove(row + col)
        self.board[row][col] = "*"

    def backtrack(self, row: int):
        """
        Place queens row by row using backtracking.

        Base case: All queens places -> record solution
        Recursive: Try each safe column, recurse to next row

        Magic: constraint sets make safety check O(1), turning
        exponential into mangeable.
        """

        # base case
        if row == self.n:
            solution = [''.join(r) for r in self.board]
            self.solutions.append(solution)
            return

        # for this row, try each col
        for col in range(self.n):
            if self.is_safe(row, col): # constraint check
                self.place_queen(row, col) # propagate
                self.backtrack(row + 1)
                self.remove_queen(row, col) # cleanup

    def solve(self) -> list:
        self.backtrack(0)
        return self.solutions


def solveNQueens(n):
    res, cols, nwd, ned = [], set(), set(), set()

    def backtrack(r, board):
        if r == n:
            res.append([''.join(row) for row in board])
            return
        for c in range(n):
            if any([c in cols, (r-c) in nwd, r+c in ned]):
                continue
            cols.add(c); nwd.add(r-c); ned.add(r+c)
            board[r][c] = 'Q'
            backtrack(r+1, board)
            board[r][c] = '.'
            cols.remove(c); nwd.remove(r - c); ned.remove(r + c);

    backtrack(0, [['.']*n for _ in range(n)])
    return res

if __name__ == '__main__':
    # nq = NQueensSolver(8)
    # solutions = nq.solve()
    solutions = solveNQueens(8)
    for s in solutions:
        print('\n')
        for r in s:
            print(r)

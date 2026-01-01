class SudokuSolver:
    """
    Techniques Implemented:
    - Basic constraint checking (row, col, box)
    - MRV hueristic (Most Constrained Variable first)
    - Domain tracking for efficient propagation

    Insights:
    Most cels are determined by propagation alone.
    Backtracking handles the ~1-5% that need guessing.
    """
    def __init__(self, board: list):
        self.board = board
        self.domains = [[set() for _ in range(9)] for _ in range(9)]
        self.init_domains()

    def init_domains(self):
        f"""
        For filled cells: domain = {value}
        For empty cells: domain = {1...9} - (row U col U box)
        """
        for r in range(9):
            for c in range(9):
                if self.board[r][c] == '.':
                    self.domains[r][c] = self.get_domain(r, c)
                else:
                    self.domains[r][c] = {self.board[r][c]}
    
    def get_domain(self, row, col):
        f"""
        Get valid values for cell (row, col)
        Valid = {1..9} - (row values) - (col values) - (box values)
        """
        p = set('123456789')
        # get row and col values
        for i in range(9):
            p.discard(self.board[row][i])
            p.discard(self.board[i][col])

        # get box values: 
        box_r, box_c = 3 * (row // 3), 3 * (col // 3) # top left corner of box
        for r in range(box_r, box_r + 3):
            for c in range(box_c, box_c + 3):
                p.discard(self.board[r][c])
        
        return p # domain set

    def find_mrv(self):
        """
        Minimum constrained variable first
        Choose the most constrained cell first.
        Why? if it has few options, we'll discover conflicts sooner.
        Fail-fast = less wasted search.
        """
        min_options = 10
        best_cell = None

        for r in range(9):
            for c in range(9):
                if self.board[r][c] == '.':
                    num_options = len(self.domains[r][c]) # how many values?
                    if num_options < min_options: # this domain is more full?
                        min_options = num_options
                        best_cell = (r, c) # cell for best domain
                        if min_options == 1:
                            return (r, c) # best cell
        return best_cell

    def propagate(self, row: int, col: int, num: int) -> bool:
        """
        Propagate constraint after placing num at (row, col)
        Remove num from domains of all cells in same row, col, box.
        If any domain becomes empty -> return False (invalid state).
        
        NOTE: the mutation of self.domains is mutation of a copy.
        """
        # propagate rows
        for r in range(9):
            if r != row and self.board[r][col] == '.':
                self.domains[r][col].discard(num)
                if not self.domains[r][col]:
                    return False
        # propagate cols
        for c in range(9):
            if c != col and self.board[row][c] == '.':
                self.domains[row][c].discard(num)
                if not self.domains[row][c]:
                    return False
        # propagate boxes
        box_r, box_c = 3 * (row // 3), 3 * (col // 3)
        for r in range(box_r, box_r + 3):
            for c in range(box_c, box_c + 3):
                if (r, c) != (row, col) and self.board[r][c] == '.':
                    self.domains[r][c].discard(num)
                    if not self.domains[r][c]:
                        return False
        return True

    def solve(self) -> bool:
        """
        1. find most constrained empty cell (MRV)
        2. if none -> puzzle solved
        3. try each value in cell's domain
        4. place value, propagate, recurse
        5. if dead end -> backtrack
        """
        cell = self.find_mrv()
        if cell is None:
            return True # solved
        
        row, col = cell

        # save domain state for backtracking
        saved_domains = [[d.copy() for d in r] for r in self.domains]

        for num in list(self.domains[row][col]):
            # assign numbers
            self.board[row][col] = num
            # overwrite domains assuming answer is good
            self.domains[row][col] = {num}
            # propagate and recurse
            if self.propagate(row, col, num):
                if self.solve():
                    return True
            # backtrack
            self.board[row][col] = '.'
            self.domains = [[d.copy() for d in sd] for sd in saved_domains]
        
        return False


def solveSudoku(board):
    """
    This version is very slow, due to no propagation and no MRV.
    """
    def is_valid(r, c, num):
        for i in range(9):
            if board[r][i] == num or board[i][c] == num:
                return False
            if board[3*(r//3)+i//3][3*(c//3)+i%3] == num:
                return False
        return True


    def solve():
        for r in range(9):
            for c in range(9):
                if board[r][c] == '.':
                    for num in '123456789':
                        if is_valid(r, c, num):
                            board[r][c] = num
                            if solve(): return True
                            board[r][c] = '.'
                    return False
        return True

    solve()

if __name__ == '__main__':

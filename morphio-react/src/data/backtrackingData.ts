import type { PatternProblem } from '../redux/types';

export const backtrackingProblems: PatternProblem[] = [
  {
    id: 'permutations',
    name: 'Generate All Permutations',
    difficulty: 'medium',
    description: 'Generate all possible permutations of array elements',
    examples: [
      {
        input: { nums: [1, 2, 3] },
        display: '[1,2,3]',
        expected: '[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]',
      },
      {
        input: { nums: [1, 2] },
        display: '[1,2]',
        expected: '[[1,2],[2,1]]',
      },
    ],
    mnemonicEmoji: '🔄',
    mnemonicPerson: 'Arrangement Artist',
    mnemonicObject: 'All Orderings',
    mnemonicAction: 'Trying each position',
    mnemonicStory:
      'Place each element at position 1. Recursively permute rest. When stuck, backtrack and try next element. Build tree of all arrangements.',
    realWorldUses: [
      {
        icon: '🎭',
        title: 'Scheduling',
        description: 'Generate all possible team/shift arrangements',
      },
    ],
  },
  {
    id: 'combinations',
    name: 'Generate Combinations (N Choose K)',
    difficulty: 'medium',
    description: 'Generate all k-length combinations from n elements',
    examples: [
      {
        input: { n: 4, k: 2 },
        display: 'C(4,2)',
        expected: '[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]',
      },
      {
        input: { n: 1, k: 1 },
        display: 'C(1,1)',
        expected: '[[1]]',
      },
    ],
    mnemonicEmoji: '🎯',
    mnemonicPerson: 'Choice Maker',
    mnemonicObject: 'Selected Subsets',
    mnemonicAction: 'Picking k from n',
    mnemonicStory:
      'At each step, decide to include current element or skip. Once you have k elements, record. Backtrack and try excluding instead.',
    realWorldUses: [
      {
        icon: '🎲',
        title: 'Lottery Combinations',
        description: 'Generate all possible lottery ticket combinations',
      },
    ],
  },
  {
    id: 'nQueens',
    name: 'N-Queens Problem',
    difficulty: 'hard',
    description: 'Place N queens on NxN board with no conflicts',
    examples: [
      {
        input: { n: 4 },
        display: 'Place 4 queens on 4x4 board',
        expected: '2 valid solutions',
      },
      {
        input: { n: 1 },
        display: 'Place 1 queen',
        expected: '1 solution',
      },
    ],
    mnemonicEmoji: '👑',
    mnemonicPerson: 'Queen Placer',
    mnemonicObject: 'Safe Board Positions',
    mnemonicAction: 'Testing & backtracking',
    mnemonicStory:
      "Place queen in row 1. Check if safe. Recurse to next row. If can't place safely, backtrack and try next column in previous row.",
    realWorldUses: [
      {
        icon: '🛡️',
        title: 'Resource Allocation',
        description: 'Place resources with conflict avoidance constraints',
      },
    ],
  },
  {
    id: 'wordSearch',
    name: 'Word Search in Grid (Backtracking)',
    difficulty: 'medium',
    description: 'Search for word in 2D grid using adjacent cells',
    examples: [
      {
        input: { grid: '[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]', word: 'ABCCED' },
        display: 'Find ABCCED in grid (adjacent horizontal/vertical)',
        expected: true,
      },
      {
        input: { grid: '[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]', word: 'SEE' },
        display: 'Find SEE',
        expected: true,
      },
    ],
    mnemonicEmoji: '🔤',
    mnemonicPerson: 'Word Hunter',
    mnemonicObject: 'Letter Grid Path',
    mnemonicAction: 'Exhaustive path search',
    mnemonicStory:
      "Start at each letter matching word[0]. Recursively try neighbors. Mark visited. If reach word end, found! Otherwise backtrack.",
    realWorldUses: [
      {
        icon: '🎮',
        title: 'Word Games',
        description: 'Search word validity in Scrabble/Boggle grids',
      },
    ],
  },
];

export const backtrackingCodeExamples = {
  permutations: {
    verbose: `# Generate All Permutations - VERBOSE

class PermutationGenerator:
    def __init__(self, nums):
        self.nums = nums
        self.result = []

    def backtrack(self, path, remaining):
        """Recursive backtracking for permutations"""
        # Base case: all elements used
        if not remaining:
            self.result.append(path)
            return

        # Try each remaining element
        for i, num in enumerate(remaining):
            # Choose: add current number to path
            self.backtrack(
                path + [num],
                remaining[:i] + remaining[i+1:]  # Exclude current
            )
            # Backtrack is implicit: recursion returns

    def generate(self):
        self.backtrack([], self.nums)
        return self.result

# Usage
gen = PermutationGenerator([1,2,3])
print(gen.generate())  # → all 6 permutations`,

    terse: `# Generate All Permutations - TERSE

def permute(nums):
    result = []
    def backtrack(path, remaining):
        if not remaining:
            result.append(path)
            return
        for i in range(len(remaining)):
            backtrack(path + [remaining[i]], remaining[:i] + remaining[i+1:])
    backtrack([], nums)
    return result`,
  },

  combinations: {
    verbose: `# Generate Combinations N Choose K - VERBOSE

class CombinationGenerator:
    def __init__(self, n, k):
        self.n = n
        self.k = k
        self.result = []

    def backtrack(self, start, path):
        """Backtracking for combinations"""
        # Base case: found k elements
        if len(path) == self.k:
            self.result.append(path[:])
            return

        # Try each number from start to n
        for i in range(start, self.n + 1):
            # Choose
            path.append(i)
            # Recurse from next number
            self.backtrack(i + 1, path)
            # Unchoose (backtrack)
            path.pop()

    def generate(self):
        self.backtrack(1, [])
        return self.result

# Usage
gen = CombinationGenerator(4, 2)
print(gen.generate())  # → [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]`,

    terse: `# Generate Combinations - TERSE

def combine(n, k):
    result = []
    def backtrack(start, path):
        if len(path) == k:
            result.append(path[:])
            return
        for i in range(start, n + 1):
            path.append(i)
            backtrack(i + 1, path)
            path.pop()
    backtrack(1, [])
    return result`,
  },

  nQueens: {
    verbose: `# N-Queens Problem - VERBOSE

class NQueensSolver:
    def __init__(self, n):
        self.n = n
        self.result = []

    def is_safe(self, board, row, col):
        """Check if placing queen is safe"""
        # Check column
        for i in range(row):
            if board[i] == col:
                return False

        # Check diagonals
        for i in range(row):
            if abs(board[i] - col) == abs(i - row):
                return False

        return True

    def backtrack(self, board, row):
        """Place queens row by row"""
        if row == self.n:
            self.result.append(board[:])
            return

        for col in range(self.n):
            if self.is_safe(board, row, col):
                # Choose
                board[row] = col
                # Recurse
                self.backtrack(board, row + 1)
                # Backtrack (no explicit undo needed)

    def solve(self):
        self.backtrack([-1] * self.n, 0)
        return self.result

# Usage
solver = NQueensSolver(4)
print(len(solver.solve()))  # → 2 solutions`,

    terse: `# N-Queens Problem - TERSE

def solveNQueens(n):
    result = []
    board = [-1] * n

    def is_safe(row, col):
        for i in range(row):
            if board[i] == col or abs(board[i] - col) == abs(i - row):
                return False
        return True

    def backtrack(row):
        if row == n:
            result.append(board[:])
            return
        for col in range(n):
            if is_safe(row, col):
                board[row] = col
                backtrack(row + 1)

    backtrack(0)
    return result`,
  },
};

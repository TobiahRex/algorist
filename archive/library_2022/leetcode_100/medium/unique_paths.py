from functools import lru_cache


class Solution1:
    def uniquePaths(self, m: int, n: int) -> int:
        self.rows = m - 1
        self.cols = n - 1
        return self.recurse(0, 0)

    @lru_cache(maxsize=None)
    def recurse(self, i, j):
        if i == self.rows and j == self.cols:
            return 1
        if i > self.rows or j > self.cols:
            return 0
        r1 = self.recurse(i+1, j)
        r2 = self.recurse(i, j+1)
        return r1 + r2

# Time Complexity = 2^n  - We want every possible path in the tree of choices that lead to the leaf node.
# Space Complexity = O(n) - the call-stack depth contains the longest path in the tree from root to leaf.
"""
* Divergent Thinking
- Choices?
    - Down [i-1][i]
    - Right [i][i+1]
1. Top-Down DP [yes]
    - Base Case: out-of-bounds, we've arrived at destination, we've arrived at the square in the past? If we've arrived at the destination, then we increment our counter.
    - Overlapping sub-problems? YES. Which means memoization should be used.
2. Bottom-Up DP:
    We could iterate row-wise.
    Every cell asks the question: "How many ways can i arrive here?"
    - Depends on the number of ways we arrived at a previous cell.
"""

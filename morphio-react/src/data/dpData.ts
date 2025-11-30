import type { PatternProblem } from '../redux/types';

export const dpProblems: PatternProblem[] = [
  {
    id: 'climbStairs',
    name: 'Climbing Stairs',
    difficulty: 'easy',
    description: 'Count ways to climb n stairs (1 or 2 steps at a time)',
    examples: [
      {
        input: { n: 1 },
        display: 'n=1: 1 way (1)',
        expected: 1,
      },
      {
        input: { n: 2 },
        display: 'n=2: 2 ways (1+1 or 2)',
        expected: 2,
      },
      {
        input: { n: 3 },
        display: 'n=3: 3 ways (1+1+1, 1+2, 2+1)',
        expected: 3,
      },
      {
        input: { n: 45 },
        display: 'n=45: exponential combinations',
        expected: 1134903170,
      },
    ],
    mnemonicEmoji: '👟',
    mnemonicPerson: 'Stair Climber',
    mnemonicObject: 'Step Combinations',
    mnemonicAction: 'Memoizing overlapping subproblems',
    mnemonicStory:
      'Each stair either comes from (n-1) stairs + 1 step OR (n-2) stairs + 2 steps. Store results to avoid recalculating. Fibonacci pattern!',
    realWorldUses: [
      {
        icon: '🎮',
        title: 'Game Paths',
        description: 'Count valid move sequences in games',
      },
    ],
  },
  {
    id: 'housRobber',
    name: 'House Robber',
    difficulty: 'medium',
    description: "Rob houses to maximize money, can't rob adjacent houses",
    examples: [
      {
        input: { houses: [1, 2, 3, 1] },
        display: '[1,2,3,1]: rob houses 0&2 for max 4',
        expected: 4,
      },
      {
        input: { houses: [2, 7, 9, 3, 1] },
        display: '[2,7,9,3,1]: rob houses 1&2 for max 16',
        expected: 16,
      },
      {
        input: { houses: [1, 3, 1, 3, 100] },
        display: '[1,3,1,3,100]: rob 0,2,4 for max 104',
        expected: 104,
      },
    ],
    mnemonicEmoji: '🏠',
    mnemonicPerson: 'Clever Robber',
    mnemonicObject: 'House Money Values',
    mnemonicAction: 'DP choice: rob or skip',
    mnemonicStory:
      'For each house, choose: rob it (+ value from 2 houses back) or skip it (+ value from 1 house back). Take max. Remember all decisions.',
    realWorldUses: [
      {
        icon: '💰',
        title: 'Portfolio Optimization',
        description: 'Select non-conflicting investments for max return',
      },
    ],
  },
  {
    id: 'coinChange',
    name: 'Coin Change (Minimum Coins)',
    difficulty: 'medium',
    description: 'Find minimum coins needed to make amount',
    examples: [
      {
        input: { coins: [1, 2, 5], amount: 5 },
        display: '[1,2,5], target 5: use one 5-coin',
        expected: 1,
      },
      {
        input: { coins: [2], amount: 3 },
        display: '[2], target 3: impossible',
        expected: -1,
      },
      {
        input: { coins: [10], amount: 10 },
        display: '[10], target 10: use one coin',
        expected: 1,
      },
      {
        input: { coins: [1, 3, 4], amount: 6 },
        display: '[1,3,4], target 6: 3+3',
        expected: 2,
      },
    ],
    mnemonicEmoji: '🪙',
    mnemonicPerson: 'Change Maker',
    mnemonicObject: 'Coin Combinations',
    mnemonicAction: 'DP building up to target',
    mnemonicStory:
      'For each amount 0..target, try each coin. Take minimum: current coin (1 + dp[amount-coin]) or best so far. Build bottom-up.',
    realWorldUses: [
      {
        icon: '💳',
        title: 'Payment Optimization',
        description: 'Minimize denomination count for exact payment',
      },
    ],
  },
  {
    id: 'longestCommonSubsequence',
    name: 'Longest Common Subsequence',
    difficulty: 'hard',
    description: 'Find longest sequence common to two strings',
    examples: [
      {
        input: { s1: 'abcde', s2: 'ace' },
        display: 'LCS("abcde", "ace") = "ace" (length 3)',
        expected: 3,
      },
      {
        input: { s1: 'abc', s2: 'abc' },
        display: 'LCS("abc", "abc") = "abc" (length 3)',
        expected: 3,
      },
      {
        input: { s1: 'abc', s2: 'def' },
        display: 'LCS("abc", "def") = "" (length 0)',
        expected: 0,
      },
    ],
    mnemonicEmoji: '🧬',
    mnemonicPerson: 'Sequence Matcher',
    mnemonicObject: 'Common Patterns',
    mnemonicAction: '2D DP table filling',
    mnemonicStory:
      'Build 2D table: if chars match, diagonal+1. If not, take max from left or top. Fill entire table bottom-up. Read diagonal.',
    realWorldUses: [
      {
        icon: '📝',
        title: 'Diff Algorithms',
        description: 'Find common subsequence for file diffing',
      },
    ],
  },
];

export const dpCodeExamples = {
  climbStairs: {
    verbose: `# Climbing Stairs - VERBOSE (Top-Down DP + Memoization)

class StairsClimber:
    def __init__(self, n):
        self.n = n
        self.memo = {}

    def climb_memo(self, n):
        """Top-down: memoization approach"""
        if n <= 0:
            return 0
        if n == 1:
            return 1
        if n == 2:
            return 2

        # Check memo
        if n in self.memo:
            return self.memo[n]

        # Overlapping subproblems
        result = self.climb_memo(n - 1) + self.climb_memo(n - 2)
        self.memo[n] = result
        return result

    def climb_dp(self):
        """Bottom-up: tabulation approach"""
        if self.n <= 2:
            return self.n

        dp = [0] * (self.n + 1)
        dp[1] = 1
        dp[2] = 2

        for i in range(3, self.n + 1):
            dp[i] = dp[i - 1] + dp[i - 2]

        return dp[self.n]

# Usage
climber = StairsClimber(3)
print(climber.climb_memo(3))  # → 3
print(climber.climb_dp())      # → 3`,

    terse: `# Climbing Stairs - TERSE

def climbStairs(n):
    if n <= 2:
        return n
    dp = [0] * (n + 1)
    dp[1], dp[2] = 1, 2
    for i in range(3, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]

# Or even simpler: two variables
def climbStairs(n):
    a, b = 1, 1
    for _ in range(n):
        a, b = b, a + b
    return b`,
  },

  housRobber: {
    verbose: `# House Robber - VERBOSE

class HouseRobber:
    def __init__(self, houses):
        self.houses = houses

    def rob(self):
        """DP approach: for each house, max of (rob it or skip)"""
        if not self.houses:
            return 0
        if len(self.houses) == 1:
            return self.houses[0]

        n = len(self.houses)
        dp = [0] * n

        # Base cases
        dp[0] = self.houses[0]
        dp[1] = max(self.houses[0], self.houses[1])

        # DP relation:
        # dp[i] = max(
        #     rob house i + dp[i-2],  # Rob current + best before 2 houses back
        #     dp[i-1]                  # Skip current, use best from previous
        # )
        for i in range(2, n):
            rob_current = self.houses[i] + dp[i - 2]
            skip_current = dp[i - 1]
            dp[i] = max(rob_current, skip_current)

        return dp[n - 1]

# Usage
robber = HouseRobber([1, 3, 1, 3, 100])
print(robber.rob())  # → 104`,

    terse: `# House Robber - TERSE

def rob(houses):
    prev1, prev2 = 0, 0
    for house in houses:
        prev1, prev2 = max(house + prev2, prev1), prev1
    return prev1`,
  },

  coinChange: {
    verbose: `# Coin Change - VERBOSE

class CoinChange:
    def __init__(self, coins, amount):
        self.coins = coins
        self.amount = amount

    def min_coins(self):
        """Bottom-up DP for minimum coins"""
        # dp[i] = min coins to make amount i
        dp = [float('inf')] * (self.amount + 1)
        dp[0] = 0  # 0 coins needed for amount 0

        # For each amount from 1 to target
        for amt in range(1, self.amount + 1):
            # Try each coin
            for coin in self.coins:
                if coin <= amt:
                    # Use this coin + min for (amt - coin)
                    dp[amt] = min(dp[amt], 1 + dp[amt - coin])

        return dp[self.amount] if dp[self.amount] != float('inf') else -1

# Usage
changer = CoinChange([1, 3, 4], 6)
print(changer.min_coins())  # → 2 (3+3)`,

    terse: `# Coin Change - TERSE

def coinChange(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for amt in range(1, amount + 1):
        for coin in coins:
            if coin <= amt:
                dp[amt] = min(dp[amt], 1 + dp[amt - coin])
    return dp[amount] if dp[amount] != float('inf') else -1`,
  },

  longestCommonSubsequence: {
    verbose: `# Longest Common Subsequence - VERBOSE

class LCS:
    def __init__(self, s1, s2):
        self.s1 = s1
        self.s2 = s2

    def find_lcs(self):
        """2D DP for LCS"""
        m, n = len(self.s1), len(self.s2)
        dp = [[0] * (n + 1) for _ in range(m + 1)]

        # Fill DP table
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if self.s1[i - 1] == self.s2[j - 1]:
                    # Characters match: take diagonal + 1
                    dp[i][j] = dp[i - 1][j - 1] + 1
                else:
                    # Characters don't match: take max from left or top
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])

        return dp[m][n]

# Usage
lcs = LCS("abcde", "ace")
print(lcs.find_lcs())  # → 3`,

    terse: `# Longest Common Subsequence - TERSE

def longestCommonSubsequence(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s1[i-1] == s2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])

    return dp[m][n]`,
  },
};

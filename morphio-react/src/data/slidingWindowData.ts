import type { PatternProblem } from '../redux/types';

export const slidingWindowProblems: PatternProblem[] = [
  {
    id: 'maxAverage',
    name: 'Max Average of Subarray K',
    difficulty: 'easy',
    description: 'Find maximum average of any contiguous subarray of size k',
    examples: [
      {
        input: { nums: [1, 3, 2, 6, -1, 4, 1, 8, 2], k: 5 },
        display: '[1,3,2,6,-1,4,1,8,2], k=5',
        expected: 3.2,
      },
      {
        input: { nums: [5, 1, 3, 4, 10], k: 2 },
        display: '[5,1,3,4,10], k=2',
        expected: 7.0,
      },
      {
        input: { nums: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], k: 3 },
        display: '[1,2,3,4,5,6,7,8,9,10], k=3',
        expected: 8.0,
      },
    ],
    mnemonicEmoji: '🪟',
    mnemonicPerson: 'Window Watcher',
    mnemonicObject: 'Sliding Pane',
    mnemonicAction: 'Maintaining fixed-size view',
    mnemonicStory:
      'A window of fixed size slides across the array. Each slide calculates the sum. Instead of recalculating, we remove the left element and add the right one. Fast, clean, optimal.',
    realWorldUses: [
      {
        icon: '📊',
        title: 'Stock Price Average',
        description: 'Calculate moving average of stock prices over k days',
      },
      {
        icon: '🎬',
        title: 'Video Buffering',
        description: 'Process network packets in fixed-size sliding windows',
      },
    ],
  },
  {
    id: 'maxSubstring',
    name: 'Longest Substring Without Repeating',
    difficulty: 'medium',
    description: 'Find length of longest substring without repeating characters',
    examples: [
      {
        input: { s: 'abcabcbb' },
        display: '"abcabcbb"',
        expected: 3,
      },
      {
        input: { s: 'bbbbb' },
        display: '"bbbbb"',
        expected: 1,
      },
      {
        input: { s: 'pwwkew' },
        display: '"pwwkew"',
        expected: 3,
      },
      {
        input: { s: 'aabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz' },
        display: '"aabcdefghijklmnopqrstuvwxyz...duplicate"',
        expected: 26,
      },
    ],
    mnemonicEmoji: '🪟',
    mnemonicPerson: 'Character Hunter',
    mnemonicObject: 'Character Set',
    mnemonicAction: 'Expanding until duplicate, then shrinking',
    mnemonicStory:
      'You expand a window to include new characters. When you hit a duplicate, you shrink from the left until the duplicate is gone. Track the longest clean view you\'ve seen.',
    realWorldUses: [
      {
        icon: '🔐',
        title: 'Password Validation',
        description: 'Find longest password substring with unique characters',
      },
    ],
  },
  {
    id: 'fruitBasket',
    name: 'Fruit Into Baskets (At Most K Distinct)',
    difficulty: 'medium',
    description: 'Find longest subarray with at most k distinct elements',
    examples: [
      {
        input: { fruits: [1, 2, 1, 2, 3], k: 2 },
        display: '[1,2,1,2,3], k=2',
        expected: 4,
      },
      {
        input: { fruits: [1, 1, 1, 1, 3, 3, 2, 1], k: 2 },
        display: '[1,1,1,1,3,3,2,1], k=2',
        expected: 6,
      },
      {
        input: { fruits: [1, 2, 3, 4, 5, 6, 7, 8, 1], k: 2 },
        display: '[1,2,3,4,5,6,7,8,1], k=2',
        expected: 3,
      },
    ],
    mnemonicEmoji: '🪟',
    mnemonicPerson: 'Fruit Collector',
    mnemonicObject: 'K Baskets',
    mnemonicAction: 'Maximizing fruits with constraint',
    mnemonicStory:
      'You collect fruits with exactly k baskets. Add fruit types (right++)  while you can. When you exceed k types, shrink (left++) until valid again. Track the best harvest.',
    realWorldUses: [
      {
        icon: '🛒',
        title: 'Shopping Cart Limit',
        description: 'Select longest product sequence with k brands only',
      },
    ],
  },
];

export const slidingWindowCodeExamples = {
  maxAverage: {
    verbose: `# Max Average of Subarray K - VERBOSE
# Find maximum average of any contiguous subarray of size k
# TYPE: Fixed Window

class MaxAverage:
    def __init__(self, nums, k):
        self.nums = nums
        self.k = k
        self.window_sum = 0
        self.max_avg = float('-inf')

    def calculate_initial_window(self):
        """Sum first k elements"""
        for i in range(self.k):
            self.window_sum += self.nums[i]

    def slide_window(self):
        """Slide window and track max average"""
        self.calculate_initial_window()
        self.max_avg = self.window_sum / self.k

        # Slide window across remaining elements
        for right in range(self.k, len(self.nums)):
            # Remove left element, add right element
            left_idx = right - self.k
            self.window_sum = self.window_sum - self.nums[left_idx] + self.nums[right]
            # Update max average
            current_avg = self.window_sum / self.k
            self.max_avg = max(self.max_avg, current_avg)

        return self.max_avg

# Usage
result = MaxAverage([1,3,2,6,-1,4,1,8,2], 5).slide_window()
print(result)  # → 3.2`,

    terse: `# Max Average of Subarray K - TERSE

def findMaxAverage(nums, k):
    window_sum = sum(nums[:k])
    max_avg = window_sum / k

    for i in range(k, len(nums)):
        window_sum = window_sum - nums[i - k] + nums[i]
        max_avg = max(max_avg, window_sum / k)

    return max_avg`,
  },

  maxSubstring: {
    verbose: `# Longest Substring Without Repeating - VERBOSE
# Find length of longest substring without repeating characters
# TYPE: Variable Window

from collections import defaultdict

class LongestSubstring:
    def __init__(self, s):
        self.s = s
        self.char_index = {}  # char -> last seen index
        self.left = 0
        self.max_length = 0

    def has_duplicate(self, right):
        """Check if char at right is in current window"""
        char = self.s[right]
        return char in self.char_index and self.char_index[char] >= self.left

    def move_left(self, right):
        """Move left pointer to skip duplicate"""
        char = self.s[right]
        # Move left past the previous occurrence
        self.left = max(self.left, self.char_index[char] + 1)

    def find_max(self):
        """Two pointer + hashmap approach"""
        for right in range(len(self.s)):
            # If duplicate found, move left
            if self.has_duplicate(right):
                self.move_left(right)

            # Update char index
            self.char_index[self.s[right]] = right

            # Update max length
            window_len = right - self.left + 1
            self.max_length = max(self.max_length, window_len)

        return self.max_length

# Usage
result = LongestSubstring("abcabcbb").find_max()
print(result)  # → 3`,

    terse: `# Longest Substring Without Repeating - TERSE

def lengthOfLongestSubstring(s):
    char_index = {}
    left = max_len = 0

    for right in range(len(s)):
        if s[right] in char_index and char_index[s[right]] >= left:
            left = char_index[s[right]] + 1
        char_index[s[right]] = right
        max_len = max(max_len, right - left + 1)

    return max_len`,
  },

  fruitBasket: {
    verbose: `# Fruit Into Baskets (At Most K Distinct) - VERBOSE

from collections import defaultdict

class FruitBaskets:
    def __init__(self, fruits, k):
        self.fruits = fruits
        self.k = k
        self.basket = defaultdict(int)  # type -> count
        self.left = 0
        self.max_fruits = 0

    def expand(self, right):
        """Add fruit to basket"""
        fruit = self.fruits[right]
        self.basket[fruit] += 1

    def contract(self):
        """Remove fruit from basket"""
        fruit = self.fruits[self.left]
        self.basket[fruit] -= 1
        if self.basket[fruit] == 0:
            del self.basket[fruit]
        self.left += 1

    def too_many_types(self):
        """More than k fruit types?"""
        return len(self.basket) > self.k

    def window_size(self):
        """Number of fruits in window"""
        return self.right - self.left + 1

    def solve(self):
        """Collect max fruits with at most k types"""
        for self.right in range(len(self.fruits)):
            self.expand(self.right)

            # Shrink if too many types
            while self.too_many_types():
                self.contract()

            # Update max
            self.max_fruits = max(self.max_fruits, self.window_size())

        return self.max_fruits

# Usage
result = FruitBaskets([1,2,1,2,3], 2).solve()
print(result)  # → 4`,

    terse: `# Fruit Into Baskets (At Most K Distinct) - TERSE

def totalFruit(fruits, k=2):
    basket = {}
    left = max_fruits = 0

    for right in range(len(fruits)):
        fruit = fruits[right]
        basket[fruit] = basket.get(fruit, 0) + 1

        while len(basket) > k:
            basket[fruits[left]] -= 1
            if basket[fruits[left]] == 0:
                del basket[fruits[left]]
            left += 1

        max_fruits = max(max_fruits, right - left + 1)

    return max_fruits`,
  },
};

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
        title: 'Stock Market Moving Averages',
        description: 'Financial analysts compute k-day moving averages to smooth price volatility and identify trends. A 50-day moving average of Apple stock calculates the average price over the last 50 trading days. Instead of recalculating all 50 prices each day (O(50n)), the sliding window removes yesterday\'s oldest price and adds today\'s new price (O(n)). This runs millions of times across all securities every trading day.',
      },
      {
        icon: '🎬',
        title: 'Video Stream Bitrate Optimization',
        description: 'Netflix and YouTube adapt streaming quality based on network throughput. Every second, measure the average bandwidth used in the last 10 seconds by maintaining a sliding window of packet sizes. If average drops below threshold, reduce quality. If it increases, upgrade. This adaptive bitrate algorithm prevents buffering and maximizes video quality without overwhelming networks.',
      },
      {
        icon: '📱',
        title: 'Mobile Device Battery Analysis',
        description: 'Android and iOS track CPU usage in rolling k-second windows. If average CPU in the last 5 seconds exceeds 80%, the OS throttles background processes to extend battery life. The window slides every second, adding the current second\'s CPU spike, removing the oldest. This prevents false alarms from brief spikes.',
      },
      {
        icon: '🏥',
        title: 'Patient Vital Signs Monitoring',
        description: 'Hospital ICU monitors compute rolling averages of heart rate, blood pressure, oxygen levels over k-minute windows. If the rolling average heart rate exceeds 120 BPM for 5 consecutive minutes, an alert triggers. The window slides minute-by-minute, maintaining O(1) computation instead of recalculating every time.',
      },
      {
        icon: '🚗',
        title: 'Autonomous Vehicle Collision Avoidance',
        description: 'Tesla autopilot maintains a sliding window of the last 30 frames from cameras to calculate average obstacle distance. If the rolling average distance drops below safe threshold while moving at speed, initiate emergency braking. The window updates at 30fps, so O(n) algorithm would be too slow — sliding window keeps it real-time.',
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
        title: 'Password Security Strength Analysis',
        description: 'Security software analyzes passwords to ensure they don\'t contain repeating character patterns. The longest substring without repeating characters indicates the password\'s complexity. A password like "abcdefg" has strength 7 (all unique), while "aabbcc" has strength 2. Weak repeating patterns make brute-force attacks faster. This check runs during password creation and guides users to stronger passwords.',
      },
      {
        icon: '🎮',
        title: 'Game Input Combo Detection',
        description: 'Fighting games like Street Fighter detect special attack combos by finding the longest input sequence without duplicate button presses. The combo "ABC" (3 unique) triggers a special move, but "AABC" (contains repeat A) doesn\'t. The sliding window checks input buffers at 60fps to recognize legitimate combos before the input window closes.',
      },
      {
        icon: '📡',
        title: 'Network Protocol Packet Validation',
        description: 'Some protocols require packet headers to have unique byte sequences for integrity checking. The longest unique byte substring length must meet minimum threshold. If an attacker corrupts the packet with repeated bytes, validation fails. Network stacks perform this check on every incoming packet at line-rate speeds.',
      },
      {
        icon: '🧬',
        title: 'DNA Sequence Uniqueness Scoring',
        description: 'Genomic research identifies regions of DNA without repeated nucleotides (A, C, G, T). A CGATCGA sequence has longest unique substring length of 4 (CGAT). These regions often code for specific proteins. The algorithm identifies high-complexity DNA regions for deeper analysis.',
      },
      {
        icon: '🎨',
        title: 'License Plate Character Validation',
        description: 'DMV systems validate license plates by checking for repeated characters within allowed rules. Some plates require maximum consecutive character repetitions. The sliding window identifies plates like "AAB1234" (2 As) vs "AAA1234" (invalid) by finding longest unique substring. Invalid patterns are rejected at vehicle registration.',
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
        title: 'E-Commerce Cart Supplier Limit',
        description: 'Retailers enforce policies: customers can buy at most k different supplier/brands in one transaction to reduce shipping complexity. The algorithm finds the longest product sequence respecting this constraint. A customer buying [Nike, Adidas, Nike, Adidas, Puma] with k=2 can buy up to 4 items (before Puma violates the constraint). This drives fulfillment efficiency.',
      },
      {
        icon: '📊',
        title: 'Stock Portfolio Diversification',
        description: 'Investment algorithms maintain portfolios with at most k distinct asset classes (stocks, bonds, crypto, commodities, real estate). To rebalance, find the longest trading sequence respecting this constraint. A stock trader analyzing price history [AAPL, MSFT, AAPL, GOOGL, TSLA] with k=2 assets finds the longest valid window respects diversification rules.',
      },
      {
        icon: '🏭',
        title: 'Manufacturing Assembly Line Quality Control',
        description: 'Factory assembly lines use at most k different component suppliers to maintain consistency and traceability. Quality control inspects production sequences ensuring compliance. A sequence [SupplierA, SupplierB, SupplierA, SupplierC, SupplierB] with k=2 violates policy when SupplierC appears. The sliding window identifies compliant batch sizes for quality certification.',
      },
      {
        icon: '🎬',
        title: 'Film Production Location Scouting',
        description: 'Movie crews limit production to at most k different filming locations per day to reduce setup overhead. The production manager finds the longest consecutive shooting schedule respecting this. A schedule [Location1, Location2, Location1, Location2, Location3] with k=2 is valid until Location3, then requires travel. Optimization finds longest sequences minimizing logistics.',
      },
      {
        icon: '🌍',
        title: 'Tourism Bus Route Optimization',
        description: 'Tour buses visit at most k distinct attractions per route to keep tours under 4 hours. The routing algorithm finds the longest sequence of destinations respecting this limit. A route [Museum, Park, Museum, Beach, Theater, Park] with k=3 is valid for first 4 stops, then exceeds limit. Optimization maximizes tourist coverage.',
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

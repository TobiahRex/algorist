import type { PatternProblem } from '../redux/types';

export const twoPointersProblem: PatternProblem[] = [
  {
    id: 'twoSumII',
    name: 'Two Sum II (Sorted Array)',
    difficulty: 'medium',
    description: 'Find two numbers that add up to a target in a sorted array',
    examples: [
      {
        input: { numbers: [2, 7, 11, 15], target: 9 },
        display: '[2,7,11,15], target=9',
        expected: [1, 2],
      },
      {
        input: { numbers: [2, 3, 4, 5, 6, 7, 8, 9, 10], target: 12 },
        display: '[2,3,4,5,6,7,8,9,10], target=12',
        expected: [2, 9],
      },
      {
        input: { numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], target: 13 },
        display: '[1,2,3,4,5,6,7,8,9,10], target=13',
        expected: [3, 10],
      },
    ],
    mnemonicEmoji: '🕴️',
    mnemonicPerson: 'Neo (The Matrix)',
    mnemonicObject: 'Two Bullets',
    mnemonicAction: 'Bending time to catch both',
    mnemonicStory:
      "Neo sees two bullets coming from opposite ends of the hallway. If their combined force is too weak to stop him, he leans right (L++). Too strong? He leans left (R--). When the forces balance perfectly, he catches them both — target found.",
    realWorldUses: [
      {
        icon: '📈',
        title: 'Order Book Matching Engine',
        description: 'In stock exchanges like NASDAQ, the order book maintains buy orders sorted ascending by price (buyers want cheapest) and sell orders sorted descending (sellers want highest). To match trades: start with L pointing to lowest buy offer and R pointing to highest sell offer. If buy_price + sell_price < minimum_spread, the trade isn\'t profitable for the exchange, so L++ to try a higher buy. If the spread is too wide, R-- to try a lower sell. When they match the target spread, execute the trade. This runs millions of times per second — O(n) vs O(n²) saves real money in latency.',
      },
      {
        icon: '🎯',
        title: 'A/B Test Cohort Selection',
        description: 'When setting up an A/B test, you have user segments sorted by size (e.g., [1K, 5K, 12K, 50K, 100K users]). You need exactly 75K users total split across two cohorts. L starts at smallest segment, R at largest. If segments[L] + segments[R] < 75K, you need more users so L++ to pick a larger small-segment. If sum > 75K, R-- to pick a smaller large-segment. This ensures statistically valid sample sizes without manual trial-and-error.',
      },
      {
        icon: '🔋',
        title: 'Renewable Energy System Design',
        description: 'Solar installers have panels sorted by wattage output and batteries sorted by storage capacity. For a home needing exactly 10kWh daily, find a panel+battery combo that sums to the requirement. L points to smallest panel, R to largest battery. If combined capacity < 10kWh, need bigger panel (L++). If > 10kWh (wasteful/expensive), try smaller battery (R--). This optimization happens thousands of times when generating quotes for customers.',
      },
      {
        icon: '📦',
        title: 'Warehouse Bin Packing',
        description: 'Fulfillment centers have items sorted by weight and bins sorted by capacity. When packing orders, find item+bin pairs where item_weight + packing_material = bin_capacity (no wasted space). L at lightest item, R at largest bin. If too much empty space (sum < target), L++ for heavier item. If won\'t fit, R-- for smaller bin. Amazon runs this algorithm millions of times daily to minimize shipping box waste.',
      },
      {
        icon: '🎮',
        title: 'Competitive Matchmaking',
        description: 'Games like League of Legends sort players by MMR (skill rating). For fair 1v1 matches, find two players whose ratings sum to a target (e.g., 3000 combined for "Gold" tier match). L at lowest-rated player in queue, R at highest. If MMR[L] + MMR[R] < 3000, the match is too easy for high player, so L++ to find stronger opponent. If > 3000, too hard for low player, R--. This runs every few seconds across millions of concurrent players.',
      },
    ],
  },
  {
    id: 'validPalindrome',
    name: 'Valid Palindrome',
    difficulty: 'easy',
    description: 'Check if a string is a palindrome considering only alphanumeric chars',
    examples: [
      {
        input: "A man, a plan, a canal: Panama",
        display: '"A man, a plan, a canal: Panama"',
        expected: true,
      },
      {
        input: 'race a car',
        display: '"race a car"',
        expected: false,
      },
      {
        input: '0P',
        display: '"0P"',
        expected: false,
      },
      {
        input: 'Was it a car or a cat I saw?',
        display: '"Was it a car or a cat I saw?"',
        expected: true,
      },
    ],
    mnemonicEmoji: '🕴️',
    mnemonicPerson: 'Mirror Guardian',
    mnemonicObject: 'Reversed Reflection',
    mnemonicAction: 'Checking if entrance equals exit',
    mnemonicStory:
      'A guardian stands at both ends of a mirror, checking if what enters from the left matches what exits on the right, ignoring noise along the way.',
    realWorldUses: [
      {
        icon: '🧬',
        title: 'DNA Restriction Site Detection',
        description: 'In molecular biology, restriction enzymes cut DNA at palindromic sequences (reading same on both strands, like GAATTC). Bioinformatics tools scan genomes (3 billion base pairs in humans) to find these sites. L starts at position 0, R at end of candidate sequence. Skip non-ACGT characters (annotations), compare base pairs moving inward. Finding these sites is critical for CRISPR gene editing — you need to know exactly where enzymes will cut.',
      },
      {
        icon: '🔐',
        title: 'Checksum Validation in Protocols',
        description: 'Some network protocols embed palindromic checksums for error detection (the check bytes read the same forwards and backwards). When a packet arrives, validate the checksum region using two pointers from ends. If any mismatch is found before pointers meet, the packet is corrupted and must be retransmitted. This runs on every single packet in protocols like certain industrial SCADA systems — O(1) space matters when running on embedded devices with 64KB RAM.',
      },
      {
        icon: '📝',
        title: 'URL/Slug Canonicalization',
        description: 'Content management systems sometimes use palindromic slugs for special routing (e.g., /radar/ triggers radar-mode, /stats/ is different). When a request comes in, the router checks if the path is a valid palindrome after stripping slashes and normalizing case. L and R start at path ends, skip non-alphanumeric, compare. This determines whether to route to a special handler or the normal content path. Runs on every HTTP request.',
      },
      {
        icon: '🎵',
        title: 'Musical Motif Analysis',
        description: 'In computational musicology, researchers analyze compositions for palindromic note sequences (like Bach\'s "crab canons" that sound the same forwards and backwards). Given a sequence of MIDI note numbers, check if it\'s palindromic. L at first note, R at last. This pattern detection helps identify compositional techniques and authenticate historical manuscripts — a piece claiming to be Bach should contain his known palindromic signatures.',
      },
      {
        icon: '🏗️',
        title: 'Structural Load Symmetry Verification',
        description: 'Civil engineering CAD software verifies that load-bearing structures are symmetric for stability. A bridge\'s support points are represented as an array of load values. For safety certification, verify the load pattern is palindromic (balanced). L at left-most support, R at right-most. If loads don\'t match moving inward, the structure needs redesign. This check runs during every simulation iteration before approving construction blueprints.',
      },
    ],
  },
  {
    id: 'containerWater',
    name: 'Container With Most Water',
    difficulty: 'medium',
    description: 'Find two lines that together with x-axis form a container with maximum area',
    examples: [
      {
        input: [1, 8, 6, 2, 5, 4, 8, 3, 7],
        display: '[1,8,6,2,5,4,8,3,7]',
        expected: 49,
      },
      {
        input: [1, 1],
        display: '[1,1]',
        expected: 1,
      },
      {
        input: [4, 3, 2, 1, 4],
        display: '[4,3,2,1,4]',
        expected: 16,
      },
    ],
    mnemonicEmoji: '🕴️',
    mnemonicPerson: 'Bucket Builder',
    mnemonicObject: 'Water Container',
    mnemonicAction: 'Maximizing trapped volume',
    mnemonicStory:
      'Two walls hold water between them. Move the shorter wall inward to find if a taller wall creates more volume. The final maximum is locked in memory.',
    realWorldUses: [
      {
        icon: '🏗️',
        title: 'Capacity Planning',
        description: 'Maximize storage between infrastructure limits',
      },
    ],
  },
  {
    id: 'threeSum',
    name: '3Sum',
    difficulty: 'medium',
    description: 'Find all unique triplets that sum to zero',
    examples: [
      {
        input: [-1, 0, 1, 2, -1, -4],
        display: '[-1,0,1,2,-1,-4]',
        expected: [[-1, -1, 2], [-1, 0, 1]],
      },
      {
        input: [-2, 0, 1, 1, 2],
        display: '[-2,0,1,1,2]',
        expected: [[-2, 0, 2], [-2, 1, 1]],
      },
    ],
    mnemonicEmoji: '👯',
    mnemonicPerson: 'Triangle Finder',
    mnemonicObject: 'Three Points',
    mnemonicAction: 'Finding balanced triplets',
    mnemonicStory:
      'One pointer acts as anchor. Two others hunt from edges. When sum is too large, right retreats. Too small, left advances. Found? Anchor moves on.',
    realWorldUses: [
      {
        icon: '📊',
        title: 'Balance Sheet',
        description: 'Find three accounts that net to zero',
      },
    ],
  },
];

export const twoPointersCodeExamples = {
  twoSumII: {
    verbose: `# Two Sum II - VERBOSE
# Find two numbers that sum to target in sorted array
# TYPE: Pointer Movement (inward)

class TwoSumII:
    def __init__(self, numbers, target):
        self.numbers = numbers      # sorted array
        self.target = target        # target sum
        self.left = 0               # LEFT pointer
        self.right = len(numbers) - 1  # RIGHT pointer
        self.result = None          # best pair found

    def get_current_sum(self):
        """Calculate sum of two pointers"""
        return self.numbers[self.left] + self.numbers[self.right]

    def get_distance(self):
        """Distance between pointers"""
        return self.right - self.left

    def solve(self):
        """Two pointer approach"""
        while self.left < self.right:
            current_sum = self.get_current_sum()

            if current_sum == self.target:
                # Found! Return indices (1-indexed)
                self.result = [self.left + 1, self.right + 1]
                return self.result
            elif current_sum < self.target:
                # Too small: increase sum by moving LEFT RIGHT
                self.left += 1
            else:
                # Too large: decrease sum by moving RIGHT LEFT
                self.right -= 1

        return self.result

# Usage
solver = TwoSumII([2,7,11,15], 9)
print(solver.solve())  # → [1,2]`,

    terse: `# Two Sum II - TERSE (Interview Ready)

def twoSum(numbers, target):
    left, right = 0, len(numbers) - 1

    while left < right:
        total = numbers[left] + numbers[right]
        if total == target:
            return [left + 1, right + 1]
        elif total < target:
            left += 1
        else:
            right -= 1

    return []`,
  },

  validPalindrome: {
    verbose: `# Valid Palindrome - VERBOSE
# Check if string is palindrome (alphanumeric only)

class PalindromeChecker:
    def __init__(self, s):
        self.s = s
        self.clean = self._clean_string()
        self.left = 0
        self.right = len(self.clean) - 1

    def _clean_string(self):
        """Keep only alphanumeric, convert to lowercase"""
        return ''.join(c.lower() for c in self.s if c.isalnum())

    def is_match(self):
        """Check if left and right chars match"""
        return self.clean[self.left] == self.clean[self.right]

    def check(self):
        """Two pointer palindrome check"""
        while self.left < self.right:
            if not self.is_match():
                return False  # Mismatch found
            self.left += 1
            self.right -= 1
        return True  # Complete match

# Usage
checker = PalindromeChecker("A man, a plan, a canal: Panama")
print(checker.check())  # → True`,

    terse: `# Valid Palindrome - TERSE

def isPalindrome(s):
    clean = ''.join(c.lower() for c in s if c.isalnum())
    left, right = 0, len(clean) - 1

    while left < right:
        if clean[left] != clean[right]:
            return False
        left += 1
        right -= 1

    return True`,
  },

  containerWater: {
    verbose: `# Container With Most Water - VERBOSE

class MaxContainer:
    def __init__(self, height):
        self.height = height
        self.left = 0
        self.right = len(height) - 1
        self.max_area = 0

    def get_width(self):
        """Distance between pointers"""
        return self.right - self.left

    def get_container_height(self):
        """Min of two wall heights"""
        return min(self.height[self.left], self.height[self.right])

    def get_area(self):
        """Area = width × height"""
        return self.get_width() * self.get_container_height()

    def solve(self):
        """Greedy: eliminate shorter wall each time"""
        while self.left < self.right:
            area = self.get_area()
            self.max_area = max(self.max_area, area)

            # Move the pointer of shorter wall inward
            if self.height[self.left] < self.height[self.right]:
                self.left += 1
            else:
                self.right -= 1

        return self.max_area

# Usage
print(MaxContainer([1,8,6,2,5,4,8,3,7]).solve())  # → 49`,

    terse: `# Container With Most Water - TERSE

def maxArea(height):
    left, right = 0, len(height) - 1
    max_area = 0

    while left < right:
        max_area = max(max_area, (right - left) * min(height[left], height[right]))
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1

    return max_area`,
  },

  threeSum: {
    verbose: `# 3Sum - VERBOSE
# Find all unique triplets that sum to zero

class ThreeSum:
    def __init__(self, nums):
        self.nums = sorted(nums)
        self.result = []

    def solve(self):
        """Anchor + Two Pointer approach"""
        n = len(self.nums)

        for anchor in range(n - 2):
            # Skip duplicate anchors
            if anchor > 0 and self.nums[anchor] == self.nums[anchor - 1]:
                continue

            # If smallest triplet sum > 0, no more solutions
            if self.nums[anchor] + self.nums[anchor + 1] + self.nums[anchor + 2] > 0:
                break

            # Skip if largest triplet sum < 0
            if self.nums[anchor] + self.nums[-2] + self.nums[-1] < 0:
                continue

            self._two_sum_for_target(anchor)

        return self.result

    def _two_sum_for_target(self, anchor):
        """Find two numbers that sum to -nums[anchor]"""
        target = -self.nums[anchor]
        left = anchor + 1
        right = len(self.nums) - 1

        while left < right:
            current_sum = self.nums[left] + self.nums[right]

            if current_sum == target:
                self.result.append([self.nums[anchor], self.nums[left], self.nums[right]])
                # Skip duplicates
                while left < right and self.nums[left] == self.nums[left + 1]:
                    left += 1
                while left < right and self.nums[right] == self.nums[right - 1]:
                    right -= 1
                left += 1
                right -= 1
            elif current_sum < target:
                left += 1
            else:
                right -= 1

# Usage
print(ThreeSum([-1, 0, 1, 2, -1, -4]).solve())  # → [[-1,-1,2], [-1,0,1]]`,

    terse: `# 3Sum - TERSE

def threeSum(nums):
    nums.sort()
    result = []

    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i - 1]:
            continue

        target = -nums[i]
        left, right = i + 1, len(nums) - 1

        while left < right:
            s = nums[left] + nums[right]
            if s == target:
                result.append([nums[i], nums[left], nums[right]])
                while left < right and nums[left] == nums[left + 1]:
                    left += 1
                while left < right and nums[right] == nums[right - 1]:
                    right -= 1
                left += 1
                right -= 1
            elif s < target:
                left += 1
            else:
                right -= 1

    return result`,
  },
};

export const twoPointersLeetCode = [
  {
    id: 1,
    title: 'Two Sum',
    difficulty: 'Easy' as const,
    url: 'https://leetcode.com/problems/two-sum/',
    keyTakeaway: 'Hash map for O(n) lookup, but sorted array two pointers also works',
    patternFocus: 'Foundation: Basic pairing in unsorted arrays with hash maps',
  },
  {
    id: 11,
    title: 'Container With Most Water',
    difficulty: 'Medium' as const,
    url: 'https://leetcode.com/problems/container-with-most-water/',
    keyTakeaway: 'Move inward from edges, greedy choice of moving shorter pointer',
    patternFocus: 'Core: Opposite direction pointers, skip suboptimal states',
  },
  {
    id: 15,
    title: '3Sum',
    difficulty: 'Medium' as const,
    url: 'https://leetcode.com/problems/3sum/',
    keyTakeaway: 'Fix one element, two pointers for remaining pair, handle duplicates',
    patternFocus: 'Extension: Nested loop with two pointers for multi-target',
  },
  {
    id: 16,
    title: '3Sum Closest',
    difficulty: 'Medium' as const,
    url: 'https://leetcode.com/problems/3sum-closest/',
    keyTakeaway: 'Two pointers track closest sum, adjust pointers based on gap',
    patternFocus: 'Variant: Maximize/minimize metric with two pointers',
  },
  {
    id: 167,
    title: 'Two Sum II - Input Array Is Sorted',
    difficulty: 'Easy' as const,
    url: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/',
    keyTakeaway: 'Classic sorted array + two pointers pattern, 1-indexed output',
    patternFocus: 'Practice: Direct two pointers application',
  },
  {
    id: 209,
    title: 'Minimum Size Subarray Sum',
    difficulty: 'Medium' as const,
    url: 'https://leetcode.com/problems/minimum-size-subarray-sum/',
    keyTakeaway: 'Two pointers/sliding window for contiguous elements',
    patternFocus: 'Hybrid: Looks like sliding window, uses two pointer logic',
  },
  {
    id: 283,
    title: 'Move Zeroes',
    difficulty: 'Easy' as const,
    url: 'https://leetcode.com/problems/move-zeroes/',
    keyTakeaway: 'Same direction pointers for in-place partitioning',
    patternFocus: 'Core: Same-direction partition with swaps',
  },
  {
    id: 557,
    title: 'Reverse Words in a String III',
    difficulty: 'Easy' as const,
    url: 'https://leetcode.com/problems/reverse-words-in-a-string-iii/',
    keyTakeaway: 'Two pointers within each word for reversal',
    patternFocus: 'Application: Reverse pattern with character arrays',
  },
  {
    id: 925,
    title: 'Long Pressed Name',
    difficulty: 'Easy' as const,
    url: 'https://leetcode.com/problems/long-pressed-name/',
    keyTakeaway: 'Two pointers on different strings, handle repeats',
    patternFocus: 'Parallel tracking: Two pointers on two arrays',
  },
];

export const twoPointersCheatSheet = {
  timeComplexity: 'O(n) or O(n²) depending on nesting',
  spaceComplexity: 'O(1) for in-place, O(n) if sorting needed',
  keyPoints: [
    {
      title: 'Pattern Recognition',
      content: [
        'Sorted array + target value → opposite direction',
        'In-place partition → same direction',
        'Two sequences → parallel tracking',
      ],
    },
    {
      title: 'Pointer Movement',
      content: [
        'Opposite: L++ or R-- based on comparison',
        'Same: Both advance when condition met',
        'Skip duplicates to avoid redundant work',
      ],
    },
    {
      title: 'Common Mistakes',
      content: [
        'Forgetting to sort unsorted arrays first',
        'Not handling duplicate values (off-by-one)',
        'Comparing wrong indices in opposite move',
      ],
    },
  ],
  whenToUse: [
    'Array is sorted or can be sorted',
    'Need to find pairs/triplets with specific property',
    'In-place modification requirement',
    'Need O(1) space complexity',
    'Linear pass through array sufficient',
  ],
  commonMistakes: [
    'Moving pointer in wrong direction on comparison fail',
    'Not updating result after finding match',
    'Assuming all elements are positive/non-negative',
    'Off-by-one errors with pointer boundaries',
    'Duplicate handling - skipping duplicates only on outer loop',
  ],
};

export const twoPointersSynthesizedCategory = {
  icon: '👆',
  title: 'Optimal Pairing & Matching',
  coreInsight: 'Across all these domains, the core problem is identical: given two sorted collections (or one sorted collection searched from both ends), find a pair that satisfies a constraint. The "trick" is recognizing that sortedness lets you eliminate entire regions of the search space with each comparison. Move the pointer pointing to the larger element (L++) if you need bigger values; move the one pointing to the smaller element (R--) if you need smaller ones. This eliminates entire regions of the search space with each step.',
  commonAcross: [
    'Trading (match buyers/sellers)',
    'Analytics (pair cohorts)',
    'Energy (size systems)',
    'Logistics (pack bins)',
    'Gaming (balance players)',
    'Warehouse ops (item-bin pairs)',
    'Stock matching (order books)',
    'Supply chain (supplier-demand pairs)',
  ],
};

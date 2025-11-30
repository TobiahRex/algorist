import type { PatternProblem } from '../redux/types';

export const binarySearchProblems: PatternProblem[] = [
  {
    id: 'basicBinarySearch',
    name: 'Basic Binary Search',
    difficulty: 'easy',
    description: 'Find target value in sorted array, return index or -1',
    examples: [
      {
        input: { nums: [-1, 0, 3, 5, 9, 12, 15, 18, 21, 25, 28, 31], target: 9 },
        display: 'Find 9 in [-1,0,3,5,9,12,15,18,21,25,28,31]',
        expected: 4,
      },
      {
        input: { nums: [1, 3, 5, 6, 8, 10, 13, 14, 15, 20], target: 6 },
        display: 'Find 6 in [1,3,5,6,8,10,13,14,15,20]',
        expected: 3,
      },
      {
        input: { nums: [1, 3, 5, 6, 8, 10, 13, 14, 15, 20], target: 0 },
        display: 'Find 0 (not found)',
        expected: -1,
      },
      {
        input: { nums: Array.from({ length: 100 }, (_, i) => i * 2), target: 150 },
        display: 'Large sorted array, find 150',
        expected: 75,
      },
    ],
    mnemonicEmoji: '📚',
    mnemonicPerson: 'Dictionary Hunter',
    mnemonicObject: 'Sorted Pages',
    mnemonicAction: 'Halving search space repeatedly',
    mnemonicStory:
      'Open dictionary in middle. Is target before or after? Discard half. Repeat. Find in log(n) steps instead of n. Each comparison halves possibilities.',
    realWorldUses: [
      {
        icon: '📖',
        title: 'Dictionary Search',
        description: 'Find words in sorted dictionary in milliseconds',
      },
      {
        icon: '🎮',
        title: 'Game Asset Loading',
        description: 'Binary search asset ID mappings for O(log n) lookups',
      },
    ],
  },
  {
    id: 'searchRotatedArray',
    name: 'Search in Rotated Sorted Array',
    difficulty: 'medium',
    description: 'Find target in rotated sorted array with O(log n)',
    examples: [
      {
        input: { nums: [4, 5, 6, 7, 0, 1, 2], target: 0 },
        display: '[4,5,6,7,0,1,2], find 0 (rotation at 0)',
        expected: 4,
      },
      {
        input: { nums: [4, 5, 6, 7, 0, 1, 2], target: 3 },
        display: '[4,5,6,7,0,1,2], find 3 (not found)',
        expected: -1,
      },
      {
        input: { nums: [1, 3, 1, 1, 1], target: 3 },
        display: '[1,3,1,1,1], find 3 (with duplicates)',
        expected: 1,
      },
    ],
    mnemonicEmoji: '🌀',
    mnemonicPerson: 'Rotation Detective',
    mnemonicObject: 'Broken Sorted Array',
    mnemonicAction: 'Finding which half is still sorted',
    mnemonicStory:
      'Array is sorted but has one rotation point. Determine which half is "pure sorted", target must be there or in other half. Keep halving until found.',
    realWorldUses: [
      {
        icon: '♻️',
        title: 'Circular Buffers',
        description: 'Search in circular buffer data structures efficiently',
      },
    ],
  },
  {
    id: 'firstLastPosition',
    name: 'First and Last Position of Element',
    difficulty: 'medium',
    description: 'Find first and last index of target in sorted array',
    examples: [
      {
        input: { nums: [5, 7, 7, 8, 8, 10], target: 8 },
        display: '[5,7,7,8,8,10], find 8 (range [3,4])',
        expected: [3, 4],
      },
      {
        input: { nums: [5, 7, 7, 8, 8, 10], target: 6 },
        display: '[5,7,7,8,8,10], find 6 (not found)',
        expected: [-1, -1],
      },
      {
        input: { nums: [1, 1, 1, 1, 1, 1, 1, 1, 2], target: 1 },
        display: '[1,1,1,1,1,1,1,1,2], find 1 (range [0,7])',
        expected: [0, 7],
      },
    ],
    mnemonicEmoji: '📍',
    mnemonicPerson: 'Boundary Mapper',
    mnemonicObject: 'First & Last Positions',
    mnemonicAction: 'Binary searching for edges',
    mnemonicStory:
      'Use binary search twice: find leftmost occurrence, then rightmost. Each search takes O(log n). Get boundaries in total O(log n) time.',
    realWorldUses: [
      {
        icon: '📊',
        title: 'Range Queries',
        description: 'Database range queries for date/price ranges',
      },
    ],
  },
  {
    id: 'searchInsertPosition',
    name: 'Search Insert Position',
    difficulty: 'easy',
    description: 'Find index where target would be inserted to keep array sorted',
    examples: [
      {
        input: { nums: [1, 3, 5, 6], target: 5 },
        display: '[1,3,5,6], insert 5 → index 2',
        expected: 2,
      },
      {
        input: { nums: [1, 3, 5, 6], target: 2 },
        display: '[1,3,5,6], insert 2 → index 1',
        expected: 1,
      },
      {
        input: { nums: [1, 3, 5, 6], target: 7 },
        display: '[1,3,5,6], insert 7 → index 4 (end)',
        expected: 4,
      },
      {
        input: { nums: [1, 3, 5, 6], target: 0 },
        display: '[1,3,5,6], insert 0 → index 0 (beginning)',
        expected: 0,
      },
    ],
    mnemonicEmoji: '📌',
    mnemonicPerson: 'Insertion Point Finder',
    mnemonicObject: 'Correct Position',
    mnemonicAction: 'Finding insertion spot',
    mnemonicStory:
      'Binary search tells you where target IS. If not found, search stops at insertion point. The boundary itself is the answer.',
    realWorldUses: [
      {
        icon: '📝',
        title: 'Sorted List Insert',
        description: 'Insert items into sorted collections maintaining order',
      },
    ],
  },
];

export const binarySearchCodeExamples = {
  basicBinarySearch: {
    verbose: `# Basic Binary Search - VERBOSE

class BinarySearcher:
    def __init__(self, nums, target):
        self.nums = nums
        self.target = target
        self.left = 0
        self.right = len(nums) - 1
        self.comparisons = 0

    def get_mid(self):
        """Get middle index (avoids overflow)"""
        return self.left + (self.right - self.left) // 2

    def search(self):
        """Binary search: O(log n)"""
        while self.left <= self.right:
            mid = self.get_mid()
            self.comparisons += 1

            if self.nums[mid] == self.target:
                return mid  # Found!

            elif self.nums[mid] < self.target:
                # Target in right half
                self.left = mid + 1

            else:
                # Target in left half
                self.right = mid - 1

        return -1  # Not found

# Usage
searcher = BinarySearcher([-1,0,3,5,9,12,15], 9)
idx = searcher.search()
print(f"Found at index: {idx}")  # → 4`,

    terse: `# Basic Binary Search - TERSE

def search(nums, target):
    left, right = 0, len(nums) - 1

    while left <= right:
        mid = left + (right - left) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1`,
  },

  searchRotatedArray: {
    verbose: `# Search in Rotated Sorted Array - VERBOSE

class RotatedArraySearcher:
    def __init__(self, nums, target):
        self.nums = nums
        self.target = target

    def is_left_sorted(self, mid):
        """Check if left half is sorted"""
        return self.nums[0] <= self.nums[mid]

    def is_target_in_left(self, mid):
        """Is target in the sorted left half?"""
        return self.nums[0] <= self.target < self.nums[mid]

    def search(self):
        """Search in rotated array"""
        left, right = 0, len(self.nums) - 1

        while left <= right:
            mid = left + (right - left) // 2

            if self.nums[mid] == self.target:
                return mid

            # Determine which half is sorted
            if self.is_left_sorted(mid):
                # Left half is sorted
                if self.is_target_in_left(mid):
                    right = mid - 1  # Target in left
                else:
                    left = mid + 1   # Target in right
            else:
                # Right half is sorted
                if self.nums[mid] < self.target <= self.nums[right]:
                    left = mid + 1   # Target in right
                else:
                    right = mid - 1  # Target in left

        return -1

# Usage
searcher = RotatedArraySearcher([4,5,6,7,0,1,2], 0)
print(searcher.search())  # → 4`,

    terse: `# Search in Rotated Sorted Array - TERSE

def search(nums, target):
    left, right = 0, len(nums) - 1

    while left <= right:
        mid = left + (right - left) // 2
        if nums[mid] == target:
            return mid

        if nums[0] <= nums[mid]:  # Left is sorted
            if nums[0] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:  # Right is sorted
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1

    return -1`,
  },

  firstLastPosition: {
    verbose: `# First and Last Position - VERBOSE

class FirstLastFinder:
    def __init__(self, nums, target):
        self.nums = nums
        self.target = target

    def find_first(self):
        """Find leftmost occurrence"""
        left, right = 0, len(self.nums) - 1
        result = -1

        while left <= right:
            mid = left + (right - left) // 2
            if self.nums[mid] == self.target:
                result = mid
                right = mid - 1  # Keep searching left
            elif self.nums[mid] < self.target:
                left = mid + 1
            else:
                right = mid - 1

        return result

    def find_last(self):
        """Find rightmost occurrence"""
        left, right = 0, len(self.nums) - 1
        result = -1

        while left <= right:
            mid = left + (right - left) // 2
            if self.nums[mid] == self.target:
                result = mid
                left = mid + 1   # Keep searching right
            elif self.nums[mid] < self.target:
                left = mid + 1
            else:
                right = mid - 1

        return result

    def find_range(self):
        """Find [first, last] in O(2*log n)"""
        first = self.find_first()
        if first == -1:
            return [-1, -1]
        last = self.find_last()
        return [first, last]

# Usage
finder = FirstLastFinder([5,7,7,8,8,10], 8)
print(finder.find_range())  # → [3,4]`,

    terse: `# First and Last Position - TERSE

def searchRange(nums, target):
    def find_bound(left_bound):
        left, right = 0, len(nums) - 1
        idx = -1
        while left <= right:
            mid = left + (right - left) // 2
            if nums[mid] == target:
                idx = mid
                if left_bound:
                    right = mid - 1
                else:
                    left = mid + 1
            elif nums[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
        return idx

    first = find_bound(True)
    if first == -1:
        return [-1, -1]
    return [first, find_bound(False)]`,
  },

  searchInsertPosition: {
    verbose: `# Search Insert Position - VERBOSE

class InsertPositionFinder:
    def __init__(self, nums, target):
        self.nums = nums
        self.target = target

    def search_position(self):
        """Find insertion position"""
        left, right = 0, len(self.nums)

        while left < right:
            mid = left + (right - left) // 2

            if self.nums[mid] < self.target:
                left = mid + 1
            else:
                right = mid

        return left

# Usage
finder = InsertPositionFinder([1,3,5,6], 5)
print(finder.search_position())  # → 2 (already at 2)

finder2 = InsertPositionFinder([1,3,5,6], 2)
print(finder2.search_position())  # → 1 (insert at 1)`,

    terse: `# Search Insert Position - TERSE

def searchInsert(nums, target):
    left, right = 0, len(nums)
    while left < right:
        mid = left + (right - left) // 2
        if nums[mid] < target:
            left = mid + 1
        else:
            right = mid
    return left`,
  },
};

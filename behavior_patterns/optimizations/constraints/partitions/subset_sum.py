"""
Subset Sum Problem - Foundation for Partition Problems

Mental Model: "Can I select some coins to make exact change?"

Problem: Given array of numbers and target sum, can we find a subset that sums to target?

Pattern Recognition:
- "subset with sum equals target" → Subset Sum (DP)
- Foundation for Equal Sum Partition, Knapsack, Coin Change
- Decision problem (yes/no), not optimization

Structure:
- DP table: dp[sum] = can we make this sum?
- Transition: dp[sum] = dp[sum] OR dp[sum - num] for each num
- Space optimization: iterate sums backwards (avoid reusing same element)

Behavior:
- Start with dp[0] = True (can make 0 with empty subset)
- For each number, update all reachable sums
- Iterate backwards to avoid counting same element twice
"""

def subset_sum_dp(nums, target):
    """
    DP approach: O(n * target) time, O(target) space

    Mental trace for nums=[3,34,4,12,5,2], target=9:
    - Start: dp[0] = True
    - Add 3: dp[3] = True
    - Add 34: dp[37], dp[34] = True (but > target)
    - Add 4: dp[7], dp[4] = True
    - Add 12: too large alone
    - Add 5: dp[9] = True! (4+5=9)
    """
    if target == 0:
        return True
    if not nums or target < 0:
        return False

    # dp[i] = can we make sum i?
    dp = [False] * (target + 1)
    dp[0] = True  # base case: empty subset sums to 0

    for num in nums:
        # Iterate backwards to avoid reusing same element
        # Forward would allow dp[2*num] = dp[num] + num (using same num twice)
        for sum_val in range(target, num - 1, -1):
            if dp[sum_val - num]:
                dp[sum_val] = True

    return dp[target]


def subset_sum_backtracking(nums, target):
    """
    Backtracking approach: Explores all 2^n subsets
    Useful when you need to return actual subset, not just yes/no

    Pruning optimizations:
    1. Sort descending → fail fast with large numbers
    2. Skip if current sum exceeds target (bound)
    3. Skip duplicate consecutive numbers (symmetry breaking)
    """
    nums.sort(reverse=True)

    def backtrack(index, current_sum, path):
        # Base cases
        if current_sum == target:
            return path[:]  # Found valid subset
        if index >= len(nums) or current_sum > target:
            return None  # Exceeded bounds

        # Branch 1: Include nums[index]
        result = backtrack(index + 1, current_sum + nums[index], path + [nums[index]])
        if result:
            return result

        # Branch 2: Exclude nums[index]
        # Skip duplicates to avoid redundant search
        while index + 1 < len(nums) and nums[index] == nums[index + 1]:
            index += 1

        return backtrack(index + 1, current_sum, path)

    return backtrack(0, 0, [])


def subset_sum_memo(nums, target):
    """
    Memoized recursion: Combines clarity of recursion with DP efficiency

    State: (index, remaining_target)
    Recurrence: include nums[i] OR exclude nums[i]
    """
    memo = {}

    def dp(index, remaining):
        if remaining == 0:
            return True
        if index >= len(nums) or remaining < 0:
            return False

        if (index, remaining) in memo:
            return memo[(index, remaining)]

        # Include current number OR exclude it
        result = dp(index + 1, remaining - nums[index]) or dp(index + 1, remaining)
        memo[(index, remaining)] = result
        return result

    return dp(0, target)


class SubsetSumSolver:
    """
    Object-oriented interface with multiple solution strategies
    """
    def __init__(self, nums):
        self.nums = nums

    def can_make_sum(self, target, method='dp'):
        """
        Unified interface for different approaches

        method='dp': Fast, O(n*target) time
        method='backtrack': Returns actual subset
        method='memo': Recursive with memoization
        """
        if method == 'dp':
            return subset_sum_dp(self.nums, target)
        elif method == 'backtrack':
            return subset_sum_backtracking(self.nums, target)
        elif method == 'memo':
            return subset_sum_memo(self.nums, target)
        else:
            raise ValueError(f"Unknown method: {method}")

    def find_all_subsets_with_sum(self, target):
        """
        Find ALL subsets that sum to target (not just one)
        Exponential but sometimes needed
        """
        results = []

        def backtrack(index, current_sum, path):
            if current_sum == target:
                results.append(path[:])
                return
            if index >= len(self.nums) or current_sum > target:
                return

            # Include nums[index]
            backtrack(index + 1, current_sum + self.nums[index], path + [self.nums[index]])

            # Exclude nums[index]
            backtrack(index + 1, current_sum, path)

        backtrack(0, 0, [])
        return results


# Real-world application
def can_split_team_tasks(task_hours, target_hours_per_person):
    """
    Team management: Can one person take tasks that sum to exactly target hours?

    Example: task_hours = [2, 3, 5, 1, 4]
    Can someone work exactly 9 hours? (3+5+1 = 9, yes!)
    """
    return subset_sum_dp(task_hours, target_hours_per_person)


if __name__ == '__main__':
    # Test cases
    nums = [3, 34, 4, 12, 5, 2]
    target = 9

    print(f"Array: {nums}, Target: {target}")
    print(f"DP approach: {subset_sum_dp(nums, target)}")  # True (4+5=9)
    print(f"Backtracking: {subset_sum_backtracking(nums, target)}")  # [5, 4]
    print(f"Memoization: {subset_sum_memo(nums, target)}")  # True

    solver = SubsetSumSolver(nums)
    print(f"All subsets: {solver.find_all_subsets_with_sum(target)}")  # [[5, 4]]

    # Edge cases
    print(f"\nEdge case - target=0: {subset_sum_dp([1,2,3], 0)}")  # True (empty subset)
    print(f"Edge case - impossible: {subset_sum_dp([2,4,6], 5)}")  # False

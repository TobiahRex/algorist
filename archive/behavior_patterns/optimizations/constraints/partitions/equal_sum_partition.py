"""
Equal Sum Partition - Split array into two groups with equal sum

Mental Model: "Dividing inheritance fairly between two siblings"

Problem: Given array, can we partition it into two subsets with equal sum?

Pattern Recognition:
- "split into two equal groups" → Equal Sum Partition
- "balanced partition" → Check if sum is even, then find subset with sum/2
- Reduces to Subset Sum problem!

Key Insight:
If total sum is odd → impossible (can't split odd number equally)
If total sum is even → find subset with sum = total/2
  If such subset exists, remaining elements also sum to total/2 (equal partition!)

Structure:
- DP table: dp[sum] = can we make this sum from array?
- Target: total_sum / 2
- If dp[target] = True, then equal partition exists

Real-World:
- Load balancing across 2 servers
- Fair task distribution in pair programming
- Splitting costs equally
"""

def can_partition_equal_sum(nums):
    """
    DP approach: O(n * sum/2) time, O(sum/2) space

    Mental trace for nums=[1,5,11,5]:
    total = 22, target = 11
    - dp[0] = True
    - Add 1: dp[1] = True
    - Add 5: dp[6], dp[5] = True
    - Add 11: dp[17], dp[16], dp[12], dp[11] = True ✓
    - Result: True (partition = [1,5,5] and [11])
    """
    total = sum(nums)

    # Odd sum → impossible to split equally
    if total % 2 != 0:
        return False

    target = total // 2

    # Subset sum problem: can we make target?
    dp = [False] * (target + 1)
    dp[0] = True

    for num in nums:
        # Iterate backwards to avoid reusing same element
        for s in range(target, num - 1, -1):
            dp[s] = dp[s] or dp[s - num]

    return dp[target]


def partition_equal_sum_with_sets(nums):
    """
    Return the actual two partitions, not just yes/no

    Uses backtracking to find one valid split
    """
    total = sum(nums)
    if total % 2 != 0:
        return None  # Impossible

    target = total // 2
    nums.sort(reverse=True)  # Greedy heuristic: try large numbers first

    def backtrack(index, subset1_sum, subset1):
        # Found valid partition
        if subset1_sum == target:
            subset2 = [nums[i] for i in range(len(nums)) if i not in subset1]
            return (sorted([nums[i] for i in subset1]), sorted(subset2))

        # Exceeded target or exhausted elements
        if subset1_sum > target or index >= len(nums):
            return None

        # Branch 1: Include nums[index] in subset1
        result = backtrack(index + 1, subset1_sum + nums[index], subset1 + [index])
        if result:
            return result

        # Branch 2: Exclude nums[index] from subset1 (goes to subset2)
        return backtrack(index + 1, subset1_sum, subset1)

    return backtrack(0, 0, [])


def can_partition_bitset(nums):
    """
    Bitset optimization: Extremely fast for small sums (< 10000)

    Idea: Use bit shifting to track all reachable sums
    dp is a bitmask where bit i is set if sum i is reachable

    Example: dp = 0b1001 means sums 0 and 3 are reachable
    Adding number 5: dp |= (dp << 5) → also makes sums 5 and 8 reachable
    """
    total = sum(nums)
    if total % 2 != 0:
        return False

    target = total // 2

    # Bitmask: bit i is 1 if sum i is reachable
    dp = 1  # Initially only sum 0 is reachable (bit 0 set)

    for num in nums:
        # Shift existing reachable sums by num
        # OR with previous to merge new reachable sums
        dp |= (dp << num)

    # Check if bit 'target' is set
    return bool(dp & (1 << target))


class EqualPartitionSolver:
    """
    Multiple solution strategies for equal partition problem
    """
    def __init__(self, nums):
        self.nums = nums
        self.total = sum(nums)

    def can_partition(self, method='dp'):
        """
        method='dp': Standard DP (recommended)
        method='bitset': Fast for small sums
        method='backtrack': Returns actual partitions
        """
        if method == 'dp':
            return can_partition_equal_sum(self.nums)
        elif method == 'bitset':
            return can_partition_bitset(self.nums)
        elif method == 'backtrack':
            return partition_equal_sum_with_sets(self.nums) is not None

    def get_partitions(self):
        """Return the actual two equal-sum partitions"""
        return partition_equal_sum_with_sets(self.nums)

    def partition_difference(self):
        """
        Related problem: Minimize difference between two partitions

        If equal partition exists, difference = 0
        Otherwise, find subset closest to total/2, difference = total - 2*best_sum
        """
        target = self.total // 2
        dp = [False] * (target + 1)
        dp[0] = True

        for num in self.nums:
            for s in range(target, num - 1, -1):
                dp[s] = dp[s] or dp[s - num]

        # Find largest sum ≤ target that's reachable
        for s in range(target, -1, -1):
            if dp[s]:
                return self.total - 2 * s  # Difference between partitions

        return self.total  # All in one partition, other empty


# Real-world applications
def can_balance_server_load(task_sizes):
    """
    Load balancing: Can we split tasks equally across 2 servers?

    Example: task_sizes = [10, 20, 30, 40]
    Total = 100, target per server = 50
    Server 1: [10, 40] = 50
    Server 2: [20, 30] = 50
    Balanced!
    """
    return can_partition_equal_sum(task_sizes)


def split_team_fairly(skill_levels):
    """
    Team formation: Split players into two teams with equal total skill

    Returns None if impossible, otherwise returns (team1, team2)
    """
    solver = EqualPartitionSolver(skill_levels)
    return solver.get_partitions()


if __name__ == '__main__':
    # Test cases
    test_cases = [
        ([1, 5, 11, 5], True, "Standard case"),
        ([1, 2, 3, 5], False, "Odd sum"),
        ([1, 2, 5], False, "No valid partition"),
        ([2, 2, 2, 2], True, "Multiple solutions"),
        ([100], False, "Single element"),
    ]

    for nums, expected, description in test_cases:
        result = can_partition_equal_sum(nums)
        status = "✓" if result == expected else "✗"
        print(f"{status} {description}: {nums} → {result}")

    # Show actual partitions
    print("\nActual partitions:")
    nums = [1, 5, 11, 5]
    solver = EqualPartitionSolver(nums)
    print(f"Array: {nums}")
    print(f"Partitions: {solver.get_partitions()}")
    print(f"Min difference: {solver.partition_difference()}")

    # Impossible case
    nums = [1, 2, 3, 5]
    solver = EqualPartitionSolver(nums)
    print(f"\nArray: {nums}")
    print(f"Partitions: {solver.get_partitions()}")
    print(f"Min difference: {solver.partition_difference()}")  # Closest to equal

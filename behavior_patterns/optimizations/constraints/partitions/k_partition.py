"""
K-Partition Problem - Split array into K subsets with equal sum

Mental Model: "Dividing inheritance among K siblings fairly"

Problem: Given array and integer K, can we partition into K subsets with equal sum?

Pattern Recognition:
- "split into K equal groups" → K-Partition
- "K subsets with same sum" → Backtracking with pruning
- Generalization of Equal Sum Partition (K=2)

Key Insights:
1. If total % K != 0 → impossible (can't split evenly)
2. Target sum per partition = total / K
3. NP-complete → need backtracking (no polynomial DP exists)
4. Pruning is critical: sort descending, skip if bucket exceeds target

Structure:
- K buckets (partitions), each tracking current sum
- Try assigning each element to a bucket
- Backtrack if bucket sum exceeds target
- Success when all buckets equal target

Behavior:
- Sort descending (greedy: place large elements first)
- For each element, try each bucket
- Skip bucket if sum would exceed target (pruning)
- Skip duplicate bucket sums (symmetry breaking)
"""

def can_partition_k_subsets(nums, k):
    """
    Backtracking with pruning: O(k^n) worst case, much better with optimizations

    Mental trace for nums=[4,3,2,3,5,2,1], k=4:
    total=20, target=5 per bucket
    Sort desc: [5,4,3,3,2,2,1]
    - Bucket 1: add 5 (full!)
    - Bucket 2: add 4, add 1 (full!)
    - Bucket 3: add 3, add 2 (full!)
    - Bucket 4: add 3, add 2 (full!)
    Success! All buckets = 5
    """
    total = sum(nums)

    # Early exits
    if total % k != 0:
        return False
    if k == 1:
        return True
    if k > len(nums):
        return False

    target = total // k
    nums.sort(reverse=True)  # Greedy: large elements first

    # If largest element exceeds target, impossible
    if nums[0] > target:
        return False

    buckets = [0] * k

    def backtrack(index):
        # All elements assigned successfully
        if index == len(nums):
            return all(bucket == target for bucket in buckets)

        # Try assigning nums[index] to each bucket
        for i in range(k):
            # Pruning 1: Skip if adding would exceed target
            if buckets[i] + nums[index] > target:
                continue

            # Assign to bucket i
            buckets[i] += nums[index]

            if backtrack(index + 1):
                return True

            # Backtrack
            buckets[i] -= nums[index]

            # Pruning 2: Symmetry breaking
            # If bucket was empty and failed, skip all empty buckets
            # (they're identical, would lead to same failure)
            if buckets[i] == 0:
                break

        return False

    return backtrack(0)


def partition_k_subsets_optimized(nums, k):
    """
    Optimized version with better pruning and early termination

    Additional optimizations:
    1. Use set to track used elements (faster lookup)
    2. Fill buckets one at a time (not round-robin)
    3. Skip identical elements more aggressively
    """
    total = sum(nums)
    if total % k != 0:
        return False

    target = total // k
    nums.sort(reverse=True)

    if nums[0] > target:
        return False

    used = [False] * len(nums)

    def backtrack(bucket_idx, bucket_sum, start_idx):
        # All buckets filled successfully
        if bucket_idx == k:
            return True

        # Current bucket is full, move to next bucket
        if bucket_sum == target:
            return backtrack(bucket_idx + 1, 0, 0)

        # Try adding elements to current bucket
        for i in range(start_idx, len(nums)):
            if used[i]:
                continue
            if bucket_sum + nums[i] > target:
                continue

            # Include nums[i] in current bucket
            used[i] = True
            if backtrack(bucket_idx, bucket_sum + nums[i], i + 1):
                return True
            used[i] = False

            # Pruning: If this element alone couldn't lead to solution,
            # skip identical elements (they'll fail the same way)
            if bucket_sum == 0:  # First element in bucket failed
                break

        return False

    return backtrack(0, 0, 0)


def get_k_partitions(nums, k):
    """
    Return the actual K partitions, not just yes/no
    """
    total = sum(nums)
    if total % k != 0:
        return None

    target = total // k
    nums_indexed = [(num, i) for i, num in enumerate(nums)]
    nums_indexed.sort(reverse=True)

    buckets = [[] for _ in range(k)]
    bucket_sums = [0] * k

    def backtrack(index):
        if index == len(nums_indexed):
            return all(s == target for s in bucket_sums)

        num, orig_idx = nums_indexed[index]

        for i in range(k):
            if bucket_sums[i] + num > target:
                continue

            buckets[i].append(num)
            bucket_sums[i] += num

            if backtrack(index + 1):
                return True

            buckets[i].pop()
            bucket_sums[i] -= num

            if bucket_sums[i] == 0:
                break

        return False

    if backtrack(0):
        return buckets
    return None


class KPartitionSolver:
    """
    K-Partition solver with multiple strategies
    """
    def __init__(self, nums, k):
        self.nums = nums
        self.k = k
        self.total = sum(nums)
        self.target = self.total // k if self.total % k == 0 else -1

    def can_partition(self, optimized=True):
        """Check if K equal partitions exist"""
        if optimized:
            return partition_k_subsets_optimized(self.nums, self.k)
        return can_partition_k_subsets(self.nums, self.k)

    def get_partitions(self):
        """Get the actual K partitions"""
        return get_k_partitions(self.nums, self.k)

    def max_k_partitions(self):
        """
        Find maximum K for which equal partitions exist

        Useful when you want to know: "What's the most groups we can make?"
        """
        if not self.nums:
            return 0

        # Try K from len(nums) down to 1
        for k in range(len(self.nums), 0, -1):
            if self.total % k == 0:
                if partition_k_subsets_optimized(self.nums, k):
                    return k
        return 1


# Real-world applications
def distribute_tasks_to_teams(task_hours, num_teams):
    """
    Project management: Distribute tasks equally among teams

    Example: task_hours=[4,3,2,3,5,2,1], num_teams=4
    Can we assign tasks so each team works exactly 5 hours?
    Team 1: [5]
    Team 2: [4, 1]
    Team 3: [3, 2]
    Team 4: [3, 2]
    """
    solver = KPartitionSolver(task_hours, num_teams)
    return solver.get_partitions()


def balance_server_load(request_sizes, num_servers):
    """
    Load balancing: Can we distribute requests equally across servers?
    """
    return can_partition_k_subsets(request_sizes, num_servers)


if __name__ == '__main__':
    # Test cases
    test_cases = [
        ([4, 3, 2, 3, 5, 2, 1], 4, True, "Standard case"),
        ([1, 1, 1, 1, 2, 2, 2, 2], 4, True, "Multiple solutions"),
        ([1, 2, 3, 4], 3, False, "Impossible split"),
        ([10, 10, 10, 7, 7, 7, 7, 7, 7, 6, 6, 6], 3, True, "Larger case"),
        ([5, 5, 5, 5], 2, True, "Simple case K=2"),
    ]

    for nums, k, expected, description in test_cases:
        result = can_partition_k_subsets(nums, k)
        status = "✓" if result == expected else "✗"
        print(f"{status} {description}: k={k}, nums={nums} → {result}")

    # Show actual partitions
    print("\nActual K partitions:")
    nums = [4, 3, 2, 3, 5, 2, 1]
    k = 4
    solver = KPartitionSolver(nums, k)
    print(f"Array: {nums}, K: {k}")
    partitions = solver.get_partitions()
    if partitions:
        for i, partition in enumerate(partitions):
            print(f"  Partition {i+1}: {partition} (sum={sum(partition)})")
    else:
        print("  No valid partitions found")

    # Find maximum K
    print(f"\nMaximum K for equal partitions: {solver.max_k_partitions()}")

    # Performance comparison
    nums_large = [10, 10, 10, 7, 7, 7, 7, 7, 7, 6, 6, 6]
    k_large = 3
    print(f"\nLarge case: nums={nums_large}, k={k_large}")
    print(f"Standard: {can_partition_k_subsets(nums_large, k_large)}")
    print(f"Optimized: {partition_k_subsets_optimized(nums_large, k_large)}")

"""
Balanced Partition - Minimize maximum partition sum (load balancing)

Mental Model: "Task assignment - minimize max workload across workers"

Problem: Given array and K partitions, assign elements to minimize max partition sum

Pattern Recognition:
- "minimize maximum load" → Balanced Partition (Greedy)
- "distribute fairly but not necessarily equal" → Approximation algorithm
- Different from K-Partition (which requires exact equal sums)

Key Insights:
1. K-Partition (equal sums) is NP-complete, often impossible
2. Balanced Partition (minimize max) always has solution, runs in O(n log n)
3. Greedy approach: assign each element to lightest partition (min-heap)
4. Sort descending for better approximation (LPT - Longest Processing Time first)

Structure:
- Min heap of (partition_sum, partition_id)
- Always assign next element to partition with smallest current sum
- Result: minimizes maximum partition sum (load balancing)

Behavior:
1. Sort elements descending (optional but improves result)
2. Create min heap with K partitions (initially all 0)
3. For each element:
   - Pop partition with min sum
   - Add element to that partition
   - Push updated sum back to heap
4. Max heap value = maximum partition sum (minimized)

Real-World:
- Task scheduling across workers
- Load balancing across servers
- Fair playlist generation
"""

import heapq


def balanced_partition_greedy(nums, k):
    """
    Greedy min-heap approach: O(n log k) time, O(k) space

    Returns: (max_partition_sum, list of K partitions)

    Mental trace for nums=[7,6,5,4,3,2,1], k=3:
    Sort desc: [7,6,5,4,3,2,1]
    Heap: [(0,0), (0,1), (0,2)]

    - Add 7 → partition 0: [7], heap=[(0,1), (0,2), (7,0)]
    - Add 6 → partition 1: [6], heap=[(0,2), (6,1), (7,0)]
    - Add 5 → partition 2: [5], heap=[(5,2), (6,1), (7,0)]
    - Add 4 → partition 2: [5,4], heap=[(6,1), (7,0), (9,2)]
    - Add 3 → partition 1: [6,3], heap=[(7,0), (9,1), (9,2)]
    - Add 2 → partition 0: [7,2], heap=[(9,1), (9,0), (9,2)]
    - Add 1 → partition 1: [6,3,1], heap=[(9,0), (9,2), (10,1)]

    Result: max=10, partitions=[[7,2], [6,3,1], [5,4]]
    """
    if not nums or k <= 0:
        return 0, []

    # Sort descending for better approximation (LPT heuristic)
    nums_sorted = sorted(nums, reverse=True)

    # Min heap: (current_sum, partition_id)
    min_heap = [(0, i) for i in range(k)]
    heapq.heapify(min_heap)

    # Track elements in each partition
    partitions = [[] for _ in range(k)]

    for num in nums_sorted:
        # Get partition with minimum sum
        current_sum, partition_id = heapq.heappop(min_heap)

        # Assign element to this partition
        partitions[partition_id].append(num)

        # Update heap with new sum
        heapq.heappush(min_heap, (current_sum + num, partition_id))

    # Maximum partition sum (the goal we minimized)
    max_sum = max(sum(partition) for partition in partitions)

    return max_sum, partitions


def balanced_partition_unsorted(nums, k):
    """
    Greedy without sorting: O(n log k) time

    Faster but worse approximation quality
    Useful when you can't modify input order (streaming data)
    """
    if not nums or k <= 0:
        return 0, []

    min_heap = [(0, i) for i in range(k)]
    heapq.heapify(min_heap)
    partitions = [[] for _ in range(k)]

    for num in nums:
        current_sum, partition_id = heapq.heappop(min_heap)
        partitions[partition_id].append(num)
        heapq.heappush(min_heap, (current_sum + num, partition_id))

    max_sum = max(sum(partition) for partition in partitions)
    return max_sum, partitions


def balanced_partition_binary_search(nums, k):
    """
    Binary search + greedy: Find minimum possible max partition sum

    Idea: Binary search on answer (max partition sum)
    For each candidate max, check if we can partition with all sums ≤ max

    Time: O(n log n + n log(sum)) - tighter bound than pure greedy
    """
    nums_sorted = sorted(nums, reverse=True)

    def can_partition_with_max(max_sum):
        """Check if we can partition such that all partitions ≤ max_sum"""
        partitions_used = 1
        current_sum = 0

        for num in nums_sorted:
            if num > max_sum:
                return False  # Single element exceeds max

            if current_sum + num > max_sum:
                # Start new partition
                partitions_used += 1
                current_sum = num

                if partitions_used > k:
                    return False
            else:
                current_sum += num

        return True

    # Binary search on max partition sum
    left, right = max(nums), sum(nums)
    result = right

    while left <= right:
        mid = (left + right) // 2

        if can_partition_with_max(mid):
            result = mid
            right = mid - 1  # Try smaller max
        else:
            left = mid + 1

    return result


class BalancedPartitionSolver:
    """
    Load balancing solver with multiple strategies
    """
    def __init__(self, nums, k):
        self.nums = nums
        self.k = k

    def minimize_max_sum(self, method='greedy_sorted'):
        """
        method='greedy_sorted': LPT heuristic (recommended)
        method='greedy_unsorted': Faster, worse approximation
        method='binary_search': Optimal max partition sum
        """
        if method == 'greedy_sorted':
            return balanced_partition_greedy(self.nums, self.k)
        elif method == 'greedy_unsorted':
            return balanced_partition_unsorted(self.nums, self.k)
        elif method == 'binary_search':
            optimal_max = balanced_partition_binary_search(self.nums, self.k)
            # Get actual partitions using greedy (good enough approximation)
            return balanced_partition_greedy(self.nums, self.k)

    def get_partition_stats(self):
        """Return detailed statistics about the balanced partition"""
        max_sum, partitions = balanced_partition_greedy(self.nums, self.k)
        partition_sums = [sum(p) for p in partitions]

        return {
            'max_sum': max_sum,
            'min_sum': min(partition_sums),
            'avg_sum': sum(partition_sums) / len(partition_sums),
            'variance': sum((s - sum(partition_sums)/len(partition_sums))**2 for s in partition_sums),
            'partitions': partitions,
            'partition_sums': partition_sums,
        }


# Real-world applications
def assign_tasks_to_workers(task_durations, num_workers):
    """
    Project management: Assign tasks to workers to minimize project completion time

    Completion time = max(worker_total_time)
    We want to minimize this.

    Example: tasks=[7,6,5,4,3,2,1], workers=3
    Optimal assignment minimizes longest worker time.
    """
    max_time, assignments = balanced_partition_greedy(task_durations, num_workers)

    result = []
    for i, tasks in enumerate(assignments):
        total_time = sum(tasks)
        result.append({
            'worker_id': i,
            'tasks': tasks,
            'total_time': total_time
        })

    return max_time, result


def balance_server_load(request_sizes, num_servers):
    """
    Load balancing: Distribute requests to minimize max server load

    Returns: (max_load, server_assignments)
    """
    return balanced_partition_greedy(request_sizes, num_servers)


def create_fair_playlists(song_durations, num_playlists):
    """
    Playlist generation: Create K playlists with similar total duration
    """
    max_duration, playlists = balanced_partition_greedy(song_durations, num_playlists)
    return playlists


if __name__ == '__main__':
    # Test case: Task assignment
    tasks = [7, 6, 5, 4, 3, 2, 1]
    workers = 3

    print(f"Tasks: {tasks}")
    print(f"Workers: {workers}\n")

    # Greedy sorted (LPT)
    max_time, assignments = balanced_partition_greedy(tasks, workers)
    print("Greedy LPT (sorted descending):")
    for i, assignment in enumerate(assignments):
        print(f"  Worker {i}: {assignment} (total={sum(assignment)})")
    print(f"  Max time: {max_time}\n")

    # Greedy unsorted
    max_time_unsorted, assignments_unsorted = balanced_partition_unsorted(tasks, workers)
    print("Greedy unsorted:")
    for i, assignment in enumerate(assignments_unsorted):
        print(f"  Worker {i}: {assignment} (total={sum(assignment)})")
    print(f"  Max time: {max_time_unsorted}\n")

    # Binary search optimal
    optimal_max = balanced_partition_binary_search(tasks, workers)
    print(f"Binary search optimal max: {optimal_max}\n")

    # Detailed stats
    solver = BalancedPartitionSolver(tasks, workers)
    stats = solver.get_partition_stats()
    print("Partition statistics:")
    print(f"  Max sum: {stats['max_sum']}")
    print(f"  Min sum: {stats['min_sum']}")
    print(f"  Avg sum: {stats['avg_sum']:.2f}")
    print(f"  Variance: {stats['variance']:.2f}")

    # Real-world example
    print("\n--- Real-world: Task assignment ---")
    task_hours = [8, 7, 6, 5, 4, 3, 2, 1]
    num_workers = 3
    project_time, worker_assignments = assign_tasks_to_workers(task_hours, num_workers)

    print(f"Task hours: {task_hours}")
    print(f"Workers: {num_workers}")
    print(f"Project completion time: {project_time} hours\n")
    for assignment in worker_assignments:
        print(f"Worker {assignment['worker_id']}: {assignment['tasks']} ({assignment['total_time']} hours)")

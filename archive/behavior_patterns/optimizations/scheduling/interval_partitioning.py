"""
Interval Partitioning - Assign intervals to minimum number of resources

Mental Model: "Classroom scheduling - assign classes to rooms, minimize total rooms needed"

Problem: Given intervals, partition them into minimum groups where no two overlap

Pattern Recognition:
- "non-overlapping within groups" → Interval Partitioning
- "minimize number of groups" → Greedy with priority queue
- "maximum depth" → Same as minimum resources needed

Key Insight:
Minimum partitions = Maximum depth (most intervals overlapping at any point)
Greedy: Sort by start time, assign each interval to earliest available resource
Use min-heap to track when each resource becomes free

Structure:
- Events: [(start, end), ...]
- Resources: Min-heap of (end_time, resource_id)
- Partitions: {resource_id: [intervals]}

Behavior:
1. Sort intervals by start time
2. For each interval:
   - Check if any resource is free (earliest end_time <= current start)
   - If yes: Assign to that resource, update its end_time
   - If no: Create new resource
3. Number of resources = size of heap

Real-World:
- Meeting room allocation
- CPU core assignment
- Network channel allocation
- Exam room scheduling
"""

import heapq
from typing import List, Tuple, Dict
from collections import defaultdict


def interval_partitioning_greedy(intervals):
    """
    Greedy interval partitioning using min-heap

    intervals: list of (start, end) tuples
    Returns: (num_partitions, partition_assignment)
      partition_assignment: dict {partition_id: [intervals]}

    Time: O(n log n) - sort + heap operations
    Space: O(n) - heap + assignments

    Mental trace for [(0,3), (1,4), (2,5), (3,6), (5,7), (6,8)]:
    1. Sort by start: [(0,3), (1,4), (2,5), (3,6), (5,7), (6,8)]
    2. Process:
       - (0,3): No resources, create partition 0, heap=[(3, 0)]
       - (1,4): 3 > 1 (not free), create partition 1, heap=[(3,0), (4,1)]
       - (2,5): 3 > 2 (not free), create partition 2, heap=[(3,0), (4,1), (5,2)]
       - (3,6): 3 <= 3 (free!), assign to partition 0, heap=[(4,1), (5,2), (6,0)]
       - (5,7): 4 <= 5 (free!), assign to partition 1, heap=[(5,2), (6,0), (7,1)]
       - (6,8): 5 <= 6 (free!), assign to partition 2, heap=[(6,0), (7,1), (8,2)]
    3. Result: 3 partitions (max depth was 3)
    """
    if not intervals:
        return 0, {}

    # Sort by start time
    intervals = sorted(intervals, key=lambda x: x[0])

    # Min-heap: (end_time, partition_id)
    heap = []
    partitions = defaultdict(list)
    next_partition_id = 0

    for start, end in intervals:
        # Check if any partition is free
        if heap and heap[0][0] <= start:
            # Reuse earliest-ending partition
            _, partition_id = heapq.heappop(heap)
        else:
            # Need new partition
            partition_id = next_partition_id
            next_partition_id += 1

        # Assign interval to partition
        partitions[partition_id].append((start, end))

        # Update partition's end time
        heapq.heappush(heap, (end, partition_id))

    return len(partitions), dict(partitions)


def interval_partitioning_depth(intervals):
    """
    Calculate minimum partitions using depth calculation (line sweep)

    Alternative approach: Maximum depth = minimum partitions needed
    Uses event-based line sweep (same as meeting rooms)

    Time: O(n log n)
    Space: O(n)
    """
    if not intervals:
        return 0

    # Separate starts and ends
    starts = sorted(i[0] for i in intervals)
    ends = sorted(i[1] for i in intervals)

    depth = max_depth = 0
    s = e = 0

    while s < len(starts):
        if starts[s] < ends[e]:
            depth += 1
            max_depth = max(max_depth, depth)
            s += 1
        else:
            depth -= 1
            e += 1

    return max_depth


def validate_partitioning(partitions):
    """
    Verify that partitioning is valid (no overlaps within partitions)

    Returns: (is_valid, error_message)
    """
    for partition_id, intervals in partitions.items():
        # Sort intervals in this partition by start time
        sorted_intervals = sorted(intervals, key=lambda x: x[0])

        # Check for overlaps
        for i in range(len(sorted_intervals) - 1):
            if sorted_intervals[i][1] > sorted_intervals[i + 1][0]:
                return False, f"Overlap in partition {partition_id}: {sorted_intervals[i]} and {sorted_intervals[i + 1]}"

    return True, "Valid partitioning"


class IntervalPartitioner:
    """
    Interval partitioning solver with visualization
    """
    def __init__(self, intervals):
        """
        intervals: list of (start, end) tuples or (start, end, label) tuples
        """
        self.intervals = intervals
        self.n = len(intervals)

    def solve(self, method='greedy'):
        """
        method='greedy': Min-heap greedy (returns partitions)
        method='depth': Line sweep depth calculation (returns count only)
        """
        if method == 'greedy':
            return interval_partitioning_greedy(self.intervals)
        elif method == 'depth':
            count = interval_partitioning_depth(self.intervals)
            return count, {}
        else:
            raise ValueError(f"Unknown method: {method}")

    def visualize_partitions(self, partitions):
        """Print partition assignment with timeline visualization"""
        if not partitions:
            print("No partitions created")
            return

        print(f"Number of partitions: {len(partitions)}")
        print()

        for partition_id in sorted(partitions.keys()):
            intervals = partitions[partition_id]
            print(f"Partition {partition_id} ({len(intervals)} intervals):")

            for start, end in intervals:
                # Timeline visualization
                timeline = ['-'] * 60
                start_pos = min(start * 2, 59)
                end_pos = min(end * 2, 59)

                for i in range(start_pos, min(end_pos, 60)):
                    timeline[i] = '█'

                print(f"  [{start:3d}, {end:3d}]  {''.join(timeline)}")

            print()

        # Validate
        is_valid, msg = validate_partitioning(partitions)
        if is_valid:
            print("✓ Partitioning is valid (no overlaps within partitions)")
        else:
            print(f"✗ Invalid partitioning: {msg}")


# Real-world applications
def allocate_meeting_rooms(meetings):
    """
    Meeting room allocation: Assign meetings to rooms

    meetings: list of (start_time, end_time, meeting_name) tuples
    Returns: (num_rooms, room_assignments)
    """
    # Extract intervals
    intervals = [(start, end) for start, end, _ in meetings]

    partitioner = IntervalPartitioner(intervals)
    num_rooms, assignments = partitioner.solve('greedy')

    print("=== Meeting Room Allocation ===")
    print(f"Total meetings: {len(meetings)}")
    print(f"Rooms needed: {num_rooms}")
    print()

    # Map back to meeting names
    interval_to_name = {(start, end): name for start, end, name in meetings}

    for room_id in sorted(assignments.keys()):
        room_intervals = assignments[room_id]
        print(f"Room {room_id + 1}:")
        for start, end in room_intervals:
            name = interval_to_name.get((start, end), "Unknown")
            print(f"  {start:02d}:00 - {end:02d}:00  {name}")
        print()

    return num_rooms, assignments


def allocate_cpu_cores(tasks):
    """
    CPU core allocation: Assign tasks to cores

    tasks: list of (start_ms, end_ms, task_id) tuples
    Returns: (num_cores, core_assignments)
    """
    intervals = [(start, end) for start, end, _ in tasks]

    partitioner = IntervalPartitioner(intervals)
    num_cores, assignments = partitioner.solve('greedy')

    print("=== CPU Core Allocation ===")
    print(f"Total tasks: {len(tasks)}")
    print(f"Cores needed: {num_cores}")

    # Map back to task IDs
    interval_to_task = {(start, end): task_id for start, end, task_id in tasks}

    total_idle_time = 0
    for core_id in sorted(assignments.keys()):
        core_intervals = sorted(assignments[core_id], key=lambda x: x[0])
        print(f"\nCore {core_id}:")

        # Calculate idle time for this core
        idle_time = 0
        prev_end = 0

        for start, end in core_intervals:
            task_id = interval_to_task.get((start, end), "Unknown")
            if prev_end > 0 and start > prev_end:
                idle = start - prev_end
                idle_time += idle
                print(f"  [IDLE: {idle}ms]")

            print(f"  {start}ms - {end}ms  Task {task_id}")
            prev_end = end

        print(f"  Idle time: {idle_time}ms")
        total_idle_time += idle_time

    print(f"\nTotal system idle time: {total_idle_time}ms")
    return num_cores, assignments


def schedule_exams(exams):
    """
    Exam scheduling: Minimize time slots needed

    exams: list of (duration_hours, exam_name) - all start at slot boundaries
    Returns: (num_slots, schedule)
    """
    # Convert to intervals (cumulative slots)
    intervals = []
    current_slot = 0

    for duration, name in exams:
        start = current_slot
        end = current_slot + duration
        intervals.append((start, end))
        current_slot = end

    partitioner = IntervalPartitioner(intervals)
    num_slots, _ = partitioner.solve('depth')

    print("=== Exam Scheduling ===")
    print(f"Total exams: {len(exams)}")
    print(f"Minimum parallel time slots needed: {num_slots}")

    return num_slots


if __name__ == '__main__':
    # Test 1: Basic interval partitioning
    print("=== Test 1: Basic Interval Partitioning ===")
    intervals = [
        (0, 3),
        (1, 4),
        (2, 5),
        (3, 6),
        (5, 7),
        (6, 8),
        (8, 10),
    ]

    partitioner = IntervalPartitioner(intervals)

    print("Greedy approach:")
    num_partitions, partitions = partitioner.solve('greedy')
    partitioner.visualize_partitions(partitions)

    print("\nDepth calculation:")
    depth = partitioner.solve('depth')[0]
    print(f"Maximum depth: {depth}")

    assert num_partitions == depth, "Greedy and depth should give same count"
    print(f"✓ Both methods agree: {num_partitions} partitions needed\n")

    # Test 2: Real-world - Meeting rooms
    print("=== Test 2: Meeting Room Allocation ===")
    meetings = [
        (9, 10, "Standup"),
        (9, 11, "Design Review"),
        (10, 12, "Sprint Planning"),
        (11, 12, "1-on-1"),
        (13, 14, "Demo"),
        (13, 15, "Retro"),
        (14, 16, "Tech Talk"),
    ]

    allocate_meeting_rooms(meetings)

    # Test 3: Real-world - CPU cores
    print("\n=== Test 3: CPU Core Allocation ===")
    tasks = [
        (0, 100, "TaskA"),
        (50, 150, "TaskB"),
        (100, 200, "TaskC"),
        (150, 250, "TaskD"),
        (200, 300, "TaskE"),
        (250, 350, "TaskF"),
    ]

    allocate_cpu_cores(tasks)

    # Test 4: Edge cases
    print("\n=== Test 4: Edge Cases ===")

    # No overlaps - need 1 resource
    no_overlap = [(1, 2), (3, 4), (5, 6)]
    num, _ = interval_partitioning_greedy(no_overlap)
    print(f"No overlaps: {num} partition(s) (should be 1)")

    # All overlap - need n resources
    all_overlap = [(1, 10), (1, 10), (1, 10)]
    num, _ = interval_partitioning_greedy(all_overlap)
    print(f"All overlap: {num} partitions (should be {len(all_overlap)})")

    # Empty input
    num, _ = interval_partitioning_greedy([])
    print(f"Empty input: {num} partitions")

    # Single interval
    num, _ = interval_partitioning_greedy([(5, 10)])
    print(f"Single interval: {num} partition(s)")

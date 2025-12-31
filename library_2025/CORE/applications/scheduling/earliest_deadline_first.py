"""
Earliest Deadline First (EDF) Scheduling - Minimize lateness in task scheduling

Mental Model: "Delivery driver prioritizing packages by deadline to minimize late deliveries"

Problem: Schedule tasks on a single resource to minimize maximum lateness

Pattern Recognition:
- "minimize lateness" → EDF scheduling
- "single resource" + "deadlines" → Greedy by earliest deadline
- "real-time systems" → EDF is optimal for preemptive scheduling

Key Insight:
EDF is optimal for minimizing maximum lateness (greedy exchange argument)
Sort by deadline, schedule in that order
Lateness[i] = max(0, finish_time[i] - deadline[i])
Maximum lateness = max of all lateness values

Structure:
- Tasks: [(duration, deadline, name), ...]
- Schedule: List of (task, start_time, finish_time, lateness)
- Current time: Track cumulative completion time

Behavior:
1. Sort tasks by deadline (earliest first)
2. For each task in order:
   - Start at current_time
   - Finish at current_time + duration
   - Lateness = max(0, finish_time - deadline)
   - Update current_time = finish_time
3. Maximum lateness = max of all lateness values

Real-World:
- Real-time operating systems (EDF scheduler)
- Package delivery optimization
- Production line scheduling
- Network packet scheduling
"""

from typing import List, Tuple
import heapq


def edf_schedule(tasks):
    """
    Earliest Deadline First scheduling

    tasks: list of (duration, deadline, task_id) tuples
    Returns: (max_lateness, schedule)
      schedule: list of (task_id, start, finish, lateness, deadline)

    Time: O(n log n) - sort by deadline
    Space: O(n) - schedule

    Mental trace for [(3, 6, 'A'), (2, 8, 'B'), (1, 9, 'C'), (4, 9, 'D'), (3, 14, 'E')]:
    1. Sort by deadline: [A(d=6), B(d=8), C(d=9), D(d=9), E(d=14)]
    2. Schedule:
       - A: start=0, finish=3, deadline=6, lateness=0
       - B: start=3, finish=5, deadline=8, lateness=0
       - C: start=5, finish=6, deadline=9, lateness=0
       - D: start=6, finish=10, deadline=9, lateness=1 ⚠
       - E: start=10, finish=13, deadline=14, lateness=0
    3. Max lateness = 1 (task D)
    """
    if not tasks:
        return 0, []

    # Sort by deadline (earliest first)
    sorted_tasks = sorted(tasks, key=lambda x: x[1])

    schedule = []
    current_time = 0
    max_lateness = 0

    for duration, deadline, task_id in sorted_tasks:
        start_time = current_time
        finish_time = current_time + duration
        lateness = max(0, finish_time - deadline)

        schedule.append((task_id, start_time, finish_time, lateness, deadline))

        current_time = finish_time
        max_lateness = max(max_lateness, lateness)

    return max_lateness, schedule


def edf_schedule_with_release_times(tasks):
    """
    EDF with release times (tasks can't start before release time)

    tasks: list of (release_time, duration, deadline, task_id) tuples
    Returns: (max_lateness, schedule)

    Time: O(n log n)
    More complex: Need to handle idle time when no tasks available
    """
    if not tasks:
        return 0, []

    # Sort by release time first
    sorted_tasks = sorted(tasks, key=lambda x: x[0])

    # Priority queue: (deadline, release_time, duration, task_id)
    available = []
    schedule = []
    current_time = 0
    max_lateness = 0
    task_idx = 0
    n = len(sorted_tasks)

    while task_idx < n or available:
        # Add all tasks that have been released
        while task_idx < n and sorted_tasks[task_idx][0] <= current_time:
            release, duration, deadline, task_id = sorted_tasks[task_idx]
            heapq.heappush(available, (deadline, release, duration, task_id))
            task_idx += 1

        if not available:
            # No tasks available, fast-forward to next release
            if task_idx < n:
                current_time = sorted_tasks[task_idx][0]
            continue

        # Pop task with earliest deadline
        deadline, release, duration, task_id = heapq.heappop(available)

        start_time = current_time
        finish_time = current_time + duration
        lateness = max(0, finish_time - deadline)

        schedule.append((task_id, start_time, finish_time, lateness, deadline))

        current_time = finish_time
        max_lateness = max(max_lateness, lateness)

    return max_lateness, schedule


def minimize_weighted_lateness(tasks):
    """
    Weighted EDF: Minimize total weighted lateness

    tasks: list of (duration, deadline, weight, task_id) tuples
    Sort by deadline/weight ratio (not always optimal for weighted case!)

    Note: Weighted lateness is NP-hard in general
    This is a greedy approximation
    """
    if not tasks:
        return 0, []

    # Heuristic: Sort by deadline (EDF)
    # For weighted case, could try deadline/weight, but no guaranteed optimal greedy
    sorted_tasks = sorted(tasks, key=lambda x: x[1])

    schedule = []
    current_time = 0
    total_weighted_lateness = 0

    for duration, deadline, weight, task_id in sorted_tasks:
        start_time = current_time
        finish_time = current_time + duration
        lateness = max(0, finish_time - deadline)
        weighted_lateness = lateness * weight

        schedule.append((task_id, start_time, finish_time, lateness, deadline, weight))

        current_time = finish_time
        total_weighted_lateness += weighted_lateness

    return total_weighted_lateness, schedule


class EDFScheduler:
    """
    Earliest Deadline First scheduler with multiple variants
    """
    def __init__(self, tasks):
        """
        tasks: list of tuples (format depends on method)
        """
        self.tasks = tasks
        self.n = len(tasks)

    def solve(self, method='edf'):
        """
        method='edf': Basic EDF (duration, deadline, task_id)
        method='edf_release': EDF with release times (release, duration, deadline, task_id)
        method='weighted': Weighted lateness (duration, deadline, weight, task_id)
        """
        if method == 'edf':
            return edf_schedule(self.tasks)
        elif method == 'edf_release':
            return edf_schedule_with_release_times(self.tasks)
        elif method == 'weighted':
            return minimize_weighted_lateness(self.tasks)
        else:
            raise ValueError(f"Unknown method: {method}")

    def visualize_schedule(self, schedule, method='edf'):
        """Print schedule with Gantt chart and lateness analysis"""
        if not schedule:
            print("No tasks scheduled")
            return

        print(f"Total tasks: {len(schedule)}")
        print()

        # Sort by start time for visualization
        sorted_schedule = sorted(schedule, key=lambda x: x[1])

        print("Schedule (Gantt chart):")
        total_lateness = 0
        late_tasks = 0

        for item in sorted_schedule:
            if method == 'weighted':
                task_id, start, finish, lateness, deadline, weight = item
                weighted_lateness = lateness * weight
                total_lateness += weighted_lateness
            else:
                task_id, start, finish, lateness, deadline = item
                total_lateness += lateness

            if lateness > 0:
                late_tasks += 1
                late_marker = f" ⚠ LATE by {lateness}"
            else:
                late_marker = ""

            # Gantt visualization
            timeline = ['-'] * 60
            start_pos = min(start, 59)
            finish_pos = min(finish, 59)

            for i in range(start_pos, min(finish_pos, 60)):
                timeline[i] = '█'

            if method == 'weighted':
                print(f"  {task_id:6s} [{start:3d}, {finish:3d}] deadline={deadline:3d} weight={weight:2d}  {''.join(timeline)}{late_marker}")
            else:
                print(f"  {task_id:6s} [{start:3d}, {finish:3d}] deadline={deadline:3d}  {''.join(timeline)}{late_marker}")

        print()
        if method == 'weighted':
            print(f"Total weighted lateness: {total_lateness}")
        else:
            max_lateness = max(item[3] for item in sorted_schedule)
            print(f"Maximum lateness: {max_lateness}")
            print(f"Total lateness: {total_lateness}")

        print(f"Late tasks: {late_tasks}/{len(schedule)}")


# Real-world applications
def schedule_deliveries(packages):
    """
    Package delivery: Minimize lateness

    packages: list of (travel_time, deadline_hour, package_id) tuples
    Returns: (max_lateness, delivery_schedule)
    """
    scheduler = EDFScheduler(packages)
    max_lateness, schedule = scheduler.solve('edf')

    print("=== Package Delivery Schedule ===")
    scheduler.visualize_schedule(schedule)

    if max_lateness == 0:
        print("✓ All packages delivered on time!")
    else:
        print(f"⚠ Maximum delay: {max_lateness} hours")

    return max_lateness, schedule


def schedule_manufacturing(jobs):
    """
    Manufacturing: Schedule production jobs to minimize lateness

    jobs: list of (processing_time, due_date, job_id) tuples
    Returns: (max_lateness, production_schedule)
    """
    scheduler = EDFScheduler(jobs)
    max_lateness, schedule = scheduler.solve('edf')

    print("=== Manufacturing Production Schedule ===")
    scheduler.visualize_schedule(schedule)

    # Calculate utilization
    total_time = schedule[-1][2] if schedule else 0
    total_processing = sum(job[0] for job in jobs)
    utilization = (total_processing / total_time * 100) if total_time > 0 else 0

    print(f"\nResource utilization: {utilization:.1f}%")
    return max_lateness, schedule


def schedule_real_time_tasks(tasks):
    """
    Real-time OS: Schedule tasks with release times

    tasks: list of (release_ms, duration_ms, deadline_ms, task_name) tuples
    Returns: (max_lateness, schedule)
    """
    scheduler = EDFScheduler(tasks)
    max_lateness, schedule = scheduler.solve('edf_release')

    print("=== Real-Time Task Scheduling ===")
    scheduler.visualize_schedule(schedule, method='edf_release')

    if max_lateness == 0:
        print("✓ All tasks met their deadlines (schedulable)")
    else:
        print(f"✗ System is not schedulable (max lateness: {max_lateness}ms)")

    return max_lateness, schedule


if __name__ == '__main__':
    # Test 1: Basic EDF
    print("=== Test 1: Basic EDF Scheduling ===")
    tasks = [
        (3, 6, 'A'),
        (2, 8, 'B'),
        (1, 9, 'C'),
        (4, 9, 'D'),
        (3, 14, 'E'),
    ]

    scheduler = EDFScheduler(tasks)
    max_lateness, schedule = scheduler.solve('edf')
    scheduler.visualize_schedule(schedule)
    print()

    # Test 2: Real-world - Package delivery
    print("=== Test 2: Package Delivery ===")
    packages = [
        (2, 10, 'PKG001'),
        (3, 8, 'PKG002'),
        (1, 12, 'PKG003'),
        (4, 15, 'PKG004'),
        (2, 9, 'PKG005'),
    ]

    schedule_deliveries(packages)
    print()

    # Test 3: Real-world - Manufacturing
    print("=== Test 3: Manufacturing Jobs ===")
    jobs = [
        (5, 20, 'JobA'),
        (3, 15, 'JobB'),
        (7, 25, 'JobC'),
        (4, 18, 'JobD'),
        (6, 30, 'JobE'),
    ]

    schedule_manufacturing(jobs)
    print()

    # Test 4: EDF with release times
    print("=== Test 4: Real-Time Tasks (with release times) ===")
    rt_tasks = [
        (0, 3, 6, 'T1'),
        (2, 2, 8, 'T2'),
        (4, 1, 9, 'T3'),
        (5, 4, 12, 'T4'),
    ]

    schedule_real_time_tasks(rt_tasks)
    print()

    # Test 5: Weighted lateness
    print("=== Test 5: Weighted Lateness ===")
    weighted_tasks = [
        (3, 6, 5, 'High'),
        (2, 8, 2, 'Low'),
        (4, 9, 10, 'Critical'),
        (3, 14, 3, 'Medium'),
    ]

    scheduler_weighted = EDFScheduler(weighted_tasks)
    total_weighted, schedule_w = scheduler_weighted.solve('weighted')
    scheduler_weighted.visualize_schedule(schedule_w, method='weighted')
    print()

    # Test 6: Edge cases
    print("=== Test 6: Edge Cases ===")

    # All tasks late
    tight_deadlines = [(5, 1, 'T1'), (5, 2, 'T2'), (5, 3, 'T3')]
    max_l, _ = edf_schedule(tight_deadlines)
    print(f"All tasks late: max_lateness={max_l}")

    # All on time
    loose_deadlines = [(1, 10, 'T1'), (1, 20, 'T2'), (1, 30, 'T3')]
    max_l, _ = edf_schedule(loose_deadlines)
    print(f"All on time: max_lateness={max_l}")

    # Empty input
    max_l, _ = edf_schedule([])
    print(f"Empty input: max_lateness={max_l}")

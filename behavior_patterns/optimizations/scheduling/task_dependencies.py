"""
Task Scheduling with Dependencies - Precedence-constrained scheduling

Mental Model: "Software build system - can't link before compiling, must respect dependencies"

Problem: Schedule tasks with dependencies to minimize total completion time

Pattern Recognition:
- "task dependencies" → Directed Acyclic Graph (DAG)
- "must complete prerequisites first" → Topological sort
- "minimize completion time" → Critical path method (CPM)
- "parallel resources" → Longest path + level-based scheduling

Key Insight:
Dependencies form DAG (cyclic dependencies = impossible to schedule)
Topological sort gives valid ordering
Critical path = longest path from start to finish (determines minimum time)
Level-based scheduling: Assign tasks to earliest available time slot respecting dependencies

Structure:
- Tasks: {task_id: (duration, dependencies)}
- Graph: Adjacency list for dependencies
- Levels: Tasks grouped by dependency depth (can execute in parallel)
- Critical path: Longest chain of dependent tasks

Behavior:
1. Build dependency graph, compute in-degrees
2. Topological sort using Kahn's algorithm (BFS) or DFS
3. For parallel scheduling:
   - Compute earliest start time for each task
   - Assign to resources greedily (earliest available resource)
4. Critical path: Use longest path calculation (similar to shortest path with negation)

Real-World:
- Project planning (PERT/CPM)
- Build systems (Make, Bazel, Maven)
- Database query optimization
- Manufacturing workflows
"""

from collections import defaultdict, deque
from typing import List, Tuple, Dict, Set
import heapq


def topological_sort_kahn(tasks, dependencies):
    """
    Topological sort using Kahn's algorithm (BFS)

    tasks: list of task_ids
    dependencies: dict {task_id: [prerequisite_ids]}
    Returns: topologically sorted list of tasks (or None if cycle detected)

    Time: O(V + E)
    Space: O(V + E)
    """
    # Build adjacency list and in-degree map
    graph = defaultdict(list)
    in_degree = {task: 0 for task in tasks}

    for task, prereqs in dependencies.items():
        for prereq in prereqs:
            graph[prereq].append(task)
            in_degree[task] += 1

    # Initialize queue with tasks having no prerequisites
    queue = deque([task for task in tasks if in_degree[task] == 0])
    sorted_order = []

    while queue:
        task = queue.popleft()
        sorted_order.append(task)

        # Reduce in-degree of dependent tasks
        for neighbor in graph[task]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    # Check for cycles
    if len(sorted_order) != len(tasks):
        return None  # Cycle detected

    return sorted_order


def topological_sort_dfs(tasks, dependencies):
    """
    Topological sort using DFS (post-order)

    Returns: topologically sorted list (or None if cycle)
    """
    graph = defaultdict(list)
    for task, prereqs in dependencies.items():
        for prereq in prereqs:
            graph[prereq].append(task)

    visited = set()
    visiting = set()
    sorted_order = []

    def dfs(task):
        if task in visiting:
            return False  # Cycle detected
        if task in visited:
            return True

        visiting.add(task)

        for neighbor in graph[task]:
            if not dfs(neighbor):
                return False

        visiting.remove(task)
        visited.add(task)
        sorted_order.append(task)

        return True

    for task in tasks:
        if task not in visited:
            if not dfs(task):
                return None  # Cycle

    sorted_order.reverse()
    return sorted_order


def schedule_with_dependencies_sequential(tasks, durations, dependencies):
    """
    Sequential scheduling with dependencies (single resource)

    tasks: list of task_ids
    durations: dict {task_id: duration}
    dependencies: dict {task_id: [prerequisite_ids]}

    Returns: (total_time, schedule)
      schedule: dict {task_id: (start_time, finish_time)}
    """
    # Get topological order
    topo_order = topological_sort_kahn(tasks, dependencies)

    if topo_order is None:
        return None, None  # Cycle detected

    # Schedule in topological order
    schedule = {}
    current_time = 0

    for task in topo_order:
        # Start time = max(current_time, max(finish_time of all prerequisites))
        prereq_finish_times = [schedule[prereq][1] for prereq in dependencies.get(task, [])]
        start_time = max([current_time] + prereq_finish_times)

        finish_time = start_time + durations[task]
        schedule[task] = (start_time, finish_time)

        current_time = finish_time

    total_time = max(finish for _, finish in schedule.values())
    return total_time, schedule


def schedule_with_dependencies_parallel(tasks, durations, dependencies, num_resources=float('inf')):
    """
    Parallel scheduling with dependencies (multiple resources)

    Uses greedy approach: Schedule each task at earliest possible time
    respecting dependencies and resource availability

    num_resources: number of parallel workers (default: unlimited)

    Returns: (total_time, schedule, resource_assignment)
      schedule: dict {task_id: (start_time, finish_time)}
      resource_assignment: dict {task_id: resource_id}
    """
    # Compute earliest start times using topological sort
    topo_order = topological_sort_kahn(tasks, dependencies)

    if topo_order is None:
        return None, None, None

    schedule = {}
    resource_assignment = {}

    # Min-heap: (finish_time, resource_id)
    available_resources = [(0, i) for i in range(num_resources if num_resources != float('inf') else len(tasks))]
    heapq.heapify(available_resources)

    for task in topo_order:
        # Earliest start = max finish time of prerequisites
        prereq_finish_times = [schedule[prereq][1] for prereq in dependencies.get(task, [])]
        earliest_start = max(prereq_finish_times) if prereq_finish_times else 0

        # Get earliest available resource
        resource_free_time, resource_id = heapq.heappop(available_resources)

        # Actual start = max(earliest_start, resource_free_time)
        start_time = max(earliest_start, resource_free_time)
        finish_time = start_time + durations[task]

        schedule[task] = (start_time, finish_time)
        resource_assignment[task] = resource_id

        # Resource becomes available again at finish_time
        heapq.heappush(available_resources, (finish_time, resource_id))

    total_time = max(finish for _, finish in schedule.values())
    return total_time, schedule, resource_assignment


def find_critical_path(tasks, durations, dependencies):
    """
    Find critical path (longest path determining minimum completion time)

    Critical path = sequence of tasks where any delay delays entire project

    Returns: (critical_path_length, critical_path_tasks)
    """
    # Compute earliest start and finish times
    topo_order = topological_sort_kahn(tasks, dependencies)

    if topo_order is None:
        return None, None

    # Forward pass: Compute earliest start/finish
    earliest_start = {task: 0 for task in tasks}
    earliest_finish = {}

    for task in topo_order:
        prereq_finish_times = [earliest_finish[prereq] for prereq in dependencies.get(task, [])]
        earliest_start[task] = max(prereq_finish_times) if prereq_finish_times else 0
        earliest_finish[task] = earliest_start[task] + durations[task]

    project_duration = max(earliest_finish.values())

    # Backward pass: Compute latest start/finish
    latest_finish = {task: project_duration for task in tasks}
    latest_start = {}

    # Build reverse graph
    reverse_graph = defaultdict(list)
    for task, prereqs in dependencies.items():
        for prereq in prereqs:
            reverse_graph[prereq].append(task)

    for task in reversed(topo_order):
        if reverse_graph[task]:
            successor_start_times = [latest_start[succ] for succ in reverse_graph[task]]
            latest_finish[task] = min(successor_start_times)
        else:
            latest_finish[task] = earliest_finish[task]

        latest_start[task] = latest_finish[task] - durations[task]

    # Find critical tasks (slack = 0)
    critical_tasks = [task for task in tasks
                      if earliest_start[task] == latest_start[task]]

    return project_duration, critical_tasks


class DependencyScheduler:
    """
    Task scheduler with dependency constraints
    """
    def __init__(self, tasks, durations, dependencies):
        """
        tasks: list of task_ids
        durations: dict {task_id: duration}
        dependencies: dict {task_id: [prerequisite_ids]}
        """
        self.tasks = tasks
        self.durations = durations
        self.dependencies = dependencies
        self.n = len(tasks)

    def solve(self, method='parallel', num_resources=float('inf')):
        """
        method='sequential': Single resource
        method='parallel': Multiple resources (greedy)
        method='critical_path': Find critical path

        num_resources: for parallel scheduling
        """
        if method == 'sequential':
            return schedule_with_dependencies_sequential(
                self.tasks, self.durations, self.dependencies
            )
        elif method == 'parallel':
            return schedule_with_dependencies_parallel(
                self.tasks, self.durations, self.dependencies, num_resources
            )
        elif method == 'critical_path':
            return find_critical_path(
                self.tasks, self.durations, self.dependencies
            )
        else:
            raise ValueError(f"Unknown method: {method}")

    def visualize_schedule(self, schedule, resource_assignment=None):
        """Print schedule with Gantt chart"""
        if not schedule:
            print("No valid schedule (cycle detected?)")
            return

        print(f"Total tasks: {len(schedule)}")

        # Sort by start time
        sorted_tasks = sorted(schedule.items(), key=lambda x: x[1][0])

        total_time = max(finish for _, finish in schedule.values())
        print(f"Total completion time: {total_time}")
        print()

        print("Schedule (Gantt chart):")
        for task, (start, finish) in sorted_tasks:
            duration = self.durations[task]
            prereqs = self.dependencies.get(task, [])
            resource = resource_assignment.get(task, 'N/A') if resource_assignment else 'N/A'

            # Gantt visualization
            timeline = ['-'] * min(total_time, 60)
            start_pos = min(start, 59)
            finish_pos = min(finish, 59)

            for i in range(start_pos, min(finish_pos, 60)):
                timeline[i] = '█'

            prereq_str = f"deps={prereqs}" if prereqs else "no deps"
            resource_str = f"R{resource}" if resource != 'N/A' else ""

            print(f"  {task:6s} [{start:3d}, {finish:3d}] dur={duration:2d} {prereq_str:20s} {resource_str:4s}  {''.join(timeline)}")


# Real-world applications
def schedule_build_system(modules):
    """
    Software build: Schedule compilation with module dependencies

    modules: dict {module_name: (compile_time, [dependencies])}
    Returns: (total_time, schedule)
    """
    tasks = list(modules.keys())
    durations = {name: info[0] for name, info in modules.items()}
    dependencies = {name: info[1] for name, info in modules.items()}

    scheduler = DependencyScheduler(tasks, durations, dependencies)

    print("=== Build System Scheduling ===")

    # Sequential build (1 core)
    print("\n1-Core Build:")
    total_seq, schedule_seq = scheduler.solve('sequential')
    scheduler.visualize_schedule(schedule_seq)

    # Parallel build (4 cores)
    print("\n4-Core Build:")
    total_par, schedule_par, resources = scheduler.solve('parallel', num_resources=4)
    scheduler.visualize_schedule(schedule_par, resources)

    # Critical path
    print("\nCritical Path Analysis:")
    cp_length, cp_tasks = scheduler.solve('critical_path')
    print(f"Critical path length: {cp_length}")
    print(f"Critical tasks: {cp_tasks}")
    print("(These tasks determine minimum build time)")

    speedup = total_seq / total_par if total_par > 0 else 1
    print(f"\nSpeedup: {speedup:.2f}x")

    return total_par, schedule_par


def schedule_project_tasks(project):
    """
    Project management: Schedule tasks with precedence constraints

    project: dict {task_name: (duration_days, [prerequisites])}
    Returns: (project_duration, schedule)
    """
    tasks = list(project.keys())
    durations = {name: info[0] for name, info in project.items()}
    dependencies = {name: info[1] for name, info in project.items()}

    scheduler = DependencyScheduler(tasks, durations, dependencies)

    print("=== Project Schedule (PERT/CPM) ===")

    # Unlimited resources (theoretical minimum)
    total_time, schedule, resources = scheduler.solve('parallel')
    scheduler.visualize_schedule(schedule, resources)

    # Critical path
    cp_length, cp_tasks = scheduler.solve('critical_path')
    print(f"\nProject duration: {total_time} days")
    print(f"Critical path: {' → '.join(cp_tasks)}")
    print("⚠ Any delay in critical tasks delays entire project")

    return total_time, schedule


if __name__ == '__main__':
    # Test 1: Simple build system
    print("=== Test 1: Software Build Dependencies ===")
    modules = {
        'utils':    (2, []),
        'config':   (1, []),
        'database': (3, ['config', 'utils']),
        'api':      (4, ['database']),
        'auth':     (2, ['database']),
        'frontend': (5, ['api', 'auth']),
        'tests':    (2, ['frontend']),
    }

    schedule_build_system(modules)
    print()

    # Test 2: Project management
    print("=== Test 2: Project Management (PERT/CPM) ===")
    project = {
        'Design':       (5, []),
        'Prototype':    (3, ['Design']),
        'Backend':      (7, ['Design']),
        'Frontend':     (6, ['Design']),
        'Integration':  (4, ['Backend', 'Frontend']),
        'Testing':      (5, ['Integration', 'Prototype']),
        'Deployment':   (2, ['Testing']),
    }

    schedule_project_tasks(project)
    print()

    # Test 3: Linear chain (no parallelism)
    print("=== Test 3: Linear Chain Dependencies ===")
    linear = {
        'Task1': (2, []),
        'Task2': (3, ['Task1']),
        'Task3': (1, ['Task2']),
        'Task4': (4, ['Task3']),
    }

    scheduler = DependencyScheduler(
        list(linear.keys()),
        {k: v[0] for k, v in linear.items()},
        {k: v[1] for k, v in linear.items()}
    )

    total, schedule, _ = scheduler.solve('parallel', num_resources=10)
    print(f"Total time with 10 resources: {total} (should be sum of all)")
    print("(No parallelism possible due to linear dependencies)")
    print()

    # Test 4: Diamond dependency
    print("=== Test 4: Diamond Dependency Pattern ===")
    diamond = {
        'Start':  (1, []),
        'PathA':  (3, ['Start']),
        'PathB':  (5, ['Start']),
        'Merge':  (2, ['PathA', 'PathB']),
    }

    scheduler = DependencyScheduler(
        list(diamond.keys()),
        {k: v[0] for k, v in diamond.items()},
        {k: v[1] for k, v in diamond.items()}
    )

    total, schedule, resources = scheduler.solve('parallel', num_resources=2)
    scheduler.visualize_schedule(schedule, resources)
    print("PathA and PathB can run in parallel")
    print()

    # Test 5: Cycle detection
    print("=== Test 5: Cycle Detection ===")
    cyclic = {
        'A': (1, ['B']),
        'B': (1, ['C']),
        'C': (1, ['A']),  # Cycle!
    }

    scheduler = DependencyScheduler(
        list(cyclic.keys()),
        {k: v[0] for k, v in cyclic.items()},
        {k: v[1] for k, v in cyclic.items()}
    )

    result = scheduler.solve('sequential')
    if result[0] is None:
        print("✓ Cycle detected correctly (A → B → C → A)")
    else:
        print("✗ Failed to detect cycle")

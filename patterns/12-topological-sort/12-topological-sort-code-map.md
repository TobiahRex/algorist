# Topological Sort - Code-to-Visual Mapping

**Purpose**: Connect the visual metaphor of task scheduling to actual code implementation, creating sticky understanding through three-way mapping.

---

## The Three-Way Connection

```
Visual Metaphor ←→ Actual Code ←→ Why It Works
  (Task dependencies)   (In-degrees + Queue)   (DAG ordering)
```

---

## Visual Metaphor Overview

**Physical Model**: Construction site with tasks that have dependencies - some jobs must finish before others can start

- **Task board** = DAG (Directed Acyclic Graph)
- **Dependency arrows** = Directed edges (A→B means "A before B")
- **Checklist counters** = In-degree array (how many dependencies each task has)
- **Ready queue** = Tasks with no remaining dependencies (in-degree = 0)
- **Completed tasks** = Result list (topological order)
- **Worker** = Algorithm processing tasks
- **Blocking tasks** = Tasks preventing others from starting
- **Circular dependency alarm** = Cycle detection (result.length < total tasks)

**Animation**: Worker checks ready queue for tasks with no blockers. Completes one task. Decrements dependency counters for tasks that were waiting. Repeats until all tasks done or cycle detected.

---

## Core State Mappings

### Map State to Visual Elements

| Visual Element | Code Variable | Type | Purpose |
|----------------|---------------|------|---------|
| **Task board** | `graph` | `Dict[int, List[int]]` | Adjacency list of dependencies |
| **Checklist counters** | `in_degree` | `List[int]` | Count of dependencies per task |
| **Ready queue** | `queue` | `deque` | Tasks ready to execute (in-degree = 0) |
| **Completed tasks** | `result` | `List[int]` | Topological order |
| **Current task** | `node` from `queue.popleft()` | `int` | Task being processed |
| **Blocked tasks** | `graph[node]` | `List[int]` | Tasks waiting for current task |
| **Dependency counter** | `in_degree[neighbor]` | `int` | How many tasks still blocking this one |

---

## Action Mappings

### Map Visual Actions to Code

| Visual Action | Code Lines | Why This Works |
|---------------|------------|----------------|
| **Build task board** | `graph[u].append(v)` for each edge | Create adjacency list |
| **Count dependencies** | `in_degree[v] += 1` for each edge | Track blocking tasks |
| **Find tasks with no blockers** | `queue = deque([i for i in range(n) if in_degree[i] == 0])` | Initialize ready queue |
| **Complete a task** | `node = queue.popleft(); result.append(node)` | Process ready task |
| **Decrement blocked task counters** | `in_degree[neighbor] -= 1` | Remove dependency |
| **Newly ready task** | `if in_degree[neighbor] == 0: queue.append(neighbor)` | No more blockers |
| **Check for cycles** | `if len(result) != num_nodes: return []` | Incomplete = cycle exists |
| **All tasks completed** | `queue` becomes empty | Successful sort |

---

## Code-to-Visual Translation Tables

### If You See This Code... Visualize This

| Code Pattern | Visual Image |
|--------------|-------------|
| `graph = {i: [] for i in range(n)}` | Empty task board, ready for dependencies |
| `graph[u].append(v)` | Draw arrow from task u to task v (u before v) |
| `in_degree = [0] * n` | Fresh checklist counters for all tasks |
| `in_degree[v] += 1` | Increment counter for task v (one more blocker) |
| `queue = deque([i for i in range(n) if in_degree[i] == 0])` | Find tasks ready to start (no dependencies) |
| `node = queue.popleft()` | Worker picks next ready task |
| `result.append(node)` | Mark task as completed |
| `in_degree[neighbor] -= 1` | Cross off one dependency for waiting task |
| `if in_degree[neighbor] == 0: queue.append(neighbor)` | Task now ready (all blockers done) |
| `len(result) != num_nodes` | Alarm! Circular dependency detected |

### If You Visualize This... Look for This Code

| Visual Image | Code Pattern |
|-------------|-------------|
| Draw dependency arrow A→B | `graph[A].append(B); in_degree[B] += 1` |
| Count blockers for each task | `in_degree[v] += 1` for each incoming edge |
| Find tasks with zero blockers | `[i for i in range(n) if in_degree[i] == 0]` |
| Worker completes ready task | `node = queue.popleft(); result.append(node)` |
| Cross off dependency | `in_degree[neighbor] -= 1` |
| Task becomes ready | `if in_degree[neighbor] == 0: queue.append(neighbor)` |
| Check for circular dependency | `if len(result) != num_nodes:` |

---

## Execution Trace Example

**Problem**: Course schedule with prerequisites:
```
0: Intro CS
1: Data Structures (requires 0)
2: Algorithms (requires 1)
3: Systems (requires 0)
4: ML (requires 2, 3)
```

Graph: `0 → 1 → 2 → 4`, `0 → 3 → 4`

### Step-by-Step: Visual + Code Side-by-Side

| Step | Visual State | Code State | Action |
|------|-------------|------------|--------|
| **1** | Build dependency graph | `graph = {0:[1,3], 1:[2], 2:[4], 3:[4], 4:[]}` | Create adjacency list |
| **2** | Count dependencies | `in_degree = [0, 1, 1, 1, 2]` | 0 has no prereqs, 4 has two |
| **3** | Find ready tasks | `queue = [0], result = []` | Only course 0 ready |
| **4** | Complete course 0 | `result = [0], queue = []` | Intro CS done |
| **5** | Unlock courses 1 and 3 | `in_degree = [0, 0, 1, 0, 2], queue = [1, 3]` | Decrease counters, both ready |
| **6** | Complete course 1 | `result = [0, 1], queue = [3]` | Data Structures done |
| **7** | Unlock course 2 | `in_degree = [0, 0, 0, 0, 2], queue = [3, 2]` | Algorithms ready |
| **8** | Complete course 3 | `result = [0, 1, 3], queue = [2]` | Systems done |
| **9** | Decrement ML counter | `in_degree = [0, 0, 0, 0, 1], queue = [2]` | ML needs one more prereq |
| **10** | Complete course 2 | `result = [0, 1, 3, 2], queue = []` | Algorithms done |
| **11** | Unlock ML | `in_degree = [0, 0, 0, 0, 0], queue = [4]` | All prereqs complete |
| **12** | Complete ML | `result = [0, 1, 3, 2, 4], queue = []` | All courses done! |

**Final Result**: Valid course order: `[0, 1, 3, 2, 4]` (one valid topological ordering)

### Cycle Detection Example

**Problem**: Circular dependency:
```
A → B → C → A (cycle!)
```

| Step | Visual State | Code State | Action |
|------|-------------|------------|--------|
| **1** | Count dependencies | `in_degree = [1, 1, 1]` | Every task has one blocker |
| **2** | Find ready tasks | `queue = []` | No tasks with zero dependencies! |
| **3** | Queue empty, check result | `result = [], len(result) = 0 != 3` | Cycle detected! |

**Result**: Empty list (cycle detected, no valid ordering)

---

## Pattern Recognition: Code ↔ Visual

### Common Code Patterns in Topological Sort

| Code Pattern | What It Means Visually | When You Use It |
|--------------|------------------------|-----------------|
| `in_degree[v] += 1` | Add blocker to task v's checklist | Building dependency graph |
| `queue = deque([i for i in range(n) if in_degree[i] == 0])` | Find tasks ready to start | Initialize algorithm |
| `node = queue.popleft()` | Pick next ready task | BFS-style processing |
| `for neighbor in graph[node]:` | Check tasks waiting for this one | Process dependencies |
| `in_degree[neighbor] -= 1` | Cross off completed dependency | Update counters |
| `if in_degree[neighbor] == 0: queue.append(neighbor)` | Task now ready (all blockers done) | Add to ready queue |
| `if len(result) != num_nodes: return []` | Not all tasks completed = cycle | Cycle detection |
| `return result` | Valid task ordering | Success |

---

## Key Insights

### Insight 1: In-Degree = "Number of Blockers"
**Visual**: Checklist counter shows how many tasks must finish before this one can start
**Code**: `in_degree[node]` = count of incoming edges
**Why**: When counter reaches 0, all blockers are done, task is ready

### Insight 2: Queue Contains "Ready to Execute" Tasks
**Visual**: Ready queue has only tasks with no remaining dependencies
**Code**: `queue` only contains nodes with `in_degree == 0`
**Why**: Can safely execute these tasks without violating dependencies

### Insight 3: BFS-Like Processing
**Visual**: Worker processes tasks level-by-level (all independent tasks, then tasks depending on them, etc.)
**Code**: FIFO queue ensures level-order processing
**Why**: Similar to BFS but on DAG instead of tree

### Insight 4: Cycle Detection is Built-In
**Visual**: If some tasks never become ready, there's a circular dependency
**Code**: `len(result) < num_nodes` means some nodes never added (stuck in cycle)
**Why**: Cyclic dependencies mean some in-degrees never reach 0

### Insight 5: Multiple Valid Orderings
**Visual**: If tasks A and B have no dependencies between them, either can go first
**Code**: Multiple topological sorts can exist for same DAG
**Why**: Partial ordering, not total ordering - flexibility in independent tasks

---

## Real-World Code Mappings

### Use Case 1: Build Systems - Compilation Order

**Visual**: Compile files in dependency order (headers before source files using them)

| Visual Element | Production Code | System |
|----------------|-----------------|--------|
| Source files | Nodes | Compilation units |
| Include dependencies | Edges | #include relationships |
| In-degree | Number of includes | Dependencies count |
| Compilation order | Topological sort result | Makefile order |

**Code Pattern**:
```python
def build_order(files, includes):
    graph = {f: [] for f in files}
    in_degree = {f: 0 for f in files}

    # Build dependency graph
    for file_a, file_b in includes:  # file_a includes file_b
        graph[file_b].append(file_a)  # file_b before file_a
        in_degree[file_a] += 1

    # Find files with no dependencies
    queue = deque([f for f in files if in_degree[f] == 0])
    build_order = []

    while queue:
        file = queue.popleft()
        build_order.append(file)

        for dependent in graph[file]:
            in_degree[dependent] -= 1
            if in_degree[dependent] == 0:
                queue.append(dependent)

    if len(build_order) != len(files):
        raise Exception("Circular dependency detected!")

    return build_order
```

**Sticky Mapping**: Build tools (Make, CMake) use topological sort for compilation order

---

### Use Case 2: Package Managers - Installation Order

**Visual**: Install dependencies before packages that need them

| Visual Element | Production Code | Tool |
|----------------|-----------------|------|
| Packages | Nodes | npm packages |
| Dependencies | Edges | package.json dependencies |
| In-degree | Dependency count | How many packages needed |
| Install order | Topological sort | npm install sequence |

**Code Pattern**:
```python
def install_packages(packages, dependencies):
    graph = {p: [] for p in packages}
    in_degree = {p: 0 for p in packages}

    for pkg, dep in dependencies:  # pkg depends on dep
        graph[dep].append(pkg)  # dep before pkg
        in_degree[pkg] += 1

    queue = deque([p for p in packages if in_degree[p] == 0])
    install_order = []

    while queue:
        package = queue.popleft()
        install_order.append(package)
        print(f"Installing {package}")

        for dependent_pkg in graph[package]:
            in_degree[dependent_pkg] -= 1
            if in_degree[dependent_pkg] == 0:
                queue.append(dependent_pkg)

    if len(install_order) != len(packages):
        raise Exception("Circular dependency!")

    return install_order
```

**Sticky Mapping**: npm/pip use topological sort to resolve package install order

---

### Use Case 3: Database Migrations - Schema Changes

**Visual**: Apply migrations in dependency order (create tables before foreign keys)

| Visual Element | Production Code | System |
|----------------|-----------------|--------|
| Migrations | Nodes | Schema changes |
| Foreign keys | Edges | Table dependencies |
| In-degree | Required tables | Tables needed first |
| Migration order | Topological sort | Alembic/Flyway order |

**Sticky Mapping**: Migration tools topologically sort schema changes

---

## Common Variations: Same Pattern, Different Contexts

### Kahn's Algorithm (BFS-based)
**Visual**: Worker picks ready tasks one at a time
**Code**: Current implementation (queue-based)
**Example**: Course schedule, build order

### DFS-based Topological Sort
**Visual**: Recursively complete dependencies, add task after dependencies done
**Code**: Post-order DFS with visiting/visited states
**Example**: Same problems, different algorithm

### Detecting All Cycles
**Visual**: Find all circular dependency chains
**Code**: Track strongly connected components
**Example**: Advanced dependency analysis

### Parallel Task Execution
**Visual**: Find tasks that can run simultaneously (same level in topo sort)
**Code**: Track levels during BFS
**Example**: Build parallelization, CI/CD optimization

---

## Self-Check: Do You Have Sticky Understanding?

### Test 1: Code → Visual
See this code:
```python
for u, v in edges:
    graph[u].append(v)
    in_degree[v] += 1

queue = deque([i for i in range(n) if in_degree[i] == 0])
```

**Can you visualize?**
"Building task board: for each dependency arrow u→v, add v to u's list and increment v's blocker counter. Then find all tasks with zero blockers (ready to start) and put them in the ready queue."

### Test 2: Visual → Code
Imagine: "I have tasks with dependencies. I want to find a valid execution order. I'll track how many blockers each task has. I'll process tasks with no blockers, and when I finish a task, I'll decrement the blocker count for tasks waiting on it."

**Can you write the code?**
```python
def topological_sort(num_tasks, dependencies):
    graph = {i: [] for i in range(num_tasks)}
    in_degree = [0] * num_tasks

    for before, after in dependencies:
        graph[before].append(after)
        in_degree[after] += 1

    queue = deque([i for i in range(num_tasks) if in_degree[i] == 0])
    result = []

    while queue:
        task = queue.popleft()
        result.append(task)

        for dependent_task in graph[task]:
            in_degree[dependent_task] -= 1
            if in_degree[dependent_task] == 0:
                queue.append(dependent_task)

    return result if len(result) == num_tasks else []  # Empty if cycle
```

### Test 3: Explain Why
**Question**: How does topological sort detect cycles?

**Answer**: If there's a cycle, at least one node in the cycle will never have in-degree 0 (always has dependencies in the cycle). These nodes never enter the ready queue, so they're never added to the result. After processing all reachable nodes, `len(result) < num_nodes` indicates some nodes were unreachable due to circular dependencies. This cycle detection is automatic and free - it's built into the algorithm.

---

## The Stickiest Mapping

**Visual**: Construction site task board with dependency arrows. Worker maintains ready queue (tasks with no blockers), completes tasks, crosses off dependencies, adds newly ready tasks. Checklist counters track remaining blockers.

**Core Code**: Build graph and in-degree array. Queue tasks with in-degree 0. Process each task, decrement neighbors' in-degrees, add newly ready neighbors. Check if all tasks processed (cycle detection).

**Core Insight**: In-degree tracks "how many tasks must finish before this one." Queue contains "ready to execute" tasks. BFS-style processing ensures dependencies satisfied. If result is incomplete, there's a cycle (circular dependency alarm).

**When you see topological sort code, you see task scheduling. When you have dependencies to order, you know topological sort is the answer.**

**The connection is permanent!**

---

## Next Steps

1. **Draw a dependency graph** and manually compute topological order
2. **Implement both Kahn's and DFS** versions
3. **Solve course schedule problems** on LeetCode
4. **Test cycle detection** with circular dependencies
5. **Teach someone else** - that's when it truly sticks!

**Time investment**: 2-3 hours
**Return**: Deep, intuitive understanding that lasts years

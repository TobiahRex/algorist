# DFS (Depth-First Search) - Code-to-Visual Mapping

**Purpose**: Connect the visual metaphor of maze exploration to actual code implementation, creating sticky understanding through three-way mapping.

---

## The Three-Way Connection

```
Visual Metaphor ←→ Actual Code ←→ Why It Works
  (Maze exploration)   (Stack/Recursion)   (Deep before wide)
```

---

## Visual Metaphor Overview

**Physical Model**: Explorer in a maze with a rope - follow one path to dead-end, backtrack, try another

- **Explorer** = Current node being visited
- **Rope behind explorer** = Call stack / explicit stack
- **Chalk marks on walls** = Visited set
- **Dead end** = Leaf node or all neighbors visited
- **Backtracking** = Returning from recursion / popping stack
- **Rope unspooling** = Going deeper (recursion depth)
- **Rope retracting** = Climbing back up (return statements)
- **Fork in path** = Node with multiple unvisited neighbors

**Animation**: Explorer follows one path all the way to a dead-end before backtracking to try another path. Goes deep before going wide.

---

## Core State Mappings

### Map State to Visual Elements

| Visual Element | Code Variable | Type | Purpose |
|----------------|---------------|------|---------|
| **Explorer's position** | `node` parameter | `Node` | Current node in recursion |
| **Rope (call stack)** | Implicit recursion stack | Stack frames | Path from root to current |
| **Chalk marks** | `visited` | `Set[Node]` | Nodes already explored |
| **Rope in hand** | Explicit `stack` | `List[Node]` | For iterative DFS |
| **Current path** | `path` | `List[Node]` | Nodes from root to current |
| **Fork choices** | `graph[node]` | `List[Node]` | Unvisited neighbors |
| **Dead end flag** | `if not node or node in visited` | `bool` | Base case / skip condition |

---

## Action Mappings

### Map Visual Actions to Code

| Visual Action | Code Lines | Why This Works |
|---------------|------------|----------------|
| **Enter new room (recursive)** | `dfs(neighbor)` | Explore deeply before siblings |
| **Enter new room (iterative)** | `stack.append(neighbor)` | Add to exploration stack |
| **Mark wall with chalk** | `visited.add(node)` | Track where we've been |
| **Check if already marked** | `if node in visited: return` | Skip explored areas |
| **Hit dead end** | `if not node: return` | Base case - empty path |
| **Backtrack** | `return` from function | Climb back up rope |
| **Try another fork** | `for neighbor in graph[node]:` | Explore all branches |
| **Remove chalk (backtracking search)** | `visited.remove(node)` | Allow revisiting for all paths |
| **Rope extends deeper** | Recursion depth increases | Going deeper in maze |

---

## Code-to-Visual Translation Tables

### If You See This Code... Visualize This

| Code Pattern | Visual Image |
|--------------|-------------|
| `def dfs(node):` | Explorer enters room |
| `if not node: return` | Hit dead end, turn around |
| `if node in visited: return` | Already marked with chalk, skip |
| `visited.add(node)` | Mark current room with chalk |
| `for neighbor in graph[node]:` | Look at all exits from current room |
| `dfs(neighbor)` | Walk through exit (go deeper) |
| `return` | Backtrack through previous room |
| `stack = [start]` | Start exploration with initial position |

### If You Visualize This... Look for This Code

| Visual Image | Code Pattern |
|-------------|-------------|
| Explorer enters new room | `def dfs(node):` or `node = stack.pop()` |
| Mark room as visited | `visited.add(node)` |
| Check if room already visited | `if node in visited: return` |
| Choose a path (fork) | `for neighbor in graph[node]:` |
| Walk down chosen path | `dfs(neighbor)` (recursive) or `stack.append(neighbor)` (iterative) |
| Hit dead end, turn back | `return` or continue loop |
| Rope shows path from start | Recursion call stack depth |

---

## Execution Trace Example

**Problem**: DFS on graph:
```
    A
   / \
  B   C
 / \   \
D   E   F
```

### Recursive DFS: Visual + Code Side-by-Side

| Step | Visual State | Code State | Action |
|------|-------------|------------|--------|
| **1** | Explorer at A, marks it | `dfs(A), visited={A}` | Start exploration |
| **2** | Walk to B (left path), mark it | `dfs(B), visited={A,B}` | Go deep left |
| **3** | Walk to D (leftmost), mark it | `dfs(D), visited={A,B,D}` | Leaf reached |
| **4** | D is dead end, backtrack to B | Return from `dfs(D)` | Climb rope back |
| **5** | From B, walk to E (right path) | `dfs(E), visited={A,B,D,E}` | Try other fork from B |
| **6** | E is dead end, backtrack to B | Return from `dfs(E)` | Backtrack again |
| **7** | B fully explored, backtrack to A | Return from `dfs(B)` | Back to A |
| **8** | From A, walk to C (right path) | `dfs(C), visited={A,B,D,E,C}` | Try right branch |
| **9** | From C, walk to F | `dfs(F), visited={A,B,D,E,C,F}` | Deep into C's branch |
| **10** | F is dead end, backtrack to C, then A | Return from `dfs(F)`, `dfs(C)`, `dfs(A)` | All paths explored |

**Final Result**: Visit order: `[A,B,D,E,C,F]` - Deep before wide

### Iterative DFS with Stack: Visual + Code Side-by-Side

| Step | Visual State | Code State | Action |
|------|-------------|------------|--------|
| **1** | Start with A in hand | `stack=[A], visited={}` | Initialize |
| **2** | Take A from stack, mark it | `node=A, visited={A}, stack=[B,C]` | Pop and process, push children |
| **3** | Take C from stack (LIFO), mark it | `node=C, visited={A,C}, stack=[B,F]` | Go deep right first (LIFO order) |
| **4** | Take F from stack, mark it | `node=F, visited={A,C,F}, stack=[B]` | Deep before wide |
| **5** | Take B from stack, mark it | `node=B, visited={A,C,F,B}, stack=[D,E]` | Backtracked to B |
| **6** | Take E, then D | `visited={A,C,F,B,E,D}` | Complete exploration |

**Note**: Iterative order differs from recursive due to stack order, but both are valid DFS

---

## Pattern Recognition: Code ↔ Visual

### Common Code Patterns in DFS

| Code Pattern | What It Means Visually | When You Use It |
|--------------|------------------------|-----------------|
| `def dfs(node):` | Explorer function (recursive) | Clean, intuitive DFS |
| `if node in visited: return` | Already explored, skip | Prevent cycles |
| `visited.add(node)` | Mark current position | Track exploration |
| `for neighbor in graph[node]:` | Check all exits | Explore all branches |
| `dfs(neighbor)` | Walk through exit (go deep) | Recursive exploration |
| `stack = [start]` | Start with initial position | Iterative DFS setup |
| `node = stack.pop()` | Take next position from stack (LIFO) | Iterative deep-first order |
| `path.append(node); ...; path.pop()` | Track current path + backtrack | Path-finding problems |

---

## Key Insights

### Insight 1: LIFO Stack Gives "Deep Before Wide"
**Visual**: Explorer follows first path to end before trying second path
**Code**: Recursion call stack (LIFO) or explicit stack with `pop()`
**Why**: Last added is first explored - naturally goes deep

### Insight 2: Recursion = Implicit Stack
**Visual**: Rope unspools (deeper recursion) and retracts (return)
**Code**: Function call stack tracks path from root to current node
**Why**: Recursion naturally models depth-first exploration

### Insight 3: Visited Set Prevents Cycles
**Visual**: Chalk marks prevent walking in circles
**Code**: `if node in visited: return` or `continue`
**Why**: Without visited tracking, DFS could infinite loop in cyclic graphs

### Insight 4: Backtracking = Two-Phase Visited
**Visual**: Mark room when entering, erase mark when leaving (to explore all paths)
**Code**: `visited.add(node)` before recursion, `visited.remove(node)` after
**Why**: Allows finding ALL paths, not just checking existence

### Insight 5: Memory Efficient for Deep Trees
**Visual**: Rope only tracks current path, not all nodes at current depth
**Code**: Stack size = O(height), not O(width)
**Why**: DFS uses O(h) space vs BFS's O(w) - better for deep, narrow graphs

---

## Real-World Code Mappings

### Use Case 1: File System Traversal

**Visual**: Explorer descending through nested directories

| Visual Element | Production Code | System |
|----------------|-----------------|--------|
| Current directory | `node` | Filesystem path |
| Subdirectories | `children` | Nested folders |
| Files | Leaf nodes | Files (dead ends) |
| Chalk marks | Already visited | Prevent infinite loops |
| Rope depth | Path from root | Current depth |

**Code Pattern**:
```python
def dfs_filesystem(directory, visited=None):
    if visited is None:
        visited = set()

    if directory in visited:
        return

    visited.add(directory)
    print(f"Visiting {directory}")

    for subdir in directory.children:
        dfs_filesystem(subdir, visited)
```

**Sticky Mapping**: `find` command uses DFS to explore directories deeply

---

### Use Case 2: Dependency Resolution - Build Systems

**Visual**: Explorer following dependency chains to find leaf dependencies first

| Visual Element | Production Code | Tool |
|----------------|-----------------|------|
| Package | Node | Dependency graph |
| Dependencies | Edges | Requires relationship |
| Installation order | Post-order DFS | Bottom-up (leaves first) |

**Code Pattern**:
```python
def install_dependencies(package, visited, install_order):
    if package in visited:
        return

    visited.add(package)

    # DFS into dependencies first
    for dependency in package.dependencies:
        install_dependencies(dependency, visited, install_order)

    # Install this package after dependencies (post-order)
    install_order.append(package)
```

**Sticky Mapping**: npm resolves dependencies via DFS (leaves before parents)

---

### Use Case 3: Garbage Collection - Mark and Sweep

**Visual**: Explorer marking all reachable rooms (objects) from GC roots

| Visual Element | Production Code | System |
|----------------|-----------------|--------|
| GC roots | Start nodes | Stack, globals |
| Object references | Graph edges | Pointers |
| Reachable objects | Visited set | Keep these |
| Unreachable objects | Not in visited | Garbage collect |

**Code Pattern**:
```python
def mark_reachable(obj, reachable):
    if obj in reachable:
        return

    reachable.add(obj)

    for referenced_obj in obj.references:
        mark_reachable(referenced_obj, reachable)

# After DFS: sweep unmarked objects
def sweep(all_objects, reachable):
    for obj in all_objects:
        if obj not in reachable:
            free(obj)  # Garbage collect
```

**Sticky Mapping**: DFS marks all reachable objects from roots

---

## Common Variations: Same DFS, Different Contexts

### Standard DFS (Existence Check)
**Visual**: Mark rooms as visited, explore all reachable
**Code**: `visited.add(node)` once, never remove
**Example**: "Is there a path from A to B?"

### DFS with Backtracking (All Paths)
**Visual**: Mark room when entering, erase when leaving
**Code**: `visited.add(node)` before, `visited.remove(node)` after recursion
**Example**: "Find all paths from A to B"

### Pre-Order DFS
**Visual**: Process room before exploring exits
**Code**: Work at top of function, before recursive calls
**Example**: Tree serialization, copying

### Post-Order DFS
**Visual**: Process room after returning from all exits
**Code**: Work at bottom of function, after recursive calls
**Example**: Directory size calculation, tree height

### Iterative DFS
**Visual**: Explicit rope tracking instead of automatic
**Code**: Manual stack with `push` and `pop`
**Example**: Avoid stack overflow, explicit control

---

## Self-Check: Do You Have Sticky Understanding?

### Test 1: Code → Visual
See this code:
```python
def dfs(node, visited):
    if node in visited:
        return

    visited.add(node)

    for neighbor in graph[node]:
        dfs(neighbor, visited)
```

**Can you visualize?**
"Explorer enters room, checks if already marked with chalk. If not, marks it and explores each exit one by one, going as deep as possible down each path before backtracking to try the next exit."

### Test 2: Visual → Code
Imagine: "Explorer needs to find ALL paths from start to goal in a maze. They mark rooms when entering but ERASE the mark when leaving (so other paths can revisit). They record complete paths when reaching the goal."

**Can you write the code?**
```python
def find_all_paths(node, goal, path, visited, all_paths):
    path.append(node)
    visited.add(node)

    if node == goal:
        all_paths.append(path[:])  # Found a path!
    else:
        for neighbor in graph[node]:
            if neighbor not in visited:
                find_all_paths(neighbor, goal, path, visited, all_paths)

    # Backtrack: erase mark and remove from path
    path.pop()
    visited.remove(node)
```

### Test 3: Explain Why
**Question**: When should I use DFS instead of BFS?

**Answer**: Use DFS when:
1. Problem requires exploring ALL paths (backtracking problems)
2. Graph is very deep and narrow (DFS uses O(h) vs BFS's O(w) space)
3. Checking existence/connectivity (not shortest path)
4. Need to process children before parent (post-order tree traversal)
5. Memory is limited but graph is deep

Use BFS when:
1. Need shortest path in unweighted graph
2. Need to explore level-by-level
3. Target might be close to start (BFS finds it faster)

---

## The Stickiest Mapping

**Visual**: Explorer with rope in maze. Follow one path to dead-end, backtrack, try another. Chalk marks track visited rooms. Rope shows path from entrance to current position.

**Core Code**: Recursion (implicit stack) or explicit stack. LIFO order ensures depth-first. Visited set prevents cycles. For all-paths problems, unmark when backtracking.

**Core Insight**: Stack (recursion or explicit) gives LIFO behavior, naturally exploring deep before wide. This is opposite of BFS's FIFO queue. DFS is memory-efficient for deep graphs (O(h) space) and natural for backtracking problems.

**When you see DFS code, you see maze exploration. When you need to explore all paths or go deep, you know DFS is the tool.**

**The connection is permanent!**

---

## Next Steps

1. **Draw a graph on paper** and trace DFS path-by-path
2. **Implement both recursive and iterative** versions
3. **Solve backtracking problems** (all paths, combinations)
4. **Compare with BFS** on same graph - see the difference
5. **Teach someone else** - that's when it truly sticks!

**Time investment**: 2-3 hours
**Return**: Deep, intuitive understanding that lasts years

# Backtracking - Code-to-Visual Mapping

**Purpose**: Connect the visual metaphor of exploring a decision tree to actual code implementation, creating sticky understanding through three-way mapping.

---

## The Three-Way Connection

```
Visual Metaphor ←→ Actual Code ←→ Why It Works
  (Decision tree)   (Choose/Explore/Unchoose)   (Exhaustive + pruning)
```

---

## Visual Metaphor Overview

**Physical Model**: Explorer navigating a maze with chalk to mark paths

- **Intersection** = Decision point (current state)
- **Paths at intersection** = Available choices
- **Chalk mark** = Current choice made (state modification)
- **Walking down path** = Recursive exploration
- **Dead end** = Invalid/complete state
- **Erasing chalk** = Undoing choice (backtrack)
- **Map of valid routes** = Collection of solutions
- **Pruning shears** = Constraint checking (skip invalid paths)

**Animation**: Walk forward making choice (chalk mark), explore recursively, hit dead-end or find exit, walk back erasing chalk, try next path.

---

## Core State Mappings

### Map State to Visual Elements

| Visual Element | Code Variable | Type | Purpose |
|----------------|---------------|------|---------|
| **Current intersection** | `state` or `current` | `List[T]` | Partial solution built so far |
| **Paths forward** | `choices` or `range(n)` | `Iterable[T]` | Available options at this step |
| **Chalk marks on wall** | Modified `state` | Mutable state | Record of choices made |
| **Map of routes found** | `result` or `solutions` | `List[List[T]]` | All valid complete solutions |
| **Dead-end detector** | `is_goal()` or `is_valid()` | `bool` function | Check if state is complete/valid |
| **Pruning shears** | `if not is_valid(): continue` | Conditional | Skip paths violating constraints |
| **Path depth** | `index` or `row` parameter | `int` | How many decisions made |

---

## Action Mappings

### Map Visual Actions to Code

| Visual Action | Code Lines | Why This Works |
|---------------|------------|----------------|
| **Draw chalk mark** | `state.append(choice)` or `board[row] = col` | Record decision, modify state |
| **Walk down path** | `backtrack(state)` or recursive call | Explore consequences of choice |
| **Erase chalk mark** | `state.pop()` or `board[row] = -1` | Undo decision, restore previous state |
| **Check if at exit** | `if index == len(nums):` | Found complete solution |
| **Record route on map** | `result.append(state.copy())` | Save successful path |
| **Check if path blocked** | `if not is_valid(choice):` | Constraint violation, skip this path |
| **Try all paths at intersection** | `for choice in choices:` | Exhaustively explore options |
| **Prune obviously bad path** | `if col in cols: continue` | Don't even try paths violating constraints |

---

## Code-to-Visual Translation Tables

### If You See This Code... Visualize This

| Code Pattern | Visual Image |
|--------------|-------------|
| `for choice in choices:` | Standing at intersection, looking at all possible paths forward |
| `state.append(choice)` | Drawing chalk mark on wall, committing to this path |
| `backtrack(state)` | Walking forward down the chosen path to explore it |
| `state.pop()` | Walking back, erasing chalk mark, returning to intersection |
| `if index == n: result.append(state.copy())` | Reached exit, marking route on map before backtracking |
| `if not is_valid(choice): continue` | Seeing "Dead End" sign, skipping that path without exploring |
| `visited.add(node)` / `visited.remove(node)` | Marking room visited/unvisited with chalk |

### If You Visualize This... Look for This Code

| Visual Image | Code Pattern |
|-------------|-------------|
| Explorer at intersection considering paths | `for choice in get_choices(state):` |
| Drawing chalk mark before walking | `make_choice(choice, state)` |
| Walking forward to explore path | `backtrack(new_state)` or recursive call |
| Hitting dead-end, turning back | Return from recursion (implicit backtrack) |
| Erasing chalk when returning | `undo_choice(choice, state)` |
| Checking if exit reached | `if is_goal(state): save_solution()` |
| Skipping blocked paths | `if not is_safe(choice): continue` |

---

## Execution Trace Example

**Problem**: Generate all subsets of `[1, 2, 3]`

### Step-by-Step: Visual + Code Side-by-Side

| Step | Visual State | Code State | Action |
|------|-------------|------------|--------|
| **1** | At start, current path: [], choices: include 1 or skip 1 | `index=0, current=[], choices=[include, skip]` | Choose: include 1 |
| **2** | Chalk mark "1", path: [1], at next intersection | `current=[1], index=1` | Explore: recurse with 1 |
| **3** | Path: [1], choices: include 2 or skip 2 | `index=1, current=[1]` | Choose: include 2 |
| **4** | Chalk "1,2", path: [1,2], next intersection | `current=[1,2], index=2` | Explore: recurse with 2 |
| **5** | Path: [1,2], choices: include 3 or skip 3 | `index=2, current=[1,2]` | Choose: include 3 |
| **6** | Path: [1,2,3], reached end! | `index=3, current=[1,2,3]` | Found solution! Record it |
| **7** | Record [1,2,3] on map, backtrack | `result.append([1,2,3].copy())` | Save solution |
| **8** | Erase "3", back at [1,2], try skip 3 | `current=[1,2], index=2` | Unchoose: pop 3 |
| **9** | Skip 3: path [1,2], reached end! | `index=3, current=[1,2]` | Found solution! Record [1,2] |
| **10** | Backtrack to [1], erase "2" | `current=[1], index=1` | Unchoose: pop 2 |
| **11** | Skip 2, path [1], choices for 3... | `index=2, current=[1]` | Continue exploration... |
| ...continue until all paths explored... | | | |

**Final Result**: Map contains all 8 subsets: `[], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]`

---

## Pattern Recognition: Code ↔ Visual

### Common Code Patterns in Backtracking

| Code Pattern | What It Means Visually | When You Use It |
|--------------|------------------------|-----------------|
| `for choice in choices:` | Try each path at intersection | Always (core backtracking loop) |
| `state.append(choice); backtrack(); state.pop()` | Choose-Explore-Unchoose | Standard backtracking template |
| `if not is_valid(choice): continue` | Pruning shears - skip invalid paths | Before making choice (early pruning) |
| `if index == n: result.append(state.copy())` | Found exit, record route | Goal state reached |
| `result.append(state[:])` or `state.copy()` | Copy map (not reference) | Critical! Must copy, not reference |
| `visited.add(x); backtrack(); visited.remove(x)` | Mark/unmark visited rooms | Graph/grid backtracking |
| `board[row][col] = val; backtrack(); board[row][col] = '.'` | Place/remove chess piece | Grid-based backtracking |

---

## Key Insights

### Insight 1: The Undo is Critical
**Visual**: Must erase chalk marks when backtracking, or map shows wrong routes
**Code**: `state.pop()` or `board[row] = -1` restores state
**Why**: Without undo, subsequent paths see polluted state from previous failed attempts

### Insight 2: Must Copy, Not Reference
**Visual**: Copying route to permanent map, not just pointing at current chalk marks
**Code**: `result.append(state.copy())` not `result.append(state)`
**Why**: `state` is mutated during backtracking; need snapshot of this moment

### Insight 3: Pruning Accelerates Search
**Visual**: Seeing "Dead End" sign without walking down path
**Code**: `if not is_valid(choice): continue` before recursing
**Why**: Check constraints before making choice, not after - saves entire subtree exploration

### Insight 4: Time Complexity is Exponential
**Visual**: Decision tree branches exponentially (2^n paths for n binary choices)
**Code**: Worst case O(2^n) or O(n!) depending on choices per level
**Why**: Exhaustive exploration of all possibilities, pruning only improves constants

### Insight 5: State Management Patterns
**Visual**: Different ways to mark path (chalk on wall vs. rope trail vs. breadcrumbs)
**Code**:
- Pass modified state: `backtrack(state + [choice])`
- Mutate + restore: `state.append(choice); backtrack(); state.pop()`
- Track separately: `used[i] = True; backtrack(); used[i] = False`
**Why**: Different problems need different state tracking strategies

---

## Real-World Code Mappings

### Use Case 1: N-Queens (Chess Placement)

**Visual**: Placing queens on chessboard, checking if attacked

| Visual Element | Production Code | System |
|----------------|-----------------|--------|
| Chessboard | `board: List[int]` where `board[row] = col` | State representation |
| Place queen | `board[row] = col; cols.add(col)` | Make choice |
| Check if attacked | `if col in cols or diag conflict:` | Constraint validation |
| Remove queen | `board[row] = -1; cols.remove(col)` | Undo choice |
| Complete board | `if row == n: save_solution()` | Goal reached |

**Code Pattern**:
```python
def solve_nqueens(row):
    if row == n:
        solutions.append(board.copy())
        return

    for col in range(n):
        if col in cols or diagonal_conflict(row, col):
            continue  # Pruning

        # Choose
        board[row] = col
        cols.add(col)

        # Explore
        solve_nqueens(row + 1)

        # Unchoose
        cols.remove(col)
```

**Sticky Mapping**: Each row places one queen, column set tracks occupied columns, backtrack tries different columns

---

### Use Case 2: Sudoku Solver

**Visual**: Filling grid cells with digits, checking row/col/box constraints

| Visual Element | Production Code | Tool |
|----------------|-----------------|------|
| Empty cell | `board[r][c] == '.'` | Decision point |
| Try digit | `board[r][c] = digit` | Make choice |
| Check valid | `is_valid(board, r, c, digit)` | Constraint check |
| Undo digit | `board[r][c] = '.'` | Backtrack |
| All filled | `find_empty() returns None` | Solution found |

**Code Pattern**:
```python
def solve_sudoku(board):
    cell = find_empty_cell(board)
    if not cell:
        return True  # Complete!

    row, col = cell
    for digit in '123456789':
        if is_valid(board, row, col, digit):
            board[row][col] = digit  # Choose

            if solve_sudoku(board):  # Explore
                return True

            board[row][col] = '.'  # Unchoose

    return False
```

**Sticky Mapping**: Find empty cell = next intersection, try digits = paths forward, validation = pruning

---

## Common Variations: Same Visual, Different Rules

### Generate Combinations
**Visual**: Choose K items from N, order doesn't matter
**Code**: `for i in range(start, n):` (start prevents duplicates)
**Example**: Combinations(n=4, k=2) → [[1,2], [1,3], [1,4], [2,3], [2,4], [3,4]]

### Generate Permutations
**Visual**: Arrange N items in all orders, use each exactly once
**Code**: `if i not in used:` (track which items used)
**Example**: Permutations([1,2,3]) → [[1,2,3], [1,3,2], [2,1,3], ...]

### Subsets (Power Set)
**Visual**: For each item, choose to include or exclude
**Code**: Two branches: `backtrack(i+1, current + [nums[i]])` and `backtrack(i+1, current)`
**Example**: Subsets([1,2]) → [[], [1], [2], [1,2]]

### Path Finding (All Paths)
**Visual**: Explore maze, mark visited, unmark on backtrack
**Code**: `visited.add(node); dfs(neighbor); visited.remove(node)`
**Example**: All paths from A to D in graph

### Partition Problems
**Visual**: Assign items to K buckets, check bucket constraints
**Code**: `for bucket in buckets: if valid: add_to_bucket; backtrack; remove`
**Example**: Partition array into K equal-sum subsets

---

## Self-Check: Do You Have Sticky Understanding?

### Test 1: Code → Visual
See this code:
```python
for choice in choices:
    state.append(choice)
    backtrack(state)
    state.pop()
```

**Can you visualize?**
"At intersection, try each path: draw chalk mark (append), walk forward (recurse), return and erase mark (pop), try next path."

### Test 2: Visual → Code
Imagine: "Explorer places marker at room entrance, enters room to explore, finds it's dead-end, exits room and removes marker, tries next door."

**Can you write the code?**
```python
for room in available_rooms:
    markers[room] = True  # Place marker
    explore_room(room)    # Enter and explore
    markers[room] = False # Remove marker
```

### Test 3: Explain Why
**Question**: Why must we do `result.append(state.copy())` instead of `result.append(state)`?

**Answer**: `state` is mutable and reused throughout backtracking. Without copying, all entries in `result` would reference the same list object, which gets modified. By copying, we save a snapshot of `state` at this moment - like taking a photo of the chalkboard instead of pointing at it.

---

## The Stickiest Mapping

**Core Visual**: Explorer with chalk navigating decision tree maze, marking paths taken, erasing when backtracking.

**Core Code**: Choose → Explore → Unchoose pattern with state modification and restoration.

**Core Insight**: Backtracking = exhaustive DFS with undo. The "unchoose" step restores state for trying other options from same starting point. Pruning skips subtrees that can't lead to valid solutions.

**When you see backtracking code, you now see an explorer navigating a maze with chalk. When you imagine exploring a decision tree, you know exactly what code to write.**

**The connection is permanent!**

---

## Next Steps

1. **Trace N-Queens** line-by-line with the chessboard visualization
2. **Trace Subsets** with the include/exclude tree
3. **Solve a LeetCode problem** visualizing the decision tree
4. **Explain your solution** using the explorer metaphor + code mapping
5. **Teach someone else** - that's when it truly sticks!

**Time investment**: 2-3 hours
**Return**: Deep, intuitive understanding that lasts years

# Constraint Satisfaction Problems (CSP) - Code-to-Visual Mapping

**Purpose**: Connect the visual metaphor of filling a form with interdependent fields to actual code implementation, creating sticky understanding through three-way mapping.

---

## The Three-Way Connection

```
Visual Metaphor ←→ Actual Code ←→ Why It Works
  (Form with validation rules)   (Variables + Domains + Constraints)   (Propagation reduces search)
```

---

## Visual Metaphor Overview

**Physical Model**: Filling complex form where later fields depend on earlier choices, with auto-validation

- **Form fields** = Variables to assign
- **Dropdown options** = Domain (possible values for each variable)
- **Red X marks** = Constraints (rules fields must satisfy)
- **Grayed-out options** = Forward checking (invalid values eliminated)
- **Auto-narrowing dropdowns** = Constraint propagation
- **Form validation** = Constraint checking
- **Most constrained field** = MRV heuristic (fewest options left)
- **Backspace/undo** = Backtracking when stuck
- **Complete valid form** = Solution found

**Animation**: Pick most constrained field, try value, auto-narrow other fields (propagation), continue until complete or stuck, backtrack if stuck.

---

## Core State Mappings

### Map State to Visual Elements

| Visual Element | Code Variable | Type | Purpose |
|----------------|---------------|------|---------|
| **Form fields** | `variables` | `List[Var]` | Things to assign values to |
| **Dropdown options** | `domains[var]` | `Set[Value]` | Possible values for each variable |
| **Red X validation** | `constraints` | `List[Constraint]` | Rules variables must satisfy |
| **Current assignments** | `assignment` | `Dict[Var, Value]` | Fields filled in so far |
| **Grayed options** | Reduced domains | Modified `Set[Value]` | Forward checking eliminates these |
| **Most constrained field** | MRV heuristic | Variable selection | Field with fewest options |
| **Complete form** | All vars assigned | `len(assignment) == len(variables)` | Solution found |
| **Undo button** | Backtrack | Restore previous state | Try different value |

---

## Action Mappings

### Map Visual Actions to Code

| Visual Action | Code Lines | Why This Works |
|---------------|------------|----------------|
| **Pick most constrained field** | `var = select_unassigned_variable(MRV)` | Fail fast, reduces branching |
| **Check field options** | `domain = get_domain(var)` | See what values are valid |
| **Fill in field** | `assignment[var] = value` | Make assignment |
| **Auto-narrow other fields** | `forward_check(var, value)` | Propagate constraints, reduce domains |
| **Validate form** | `if is_consistent(var, value):` | Check constraints satisfied |
| **Grayout invalid options** | `domain[other_var].remove(conflicting)` | Forward checking |
| **Undo field** | `del assignment[var]` | Backtrack |
| **Restore dropdowns** | `restore_domains(saved)` | Undo forward checking |
| **Check if complete** | `if len(assignment) == n:` | All fields filled |

---

## Code-to-Visual Translation Tables

### If You See This Code... Visualize This

| Code Pattern | Visual Image |
|--------------|-------------|
| `variables = [cell_positions]` | Grid of form fields (e.g., Sudoku cells) |
| `domains[var] = {1,2,3,...,9}` | Dropdown with 9 options per field |
| `if value in row_values: return False` | Red X: value conflicts with row constraint |
| `assignment[var] = value` | Filling in form field with selected value |
| `var = min(unassigned, key=lambda v: len(domains[v]))` | Pick field with fewest options (MRV) |
| `for value in domains[var]:` | Try each dropdown option for this field |
| `domains[neighbor].remove(value)` | Gray out conflicting option in dependent field |
| `restore_domains(saved_domains)` | Undo button: restore original dropdown options |

### If You Visualize This... Look for This Code

| Visual Image | Code Pattern |
|-------------|-------------|
| Form field with dropdown of options | `domains[variable] = set_of_possible_values` |
| Picking most constrained field to fill | `select_unassigned_variable(assignment, MRV_heuristic)` |
| Selecting value from dropdown | `for value in domains[variable]:` |
| Red X validation failure | `if not is_consistent(var, value): continue` |
| Auto-narrowing dependent dropdowns | `forward_check(var, value, domains)` |
| Complete form submission | `if len(assignment) == len(variables): return True` |
| Backspace to undo field | `del assignment[var]; restore_domains()` |
| Checking row/column rules in Sudoku | `if value in row or value in col: invalid` |

---

## Execution Trace Example

**Problem**: Solve 4x4 Sudoku (simplified example)

**Variables**: Each empty cell `(row, col)`
**Domains**: `{1, 2, 3, 4}` for each cell
**Constraints**: Unique in row, column, 2x2 box

### Step-by-Step: Visual + Code Side-by-Side

| Step | Visual State | Code State | Action |
|------|-------------|------------|--------|
| **1** | Board with empty cells, each has options {1,2,3,4} | `domains[all_cells] = {1,2,3,4}` | Initialize |
| **2** | Cell (0,0) already filled with 1 | Given, reduce domains | Constraint propagation |
| **3** | Row 0, col 0, box 0 can't use 1 (grayed out) | `domains[row0].discard(1)`, etc. | Forward check |
| **4** | Pick most constrained empty cell: (0,1) has {2,3,4} | `var = (0,1), MRV selects it` | MRV heuristic |
| **5** | Try value 2 in cell (0,1) | `assignment[(0,1)] = 2` | Make assignment |
| **6** | Validate: 2 not in row 0, col 1, box 0 ✓ | `is_consistent((0,1), 2) = True` | Check constraints |
| **7** | Auto-narrow: cells in row 0, col 1, box 0 lose option 2 | `domains[neighbors].discard(2)` | Forward checking |
| **8** | Continue to next cell... | Recursive call | Explore |
| **9** | Later: cell has empty domain! Dead-end ✗ | `if not domains[var]: return False` | No valid values |
| **10** | Undo: remove 2 from (0,1), restore domains | `del assignment[(0,1)]; restore()` | Backtrack |
| **11** | Try next value 3 in cell (0,1) | `assignment[(0,1)] = 3` | Try alternative |
| **12** | Continue until all cells filled... | ... | |
| **13** | Complete! All cells filled, all constraints satisfied | `len(assignment) == 16, return True` | Solution! |

**Final Result**: Valid 4x4 Sudoku solution

**Key Insight**: MRV picks most constrained variable (fail fast). Forward checking prunes domains early. Backtrack only when necessary.

---

## Pattern Recognition: Code ↔ Visual

### Common Code Patterns in CSP

| Code Pattern | What It Means Visually | When You Use It |
|--------------|------------------------|-----------------|
| `variables = [list_of_vars]` | List of form fields to fill | Defining CSP problem |
| `domains[var] = set_of_values` | Dropdown options for each field | Initial possible values |
| `if not is_consistent(var, val):` | Red X validation failure | Constraint checking |
| `var = min(unassigned, key=len(domain))` | Pick field with fewest options | MRV heuristic (most constrained variable) |
| `for value in domains[var]:` | Try each dropdown option | Iterate through domain |
| `domains[neighbor].remove(value)` | Gray out conflicting option | Forward checking |
| `restore_domains(saved)` | Undo button, restore dropdowns | Backtrack |
| `if len(assignment) == n: return True` | Complete form, all fields filled | Goal check |

---

## Key Insights

### Insight 1: Three Components Define CSP
**Visual**: Form fields + dropdown options + validation rules
**Code**:
1. **Variables**: What to assign (`cells`, `queens`, `colors`)
2. **Domains**: Possible values (`{1-9}`, `{columns}`, `{red, blue, green}`)
3. **Constraints**: Rules to satisfy (`unique in row`, `not attacked`, `adjacent different`)

**Why**: CSP is the framework, not the algorithm. Algorithm = backtracking + heuristics + propagation.

### Insight 2: MRV Heuristic = Fail Fast
**Visual**: Fill most constrained field first (fewest dropdown options)
**Code**: `var = min(unassigned, key=lambda v: len(domains[v]))`
**Why**: If field only has 1 option, might as well try it now. If it fails, fail early. Reduces wasted exploration.

**Example**:
- Sudoku cell with domain {5} → pick this first
- Cell with domain {1,2,3,4,5,6,7,8,9} → pick this last

### Insight 3: Forward Checking = Eager Pruning
**Visual**: Auto-narrow dropdowns when field filled
**Code**: After `assignment[var] = value`, remove `value` from domains of constrained variables
**Why**: Eliminates inconsistent values early, detects dead-ends sooner, reduces backtracking

**Pattern**:
```python
def forward_check(var, value, domains):
    saved = {}
    for neighbor in get_neighbors(var):
        if value in domains[neighbor]:
            saved[neighbor] = domains[neighbor].copy()
            domains[neighbor].remove(value)
            if not domains[neighbor]:
                # Dead-end detected!
                restore_domains(saved)
                return None
    return saved
```

### Insight 4: Arc Consistency (AC-3) = Deep Pruning
**Visual**: Ripple effect - narrowing one field cascades to narrow others
**Code**: For each constraint arc (X, Y), remove values from X that have no valid value in Y
**Why**: More powerful than forward checking, reduces domains before search even starts

**When to use**:
- **Forward checking**: During search, after each assignment
- **AC-3**: Before search (preprocessing) or after each assignment (MAC = Maintaining Arc Consistency)

### Insight 5: Constraint Graph Topology Matters
**Visual**: Form with sparse dependencies (few connections) vs dense (many connections)
**Code**: Variables = nodes, constraints = edges
**Why**: Sparse graph → easier CSP. Dense graph → harder CSP. Tree-structured CSP → polynomial time!

**Graph types**:
- **Tree**: Can solve in O(n·d²) using tree CSP algorithm
- **Nearly tree**: Use cutset conditioning + tree algorithm
- **General**: Use backtracking + heuristics

---

## Real-World Code Mappings

### Use Case 1: N-Queens CSP

**Visual**: Placing queens on chessboard, each row must have queen in different column/diagonal

| Visual Element | Production Code | System |
|----------------|-----------------|--------|
| Form fields | Rows (each row places one queen) | Variables |
| Dropdown options | Columns {0, 1, ..., n-1} | Domain per row |
| Validation rules | No column/diagonal conflicts | Constraints |
| Fill row 0 with col 2 | `board[0] = 2` | Assignment |
| Gray out col 2 in other rows | `domains[row].discard(2)` for row > 0 | Forward check |
| Check diagonals | `if abs(row1-row2) == abs(col1-col2):` | Constraint |

**Code Pattern**:
```python
def solve_nqueens(row, board, cols, diag1, diag2):
    if row == n:
        return True  # Complete solution

    for col in range(n):
        # Constraint checking
        if col in cols or (row - col) in diag1 or (row + col) in diag2:
            continue  # Violates constraint

        # Assign
        board[row] = col
        cols.add(col)
        diag1.add(row - col)
        diag2.add(row + col)

        # Recurse
        if solve_nqueens(row + 1, board, cols, diag1, diag2):
            return True

        # Backtrack
        cols.remove(col)
        diag1.remove(row - col)
        diag2.remove(row + col)

    return False
```

**Sticky Mapping**: Each row = variable, column = value, sets track occupied columns/diagonals

---

### Use Case 2: Sudoku CSP

**Visual**: 9x9 grid with row/column/box constraints

| Visual Element | Production Code | System |
|----------------|-----------------|--------|
| Empty cells | Variables (81 cells, some given) | What to assign |
| Digits 1-9 | `domains[cell] = {1,2,...,9}` | Possible values |
| Row/col/box rules | Constraint functions | Validation |
| Pick cell with 1 option | MRV selects cell with smallest domain | Heuristic |
| Auto-narrow | Forward check removes digit from row/col/box | Propagation |

**Code Pattern**:
```python
def solve_sudoku(board):
    cell = find_empty_cell(board)  # Or use MRV heuristic
    if not cell:
        return True  # Complete

    row, col = cell
    for digit in '123456789':
        if is_valid(board, row, col, digit):
            board[row][col] = digit  # Assign

            if solve_sudoku(board):  # Recurse
                return True

            board[row][col] = '.'  # Backtrack

    return False

def is_valid(board, row, col, digit):
    # Check row
    if digit in board[row]:
        return False
    # Check column
    if digit in [board[r][col] for r in range(9)]:
        return False
    # Check 3x3 box
    box_row, box_col = 3 * (row // 3), 3 * (col // 3)
    for r in range(box_row, box_row + 3):
        for c in range(box_col, box_col + 3):
            if board[r][c] == digit:
                return False
    return True
```

**Sticky Mapping**: Each cell = variable, digits = domain, row/col/box uniqueness = constraints

---

## Common Variations: Same Visual, Different Rules

### N-Queens (Board Placement)
**Visual**: Chessboard with queen placement rules
**Code**: Variables = rows, domains = columns, constraints = no attacks
**Optimization**: Use sets to track occupied columns/diagonals (O(1) check)
**Example**: 8-Queens, 4-Queens

### Sudoku (Grid with Regions)
**Visual**: 9x9 grid with row/column/box constraints
**Code**: Variables = cells, domains = {1-9}, constraints = unique per row/col/box
**Optimization**: MRV + forward checking, AC-3 preprocessing
**Example**: Standard Sudoku, variants (Killer Sudoku, etc.)

### Graph Coloring (Adjacent Constraints)
**Visual**: Map where adjacent regions different colors
**Code**: Variables = regions, domains = colors, constraints = adjacent ≠
**Heuristic**: Degree heuristic (pick node with most neighbors first)
**Example**: Map coloring, register allocation, scheduling

### Course Scheduling (Complex Constraints)
**Visual**: Assign courses to time slots + rooms
**Code**: Variables = courses, domains = (time, room) pairs, constraints = no conflicts
**Complexity**: Multiple constraint types (professor availability, room capacity, etc.)
**Example**: University timetabling

---

## Self-Check: Do You Have Sticky Understanding?

### Test 1: Code → Visual
See this code:
```python
var = min(unassigned, key=lambda v: len(domains[v]))
for value in domains[var]:
    if is_consistent(var, value):
        assignment[var] = value
        forward_check(var, value)
        solve(assignment)
        restore_domains()
```

**Can you visualize?**
"Pick form field with fewest dropdown options (MRV). Try each option from dropdown. If passes validation, fill field and auto-narrow dependent fields. Recurse to next field. If stuck, undo and try next option."

### Test 2: Visual → Code
Imagine: "Sudoku solver picks empty cell with fewest valid digits, tries each digit, checks row/column/box constraints, fills cell if valid, continues to next cell."

**Can you write the code?**
```python
def solve_sudoku(board):
    # Find cell with min domain (MRV)
    cell = min((get_domain(board, r, c), r, c)
               for r in range(9) for c in range(9)
               if board[r][c] == '.')[1:]

    if not cell:
        return True  # All filled

    row, col = cell
    for digit in get_domain(board, row, col):
        if is_valid(board, row, col, digit):
            board[row][col] = digit
            if solve_sudoku(board):
                return True
            board[row][col] = '.'  # Backtrack

    return False
```

### Test 3: Explain Why
**Question**: Why does MRV (Minimum Remaining Values) heuristic work better than just picking the first unassigned variable?

**Answer**: MRV picks the most constrained variable (fewest options). If this variable has no valid values, we detect failure immediately without wasting time exploring other variables. It's "fail-fast" - pruning bad branches early. Variables with many options are more flexible, so we defer them until more constraints are established.

---

## The Stickiest Mapping

**Core Visual**: Form with interdependent fields, auto-narrowing dropdowns, validation rules, undo button.

**Core Code**: Variables + domains + constraints, backtracking search, MRV heuristic, forward checking, constraint propagation.

**Core Insight**: CSP = assignment problem with rules. Smart heuristics (MRV) and propagation (forward checking, AC-3) reduce search space exponentially. Backtracking when stuck. Find any valid solution (or all solutions) satisfying all constraints.

**When you see CSP code, you now see a complex form being filled with smart field selection and auto-validation. When you imagine constraint satisfaction, you know exactly what code to write.**

**The connection is permanent!**

---

## Next Steps

1. **Trace N-Queens** with row-by-row assignment and diagonal checking
2. **Trace Sudoku** with MRV cell selection and forward checking
3. **Solve a CSP problem** by identifying variables, domains, constraints
4. **Implement AC-3** to see constraint propagation in action
5. **Teach someone else** - that's when it truly sticks!

**Time investment**: 2-3 hours
**Return**: Deep, intuitive understanding that lasts years

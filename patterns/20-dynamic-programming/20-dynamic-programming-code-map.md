# Dynamic Programming - Code-to-Visual Mapping

**Purpose**: Connect the visual metaphor of a memo pad preventing redundant work to actual code implementation, creating sticky understanding through three-way mapping.

---

## The Three-Way Connection

```
Visual Metaphor ←→ Actual Code ←→ Why It Works
  (Memo pad + calculator)   (Cache/Table + Recurrence)   (Avoid recomputation)
```

---

## Visual Metaphor Overview

**Physical Model**: Student solving math problems with a memo pad to avoid recalculating

- **Problem to solve** = Function call `fib(n)` or `knapsack(i, w)`
- **Memo pad** = `memo` dict or `dp` table
- **Lookup in pad** = `if n in memo:` or `dp[i][w]`
- **Write answer** = `memo[n] = result` or `dp[i][w] = value`
- **Calculator** = Recurrence relation (combining sub-answers)
- **Smaller problems** = Recursive subproblems
- **Base case** = Simplest problem you can answer directly
- **Table cells** = `dp[i][j]` storing subproblem solution

**Animation**: Check memo first (lookup), if found return it (cached), else compute from smaller problems (recurrence), write to memo (cache), return answer.

---

## Core State Mappings

### Map State to Visual Elements

| Visual Element | Code Variable | Type | Purpose |
|----------------|---------------|------|---------|
| **Memo pad (top-down)** | `memo` | `Dict[tuple, int]` | Cache of computed subproblem results |
| **Table (bottom-up)** | `dp` | `List[int]` or `List[List[int]]` | Array storing all subproblem solutions |
| **Problem parameters** | `(n)` or `(i, w)` | Tuple/indices | What defines unique subproblem |
| **Answer in cell** | `dp[i]` or `dp[i][j]` | `int/float/bool` | Solution to subproblem |
| **Calculator formula** | Recurrence relation | Expression | How to combine sub-answers |
| **Base case answer** | `dp[0] = 0` or `if n <= 1: return n` | Initial values | Simplest problems solved directly |
| **Final answer** | `dp[n]` or `memo[target]` | Value | Solution to original problem |

---

## Action Mappings

### Map Visual Actions to Code

| Visual Action | Code Lines | Why This Works |
|---------------|------------|----------------|
| **Check memo pad** | `if n in memo:` | Avoid recalculating if already solved |
| **Read from memo** | `return memo[n]` | Retrieve cached result instantly |
| **Use calculator** | `result = fib(n-1) + fib(n-2)` | Apply recurrence relation |
| **Write to memo** | `memo[n] = result` | Cache result for future lookups |
| **Fill table cell** | `dp[i][w] = max(...)` | Store subproblem solution |
| **Answer simplest problem** | `if n <= 1: return n` | Base case, no recursion needed |
| **Build table row-by-row** | `for i in range(n+1):` | Bottom-up approach, smaller to larger |
| **Reference earlier cells** | `dp[i] = dp[i-1] + dp[i-2]` | Use previously computed results |

---

## Code-to-Visual Translation Tables

### If You See This Code... Visualize This

| Code Pattern | Visual Image |
|--------------|-------------|
| `memo = {}` | Fresh memo pad, no answers written yet |
| `if n in memo: return memo[n]` | Check pad, found answer, return without recalculating |
| `memo[n] = fib(n-1) + fib(n-2)` | Calculate using smaller problems, write to pad |
| `dp = [0] * (n+1)` | Table with n+1 blank cells, ready to fill |
| `dp[i] = dp[i-1] + dp[i-2]` | Look at two previous cells, add them, write in current cell |
| `for i in range(1, n+1):` | Fill table left-to-right, one cell at a time |
| `if n <= 1: return n` | Base case: can answer without checking memo |
| `return dp[n]` | Final answer in last cell of table |

### If You Visualize This... Look for This Code

| Visual Image | Code Pattern |
|-------------|-------------|
| Flipping through memo pad looking for answer | `if key in memo: return memo[key]` |
| Writing answer on memo pad after calculating | `memo[key] = computed_value` |
| Creating blank table with rows and columns | `dp = [[0] * cols for _ in range(rows)]` |
| Filling table cell using cells above and left | `dp[i][j] = function(dp[i-1][j], dp[i][j-1])` |
| Answering simplest question without calculation | `if base_case: return base_value` |
| Calculator showing formula: previous + previous | Recurrence: `dp[i] = dp[i-1] + dp[i-2]` |

---

## Execution Trace Example

**Problem**: Compute `fib(5)` using memoization

### Step-by-Step: Visual + Code Side-by-Side

| Step | Visual State | Code State | Action |
|------|-------------|------------|--------|
| **1** | Need fib(5), check memo: empty | `fib(5), memo={}` | Not in memo, must compute |
| **2** | Calculate: need fib(4) + fib(3) | Call `fib(4)` and `fib(3)` | Recursively break down |
| **3** | Need fib(4), check memo: empty | `fib(4), memo={}` | Not in memo, compute |
| **4** | Eventually reach fib(1), memo has no entry | `fib(1), memo={}` | Base case! |
| **5** | fib(1) = 1, write to memo | `memo[1] = 1, return 1` | Cache base case |
| **6** | fib(2) = fib(1) + fib(0) | Check memo: fib(1)=1 ✓ | Found in memo! |
| **7** | fib(2) = 1 + 0 = 1, write to memo | `memo[2] = 1` | Cache result |
| **8** | fib(3) needs fib(2): check memo, found! | `memo[2] = 1` ✓ | Reuse cached result |
| **9** | fib(3) = 1 + 1 = 2, write to memo | `memo[3] = 2` | Cache result |
| **10** | fib(4) needs fib(3): found in memo! | `memo[3] = 2` ✓ | Skip recalculation |
| **11** | fib(4) = 2 + 1 = 3, write to memo | `memo[4] = 3` | Cache result |
| **12** | fib(5) needs fib(4) and fib(3): both in memo! | `memo[4]=3, memo[3]=2` ✓ | Reuse both |
| **13** | fib(5) = 3 + 2 = 5, write to memo | `memo[5] = 5, return 5` | Final answer! |

**Final Result**: memo = `{0:0, 1:1, 2:1, 3:2, 4:3, 5:5}`, answer = 5

**Key Insight**: Each fib(n) computed exactly once, then reused from memo. O(2^n) → O(n).

---

## Pattern Recognition: Code ↔ Visual

### Common Code Patterns in Dynamic Programming

| Code Pattern | What It Means Visually | When You Use It |
|--------------|------------------------|-----------------|
| `memo = {}` or `dp = [0] * n` | Creating blank memo pad or table | Initialization, always first step |
| `if n in memo: return memo[n]` | Check memo before calculating | Top-down memoization |
| `memo[n] = recursive_call()` | Write answer to memo after computing | Top-down memoization |
| `for i in range(n):` | Fill table sequentially | Bottom-up tabulation |
| `dp[i] = dp[i-1] + dp[i-2]` | Fibonacci-style recurrence | Linear DP (1D) |
| `dp[i][j] = max(dp[i-1][j], dp[i][j-1])` | Grid path recurrence | 2D DP (grid/knapsack) |
| `if i == 0 or j == 0: dp[i][j] = 0` | Base case initialization | Boundary conditions |
| `return dp[n][capacity]` | Final answer in last cell | Bottom-up result |

---

## Key Insights

### Insight 1: Memoization vs Tabulation (Top-Down vs Bottom-Up)
**Visual**:
- Memoization = lazy student, only solves problems when asked, writes answers down
- Tabulation = organized student, fills entire table systematically from smallest to largest

**Code**:
- Memoization: `if n in memo: return memo[n]; memo[n] = compute(); return memo[n]`
- Tabulation: `for i in range(n): dp[i] = compute_from(dp[i-1], dp[i-2])`

**Why**: Both achieve O(n) time, but tabulation often uses less space (no recursion stack) and is easier to optimize

### Insight 2: State Definition is Everything
**Visual**: What parameters uniquely identify a subproblem? These become memo key or table indices
**Code**:
- Fibonacci: `memo[n]` (1 parameter)
- Knapsack: `dp[item_index][capacity]` (2 parameters)
- Edit distance: `dp[i][j]` (positions in both strings)

**Why**: Wrong state definition = wrong solution. State captures "where am I in the problem?"

### Insight 3: Recurrence Relation is the Calculator
**Visual**: Formula telling how to combine smaller problem answers into bigger answer
**Code**:
```python
# Fibonacci: current = sum of previous two
dp[i] = dp[i-1] + dp[i-2]

# Knapsack: max of skip or take
dp[i][w] = max(dp[i-1][w], value[i] + dp[i-1][w-weight[i]])
```
**Why**: Recurrence is the heart of DP. Getting it right requires understanding problem structure.

### Insight 4: Base Cases are the Foundation
**Visual**: Simplest problems you can answer without calculation - the ground floor of your table
**Code**:
```python
# Fibonacci: first two numbers
dp[0] = 0, dp[1] = 1

# Knapsack: no items or no capacity
dp[0][w] = 0, dp[i][0] = 0
```
**Why**: Base cases initialize the DP. All other cells build on these.

### Insight 5: Space Optimization Often Possible
**Visual**: If you only need previous row, throw away older rows - use rolling memo pad
**Code**:
```python
# Instead of dp[n][m], use dp[2][m] or just dp[m]
# Update in-place: dp[j] = max(dp[j], dp[j-w] + v)
```
**Why**: Many 2D DPs can become 1D by only keeping previous row. Saves memory.

---

## Real-World Code Mappings

### Use Case 1: Fibonacci Optimization (Memoization)

**Visual**: Computing Fibonacci with memo pad

| Visual Element | Production Code | System |
|----------------|-----------------|--------|
| Memo pad | `@lru_cache(maxsize=None)` decorator | Python's built-in memoization |
| Lookup | Automatic by decorator | Cache check before function call |
| Write | Automatic by decorator | Cache result after computation |
| Calculator | Function body | Recurrence relation |

**Code Pattern**:
```python
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n <= 1:
        return n
    return fib(n-1) + fib(n-2)
```

**Sticky Mapping**: `@lru_cache` = automatic memo pad, no manual cache management needed

---

### Use Case 2: React useMemo (Frontend Memoization)

**Visual**: Expensive component calculation with memo

| Visual Element | Production Code | Tool |
|----------------|-----------------|------|
| Memo pad | `useMemo` hook | React optimization |
| Dependencies | `[dep1, dep2]` | When to recalculate |
| Calculator | Arrow function | Expensive computation |
| Lookup | React's internal cache | Check if deps changed |

**Code Pattern**:
```javascript
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);  // Only recompute if a or b changes
```

**Sticky Mapping**: useMemo = DP memoization for React components, dependencies = state parameters

---

### Use Case 3: 0/1 Knapsack (Resource Allocation)

**Visual**: Table showing max value for each capacity and item combination

| Visual Element | Production Code | System |
|----------------|-----------------|--------|
| Table | `dp[items+1][capacity+1]` | 2D DP table |
| Row | Item index (which items considered) | Items 0 to n |
| Column | Remaining capacity | 0 to max capacity |
| Cell value | Max value achievable | Optimal sub-solution |
| Formula | `max(skip, take)` | Recurrence relation |

**Code Pattern**:
```python
dp = [[0] * (capacity + 1) for _ in range(n + 1)]

for i in range(1, n + 1):
    for w in range(1, capacity + 1):
        if weights[i-1] <= w:
            # Can take item: max of skip vs take
            dp[i][w] = max(
                dp[i-1][w],  # Skip item
                values[i-1] + dp[i-1][w - weights[i-1]]  # Take item
            )
        else:
            # Can't take, must skip
            dp[i][w] = dp[i-1][w]

return dp[n][capacity]
```

**Sticky Mapping**: Each cell = "max value with first i items and w capacity", build from top-left to bottom-right

---

## Common Variations: Same Visual, Different Rules

### Linear DP (1D Table)
**Visual**: Single row of cells, each depends on previous cells
**Code**: `dp[i] = function(dp[i-1], dp[i-2], ...)`
**Example**: Fibonacci, Climbing Stairs, House Robber

### Grid DP (2D Table)
**Visual**: Grid where each cell depends on cells above and left
**Code**: `dp[i][j] = function(dp[i-1][j], dp[i][j-1])`
**Example**: Unique Paths, Min Path Sum, Edit Distance

### Knapsack DP (Include/Exclude)
**Visual**: At each item, decide include or exclude, max of both
**Code**: `dp[i][w] = max(dp[i-1][w], value + dp[i-1][w-weight])`
**Example**: 0/1 Knapsack, Subset Sum, Partition Equal Subset

### String DP (Two Sequences)
**Visual**: Table comparing two strings character by character
**Code**: `dp[i][j] = function(s1[i], s2[j], dp[i-1][j], dp[i][j-1])`
**Example**: Longest Common Subsequence, Edit Distance

### State Machine DP (Multiple States)
**Visual**: Table with columns for different states (holding stock, cooldown, etc.)
**Code**: `dp[i][state] = max over transitions`
**Example**: Buy/Sell Stock with Cooldown

---

## Self-Check: Do You Have Sticky Understanding?

### Test 1: Code → Visual
See this code:
```python
dp = [0] * (n + 1)
dp[0], dp[1] = 0, 1
for i in range(2, n + 1):
    dp[i] = dp[i-1] + dp[i-2]
return dp[n]
```

**Can you visualize?**
"Table with n+1 cells. Initialize first two cells (base cases). Fill each cell by adding two previous cells (calculator formula). Final answer in last cell."

### Test 2: Visual → Code
Imagine: "Memo pad where each entry memo[i][j] stores 'can we make sum j using first i items'. Check if we've computed this before, if not calculate using previous row."

**Can you write the code?**
```python
memo = {}

def can_sum(i, target):
    if (i, target) in memo:
        return memo[(i, target)]

    if target == 0:
        return True
    if i == 0 or target < 0:
        return False

    # Skip or take item i
    result = can_sum(i-1, target) or can_sum(i-1, target-nums[i-1])
    memo[(i, target)] = result
    return result
```

### Test 3: Explain Why
**Question**: Why do we iterate backwards (`for s in range(target, num-1, -1)`) in 1D Knapsack DP?

**Answer**: To avoid using the same item twice. If we go forward, `dp[s]` might already include `nums[i]`, then `dp[s + nums[i]]` would count it again. Going backward ensures we only use each item's contribution once per iteration.

---

## The Stickiest Mapping

**Core Visual**: Memo pad preventing recalculation or table built cell-by-cell from base cases.

**Core Code**: Cache lookup + recurrence relation (memoization) or iterative table filling (tabulation).

**Core Insight**: DP = solve each subproblem once, store result, reuse. Transforms exponential to polynomial by eliminating redundant computation. State defines subproblem, recurrence combines sub-solutions, base cases initialize.

**When you see DP code, you now see a memo pad or table being filled. When you imagine avoiding redundant work, you know exactly what code to write.**

**The connection is permanent!**

---

## Next Steps

1. **Trace Fibonacci** (both memoization and tabulation) with memo/table visualization
2. **Trace Knapsack** row-by-row seeing include/exclude decisions
3. **Solve a LeetCode problem** by identifying state, recurrence, base cases
4. **Explain your solution** using memo pad or table metaphor
5. **Teach someone else** - that's when it truly sticks!

**Time investment**: 2-3 hours
**Return**: Deep, intuitive understanding that lasts years

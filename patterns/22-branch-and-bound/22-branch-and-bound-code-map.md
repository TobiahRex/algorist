# Branch & Bound - Code-to-Visual Mapping

**Purpose**: Connect the visual metaphor of a smart explorer with bounds to actual code implementation, creating sticky understanding through three-way mapping.

---

## The Three-Way Connection

```
Visual Metaphor ←→ Actual Code ←→ Why It Works
  (Explorer + GPS bounds)   (Backtrack + Pruning)   (Bound eliminates subtrees)
```

---

## Visual Metaphor Overview

**Physical Model**: Explorer with GPS showing best route distance, pruning paths that can't beat it

- **Decision tree** = Map of all possible routes
- **Current path** = Partial solution being explored
- **GPS best-so-far** = `best_value` or incumbent solution
- **Distance estimator** = Bound function (optimistic estimate)
- **Estimated total distance** = Current cost + bound
- **Pruning shears** = If estimate ≥ best-so-far, cut entire subtree
- **Priority queue** = Explore most promising paths first
- **Complete route** = Valid complete solution

**Animation**: Explore path, estimate completion, compare with best-so-far, prune if worse, update best when complete solution found, prioritize promising paths.

---

## Core State Mappings

### Map State to Visual Elements

| Visual Element | Code Variable | Type | Purpose |
|----------------|---------------|------|---------|
| **GPS best route** | `best_value` or `best_cost` | `int/float` | Best complete solution found so far (incumbent) |
| **Best complete path** | `best_solution` | `List[T]` | Actual optimal solution found |
| **Distance estimator** | `bound(node)` function | Function | Optimistic estimate of best completion |
| **Current path** | `partial_solution` | `List[T]` | Path being explored right now |
| **Current cost** | `current_value` | `int/float` | Cost/value of partial solution |
| **Priority trail map** | `priority_queue` | `heapq` | Nodes ordered by bound (best-first search) |
| **Pruning decision** | `if bound >= best: prune` | Boolean | Cut subtree if can't improve |
| **Path depth** | `level` or `index` | `int` | How far along decision tree |

---

## Action Mappings

### Map Visual Actions to Code

| Visual Action | Code Lines | Why This Works |
|---------------|------------|----------------|
| **Use distance estimator** | `bound = compute_bound(node)` | Calculate optimistic completion cost |
| **Compare with GPS best** | `if bound >= best_value:` | Check if worth exploring |
| **Cut entire subtree** | `continue` or skip branching | Pruning - avoid guaranteed-worse paths |
| **Update GPS best** | `best_value = current_value` | Found better complete solution |
| **Save best path** | `best_solution = current.copy()` | Record optimal solution |
| **Explore next step** | `for choice in choices: branch` | Try extending partial solution |
| **Prioritize promising paths** | `heapq.heappush(pq, (-bound, node))` | Best-first search (explore best bound first) |
| **Pop most promising** | `bound, node = heapq.heappop(pq)` | Get next best candidate |

---

## Code-to-Visual Translation Tables

### If You See This Code... Visualize This

| Code Pattern | Visual Image |
|--------------|-------------|
| `best_value = -∞` (maximize) or `∞` (minimize) | GPS initialized with worst possible route |
| `bound = compute_bound(node)` | Distance estimator calculates optimistic completion |
| `if bound <= best_value: continue` | Estimated path can't beat GPS best - prune! |
| `if is_complete(node): best_value = value` | Found complete route, update GPS best |
| `heapq.heappush(pq, (-bound, node))` | Add promising path to priority map (negative for max-heap) |
| `heapq.heappop(pq)` | Get most promising unexplored path from map |
| `for choice in choices: heappush(child)` | Branch: generate all next steps, add to queue |
| `return best_solution` | Final optimal route from GPS |

### If You Visualize This... Look for This Code

| Visual Image | Code Pattern |
|-------------|-------------|
| Explorer checks GPS for current best route | `if current_value > best_value:` (maximize) |
| Distance estimator shows "at best 50km more" | `bound = current_cost + optimistic_remaining()` |
| Pruning entire mountain range as too far | `if bound >= best_cost: continue` |
| Updating GPS with newly found shorter route | `best_value = current_value; best_solution = node.copy()` |
| Picking most promising unexplored trail | `node = heapq.heappop(priority_queue)` |
| Marking multiple possible next steps | `for child in children: heapq.heappush(pq, child)` |
| Complete journey, check if best so far | `if complete and better: update_best` |

---

## Execution Trace Example

**Problem**: 0/1 Knapsack with Branch & Bound - items `[(v:60,w:10), (v:100,w:20), (v:120,w:30)]`, capacity 50

**Bound function**: Fractional knapsack (take remaining items fractionally)

### Step-by-Step: Visual + Code Side-by-Side

| Step | Visual State | Code State | Action |
|------|-------------|------------|--------|
| **1** | Start: no items, GPS best = 0 | `best_value=0, pq=[(root)]` | Initialize |
| **2** | Root: bound = 280 (all fractional) | `bound(0,0,0) = 280` | Compute optimistic bound |
| **3** | Promising! (280 > 0), branch on item 1 | Branch: include/exclude item 1 | Explore both |
| **4** | Include item 1: v=60, w=10, bound=260 | `node(1, 10, 60), bound=260` | Take item 1, recalculate |
| **5** | 260 > 0 (best), promising! Add to queue | `heappush(pq, (-260, node))` | Queue for exploration |
| **6** | Exclude item 1: v=0, w=0, bound=220 | `node(1, 0, 0), bound=220` | Skip item 1 |
| **7** | 220 > 0, promising! Add to queue | `heappush(pq, (-220, node))` | Queue for exploration |
| **8** | Pop best bound: include item 1 (260) | `heappop(pq)` → node(1,10,60) | Best-first search |
| **9** | Branch on item 2: include/exclude | Try item 2 choices | Continue exploration |
| **10** | Include items 1+2: v=160, w=30, bound=240 | `node(2,30,160), bound=240` | Take item 2 |
| **11** | 240 > 0, add to queue | `heappush(pq, (-240, node))` | Still promising |
| **12** | ...continue exploring... | ... | |
| **13** | Complete solution: items [1,2], v=160 | `level=3, value=160, complete` | Found solution! |
| **14** | Update GPS best: 160 | `best_value=160, best_solution=[1,2]` | New incumbent |
| **15** | Later node has bound=150 < 160 | `if 150 <= 160: continue` | **PRUNE!** Can't beat 160 |
| **16** | Another complete: items [2,3], v=220 | `value=220 > 160` | Better solution! |
| **17** | Update GPS best: 220 | `best_value=220, best_solution=[2,3]` | New best! |
| **18** | All nodes explored or pruned | `pq empty` | Done! |

**Final Result**: Best solution = items [2,3], value = 220

**Key Insight**: Bound function (fractional knapsack) gives optimistic estimate. Any node with bound ≤ best_value can't improve solution, so entire subtree pruned. Explores best-first to find good solutions early, enabling more pruning.

---

## Pattern Recognition: Code ↔ Visual

### Common Code Patterns in Branch & Bound

| Code Pattern | What It Means Visually | When You Use It |
|--------------|------------------------|-----------------|
| `best_value = -infinity` | Initialize GPS with worst route | Maximization problems (knapsack, TSP) |
| `best_cost = infinity` | Initialize GPS with worst route | Minimization problems (TSP, scheduling) |
| `bound = fractional_knapsack(remaining)` | Optimistic bound for knapsack | 0/1 Knapsack B&B |
| `bound = current + MST(unvisited)` | Optimistic bound for TSP | Traveling Salesman B&B |
| `if bound >= best_cost: continue` | Prune subtree (minimization) | Skip worse paths |
| `if bound <= best_value: continue` | Prune subtree (maximization) | Skip worse paths |
| `heapq.heappush(pq, (-bound, node))` | Best-first search (maximize) | Explore promising nodes first |
| `heapq.heappush(pq, (bound, node))` | Best-first search (minimize) | Explore promising nodes first |

---

## Key Insights

### Insight 1: Bound Function is Critical
**Visual**: GPS distance estimator must be optimistic (underestimate for min, overestimate for max)
**Code**: Bound must be achievable in ideal case, or risk pruning optimal solution
**Why**: If bound is pessimistic (worse than reality), might prune optimal path

**Bound examples**:
- **Knapsack**: Fractional knapsack (can take fractions = optimistic)
- **TSP**: MST of unvisited cities + current path (optimistic completion)
- **Job scheduling**: Load balancing lower bound (optimistic minimum makespan)

### Insight 2: Best-First Search Accelerates Pruning
**Visual**: Explore most promising trails first to update GPS quickly
**Code**: Use priority queue, order by bound (best bound = highest priority)
**Why**: Finding good solutions early enables pruning more subtrees later

**Pattern**:
```python
# Maximization: use negative bound for max-heap behavior
heapq.heappush(pq, (-bound, node))

# Minimization: use bound directly (min-heap default)
heapq.heappush(pq, (bound, node))
```

### Insight 3: Pruning Criterion Differs by Problem
**Visual**: Different GPS rules for "too far" vs "too expensive"
**Code**:
- Minimization: prune if `bound >= best_cost`
- Maximization: prune if `bound <= best_value`

**Why**: Bound represents "best possible" from this node. If best possible can't beat incumbent, prune.

### Insight 4: Guarantees Optimal If Run to Completion
**Visual**: GPS ensures no better route exists
**Code**: All paths either explored or pruned (with proof they can't improve)
**Why**: Unlike greedy (approximate) or heuristics (no guarantee), B&B guarantees optimum

**Trade-off**: Guaranteed optimal but can be slow (worst-case exponential)

### Insight 5: Tight Bounds = More Pruning = Faster
**Visual**: Accurate distance estimator cuts more paths
**Code**: Tighter bound function → more nodes pruned → faster solution
**Why**: Loose bounds (e.g., bound=infinity) provide no pruning, close to exhaustive search

**Bound quality hierarchy**:
1. Perfect bound (exact solution) → most pruning, but hard to compute
2. Tight bound (close to exact) → good pruning, feasible to compute
3. Loose bound (far from exact) → little pruning, easy to compute

---

## Real-World Code Mappings

### Use Case 1: 0/1 Knapsack Branch & Bound

**Visual**: Packing items to maximize value with weight limit, using fractional bound

| Visual Element | Production Code | System |
|----------------|-----------------|--------|
| GPS best value | `best_value = 0` | Incumbent solution |
| Distance estimator | `fractional_knapsack(remaining)` | Bound function |
| Current backpack | `(level, weight, value)` | Partial solution |
| Item decision | Include/exclude branches | Choice points |
| Pruning check | `if bound <= best_value: skip` | Cut subtree |
| Priority queue | `heapq` with `-bound` | Best-first search |

**Code Pattern**:
```python
def knapsack_bb(values, weights, capacity):
    best_value = 0
    pq = [(-fractional_bound(0, 0, 0), 0, 0, 0, [])]

    while pq:
        neg_bound, level, weight, value, items = heapq.heappop(pq)
        bound = -neg_bound

        if bound <= best_value:
            continue  # Prune

        if level == len(values):
            if value > best_value:
                best_value = value
            continue

        # Branch: include item
        if weight + weights[level] <= capacity:
            new_value = value + values[level]
            new_weight = weight + weights[level]
            new_bound = fractional_bound(level + 1, new_weight, new_value)
            if new_bound > best_value:
                heapq.heappush(pq, (-new_bound, level + 1, new_weight, new_value, items + [level]))

        # Branch: exclude item
        exclude_bound = fractional_bound(level + 1, weight, value)
        if exclude_bound > best_value:
            heapq.heappush(pq, (-exclude_bound, level + 1, weight, value, items))

    return best_value
```

**Sticky Mapping**: Fractional knapsack = optimistic bound (can take fractions), prune if can't beat best

---

### Use Case 2: TSP Branch & Bound

**Visual**: Finding shortest tour visiting all cities, using MST bound

| Visual Element | Production Code | System |
|----------------|-----------------|--------|
| GPS shortest tour | `best_cost = infinity` | Incumbent |
| Distance estimator | `current_path + MST(unvisited)` | Bound |
| Partial tour | Current path of cities visited | Partial solution |
| City choice | Branch on next city to visit | Choices |
| Pruning | `if bound >= best_cost: skip` | Cut subtree |

**Code Pattern**:
```python
def tsp_bound(path, remaining, dist):
    """Lower bound: current path + MST of remaining cities."""
    current_cost = sum(dist[path[i]][path[i+1]] for i in range(len(path)-1))
    mst_cost = compute_mst(remaining, dist)
    return current_cost + mst_cost

def tsp_bb(cities, dist):
    best_cost = float('inf')
    pq = [(tsp_bound([0], set(range(1, len(cities))), dist), [0], set(range(1, len(cities))))]

    while pq:
        bound, path, remaining = heapq.heappop(pq)

        if bound >= best_cost:
            continue  # Prune

        if not remaining:
            # Complete tour, return to start
            total_cost = bound + dist[path[-1]][0]
            best_cost = min(best_cost, total_cost)
            continue

        # Branch: try each remaining city
        for city in remaining:
            new_path = path + [city]
            new_remaining = remaining - {city}
            new_bound = tsp_bound(new_path, new_remaining, dist)

            if new_bound < best_cost:
                heapq.heappush(pq, (new_bound, new_path, new_remaining))

    return best_cost
```

**Sticky Mapping**: MST of unvisited = optimistic completion cost (MST ≤ actual tour cost)

---

## Common Variations: Same Visual, Different Rules

### Maximization (Knapsack, Profits)
**Visual**: GPS tracks maximum profit, prune if bound ≤ best
**Code**: `best_value = -infinity`, `if bound <= best_value: prune`
**Bound**: Optimistic (overestimate) - best possible value
**Example**: Knapsack, job scheduling with profits

### Minimization (TSP, Costs)
**Visual**: GPS tracks minimum cost, prune if bound ≥ best
**Code**: `best_cost = infinity`, `if bound >= best_cost: prune`
**Bound**: Optimistic (underestimate) - best possible cost
**Example**: TSP, makespan minimization

### DFS Branch & Bound (Stack)
**Visual**: Depth-first exploration, backtrack when pruned
**Code**: Use stack instead of priority queue
**Memory**: O(depth), slower to find good solutions
**Example**: When memory constrained

### Best-First Branch & Bound (Heap)
**Visual**: Always explore most promising path
**Code**: Priority queue ordered by bound
**Memory**: O(nodes), faster pruning (finds good solutions early)
**Example**: Standard B&B implementation

### ILP Solvers (CPLEX, Gurobi)
**Visual**: Branch on fractional variables in linear program
**Code**: Solve LP relaxation, branch on fractional variable, bound = LP value
**Example**: Commercial optimization solvers

---

## Self-Check: Do You Have Sticky Understanding?

### Test 1: Code → Visual
See this code:
```python
bound = fractional_knapsack(level, weight, value)
if bound <= best_value:
    continue
```

**Can you visualize?**
"GPS distance estimator calculates best possible completion (fractional knapsack = optimistic). If estimated best can't beat GPS current best, prune entire subtree - no point exploring."

### Test 2: Visual → Code
Imagine: "Explorer with TSP GPS tracking shortest tour. Distance estimator uses current path + MST of unvisited cities (optimistic). If estimated total ≥ GPS best, cut this trail."

**Can you write the code?**
```python
current_cost = sum_path_edges(path)
mst_remaining = compute_mst(unvisited)
bound = current_cost + mst_remaining

if bound >= best_cost:
    continue  # Prune this subtree
```

### Test 3: Explain Why
**Question**: Why must the bound function be optimistic (overestimate for max, underestimate for min)?

**Answer**: If bound is pessimistic (worse than reality), we might prune a node whose actual best completion beats the incumbent. This would incorrectly eliminate the optimal solution. Optimistic bound ensures we only prune when we can PROVE no better solution exists in that subtree.

---

## The Stickiest Mapping

**Core Visual**: Explorer with GPS showing best route, distance estimator for completion, pruning trails that can't beat GPS best.

**Core Code**: Priority queue with bound-ordered nodes, compute bound, compare with incumbent, prune if can't improve, update incumbent when complete solution found.

**Core Insight**: Branch & Bound = intelligent backtracking with bounds. Bound function gives optimistic estimate of best completion. If optimistic best can't beat incumbent, entire subtree pruned. Best-first search (priority queue) finds good solutions early, enabling more pruning. Guarantees optimal solution.

**When you see B&B code, you now see an explorer with GPS pruning paths. When you imagine optimization with bounds, you know exactly what code to write.**

**The connection is permanent!**

---

## Next Steps

1. **Trace Knapsack B&B** with fractional bound visualization
2. **Trace TSP B&B** with MST bound
3. **Solve a problem** by designing appropriate bound function
4. **Compare with backtracking** - see pruning acceleration
5. **Teach someone else** - that's when it truly sticks!

**Time investment**: 2-3 hours
**Return**: Deep, intuitive understanding that lasts years

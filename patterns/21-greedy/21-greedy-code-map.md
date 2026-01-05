# Greedy Algorithms - Code-to-Visual Mapping

**Purpose**: Connect the visual metaphor of taking the best local choice to actual code implementation, creating sticky understanding through three-way mapping.

---

## The Three-Way Connection

```
Visual Metaphor ←→ Actual Code ←→ Why It Works
  (Greedy choice at each step)   (Sort + Local optimal)   (Local → Global optimal)
```

---

## Visual Metaphor Overview

**Physical Model**: Hiker climbing mountain always taking steepest uphill path

- **Mountain peak** = Optimal solution (goal)
- **Current position** = Current state in algorithm
- **Paths forward** = Available choices at this step
- **Compass/altimeter** = Greedy criterion (measure of "best")
- **Steepest path** = Locally optimal choice
- **Commitment** = Never backtrack, never reconsider
- **Trail markers** = Sorted elements or priority queue
- **Summit reached** = Greedy solution complete

**Animation**: Look at all paths, pick steepest (greedy criterion), take one step, commit to it, repeat until summit.

---

## Core State Mappings

### Map State to Visual Elements

| Visual Element | Code Variable | Type | Purpose |
|----------------|---------------|------|---------|
| **Altimeter reading** | `key=lambda x: ...` | Sort key function | Greedy criterion (what makes choice "best") |
| **Sorted trail map** | `sorted(items, key=...)` | Sorted list | Ordered by greedy criterion |
| **Current position** | `last_end` or `current_sum` | State variable | Where we are in the process |
| **Backpack** | `result` or `selected` | List/set | Items chosen so far |
| **Compass check** | Comparison in loop | Boolean | Is this choice better? |
| **Trail markers** | Priority queue/heap | `heapq` | Dynamic greedy selection |
| **Peak reached** | Loop termination | Exit condition | Solution complete |

---

## Action Mappings

### Map Visual Actions to Code

| Visual Action | Code Lines | Why This Works |
|---------------|------------|----------------|
| **Sort paths by steepness** | `items.sort(key=lambda x: x.end_time)` | Order by greedy criterion |
| **Check if path valid** | `if start >= last_end:` | Feasibility check |
| **Take step on path** | `selected.append(item)` | Make greedy choice |
| **Update position** | `last_end = current.end` | Update state after choice |
| **Look at all options** | `for item in sorted_items:` | Consider all choices in order |
| **Pick best option** | Always first valid in sorted order | Greedy selection |
| **Never look back** | No backtracking code | Commitment to choice |
| **Use priority queue** | `heapq.heappush/heappop` | Dynamic best selection |

---

## Code-to-Visual Translation Tables

### If You See This Code... Visualize This

| Code Pattern | Visual Image |
|--------------|-------------|
| `items.sort(key=lambda x: x.end)` | Arranging trail map by end times (earliest first) |
| `for item in sorted_items:` | Walking trail markers in order |
| `if start >= last_end:` | Checking if path doesn't overlap with current position |
| `selected.append(item)` | Adding item to backpack, committing to choice |
| `last_end = item.end` | Updating position marker after taking step |
| `heapq.heappop(heap)` | Taking next best option from priority trail |
| `result = max(result, current)` | Updating best position reached so far |
| `items.sort(key=lambda x: -x.ratio)` | Descending order = biggest first (greedy priority) |

### If You Visualize This... Look for This Code

| Visual Image | Code Pattern |
|-------------|-------------|
| Hiker sorts trails by steepness before starting | `items.sort(key=greedy_criterion)` |
| At each step, take steepest available path | `for item in sorted_order: if valid: take` |
| Mark current position, never go back | `state_variable = current_value` (no undo) |
| Backpack collects chosen items | `result.append(choice)` or `selected.add(item)` |
| Check if path feasible before taking | `if feasible(choice): make_choice` |
| Always pick from priority queue top | `best = heapq.heappop(pq)` |
| Summit reached when no more paths | Loop terminates naturally |

---

## Execution Trace Example

**Problem**: Activity Selection - maximize non-overlapping activities

**Activities**: `[(1,4), (3,5), (0,6), (5,7), (8,9), (5,9)]` as `(start, end)`

### Step-by-Step: Visual + Code Side-by-Side

| Step | Visual State | Code State | Action |
|------|-------------|------------|--------|
| **1** | Unsorted trails, need to organize by end time | `activities = [(1,4), (3,5), (0,6), ...]` | Sort by greedy criterion |
| **2** | Sorted trails: (1,4), (3,5), (5,7), (0,6), (8,9), (5,9) | `activities.sort(key=lambda x: x[1])` | Earliest end time first |
| **3** | Start at beginning, no position yet | `selected=[], last_end=0` | Initialize state |
| **4** | First trail (1,4): starts at 1 ≥ 0 ✓ | `if 1 >= 0:` | Valid! Take it |
| **5** | Add (1,4) to backpack, move to position 4 | `selected=[(1,4)], last_end=4` | Commit to choice |
| **6** | Next trail (3,5): starts at 3 < 4 ✗ | `if 3 >= 4:` | Conflicts! Skip |
| **7** | Next trail (5,7): starts at 5 ≥ 4 ✓ | `if 5 >= 4:` | Valid! Take it |
| **8** | Add (5,7), move to position 7 | `selected=[(1,4), (5,7)], last_end=7` | Commit to choice |
| **9** | Next trail (0,6): starts at 0 < 7 ✗ | `if 0 >= 7:` | Conflicts! Skip |
| **10** | Next trail (8,9): starts at 8 ≥ 7 ✓ | `if 8 >= 7:` | Valid! Take it |
| **11** | Add (8,9), move to position 9 | `selected=[(1,4), (5,7), (8,9)], last_end=9` | Commit to choice |
| **12** | Next trail (5,9): starts at 5 < 9 ✗ | `if 5 >= 9:` | Conflicts! Skip |
| **13** | No more trails, reached summit! | Loop ends | Done! 3 activities selected |

**Final Result**: Selected = `[(1,4), (5,7), (8,9)]` - maximum non-overlapping activities

**Key Insight**: By sorting by end time and greedily taking earliest-ending compatible activities, we maximize count. This greedy choice is provably optimal.

---

## Pattern Recognition: Code ↔ Visual

### Common Code Patterns in Greedy Algorithms

| Code Pattern | What It Means Visually | When You Use It |
|--------------|------------------------|-----------------|
| `items.sort(key=lambda x: x.end)` | Sort by earliest end (activity selection) | Interval/scheduling problems |
| `items.sort(key=lambda x: -x.ratio)` | Sort descending by value/weight ratio | Fractional knapsack |
| `if condition_valid:` | Check if path feasible | Before making greedy choice |
| `result.append(choice)` | Add to backpack, commit | Making greedy selection |
| `state = new_value` | Update position, never undo | Greedy state progression |
| `for item in sorted_items:` | Walk sorted trail markers | Standard greedy iteration |
| `heapq.heappop(heap)` | Take best from priority queue | Dynamic greedy (changing priorities) |
| `max_reach = max(max_reach, i + nums[i])` | Track furthest reachable position | Jump game greedy |

---

## Key Insights

### Insight 1: The Greedy Criterion is Everything
**Visual**: Wrong compass = wrong mountain = wrong summit
**Code**: Activity selection = sort by END time (not start, not duration)
**Why**: Greedy criterion determines optimality. Must prove greedy choice property.

**Examples**:
- Activity selection: earliest END time (frees time soonest)
- Fractional knapsack: highest value/weight ratio
- Huffman coding: lowest frequency first
- Jump game: furthest reachable position

### Insight 2: Greedy Works When Local → Global
**Visual**: Steepest path at each step leads to highest summit overall
**Code**: Making locally optimal choice at each step yields globally optimal solution
**Why**: Requires proof (exchange argument or greedy choice property)

**When greedy works**:
- Activity selection (proven optimal)
- Fractional knapsack (proven optimal)
- Huffman coding (proven optimal)
- Dijkstra's algorithm (proven optimal for non-negative weights)

**When greedy fails**:
- 0/1 knapsack (need DP)
- Coin change with arbitrary denominations (need DP)
- Longest path in graph (NP-hard)

### Insight 3: Sorting is Common First Step
**Visual**: Organize trail map before hiking
**Code**: `items.sort(key=greedy_criterion)` then iterate
**Why**: Sorting arranges choices in greedy order, making algorithm simple linear scan

**Time complexity**: Usually O(n log n) from sorting, then O(n) greedy iteration

### Insight 4: No Backtracking = Efficiency
**Visual**: Never walk back down mountain
**Code**: No recursion, no undo, no trying other options
**Why**: Commit to each choice, never reconsider. Fast but only works when greedy is optimal.

### Insight 5: Priority Queue for Dynamic Greedy
**Visual**: Trail markers that rearrange themselves based on current position
**Code**: `heapq` for always getting next best option dynamically
**Why**: When greedy criterion changes or choices arrive dynamically (Dijkstra, Huffman, job scheduling)

**Pattern**:
```python
heap = [(priority, item), ...]
while heap:
    priority, item = heapq.heappop(heap)
    process(item)
    # Add new items with updated priorities
    heapq.heappush(heap, (new_priority, new_item))
```

---

## Real-World Code Mappings

### Use Case 1: Activity Selection (Scheduling)

**Visual**: Scheduling maximum meetings in conference room

| Visual Element | Production Code | System |
|----------------|-----------------|--------|
| Conference room | Single resource | Constraint |
| Meetings | Activities with start/end | Items to schedule |
| Sort by end time | `meetings.sort(key=lambda m: m.end)` | Greedy criterion |
| Check overlap | `if start >= last_end:` | Feasibility check |
| Schedule meeting | `scheduled.append(meeting)` | Greedy choice |
| Update room end time | `last_end = meeting.end` | State update |

**Code Pattern**:
```python
def max_meetings(meetings):
    meetings.sort(key=lambda m: m[1])  # Sort by end time
    scheduled = [meetings[0]]
    last_end = meetings[0][1]

    for start, end in meetings[1:]:
        if start >= last_end:
            scheduled.append((start, end))
            last_end = end

    return scheduled
```

**Sticky Mapping**: Earliest ending meeting = frees room soonest = maximum opportunity for future meetings

---

### Use Case 2: Fractional Knapsack (Resource Allocation)

**Visual**: Filling knapsack with items, can take fractions

| Visual Element | Production Code | System |
|----------------|-----------------|--------|
| Items | `(value, weight)` tuples | Resources |
| Value/weight ratio | `key=lambda x: x.value/x.weight` | Greedy criterion |
| Sort descending | `reverse=True` | Best items first |
| Knapsack capacity | `remaining_capacity` | Constraint |
| Take fraction | `min(1.0, remaining / weight)` | Partial selection |

**Code Pattern**:
```python
def fractional_knapsack(items, capacity):
    # Sort by value/weight ratio (descending)
    items.sort(key=lambda x: x.value/x.weight, reverse=True)

    total_value = 0.0
    remaining = capacity

    for value, weight in items:
        if remaining == 0:
            break

        fraction = min(1.0, remaining / weight)
        total_value += fraction * value
        remaining -= fraction * weight

    return total_value
```

**Sticky Mapping**: Highest value/weight ratio first = maximize value per unit weight

---

### Use Case 3: Jump Game (Array Traversal)

**Visual**: Jumping through array, tracking furthest reachable position

| Visual Element | Production Code | System |
|----------------|-----------------|--------|
| Current position | `i` in loop | Array index |
| Jump distance | `nums[i]` | How far can jump from here |
| Furthest reachable | `max_reach` | Greedy state |
| Update furthest | `max_reach = max(max_reach, i + nums[i])` | Greedy choice |
| Check if stuck | `if i > max_reach: return False` | Feasibility |

**Code Pattern**:
```python
def can_jump(nums):
    max_reach = 0

    for i in range(len(nums)):
        if i > max_reach:
            return False  # Can't reach position i

        max_reach = max(max_reach, i + nums[i])

        if max_reach >= len(nums) - 1:
            return True

    return True
```

**Sticky Mapping**: Track furthest position reachable, greedily update as we progress

---

## Common Variations: Same Visual, Different Rules

### Activity Selection (Earliest End Time)
**Visual**: Sort meetings by end time, take earliest ending that doesn't conflict
**Code**: `sort(key=lambda x: x.end)`, greedy by earliest finish
**Example**: Maximize scheduled meetings

### Fractional Knapsack (Value/Weight Ratio)
**Visual**: Sort items by value per pound, take best ratios first
**Code**: `sort(key=lambda x: x.value/x.weight, reverse=True)`
**Example**: Maximize knapsack value (can take fractions)

### Huffman Coding (Lowest Frequency)
**Visual**: Merge two smallest frequency nodes repeatedly
**Code**: `heapq` to always get two minimum, build tree
**Example**: Optimal prefix-free encoding

### Dijkstra's Algorithm (Shortest Distance)
**Visual**: Always expand closest unvisited node
**Code**: Priority queue with distances, `heappop` for minimum
**Example**: Shortest path in graph

### Job Scheduling (Shortest Job First)
**Visual**: Execute shortest jobs first to minimize average wait time
**Code**: `sort(key=lambda x: x.duration)`, process in order
**Example**: CPU scheduling, task queues

---

## Self-Check: Do You Have Sticky Understanding?

### Test 1: Code → Visual
See this code:
```python
items.sort(key=lambda x: x[0]/x[1], reverse=True)
for value, weight in items:
    fraction = min(1.0, remaining / weight)
    total += fraction * value
    remaining -= fraction * weight
```

**Can you visualize?**
"Hiker sorting trails by value/weight ratio (steepness), taking best ratios first. At each step, take as much as capacity allows (fraction), update remaining capacity, continue with next best trail."

### Test 2: Visual → Code
Imagine: "Conference room scheduler sorting meetings by end time, always picking earliest-ending meeting that doesn't overlap with last scheduled meeting."

**Can you write the code?**
```python
meetings.sort(key=lambda m: m.end_time)
scheduled = [meetings[0]]
last_end = meetings[0].end_time

for meeting in meetings[1:]:
    if meeting.start_time >= last_end:
        scheduled.append(meeting)
        last_end = meeting.end_time

return scheduled
```

### Test 3: Explain Why
**Question**: Why does activity selection greedy algorithm use END time, not START time or DURATION?

**Answer**: Earliest end time frees up the resource (room/time) soonest, leaving maximum opportunity for future activities. Starting earliest or shortest duration don't guarantee this. Proof by exchange argument: any optimal solution can be transformed to use earliest-ending activity first without making it worse.

---

## The Stickiest Mapping

**Core Visual**: Hiker taking steepest path at each step, never backtracking, trusting local optimal leads to global optimal.

**Core Code**: Sort by greedy criterion, iterate in order, make locally optimal choice, commit, update state, never undo.

**Core Insight**: Greedy works when greedy choice property holds - making locally optimal choice at each step leads to globally optimal solution. Must prove this property. Fast (O(n log n) usually) but only correct when greedy is optimal.

**When you see greedy code, you now see a hiker ascending via steepest paths. When you imagine local choices leading to global optimum, you know exactly what code to write.**

**The connection is permanent!**

---

## Next Steps

1. **Trace activity selection** with the meeting room visualization
2. **Trace fractional knapsack** with value/weight ratio sorting
3. **Solve a LeetCode problem** by identifying the greedy criterion
4. **Prove greedy correctness** using exchange argument
5. **Teach someone else** - that's when it truly sticks!

**Time investment**: 2-3 hours
**Return**: Deep, intuitive understanding that lasts years

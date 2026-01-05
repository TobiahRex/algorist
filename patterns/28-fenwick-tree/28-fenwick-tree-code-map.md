# Fenwick Tree - Code-to-Visual Mapping

**Purpose**: Connect the visual metaphor of hierarchical prefix sums to actual code implementation, creating sticky understanding through three-way mapping.

---

## The Three-Way Connection

```
Visual Metaphor ←→ Actual Code ←→ Why It Works
  (Stacked Boxes)   (BIT Array)   (Binary index structure)
```

---

## Visual Metaphor Overview

**Physical Model**: Stacked storage boxes with responsibility ranges

- **Box at position i** = Stores sum of `(i & -i)` elements ending at i
- **Box label** = Index i (binary representation matters!)
- **Box size** = Lowest set bit determines how many elements it covers
- **Climb ladder** = Update operation (move up via `i += i & -i`)
- **Descend ladder** = Query operation (move down via `i -= i & -i`)
- **Responsibility range** = Each box covers specific positions
- **Binary structure** = Box sizes are powers of 2
- **1-indexed** = Box positions start at 1 (simplifies math)

**Animation**: Update climbs boxes, query descends collecting sums, each step determined by flipping rightmost bit.

---

## Core State Mappings

### Map State to Visual Elements

| Visual Element | Code Variable | Type | Purpose |
|----------------|---------------|------|---------|
| **Warehouse** | `tree[]` or `bit[]` | `List[int]` | Array of boxes (1-indexed, size n+1) |
| **Number of elements** | `n` | `int` | Array size |
| **Box position** | `i` | `int` | Current index in BIT array |
| **Box responsibility** | `i & -i` | `int` (expression) | How many elements this box covers |
| **Next box up** | `i + (i & -i)` | `int` (expression) | Parent in update tree |
| **Next box down** | `i - (i & -i)` | `int` (expression) | Previous in query tree |
| **Prefix sum accumulator** | `total` | `int` | Running sum during query |
| **Range query** | `query(R) - query(L-1)` | `int` (expression) | Difference of prefix sums |

---

## Action Mappings

### Map Visual Actions to Code

| Visual Action | Code Lines | Why This Works |
|---------------|------------|----------------|
| **Add to box i** | `tree[i] += delta` | Update box value |
| **Climb to parent box** | `i += i & -i` | Move to next higher responsibility |
| **Update propagation** | `while i <= n: tree[i] += delta; i += i & -i` | Climb ladder, update all affected boxes |
| **Collect from box i** | `total += tree[i]` | Accumulate this box's contribution |
| **Descend to prev box** | `i -= i & -i` | Move to previous non-overlapping box |
| **Query prefix sum** | `while i > 0: total += tree[i]; i -= i & -i` | Descend ladder, collect sums |
| **Range sum [L,R]** | `query(R) - query(L-1)` | Subtract prefix sums |
| **Isolate lowest bit** | `i & -i` | Two's complement magic |

---

## Code-to-Visual Translation Tables

### If You See This Code... Visualize This

| Code Pattern | Visual Image |
|--------------|-------------|
| `tree = [0] * (n+1)` | Warehouse with n+1 boxes (index 0 unused) |
| `i & -i` | Measure box i's responsibility (how many elements it covers) |
| `i += i & -i` | Climb ladder: move to next box that depends on current box |
| `i -= i & -i` | Descend ladder: move to previous non-overlapping box |
| `while i <= n: tree[i] += delta; i += i & -i` | Update: climb ladder updating all affected boxes |
| `while i > 0: total += tree[i]; i -= i & -i` | Query: descend ladder collecting sums |
| `query(R) - query(L-1)` | Range sum: difference of two prefix sums |

### If You Visualize This... Look for This Code

| Visual Image | Code Pattern |
|-------------|-------------|
| Warehouse of prefix sum boxes | `tree = [0] * (n+1)` (1-indexed) |
| Box i covers (i & -i) elements | `responsibility = i & -i` |
| Climb to parent box | `i += i & -i` |
| Descend to previous box | `i -= i & -i` |
| Update value: climb and update | `while i <= n: tree[i] += delta; i += i & -i` |
| Get prefix sum: descend and collect | `while i > 0: sum += tree[i]; i -= i & -i` |
| Get range sum | `query(right) - query(left-1)` |

---

## Execution Trace Example

**Problem**: Build BIT for `[3, 2, -1, 6, 5, 4, -3, 3]`, query sum[1..5]

### Step 1: Understand Box Responsibilities

| Index i | Binary | i & -i | Responsibility | Covers Indices |
|---------|--------|--------|----------------|----------------|
| 1 | 0001 | 1 | 1 element | [1] |
| 2 | 0010 | 2 | 2 elements | [1,2] |
| 3 | 0011 | 1 | 1 element | [3] |
| 4 | 0100 | 4 | 4 elements | [1,2,3,4] |
| 5 | 0101 | 1 | 1 element | [5] |
| 6 | 0110 | 2 | 2 elements | [5,6] |
| 7 | 0111 | 1 | 1 element | [7] |
| 8 | 1000 | 8 | 8 elements | [1..8] |

**Key insight**: Box i covers (i & -i) elements ending at position i

### Step 2: Build BIT (Update Each Element)

```
Initial: tree = [0, 0, 0, 0, 0, 0, 0, 0, 0]

update(1, 3):  // Climb: 1 → 2 → 4 → 8
  tree[1] += 3 → [0, 3, 0, 0, 0, 0, 0, 0, 0]
  tree[2] += 3 → [0, 3, 3, 0, 0, 0, 0, 0, 0]
  tree[4] += 3 → [0, 3, 3, 0, 3, 0, 0, 0, 0]
  tree[8] += 3 → [0, 3, 3, 0, 3, 0, 0, 0, 3]

update(2, 2):  // Climb: 2 → 4 → 8
  tree[2] += 2 → [0, 3, 5, 0, 3, 0, 0, 0, 3]
  tree[4] += 2 → [0, 3, 5, 0, 5, 0, 0, 0, 3]
  tree[8] += 2 → [0, 3, 5, 0, 5, 0, 0, 0, 5]

... continue for all elements ...

Final tree: [0, 3, 5, -1, 10, 5, 9, -3, 19]
```

### Step 3: Query sum[1..5] = query(5) - query(0)

**Query(5)**: Descend ladder from 5
```
Step 1: i=5 (0101), total += tree[5] = 5
        i -= (5 & -5) = 5 - 1 = 4

Step 2: i=4 (0100), total += tree[4] = 5 + 10 = 15
        i -= (4 & -4) = 4 - 4 = 0

Stop (i = 0). Result: 15
```

**Query(0)**: Returns 0 (no elements before index 1)

**Range sum [1..5]**: 15 - 0 = 15 ✓
**Verify**: 3 + 2 + (-1) + 6 + 5 = 15 ✓

---

## Pattern Recognition: Code ↔ Visual

### Common Code Patterns in Fenwick Tree

| Code Pattern | What It Means Visually | When You Use It |
|--------------|------------------------|-----------------|
| `i & -i` | Measure box's responsibility (lowest set bit) | Determine range size |
| `i += i & -i` | Climb to parent box | Update propagation |
| `i -= i & -i` | Descend to previous box | Query accumulation |
| `while i <= n` | Climb until top of warehouse | Update all affected |
| `while i > 0` | Descend until ground level | Collect all contributions |
| `tree = [0] * (n+1)` | 1-indexed warehouse (index 0 unused) | Simplify bit math |
| `query(R) - query(L-1)` | Range = difference of prefixes | Prefix sum property |

---

## Key Insights

### Insight 1: Binary Index Structure
**Visual**: Box i's size = lowest set bit (powers of 2)
**Code**: `i & -i` extracts rightmost 1-bit
**Why**: Binary representation determines responsibility range

**Example**:
```
12 = 1100 (binary)
-12 = ...11110100 (two's complement)
12 & -12 = 0100 = 4
→ Box 12 covers 4 elements [9,10,11,12]
```

### Insight 2: Update Climbs, Query Descends
**Visual**: Update climbs ladder (`i += i & -i`), query descends (`i -= i & -i`)
**Code**: Different bit manipulation for different operations
**Why**: Update affects all boxes that include position i; query collects non-overlapping ranges

### Insight 3: Amortized O(n) Build
**Visual**: Building warehouse by updating each box
**Code**: `for i in range(n): update(i+1, arr[i])` → O(n log n)
**Optimization**: Can build in O(n) by propagating parent values directly

### Insight 4: Prefix Sum Property
**Visual**: Range sum = difference of two prefix sums
**Code**: `range_sum(L, R) = prefix_sum(R) - prefix_sum(L-1)`
**Why**: Fenwick excels at prefix queries; range queries use subtraction

### Insight 5: 1-Indexed Simplification
**Visual**: Warehouse positions start at 1, not 0
**Code**: `tree = [0] * (n+1)`, operations on `i` (1-based)
**Why**: Binary operations cleaner (no special case for index 0)

---

## Real-World Code Mappings

### Use Case 1: Leaderboard (Game Ranking)

**Visual**: Boxes storing player counts by score bucket

| Visual Element | Production Code | System |
|----------------|-----------------|--------|
| Score buckets | Array indices (discretized scores) | Mapping scores to positions |
| Player count per bucket | `tree[i]` | Number of players at this score |
| Rank query | `query(my_bucket)` | How many players below me? |
| Score update | `update(old, -1); update(new, +1)` | Move player between buckets |

**Code Pattern**:
```python
class Leaderboard:
    def __init__(self, max_score=10000):
        self.bit = FenwickTree(max_score)

    def update_score(self, old_score, new_score):
        """Player's score changed."""
        self.bit.update(old_score, -1)  # Remove from old bucket
        self.bit.update(new_score, 1)   # Add to new bucket

    def get_rank(self, score):
        """How many players have lower score?"""
        players_below = self.bit.query(score - 1)
        return players_below + 1  # Rank = players below + 1

# Example usage
lb = Leaderboard()
lb.update_score(0, 1500)  # Player joins with 1500 score
rank = lb.get_rank(1500)  # What's my rank?
```

**Sticky Mapping**: Query prefix = count players below score; update = move between buckets

---

### Use Case 2: Inventory Management

**Visual**: Warehouse locations storing stock quantities

| Visual Element | Production Code | Tool |
|----------------|-----------------|------|
| Warehouse locations | BIT indices | Spatial positions |
| Stock quantities | BIT values | Units in stock |
| Total stock in region | `range_query(start, end)` | Aggregate inventory |
| Shipment arrives | `update(location, quantity)` | Increase stock |

**Code Pattern**:
```python
class Inventory:
    def __init__(self, num_warehouses=1000):
        self.bit = FenwickTree(num_warehouses)

    def shipment(self, warehouse_id, quantity):
        """Shipment arrives at warehouse."""
        self.bit.update(warehouse_id, quantity)

    def stock_in_region(self, start_warehouse, end_warehouse):
        """Total stock in warehouse range."""
        return self.bit.range_query(start_warehouse, end_warehouse)

# Example
inv = Inventory()
inv.shipment(10, 500)  # 500 units arrive at warehouse 10
total = inv.stock_in_region(5, 20)  # Stock in warehouses 5-20
```

**Sticky Mapping**: BIT tracks cumulative stock; range queries = regional inventory

---

## Common Variations: Different Use Cases

### 1D Range Sum (Classic)
**Visual**: Line of boxes, each covering range
**Code**: Standard BIT implementation
**When**: Dynamic array, frequent sum queries

### 2D Range Sum
**Visual**: Grid of boxes (2D warehouse)
**Code**: Nested BIT (BIT of BITs)
**When**: Matrix queries with point updates

### Range Update, Point Query
**Visual**: Difference array + BIT
**Code**: `update(L, delta); update(R+1, -delta)`
**When**: Opposite problem (update ranges, query points)

### Order Statistics (Kth Element)
**Visual**: Binary search on BIT for kth sum
**Code**: Binary search with prefix sum checks
**When**: Find element at rank k with updates

---

## Self-Check: Do You Have Sticky Understanding?

### Test 1: Code → Visual
See this code:
```python
i = 5  # Binary: 0101
i & -i  # Result: 1
```

**Can you visualize?**
"Box 5 (binary 0101) has lowest set bit at position 1, so it covers 1 element (just itself). Its responsibility range is [5,5]."

### Test 2: Visual → Code
Imagine: "I need to update box at position 5, then climb to all parent boxes that depend on it."

**Can you write the code?**
```python
i = 5
delta = 3
while i <= n:
    tree[i] += delta
    i += i & -i  # Climb: 5 → 6 → 8 → 16 → ...
```

### Test 3: Explain Why
**Question**: Why does query take O(log n) time?

**Answer**: Each step removes the lowest set bit via `i -= i & -i`. An integer has at most log₂(n) bits, so we remove at most log₂(n) bits until reaching 0. Each iteration is O(1), total O(log n).

---

## The Stickiest Mapping

**🎯 CORE VISUAL**: Warehouse of boxes, each covering power-of-2 elements determined by binary position. Update climbs, query descends.

**🎯 CORE CODE**: `i & -i` finds responsibility, `i += i & -i` climbs, `i -= i & -i` descends. 1-indexed array simplifies math.

**🎯 CORE INSIGHT**: Binary index structure enables O(log n) prefix sums with updates. Simpler than segment tree for prefix/cumulative operations.

**When you see Fenwick tree code, you now see hierarchical boxes climbing/descending ladders. When you need dynamic prefix sums, you build the warehouse.**

**The connection is permanent!** 🚀

---

## Next Steps

1. **Trace update(5, delta)** on paper: which boxes get updated?
2. **Trace query(7)** on paper: which boxes contribute?
3. **Implement 2D BIT** for matrix range sum
4. **Solve a LeetCode problem** using Fenwick tree
5. **Map to production system** (leaderboard, inventory, analytics)

**Time investment**: 1.5-2 hours
**Return**: Master space-efficient prefix sums, unlock O(log n) cumulative queries

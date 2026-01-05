# Segment Tree - Code-to-Visual Mapping

**Purpose**: Connect the visual metaphor of a tournament bracket to actual code implementation, creating sticky understanding through three-way mapping.

---

## The Three-Way Connection

```
Visual Metaphor ←→ Actual Code ←→ Why It Works
  (Tournament Bracket)   (Tree Array)   (Divide & conquer hierarchy)
```

---

## Visual Metaphor Overview

**Physical Model**: Single-elimination tournament bracket

- **Players (leaves)** = Original array elements
- **Match** = Combining two values (sum, min, max, etc.)
- **Winner** = Node value (aggregate of children)
- **Championship trophy** = Root node (aggregate of entire array)
- **Bracket levels** = Tree height (log n levels)
- **Updating player stats** = Point update (propagate upward)
- **Querying range** = Collecting relevant match results
- **Array storage** = Bracket flattened into array (`tree[1..4n]`)

**Animation**: Players compete in matches, winners propagate up to championship. Update player → re-run affected matches. Query range → collect relevant winners.

---

## Core State Mappings

### Map State to Visual Elements

| Visual Element | Code Variable | Type | Purpose |
|----------------|---------------|------|---------|
| **Tournament bracket** | `tree[]` | `List[int]` | Array-based binary tree (4n size) |
| **Original players** | `arr[]` | `List[int]` | Input array |
| **Number of players** | `n` | `int` | Array size |
| **Node (match result)** | `tree[node]` | `int` | Aggregate value for range |
| **Node's range** | `[start, end]` | `Tuple[int, int]` | Which array elements this node covers |
| **Left child match** | `2*node + 1` | `int` (index) | Left subtree in array |
| **Right child match** | `2*node + 2` | `int` (index) | Right subtree in array |
| **Merge function** | `lambda a, b: a + b` | `Callable` | How to combine children (sum, min, max) |

---

## Action Mappings

### Map Visual Actions to Code

| Visual Action | Code Lines | Why This Works |
|---------------|------------|----------------|
| **Run a match (merge)** | `tree[node] = merge(tree[left], tree[right])` | Combine children to get parent |
| **Build bracket bottom-up** | `for i in range(n-1, 0, -1): tree[i] = merge(...)` | Leaves → root construction |
| **Player updates stats** | `update(index, value)` | Change leaf, re-run affected matches |
| **Propagate win upward** | Recursively update parent nodes | Bubble change to root |
| **Query range [L,R]** | Split into smaller brackets, collect | Divide & conquer on tree |
| **Complete overlap** | Return node value | This bracket fully inside query |
| **No overlap** | Return identity (0 for sum, ∞ for min) | This bracket outside query |
| **Partial overlap** | Recurse left & right, merge | Split bracket, collect from both |
| **Find mid-point** | `mid = (start + end) // 2` | Split range in half |

---

## Code-to-Visual Translation Tables

### If You See This Code... Visualize This

| Code Pattern | Visual Image |
|--------------|-------------|
| `tree = [0] * (4 * n)` | Allocate bracket with enough space for all matches |
| `tree[node] = tree[2*node+1] + tree[2*node+2]` | Match winner = sum of two sub-match winners |
| `if start == end: tree[node] = arr[start]` | Leaf node = individual player (base case) |
| `mid = (start + end) // 2` | Split bracket in half (left vs right) |
| `if query_start <= node_start and node_end <= query_end` | This bracket completely inside query range |
| `if query_end < node_start or query_start > node_end` | No overlap—skip this bracket |
| Recursive calls on left & right | Descend bracket, collect from sub-tournaments |
| `update` propagates upward | Player's new stat triggers re-running all their matches |

### If You Visualize This... Look for This Code

| Visual Image | Code Pattern |
|-------------|-------------|
| Build bracket from bottom up | `for i in reversed: tree[i] = merge(tree[2*i], tree[2*i+1])` |
| Championship trophy (root) | `tree[0]` or `tree[1]` (1-indexed) |
| Match between two players/groups | `merge(left_child_value, right_child_value)` |
| Update player → re-run matches | Recursive update + propagate to parent |
| Query bracket segment | Recursive query with range checks |
| Split bracket at midpoint | `mid = (start + end) // 2; recurse left & right` |
| Check if bracket relevant | `if left <= node_left and node_right <= right: return` |

---

## Execution Trace Example

**Problem**: Range sum query on `[1, 3, 5, 7, 9, 11]` with point updates

### Step 1: Build Tournament Bracket (Segment Tree)

```
Array: [1, 3, 5, 7, 9, 11]

Tree Structure (sum):
                    [0,5]=36
                   /         \
              [0,2]=9        [3,5]=27
             /      \        /       \
        [0,1]=4  [2,2]=5  [3,4]=16  [5,5]=11
        /    \             /     \
   [0,0]=1 [1,1]=3    [3,3]=7  [4,4]=9
```

**Array representation**: `tree = [36, 9, 27, 4, 5, 16, 11, 1, 3, 7, 9]`

### Step 2: Query Range [1, 4] (sum of elements 1-4)

| Step | Node Range | Query Range | Overlap | Action | Value |
|------|------------|-------------|---------|--------|-------|
| 1 | [0,5] | [1,4] | Partial | Recurse left & right | - |
| 2 | [0,2] (left) | [1,4] | Partial | Recurse left & right | - |
| 3 | [0,1] | [1,4] | Partial | Recurse left & right | - |
| 4 | [0,0] | [1,4] | None | Return 0 | 0 |
| 5 | [1,1] | [1,4] | **Complete** | Return node value | 3 |
| 6 | [2,2] (right) | [1,4] | **Complete** | Return node value | 5 |
| 7 | [3,5] (right) | [1,4] | Partial | Recurse left & right | - |
| 8 | [3,4] | [1,4] | **Complete** | Return node value | 16 |
| 9 | [5,5] | [1,4] | None | Return 0 | 0 |
| 10 | **Merge** | - | - | 3 + 5 + 16 | **24** |

**Result**: `sum([1,4]) = 3 + 5 + 7 + 9 = 24` ✓

### Step 3: Update arr[1] = 3 → 10 (add 7)

| Step | Action | Node | Old Value | New Value |
|------|--------|------|-----------|-----------|
| 1 | Update leaf [1,1] | tree[9] | 3 | 10 |
| 2 | Propagate to parent [0,1] | tree[3] | 4 | 11 |
| 3 | Propagate to parent [0,2] | tree[1] | 9 | 16 |
| 4 | Propagate to root [0,5] | tree[0] | 36 | 43 |

**Affected matches re-run**: All matches involving player 1 → new championship total!

---

## Pattern Recognition: Code ↔ Visual

### Common Code Patterns in Segment Tree

| Code Pattern | What It Means Visually | When You Use It |
|--------------|------------------------|-----------------|
| `tree = [0] * (4*n)` | Allocate bracket (safe size for binary tree) | Initialization |
| `if start == end` | Reached individual player (leaf) | Base case |
| `mid = (start + end) // 2` | Split bracket at midpoint | Divide step |
| `merge(left, right)` | Run match between children | Combine results |
| Recursive build | Build bracket bottom-up (leaves → root) | Construction |
| Recursive query | Navigate bracket, collect relevant winners | Range query |
| Recursive update | Update player, re-run all their matches | Point update |
| `if left <= node_start and node_end <= right` | Complete overlap—use this winner | Optimization |
| `if right < node_start or left > node_end` | No overlap—skip this bracket | Pruning |

---

## Key Insights

### Insight 1: Logarithmic Height
**Visual**: Tournament has log₂(n) levels (8 players → 3 rounds to champion)
**Code**: Tree height = O(log n); query/update touch O(log n) nodes
**Why**: Binary tree halves problem size at each level

### Insight 2: 4n Array Size Safety
**Visual**: Bracket needs space for all rounds (n + n/2 + n/4 + ... ≈ 2n nodes)
**Code**: `tree = [0] * (4*n)` guarantees enough space for any n
**Why**: Actual need is 2n-1 nodes, but 4n simplifies indexing math

### Insight 3: Parent-Child Indexing
**Visual**: Bracket structure encoded in array positions
**Code**: Left child = `2*i+1`, right child = `2*i+2`, parent = `(i-1)//2`
**Why**: Array-based binary tree: implicit pointers via index arithmetic

### Insight 4: Merge Function Flexibility
**Visual**: "Match" can be sum, min, max, GCD, XOR—any associative operation
**Code**: `merge = lambda a,b: a+b` for sum, `min(a,b)` for range min
**Why**: Segment tree works for any operation where `merge(merge(a,b),c) == merge(a,merge(b,c))`

### Insight 5: Query Partitioning
**Visual**: Range query = collecting winners from relevant sub-brackets
**Code**: Split query into non-overlapping segments that align with tree nodes
**Why**: Tree structure perfectly partitions array into powers-of-2 ranges

---

## Real-World Code Mappings

### Use Case 1: Time-Series Database (Prometheus)

**Visual**: Tournament of metric values over time windows

| Visual Element | Production Code | System |
|----------------|-----------------|--------|
| Time buckets | `arr[i]` = metric at minute i | Array of measurements |
| Aggregation tree | Segment tree per metric | Fast range queries |
| Query "max CPU last hour" | `query(now-60, now)` → range max | O(log n) query |
| New metric arrives | `update(current_minute, value)` | O(log n) update |
| Merge operation | `max(left, right)` for max, `sum` for avg | Metric type |

**Code Pattern**:
```python
# Prometheus-like metric aggregation
class MetricSegmentTree:
    def __init__(self, n: int):
        self.n = n
        self.tree = [0] * (4 * n)  # Bracket for time buckets

    def update(self, minute: int, value: float):
        """New metric arrives for this minute."""
        self._update(0, 0, self.n-1, minute, value)

    def query_max(self, start_min: int, end_min: int) -> float:
        """Max metric in time range [start_min, end_min]."""
        return self._query_max(0, 0, self.n-1, start_min, end_min)

    def _update(self, node, node_start, node_end, idx, val):
        if node_start == node_end:
            self.tree[node] = val  # Update player stat
            return
        mid = (node_start + node_end) // 2
        if idx <= mid:
            self._update(2*node+1, node_start, mid, idx, val)
        else:
            self._update(2*node+2, mid+1, node_end, idx, val)
        # Re-run match with new player stat
        self.tree[node] = max(self.tree[2*node+1], self.tree[2*node+2])

    def _query_max(self, node, node_start, node_end, qstart, qend):
        # No overlap
        if qend < node_start or qstart > node_end:
            return float('-inf')
        # Complete overlap—use this winner
        if qstart <= node_start and node_end <= qend:
            return self.tree[node]
        # Partial—collect from both sides
        mid = (node_start + node_end) // 2
        left_max = self._query_max(2*node+1, node_start, mid, qstart, qend)
        right_max = self._query_max(2*node+2, mid+1, node_end, qstart, qend)
        return max(left_max, right_max)
```

**Sticky Mapping**: Each metric bucket = player, time ranges = brackets, max query = championship winner

---

### Use Case 2: Stock Trading (Price Range Queries)

**Visual**: Tournament bracket for stock prices across ticks

| Visual Element | Production Code | Tool |
|----------------|-----------------|------|
| Tick prices | Array of trade prices | Time-series data |
| Min/max price query | Range min/max on segment tree | Fast analytics |
| Trade execution | Point update when trade happens | O(log n) |
| Price bands | Query [now-5min, now] | Range query |

**Code Pattern**:
```python
# Trading platform: "What's the price range in last 5 minutes?"
st = SegmentTree(ticks, merge_fn=lambda a, b: (min(a[0], b[0]), max(a[1], b[1])))

# New trade at current tick
st.update(current_tick, (trade_price, trade_price))

# Query price range [start_tick, end_tick]
min_price, max_price = st.query(start_tick, end_tick)
```

**Sticky Mapping**: Tournament determines min/max "champions" for any time window

---

## Common Variations: Different Merge Functions

### Range Sum
**Visual**: Championship score = sum of all player scores
**Code**: `merge = lambda a, b: a + b`
**Identity**: 0 (no players = 0 sum)

### Range Minimum
**Visual**: Champion = smallest player value
**Code**: `merge = lambda a, b: min(a, b)`
**Identity**: `float('inf')` (no players = infinite)

### Range Maximum
**Visual**: Champion = largest player value
**Code**: `merge = lambda a, b: max(a, b)`
**Identity**: `float('-inf')`

### Range GCD
**Visual**: Champion = GCD of all players
**Code**: `merge = lambda a, b: gcd(a, b)`
**Identity**: 0 (GCD property)

### Lazy Propagation (Range Update)
**Visual**: Update entire bracket section at once, defer propagation
**Code**: Lazy array + push-down logic
**When**: Range updates (not just point updates)

---

## Self-Check: Do You Have Sticky Understanding?

### Test 1: Code → Visual
See this code:
```python
if query_start <= node_start and node_end <= query_end:
    return tree[node]
```

**Can you visualize?**
"This tournament bracket is completely inside the query range. Return the winner of this sub-tournament (it's already the aggregate we need)."

### Test 2: Visual → Code
Imagine: "Player at position 5 updates their score from 10 to 15. Re-run all matches involving this player up to the championship."

**Can you write the code?**
```python
def update(index, new_value, node=0, start=0, end=n-1):
    if start == end:
        tree[node] = new_value  # Update player
        return

    mid = (start + end) // 2
    if index <= mid:
        update(index, new_value, 2*node+1, start, mid)
    else:
        update(index, new_value, 2*node+2, mid+1, end)

    # Re-run match with new value
    tree[node] = tree[2*node+1] + tree[2*node+2]
```

### Test 3: Explain Why
**Question**: Why is segment tree query O(log n)?

**Answer**: At each level of the tree, we visit at most 4 nodes (2 for left boundary splits, 2 for right boundary splits). Tree has O(log n) levels. Total nodes visited: O(4 × log n) = O(log n). Most nodes are skipped via complete/no overlap checks.

---

## The Stickiest Mapping

**🎯 CORE VISUAL**: Tournament bracket where players = array elements, matches = merging children, championship = root (entire array aggregate).

**🎯 CORE CODE**: Binary tree in array (`tree[4n]`), recursive build/query/update, parent-child via `2*i+1` and `2*i+2`.

**🎯 CORE INSIGHT**: Hierarchical range partitioning enables O(log n) queries and updates on dynamic arrays. Any associative merge operation works.

**When you see segment tree code, you now see a tournament bracket. When you need range queries with updates, you know to build the bracket.**

**The connection is permanent!** 🚀

---

## Next Steps

1. **Build a segment tree** for `[1,3,5,7,9,11]` on paper
2. **Trace a range query** [2,5] step-by-step
3. **Implement range min/max** variant
4. **Solve a LeetCode problem** using segment tree
5. **Map to production system** (time-series DB, stock analytics)

**Time investment**: 2-3 hours
**Return**: Master advanced data structures, unlock O(log n) range operations

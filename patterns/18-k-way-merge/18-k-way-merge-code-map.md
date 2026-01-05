# K-way Merge - Code-to-Visual Mapping

**Purpose**: Connect the visual metaphor of merging K conveyor belts to actual code implementation, creating sticky understanding through three-way mapping.

---

## The Three-Way Connection

```
Visual Metaphor ←→ Actual Code ←→ Why It Works
  (K conveyor belts)   (Heap of K elements)   (O(N log K) merge)
```

---

## Visual Metaphor Overview

**Physical Model**: K sorted conveyor belts merging into one output belt

- **Conveyor belt** = One sorted list/array
- **Item at front of belt** = Current element from list
- **Inspection station** = Min heap comparing fronts
- **Inspector** = Heap top (smallest visible item)
- **Output belt** = Merged result array
- **Picking item** = Heappop (take smallest)
- **Advancing belt** = Move to next element in that list
- **New item arrives at front** = Heappush next element
- **Belt runs out** = List exhausted, no more elements

**Animation**: K belts each showing one item. Inspector picks smallest visible item, places on output belt. That belt advances showing next item. Inspector compares K visible items, picks smallest, repeats.

---

## Core State Mappings

### Map State to Visual Elements

| Visual Element | Code Variable | Type | Purpose |
|----------------|---------------|------|---------|
| **Conveyor belts** | `lists` | `List[List[int]]` | K sorted input lists |
| **Items at inspection** | `heap` | `List[tuple]` | Min heap of (value, list_idx, elem_idx) |
| **Smallest visible item** | `heap[0]` | `tuple` | Top of heap |
| **Output belt** | `result` | `List[int]` | Merged output |
| **Belt number** | `list_idx` | `int` | Which list (0 to K-1) |
| **Position on belt** | `elem_idx` | `int` | Current index in list |
| **Item value** | `value` | `int` | Element being compared |
| **Number of belts** | `K` | `int` | Number of lists |
| **Belt exhausted** | `elem_idx >= len(lists[list_idx])` | `bool` | No more items |

---

## Action Mappings

### Map Visual Actions to Code

| Visual Action | Code Lines | Why This Works |
|---------------|------------|----------------|
| **Place first item from each belt** | `for i, lst in enumerate(lists): if lst: heappush(heap, (lst[0], i, 0))` | Initialize inspection |
| **Look at smallest visible item** | `heap[0]` | Peek at heap top |
| **Pick smallest item** | `val, list_idx, elem_idx = heappop(heap)` | Extract min |
| **Place on output belt** | `result.append(val)` | Add to result |
| **Advance belt to next item** | `elem_idx += 1` | Move forward |
| **Check if belt has more items** | `if elem_idx < len(lists[list_idx]):` | Not exhausted |
| **Bring next item to inspection** | `heappush(heap, (lists[list_idx][elem_idx], list_idx, elem_idx))` | Add next to heap |
| **All belts empty** | `while heap:` completes | Merge finished |
| **Get next from specific belt** | `lists[list_idx][elem_idx + 1]` | Access next element |

---

## Code-to-Visual Translation Tables

### If You See This Code... Visualize This

| Code Pattern | Visual Image |
|--------------|-------------|
| `heap = []` for i in range(K): heappush(...) | Line up first item from each belt at inspection |
| `heappush(heap, (value, i, 0))` | Belt i's first item arrives at inspection |
| `val, list_idx, elem_idx = heappop(heap)` | Inspector picks smallest visible item |
| `result.append(val)` | Place picked item on output belt |
| `elem_idx + 1` | Advance belt to next item |
| `lists[list_idx][elem_idx + 1]` | Next item on belt becomes visible |
| `heappush(heap, (next_val, list_idx, elem_idx + 1))` | New item from same belt joins inspection |
| `if elem_idx + 1 < len(lists[list_idx]):` | Check if belt has more items |
| `while heap:` | Continue while any belt has items at inspection |

### If You Visualize This... Look for This Code

| Visual Image | Code Pattern |
|-------------|-------------|
| Initialize: first item from each belt | `for i, lst in enumerate(lists): if lst: heappush(heap, (lst[0], i, 0))` |
| Pick smallest visible item | `heappop(heap)` returns `(value, list_idx, elem_idx)` |
| Place on output belt | `result.append(value)` |
| Advance belt, bring next item | `if elem_idx + 1 < len(lists[list_idx]): heappush(heap, (..., list_idx, elem_idx + 1))` |
| Belt runs out | Don't push anything, belt no longer in heap |
| All belts processed | Heap becomes empty, loop ends |
| Heap size is K | At most K items visible (one per belt) |

---

## Execution Trace Example

**Problem**: Merge 3 sorted arrays: `[1, 4, 7]`, `[2, 5, 8]`, `[3, 6, 9]`

### Step-by-Step: Visual + Code Side-by-Side

| Step | Visual State | Code State | Action |
|------|-------------|------------|--------|
| **1** | Belts: [1,4,7], [2,5,8], [3,6,9] | `lists = [[1,4,7], [2,5,8], [3,6,9]]` | Input |
| **2** | Inspection: 1(belt0), 2(belt1), 3(belt2) | `heap = [(1,0,0), (2,1,0), (3,2,0)]` | Initialize |
| **3** | Pick smallest: 1 from belt 0 | `heappop() → (1, 0, 0)` | Extract min |
| **4** | Output: [1], advance belt 0 | `result = [1]` | Add to result |
| **5** | Belt 0 shows next: 4 | `elem_idx=1, lists[0][1]=4` | Advance |
| **6** | Bring 4 to inspection | `heappush(heap, (4,0,1)), heap=[(2,1,0), (3,2,0), (4,0,1)]` | Update heap |
| **7** | Inspection: 2(belt1), 3(belt2), 4(belt0) | Heap reorganized | Ready for next |
| **8** | Pick smallest: 2 from belt 1 | `heappop() → (2, 1, 0)` | Extract min |
| **9** | Output: [1, 2], advance belt 1 | `result = [1, 2]` | Add to result |
| **10** | Bring 5 to inspection | `heappush(heap, (5,1,1)), heap=[(3,2,0), (4,0,1), (5,1,1)]` | Update heap |
| **11** | Pick smallest: 3 from belt 2 | `heappop() → (3, 2, 0)` | Extract min |
| **12** | Output: [1, 2, 3] | `result = [1, 2, 3]` | Add to result |
| **13** | Bring 6 to inspection | `heappush(heap, (6,2,1))` | Update heap |
| **...** | Continue pattern | Repeat until all belts empty | ... |
| **Final** | Output belt: [1,2,3,4,5,6,7,8,9] | `result = [1,2,3,4,5,6,7,8,9]` | Merged! |

**Final Result**: Sorted merged array

---

## Pattern Recognition: Code ↔ Visual

### Common Code Patterns in K-way Merge

| Code Pattern | What It Means Visually | When You Use It |
|--------------|------------------------|-----------------|
| `heap = [(lst[0], i, 0) for i, lst in enumerate(lists) if lst]` | Line up first items from all belts | Initialization |
| `val, list_idx, elem_idx = heappop(heap)` | Inspector picks smallest visible item | Extract min |
| `result.append(val)` | Place on output belt | Build result |
| `if elem_idx + 1 < len(lists[list_idx]):` | Belt has more items? | Boundary check |
| `heappush(heap, (lists[list_idx][elem_idx + 1], list_idx, elem_idx + 1))` | Advance belt, new item visible | Update heap |
| `while heap:` | While any belt shows items | Main loop |
| `len(heap) <= K` | At most K items visible | Heap size invariant |

---

## Key Insights

### Insight 1: Heap Size is K, Not N
**Visual**: Inspector only sees K items (one from each belt), not all N total items
**Code**: Heap size ≤ K at all times
**Why**: O(log K) operations, not O(log N) - critical when K << N

### Insight 2: O(N log K) Total Complexity
**Visual**: Process N items total, each inspection takes log K time
**Code**: N iterations of heappop/heappush, each O(log K)
**Why**: For K=10 lists with N=1,000,000 items, log K ≈ 3.3 (almost constant!)

### Insight 3: Heap Element is Tuple (value, list_idx, elem_idx)
**Visual**: Track which belt item came from and where on belt
**Code**: `(value, list_idx, elem_idx)` tuple in heap
**Why**: Need to know which belt to advance after picking item

### Insight 4: Empty Lists Must Be Filtered
**Visual**: Some belts might be empty, don't inspect them
**Code**: `if lst:` before initial heappush, check bounds before advancing
**Why**: Avoid index errors and empty heap issues

### Insight 5: Generalizes Beyond Arrays
**Visual**: Works with linked lists, streams, any ordered sequence
**Code**: Same pattern with `node.next` for linked lists, `stream.read()` for streams
**Why**: Pattern is about tracking frontiers of K sources, not specific to arrays

---

## Real-World Code Mappings

### Use Case 1: Database - Merge Join

**Visual**: Merge sorted results from K database shards

| Visual Element | Production Code | System |
|----------------|-----------------|--------|
| Database shards | K sorted query results | Distributed DB |
| Rows at cursor | Heap of current rows | Min heap |
| Smallest row | `heappop(heap)` | Next result |
| Advance cursor | Fetch next from shard | Iterator |
| Output | Merged result set | Query result |

**Code Pattern**:
```python
# Merge K sorted query results from shards
def merge_shard_results(shard_results):
    heap = []

    # Initialize with first row from each shard
    for shard_idx, rows in enumerate(shard_results):
        if rows:
            heappush(heap, (rows[0], shard_idx, 0))

    merged = []
    while heap:
        row, shard_idx, row_idx = heappop(heap)
        merged.append(row)

        # Get next row from same shard
        if row_idx + 1 < len(shard_results[shard_idx]):
            next_row = shard_results[shard_idx][row_idx + 1]
            heappush(heap, (next_row, shard_idx, row_idx + 1))

    return merged
```

**Sticky Mapping**: K shards are K conveyor belts, heap merges them

---

### Use Case 2: Log Aggregation - Multi-Server Logs

**Visual**: Merge time-sorted logs from K servers into chronological stream

| Visual Element | Production Code | Tool |
|----------------|-----------------|------|
| Server logs | K sorted log streams | Log files |
| Log entry | Heap element | Timestamp + message |
| Chronological merge | K-way merge by timestamp | Heap comparison |
| Earliest entry | `heappop(heap)` | Next log |
| Read next log | Advance stream | File iterator |

**Code Pattern**:
```python
# Merge logs from K servers by timestamp
def merge_logs(log_streams):
    heap = []

    # Initialize with first log from each server
    for server_id, stream in enumerate(log_streams):
        log = stream.readline()
        if log:
            timestamp = parse_timestamp(log)
            heappush(heap, (timestamp, server_id, log))

    while heap:
        timestamp, server_id, log = heappop(heap)
        print(log)  # Output chronologically

        # Read next log from same server
        next_log = log_streams[server_id].readline()
        if next_log:
            next_timestamp = parse_timestamp(next_log)
            heappush(heap, (next_timestamp, server_id, next_log))
```

**Sticky Mapping**: K log files are K belts sorted by time

---

## Algorithm Variations: Same Visual, Different Use Cases

### Merge K Sorted Arrays
**Visual**: K array belts, merge into single array
**Code**: `heappush(heap, (arr[i][j], i, j))`
**Use**: Basic K-way merge, external sort

### Merge K Sorted Linked Lists
**Visual**: K linked list belts, merge into single list
**Code**: `heappush(heap, (node.val, node))` with custom comparison
**Use**: LeetCode 23, database cursors

### Smallest Range Covering K Lists
**Visual**: Track min (heap) and max (variable) among K visible items
**Code**: K-way merge tracking `current_max`, minimize range `[heap[0], current_max]`
**Use**: Multi-source overlap, inventory matching

### Kth Smallest in Sorted Matrix
**Visual**: Treat matrix rows as K sorted belts
**Code**: K-way merge, pop K times
**Use**: Matrix problems, priority scheduling

### External Sort Merge Phase
**Visual**: Merge K sorted file chunks into one sorted file
**Code**: K-way merge with file streams
**Use**: Sort data larger than RAM

---

## Self-Check: Do You Have Sticky Understanding?

### Test 1: Code → Visual
See this code:
```python
val, list_idx, elem_idx = heappop(heap)
result.append(val)
if elem_idx + 1 < len(lists[list_idx]):
    heappush(heap, (lists[list_idx][elem_idx + 1], list_idx, elem_idx + 1))
```

**Can you visualize?**
"Inspector picks smallest visible item from inspection station. Place it on output belt. Check if that belt has more items. If yes, advance belt and bring next item to inspection."

### Test 2: Visual → Code
Imagine: "I have K conveyor belts with linked lists (nodes). I need to merge them by comparing node values."

**Can you write the code?**
```python
# Merge K sorted linked lists
heap = []

# Initialize with first node from each list
for i, node in enumerate(lists):
    if node:
        heappush(heap, (node.val, i, node))

dummy = ListNode(0)
current = dummy

while heap:
    val, list_idx, node = heappop(heap)
    current.next = node
    current = current.next

    # Advance linked list
    if node.next:
        heappush(heap, (node.next.val, list_idx, node.next))

return dummy.next
```

### Test 3: Explain Why
**Question**: Why is K-way merge O(N log K) instead of O(N log N)?

**Answer**: We process N total elements (all items across all belts). For each element, we do one heappop (O(log K)) and one heappush (O(log K)). Total: N * 2 * O(log K) = O(N log K). The heap size is K (number of belts), not N (total items). When K is small (say 10 belts with 1 million items), log K ≈ 3.3 while log N ≈ 20. Massive difference! Heap tracks K frontiers, not all N elements.

---

## The Stickiest Mapping

**Core Visual**: K sorted conveyor belts, inspector always picks smallest visible item, advances that belt, brings next item to inspection.

**Core Code**: Min heap of size K storing `(value, list_idx, elem_idx)`, pop min, append to result, push next from same list.

**Core Insight**: Heap size is K (number of sources), not N (total elements). O(N log K) complexity makes this extremely efficient when K << N. Inspector (heap) only needs to see K items at a time, not all N items.

**When you see K-way merge code, you now see conveyor belts and inspector. When you imagine merging K sorted sources, you now know exactly what code to write.**

**The connection is permanent!**

---

## Next Steps

1. **Trace the verbose form** line-by-line with the conveyor belt visual
2. **Trace the terse form** with same visual
3. **Solve LeetCode 23** (Merge k Sorted Lists) using the belt metaphor
4. **Solve LeetCode 632** (Smallest Range) tracking min and max
5. **Implement for file streams** - that's when it truly sticks!

**Time investment**: 2-3 hours
**Return**: Deep, intuitive understanding that lasts years

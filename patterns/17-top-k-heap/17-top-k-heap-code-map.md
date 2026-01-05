# Top K / Heap - Code-to-Visual Mapping

**Purpose**: Connect the visual metaphor of a priority queue to actual code implementation, creating sticky understanding through three-way mapping.

---

## The Three-Way Connection

```
Visual Metaphor ←→ Actual Code ←→ Why It Works
  (VIP queue + bouncer)   (Heap + size K)   (O(log K) maintain top K)
```

---

## Visual Metaphor Overview

**Physical Model**: VIP nightclub with limited capacity and bouncer enforcing entry

- **VIP queue** = Min or max heap
- **Bouncer** = Heap comparison logic
- **Capacity limit** = Size K constraint
- **VIP pass value** = Element priority/value
- **Person at front of queue** = `heap[0]` (top element)
- **Least VIP person inside** = Top of min heap (for top K largest)
- **Kick out least VIP** = `heappop()` when exceeding K
- **New person arrives** = `heappush()` operation
- **Check VIP level** = Compare with `heap[0]`

**Animation**: For top K largest: Club holds K people. New person arrives, bouncer checks if VIP level exceeds least VIP person inside. If yes, kick out least VIP, let new person in. Min heap tracks who gets kicked out next.

---

## Core State Mappings

### Map State to Visual Elements

| Visual Element | Code Variable | Type | Purpose |
|----------------|---------------|------|---------|
| **VIP queue** | `heap` | `List[int]` | Binary heap structure |
| **Person at front** | `heap[0]` | `int` | Top element (peek O(1)) |
| **Club capacity** | `K` | `int` | Size constraint |
| **Current occupancy** | `len(heap)` | `int` | Current heap size |
| **Least VIP inside (top K largest)** | `heap[0]` in min heap | `int` | Boundary element |
| **Most VIP inside (top K smallest)** | `heap[0]` in max heap | `int` | Boundary element |
| **New arrival** | `num` to insert | `int` | Element to add |
| **VIP comparison** | `num > heap[0]` | `bool` | Should this person enter? |

---

## Action Mappings

### Map Visual Actions to Code

| Visual Action | Code Lines | Why This Works |
|---------------|------------|----------------|
| **Check person at front** | `heap[0]` | Peek at top (O(1)) |
| **Add person to queue** | `heappush(heap, num)` | Insert with heapify (O(log n)) |
| **Kick out front person** | `heappop(heap)` | Remove top (O(log n)) |
| **Check club capacity** | `if len(heap) < K:` | Is there room? |
| **Club is full** | `len(heap) == K` | At capacity |
| **Check if new arrival is VIP enough** | `if num > heap[0]:` | Compare with boundary |
| **Kick out and let in** | `heapreplace(heap, num)` | Pop and push in one op |
| **Build VIP queue from list** | `heapify(arr)` | Convert array to heap (O(n)) |
| **Make max heap (Python)** | `heappush(heap, -num)` | Negate values for max |
| **Get actual value from max heap** | `-heap[0]` | Un-negate to get real value |

---

## Code-to-Visual Translation Tables

### If You See This Code... Visualize This

| Code Pattern | Visual Image |
|--------------|-------------|
| `heap = []` | Empty VIP queue |
| `heappush(heap, num)` | New person joins queue, queue reorganizes |
| `heap[0]` | Look at person at front of queue |
| `heappop(heap)` | Front person leaves, queue reorganizes |
| `len(heap) < K` | Club not at capacity, anyone can enter |
| `if num > heap[0]:` | New arrival more VIP than least VIP inside (min heap) |
| `heapreplace(heap, num)` | Kick out front person, new person takes spot |
| `heapify(arr)` | Convert unorganized group into orderly VIP queue |
| `heappush(heap, -num)` | Max heap: treat negative VIP level (priority inversion) |
| `for _ in range(K): heappop(heap)` | Let K people exit in priority order |

### If You Visualize This... Look for This Code

| Visual Image | Code Pattern |
|-------------|-------------|
| Check least VIP person inside | `heap[0]` (min heap for top K largest) |
| Add person to VIP queue | `heappush(heap, value)` |
| Remove front person | `heappop(heap)` |
| New person more VIP than least inside | `if num > heap[0]:` (top K largest) |
| Kick out least VIP, admit new person | `heapreplace(heap, num)` |
| Club at capacity | `len(heap) == K` |
| Initialize from list | `heap = list(arr); heapify(heap)` |
| Get K most VIP people | Maintain size-K min heap |

---

## Execution Trace Example

**Problem**: Find top 3 largest numbers in `[5, 2, 9, 1, 7, 6, 8]`

### Step-by-Step: Visual + Code Side-by-Side

| Step | Visual State | Code State | Action |
|------|-------------|------------|--------|
| **1** | Empty club (K=3) | `heap=[], K=3` | Initialize |
| **2** | Person with VIP=5 arrives, enter | `heappush(heap, 5), heap=[5]` | Room available |
| **3** | VIP=2 arrives, enter | `heappush(heap, 2), heap=[2,5]` | Still room |
| **4** | VIP=9 arrives, enter, club full | `heappush(heap, 9), heap=[2,5,9]` | At capacity |
| **5** | VIP=1 arrives, check front (VIP=2) | `1 < heap[0]=2, skip` | Not VIP enough |
| **6** | VIP=7 arrives, 7 > 2, kick out 2 | `heapreplace(heap, 7), heap=[5,7,9]` | Replace least VIP |
| **7** | VIP=6 arrives, 6 > 5, kick out 5 | `heapreplace(heap, 6), heap=[6,7,9]` | Replace least VIP |
| **8** | VIP=8 arrives, 8 > 6, kick out 6 | `heapreplace(heap, 8), heap=[7,8,9]` | Replace least VIP |
| **9** | Club has top 3 VIPs | `heap=[7,8,9]` | Top K largest |

**Final Result**: Top 3 largest elements: [7, 8, 9]

**Key Insight**: Min heap for top K largest because we want to quickly evict the smallest of the top K.

---

## Pattern Recognition: Code ↔ Visual

### Common Code Patterns in Top K / Heap

| Code Pattern | What It Means Visually | When You Use It |
|--------------|------------------------|-----------------|
| `heappush(heap, num)` | Add person to VIP queue | Insert element |
| `heap[0]` | Check front person (min or max) | Peek at top |
| `heappop(heap)` | Remove front person | Extract top |
| `len(heap) < K` | Club not full | Build initial heap |
| `if num > heap[0]:` | More VIP than least inside (min heap) | Top K largest filter |
| `if num < heap[0]:` | Less VIP than most inside (max heap) | Top K smallest filter |
| `heapreplace(heap, num)` | Atomic kick-out and admit | Replace top |
| `heapq.nlargest(K, arr)` | Get K most VIP (largest) | Built-in top K |
| `heappush(heap, -num)` | Max heap simulation | Priority inversion |

---

## Key Insights

### Insight 1: Counter-Intuitive Heap Choice
**Visual**: For top K largest, use min heap (track least VIP among top K)
**Code**: Min heap for top K largest, max heap for top K smallest
**Why**: Boundary element determines who gets kicked out, not the extreme

### Insight 2: O(n log K) vs O(n log n)
**Visual**: Club of size K vs sorting entire crowd
**Code**: Maintain size-K heap vs sorting all elements
**Why**: For K << n (e.g., top 10 from 1 million), heap is massively faster

### Insight 3: Heap is Array-Based Tree
**Visual**: VIP queue has tree structure but stored in array
**Code**: `heap[i]` parent is `heap[(i-1)//2]`, children are `heap[2*i+1]` and `heap[2*i+2]`
**Why**: Cache-friendly, no pointers, simple index arithmetic

### Insight 4: Python heapq is Min Heap Only
**Visual**: Default queue favors lowest VIP first
**Code**: For max heap, negate values: `heappush(heap, -num)`, `result = -heappop(heap)`
**Why**: Python standard library only provides min heap, use negation trick

### Insight 5: Heap vs Sorted Array
**Visual**: VIP queue vs sorted line
**Code**: Heap maintains partial order (parent < children), not full sort
**Why**: Faster operations (O(log n) vs O(n log n)), but only top is accessible

---

## Real-World Code Mappings

### Use Case 1: Task Scheduler - Priority Queue

**Visual**: Tasks with priorities, always execute highest priority first

| Visual Element | Production Code | System |
|----------------|-----------------|--------|
| Task queue | Max heap | Scheduler |
| Task priority | Heap element | Priority value |
| Get next task | `heappop(heap)` | Dequeue |
| Add new task | `heappush(heap, (priority, task))` | Enqueue |
| Highest priority | `heap[0]` | Peek |

**Code Pattern**:
```python
# Task scheduler with priority queue
task_queue = []  # Max heap (use negative priorities)

# Add task with priority
heappush(task_queue, (-priority, task))

# Get highest priority task
priority, task = heappop(task_queue)
priority = -priority  # Un-negate

# Peek at next task without removing
if task_queue:
    next_priority, next_task = task_queue[0]
```

**Sticky Mapping**: Max heap ensures always process highest priority task

---

### Use Case 2: Real-Time Top K - Trending Topics

**Visual**: Track top K trending hashtags as tweets stream in

| Visual Element | Production Code | Tool |
|----------------|-----------------|------|
| Trending list | Min heap of size K | Top K tracker |
| Hashtag count | Element value | Frequency |
| Check if trending | `count > heap[0]` | Comparison |
| Update trending | `heapreplace(heap, new_count)` | Maintain top K |
| Show trending | Sort heap, reverse | Display |

**Code Pattern**:
```python
# Top K trending hashtags
trending = []  # Min heap of (count, hashtag)
K = 10

# New hashtag count arrives
if len(trending) < K:
    heappush(trending, (count, hashtag))
elif count > trending[0][0]:  # More popular than least trending
    heapreplace(trending, (count, hashtag))

# Get top K for display
top_k = sorted(trending, reverse=True)
```

**Sticky Mapping**: Min heap of size K tracks boundary of trending

---

## Algorithm Variations: Same Visual, Different Use Cases

### Top K Largest
**Visual**: Club admits K most VIP people (highest values)
**Code**: Min heap of size K, compare `num > heap[0]`
**Use**: Top K salaries, largest elements

### Top K Smallest
**Visual**: Club admits K least VIP people (lowest values)
**Code**: Max heap of size K, compare `num < heap[0]`
**Use**: K smallest distances, closest points

### Kth Largest Element
**Visual**: After K people enter, least VIP inside is Kth largest
**Code**: Min heap size K, return `heap[0]`
**Use**: Kth largest in stream, statistics

### Median of Stream
**Visual**: Two clubs: lower half (max heap), upper half (min heap), balance sizes
**Code**: Two heaps with balancing, median is top of larger heap
**Use**: Running median, percentiles

### Merge K Sorted Lists
**Visual**: K queues, always pick smallest front person across all queues
**Code**: Min heap of (value, list_idx, elem_idx)
**Use**: Database merge, log aggregation

---

## Self-Check: Do You Have Sticky Understanding?

### Test 1: Code → Visual
See this code:
```python
if len(heap) < K:
    heappush(heap, num)
elif num > heap[0]:
    heapreplace(heap, num)
```

**Can you visualize?**
"If club isn't full (less than K people), let new person in. If club is full, check if new person's VIP level exceeds the least VIP person inside (front of min heap). If yes, kick out least VIP person and admit new person."

### Test 2: Visual → Code
Imagine: "I have two clubs. Lower club holds smaller half of people (max heap so largest of lower half is at front). Upper club holds larger half (min heap so smallest of upper half is at front). New person arrives."

**Can you write the code?**
```python
# Median finder with two heaps
if not lower or num <= -lower[0]:  # Max heap (negated)
    heappush(lower, -num)
else:
    heappush(upper, num)

# Rebalance: lower should have ≤ 1 more person than upper
if len(lower) > len(upper) + 1:
    heappush(upper, -heappop(lower))
elif len(upper) > len(lower):
    heappush(lower, -heappop(upper))
```

### Test 3: Explain Why
**Question**: Why use min heap for top K largest instead of max heap?

**Answer**: Min heap for top K largest lets us quickly find the weakest among the top K (heap[0]). When new element arrives, compare with this boundary: if new element exceeds it, remove boundary and add new element. Max heap would give us the largest (which we already know is in top K), not the boundary that determines who gets kicked out. The top of the heap is the eviction candidate.

---

## The Stickiest Mapping

**Core Visual**: VIP nightclub with capacity K, bouncer checks if newcomers exceed least VIP person inside, kicks out least VIP to make room.

**Core Code**: Min heap (for top K largest) or max heap (for top K smallest), maintain size K, compare new elements with `heap[0]` (boundary).

**Core Insight**: Heap tracks the boundary of top K, not the extreme. For top K largest, min heap's top is the weakest of the top K (eviction candidate). O(log K) operations make it vastly faster than sorting for K << n.

**When you see heap code, you now see VIP queue and bouncer. When you imagine top K problems, you now know exactly what code to write.**

**The connection is permanent!**

---

## Next Steps

1. **Trace the verbose form** line-by-line with the VIP queue visual
2. **Trace the terse form** with same visual
3. **Solve LeetCode 215** (Kth Largest Element) using the club metaphor
4. **Solve LeetCode 295** (Find Median from Data Stream) with two heaps
5. **Implement merge K sorted lists** - that's when it truly sticks!

**Time investment**: 2-3 hours
**Return**: Deep, intuitive understanding that lasts years

# Merge Intervals - Code-to-Visual Mapping

**Purpose**: Connect the visual metaphor of overlapping time blocks to actual code implementation, creating sticky understanding through three-way mapping.

---

## The Three-Way Connection

```
Visual Metaphor ←→ Actual Code ←→ Why It Works
  (Calendar blocks)   (Intervals + sort)   (Linear scan after sort)
```

---

## Visual Metaphor Overview

**Physical Model**: Calendar with meeting time blocks that may overlap

- **Time blocks** = Intervals `[start, end]`
- **Calendar timeline** = Sorted axis
- **Overlapping blocks** = Intervals that conflict
- **Merged block** = Combined interval spanning overlaps
- **Gap between blocks** = Non-overlapping intervals
- **Current building block** = Last interval in result (being extended)

**Animation**: Sort blocks by start time. Scan left to right. If current block overlaps with building block, extend building block. If gap exists, start new building block.

---

## Core State Mappings

### Map State to Visual Elements

| Visual Element | Code Variable | Type | Purpose |
|----------------|---------------|------|---------|
| **Time blocks** | `intervals` | `List[List[int]]` | All intervals to merge |
| **Sorted blocks** | `sorted(intervals)` | `List[List[int]]` | Intervals sorted by start time |
| **Current building block** | `merged[-1]` | `List[int]` | Last interval in result (being extended) |
| **Result calendar** | `merged` | `List[List[int]]` | Merged intervals |
| **Block start time** | `interval[0]` | `int` | Start of interval |
| **Block end time** | `interval[1]` | `int` | End of interval |
| **Overlap check** | `current[0] <= merged[-1][1]` | `bool` (expression) | Does current overlap with last? |
| **Extended end** | `max(merged[-1][1], current[1])` | `int` | Farthest end time |

---

## Action Mappings

### Map Visual Actions to Code

| Visual Action | Code Lines | Why This Works |
|---------------|------------|----------------|
| **Lay out blocks chronologically** | `intervals.sort(key=lambda x: x[0])` | Sort by start time |
| **Place first block** | `merged = [intervals[0]]` | Initialize with first interval |
| **Check if blocks touch/overlap** | `if current[0] <= merged[-1][1]:` | Compare start of current with end of last |
| **Extend building block** | `merged[-1][1] = max(merged[-1][1], current[1])` | Update end to farthest point |
| **Start new block (gap)** | `merged.append(current)` | Non-overlapping, add new interval |
| **Scan all blocks** | `for current in intervals[1:]:` | Process each interval |
| **Return final calendar** | `return merged` | All overlaps resolved |

---

## Code-to-Visual Translation Tables

### If You See This Code... Visualize This

| Code Pattern | Visual Image |
|--------------|-------------|
| `intervals.sort(key=lambda x: x[0])` | Arrange calendar blocks left-to-right by start time |
| `merged = [intervals[0]]` | Place first block on calendar |
| `if current[0] <= merged[-1][1]:` | Does current block overlap/touch last block? |
| `merged[-1][1] = max(merged[-1][1], current[1])` | Extend last block to cover both |
| `merged.append(current)` | Gap detected - place new separate block |
| `for interval in intervals[1:]:` | Scan through sorted calendar blocks |

### If You Visualize This... Look for This Code

| Visual Image | Code Pattern |
|-------------|-------------|
| Blocks arranged by start time | `intervals.sort(key=lambda x: x[0])` |
| First block placed on calendar | `merged = [intervals[0]]` |
| Current block touches/overlaps last | `if current[0] <= merged[-1][1]:` |
| Extend last block to cover overlap | `merged[-1][1] = max(merged[-1][1], current[1])` |
| Gap between blocks | `else: merged.append(current)` |
| Scan left to right through calendar | `for interval in sorted_intervals:` |

---

## Execution Trace Example

**Problem**: Merge overlapping intervals `[[1,3], [2,6], [8,10], [15,18]]`

### Step-by-Step: Visual + Code Side-by-Side

| Step | Visual State | Code State | Action |
|------|-------------|------------|--------|
| **0** | Blocks: [1-3][2-6][8-10][15-18] | `intervals = [[1,3],[2,6],[8,10],[15,18]]` | Already sorted |
| **1** | Place [1-3] | `merged = [[1,3]]` | Initialize |
| **2** | [2-6] overlaps [1-3] (2≤3) | `current=[2,6], merged[-1]=[1,3]` | 2 ≤ 3, overlap! |
| **3** | Extend to [1-6] | `merged = [[1,6]]` | max(3, 6) = 6 |
| **4** | [8-10] doesn't overlap [1-6] (8>6) | `current=[8,10]` | Gap detected |
| **5** | Add [8-10] | `merged = [[1,6], [8,10]]` | New block |
| **6** | [15-18] doesn't overlap [8-10] | `current=[15,18]` | Gap detected |
| **7** | Add [15-18] | `merged = [[1,6], [8,10], [15,18]]` | New block |

**Final Result**: `[[1,6], [8,10], [15,18]]`

---

### Meeting Rooms Example

**Problem**: Minimum meeting rooms for `[[0,30], [5,10], [15,20]]`

| Step | Visual State | Code State | Action |
|------|-------------|------------|--------|
| **1** | Sort by start: [0-30][5-10][15-20] | `meetings.sort()` | Sort meetings |
| **2** | Start meeting [0-30] | `rooms = [30]` (heap) | 1 room needed |
| **3** | Start [5-10], 5<30, conflict! | `rooms[0]=30, current=5` | Need 2nd room |
| **4** | Add room ending at 10 | `rooms = [10, 30]` | 2 rooms now |
| **5** | Meeting [10] ends, [15-20] starts | `rooms[0]=10 ≤ 15` | Reuse room |
| **6** | Replace 10 with 20 | `rooms = [20, 30]` | Max = 2 rooms |

**Result**: 2 meeting rooms needed (max concurrent meetings)

---

## Pattern Recognition: Code ↔ Visual

### Common Code Patterns in Merge Intervals

| Code Pattern | What It Means Visually | When You Use It |
|--------------|------------------------|-----------------|
| `intervals.sort(key=lambda x: x[0])` | Arrange by start time | Always (first step) |
| `merged = [intervals[0]]` | Place first block | Initialize result |
| `if current[0] <= merged[-1][1]:` | Overlap/touch check | Every interval |
| `merged[-1][1] = max(merged[-1][1], current[1])` | Extend block | When overlapping |
| `merged.append(current)` | New separate block | When gap exists |
| `heapq.heappush(rooms, end)` | Allocate resource (room) | Meeting rooms problem |
| `heapq.heappop(rooms)` | Free resource | When resource becomes available |

---

## Key Insights

### Insight 1: Sorting Unlocks Linear Scan
**Visual**: Once blocks are chronological, we only compare with last block
**Code**: After `sort()`, only check `current[0]` vs `merged[-1][1]`
**Why**: Without sorting, would need O(n²) to check all pairs

### Insight 2: Only Compare with Last Merged Interval
**Visual**: Since sorted, if current doesn't overlap last, it won't overlap any earlier blocks
**Code**: Only access `merged[-1]`, not all of `merged`
**Why**: All previous blocks end before `merged[-1]` ends

### Insight 3: Overlap Condition
**Visual**: Blocks overlap if current starts before or when last ends
**Code**: `current[0] <= merged[-1][1]`
**Why**: Includes both overlap and touching (end = start)

### Insight 4: Time Complexity
**Visual**: Sort once, then scan once
**Code**: O(n log n) for sort + O(n) for scan = O(n log n)
**Why**: Sorting dominates, but enables linear scan

### Insight 5: Meeting Rooms Uses Min Heap
**Visual**: Track when each room becomes free
**Code**: `heapq` tracks earliest ending meeting
**Why**: O(1) to check earliest free room, O(log k) to update (k = rooms)

---

## Real-World Code Mappings

### Use Case 1: Google Calendar - Conflict Detection

**Visual**: Calendar UI showing overlapping meetings

| Visual Element | Production Code | System |
|----------------|-----------------|--------|
| Meeting blocks | `events = [[start1, end1], ...]` | Calendar events |
| Sort by start | `events.sort(key=lambda e: e.start)` | Chronological view |
| Merge overlaps | Detect conflicts | Conflict detection |
| Find gaps | Available time slots | "Find a time" feature |

**Code Pattern**:
```python
# Google Calendar conflict detection
def has_conflict(events):
    events.sort(key=lambda e: e.start)
    for i in range(1, len(events)):
        if events[i].start < events[i-1].end:
            return True  # Conflict!
    return False
```

**Sticky Mapping**: `events[i].start < events[i-1].end` = blocks overlap

---

### Use Case 2: TCP Packet Reassembly

**Visual**: Network packets arriving out of order

| Visual Element | Production Code | Tool |
|----------------|-----------------|------|
| Byte ranges | `segments = [[seq, seq+len], ...]` | TCP segments |
| Merge ranges | Combine overlapping segments | Reassembly |
| Find gaps | Missing bytes to request | Retransmission |

**Code Pattern**:
```python
# TCP segment reassembly
def reassemble_segments(segments):
    segments.sort()  # By sequence number
    merged = [segments[0]]

    for current in segments[1:]:
        if current[0] <= merged[-1][1]:
            # Overlapping/continuous
            merged[-1][1] = max(merged[-1][1], current[1])
        else:
            # Gap - missing data!
            request_retransmission(merged[-1][1], current[0])
            merged.append(current)
    return merged
```

**Sticky Mapping**: Gaps in merged intervals = missing packets

---

## Common Variations: Same Visual, Different Rules

### Basic Merge Overlapping
**Visual**: Combine all overlapping blocks into single blocks
**Code**: `if current[0] <= merged[-1][1]: extend`
**Example**: "Merge intervals"

### Insert Interval
**Visual**: Add new block to sorted calendar, merge if needed
**Code**: Three phases - before, merge, after
**Example**: "Insert interval into sorted list"

### Meeting Rooms I (Boolean)
**Visual**: Can one person attend all meetings?
**Code**: Check if any overlaps exist
**Example**: "Can attend all meetings?"

### Meeting Rooms II (Count)
**Visual**: Minimum conference rooms needed
**Code**: Min heap tracking room end times
**Example**: "Minimum meeting rooms required"

### Find Gaps
**Visual**: Empty spaces between merged blocks
**Code**: Compare consecutive intervals in merged result
**Example**: "Employee free time"

### Interval Intersection
**Visual**: Overlapping regions of two calendars
**Code**: Two pointers on two sorted interval lists
**Example**: "Interval list intersections"

---

## Self-Check: Do You Have Sticky Understanding?

### Test 1: Code → Visual
See this code:
```python
if current[0] <= merged[-1][1]:
    merged[-1][1] = max(merged[-1][1], current[1])
else:
    merged.append(current)
```

**Can you visualize?**
"If current block starts before or when last block ends, they overlap - extend last block to cover both. If current starts after last ends, there's a gap - place current as new separate block."

### Test 2: Visual → Code
Imagine: "Calendar with time blocks sorted left-to-right. Scan through blocks. If current block touches or overlaps last block on calendar, extend last block. If there's a gap, place current block as new entry."

**Can you write the code?**
```python
def merge(intervals):
    if not intervals:
        return []

    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]

    for current in intervals[1:]:
        if current[0] <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], current[1])
        else:
            merged.append(current)

    return merged
```

### Test 3: Explain Why
**Question**: Why is time complexity O(n log n) instead of O(n²)?

**Answer**: Sorting is O(n log n). After sorting, we only compare each interval with the last merged interval (not all previous intervals). This makes the merge step O(n). Without sorting, we'd need to check every pair of intervals for overlap, which is O(n²). The sort enables the linear scan.

---

## The Stickiest Mapping

**Core Visual**: Calendar blocks sorted by start time. Scan left-to-right, merging overlaps.

**Core Code**: `sort(); merged=[first]; for each: check overlap, extend or add new`

**Core Insight**: Sorting by start time means we only need to compare current interval with the last merged interval. Each interval either extends the last merged interval or starts a new one. O(n log n) beats O(n²) by enabling linear scan.

**When you see merge intervals code, you now see calendar blocks. When you imagine overlapping schedule blocks, you know exactly what code to write.**

**The connection is permanent!**

---

## Next Steps

1. **Draw a calendar** with overlapping blocks and trace algorithm
2. **Trace meeting rooms** problem with heap visualization
3. **Solve LeetCode problem** using calendar block visualization
4. **Explain solution** using the metaphor + code mapping
5. **Teach someone else** - that's when it truly sticks!

**Time investment**: 2-3 hours
**Return**: Deep, intuitive understanding that lasts years

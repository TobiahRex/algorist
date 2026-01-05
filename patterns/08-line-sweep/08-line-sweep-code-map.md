# Line Sweep - Code-to-Visual Mapping

**Purpose**: Connect the visual metaphor of a sweeping vertical line to actual code implementation, creating sticky understanding through three-way mapping.

---

## The Three-Way Connection

```
Visual Metaphor ←→ Actual Code ←→ Why It Works
  (Sweeping line)   (Events + State)   (O(n log n) vs O(n²))
```

---

## Visual Metaphor Overview

**Physical Model**: A vertical laser line sweeping left-to-right across a timeline/plane, triggering sensors at event points

- **Vertical laser line** = Current sweep position (x-coordinate or time)
- **Timeline/plane** = Array of intervals or points
- **Event sensors** = Start/end points of intervals
- **Counter display** = Active count (how many intervals overlap at current position)
- **Peak detector** = Maximum active count seen (answer to "max overlapping")
- **Event log** = Sorted list of start/end events
- **Height gauge** = Current max height (for skyline problem)

**Animation**: Laser sweeps left to right, pausing at each event. At START event: counter increments. At END event: counter decrements. Peak detector records maximum.

---

## Core State Mappings

### Map State to Visual Elements

| Visual Element | Code Variable | Type | Purpose |
|----------------|---------------|------|---------|
| **Laser line position** | `time` or `x` or `event[0]` | `int` | Current sweep coordinate |
| **Event log (sorted)** | `events` | `List[Tuple[int, int]]` | Sorted (position, type) pairs |
| **Counter display** | `active_count` or `rooms` | `int` | Number of active intervals at current position |
| **Peak detector** | `max_rooms` or `max_count` | `int` | Maximum active count seen |
| **Height gauge** | `heights` (heap) | `List[int]` | Active heights for skyline problem |
| **Start sensor (+1)** | `(time, START)` or `(time, +1)` | `Tuple` | Interval begins, count++ |
| **End sensor (-1)** | `(time, END)` or `(time, -1)` | `Tuple` | Interval ends, count-- |

---

## Action Mappings

### Map Visual Actions to Code

| Visual Action | Code Lines | Why This Works |
|---------------|------------|----------------|
| **Create event sensors** | `events.append((start, +1)); events.append((end, -1))` | Convert intervals to point events |
| **Sort sensors by position** | `events.sort()` | Process left-to-right along timeline |
| **Laser hits START sensor** | `if event_type == START: rooms += 1` | Interval begins, increment active count |
| **Laser hits END sensor** | `if event_type == END: rooms -= 1` | Interval ends, decrement active count |
| **Update peak detector** | `max_rooms = max(max_rooms, rooms)` | Record highest concurrent count |
| **Check height gauge** | `max_h = -heights[0]` (max heap) | Current tallest building (skyline) |
| **Remove height from gauge** | `heights.remove(h); heapq.heapify(heights)` | Building ends, update skyline |
| **Sweep completes** | `for time, event_type in events:` | Process all events once |

---

## Code-to-Visual Translation Tables

### If You See This Code... Visualize This

| Code Pattern | Visual Image |
|--------------|-------------|
| `events = []` | Empty event log, waiting for sensors |
| `events.append((start, +1))` | Place START sensor at position `start` |
| `events.append((end, -1))` | Place END sensor at position `end` |
| `events.sort()` | Arrange sensors left-to-right on timeline |
| `for time, delta in events:` | Laser sweeps, hitting each sensor in order |
| `rooms += delta` | Counter display increments (+1) or decrements (-1) |
| `max_rooms = max(max_rooms, rooms)` | Peak detector updates with new maximum |
| `heapq.heappush(heights, -h)` | Add building height to height gauge (max heap) |

### If You Visualize This... Look for This Code

| Visual Image | Code Pattern |
|-------------|-------------|
| Laser hits START sensor, counter goes up | `if event_type == START: count += 1` |
| Laser hits END sensor, counter goes down | `if event_type == END: count -= 1` |
| Peak detector shows highest count | `max_count = max(max_count, current_count)` |
| Sensors arranged left to right | `events.sort(key=lambda x: x[0])` |
| Height gauge shows tallest building | `current_max = -heights[0]` (max heap) |
| Building removed from height gauge | `heights.remove(-h); heapq.heapify(heights)` |

---

## Execution Trace Example

**Problem**: Minimum meeting rooms needed for intervals `[[0,30], [5,10], [15,20]]`

### Step-by-Step: Visual + Code Side-by-Side

| Step | Visual State | Code State | Action |
|------|-------------|------------|--------|
| **1** | Create sensors for all intervals | `events = [(0,START), (30,END), (5,START), (10,END), (15,START), (20,END)]` | Convert intervals to events |
| **2** | Sort sensors left to right | `events = [(0,START), (5,START), (10,END), (15,START), (20,END), (30,END)]` | Sort by time |
| **3** | Laser at t=0, hits START sensor | `time=0, rooms=1, max_rooms=1` | Meeting 1 starts |
| **4** | Laser at t=5, hits START sensor | `time=5, rooms=2, max_rooms=2` | Meeting 2 starts (overlap!) |
| **5** | Laser at t=10, hits END sensor | `time=10, rooms=1, max_rooms=2` | Meeting 2 ends |
| **6** | Laser at t=15, hits START sensor | `time=15, rooms=2, max_rooms=2` | Meeting 3 starts |
| **7** | Laser at t=20, hits END sensor | `time=20, rooms=1, max_rooms=2` | Meeting 3 ends |
| **8** | Laser at t=30, hits END sensor | `time=30, rooms=0, max_rooms=2` | Meeting 1 ends |

**Final Result**: Peak detector = 2 (`max_rooms = 2`, meaning 2 rooms needed at peak)

---

## Pattern Recognition: Code ↔ Visual

### Common Code Patterns in Line Sweep

| Code Pattern | What It Means Visually | When You Use It |
|--------------|------------------------|-----------------|
| `events.append((start, +1))` | Place START sensor (counter increments) | Counting overlaps |
| `events.append((end, -1))` | Place END sensor (counter decrements) | Counting overlaps |
| `events.sort()` | Arrange sensors left-to-right | Always (critical step) |
| `for time, delta in events:` | Laser sweeps through sensors | Main loop |
| `count += delta` | Update counter based on sensor type | Overlap counting |
| `max_count = max(max_count, count)` | Update peak detector | Finding maximum overlaps |
| `heapq.heappush(heights, -h)` | Add height to height gauge (skyline) | Tracking maximum values |
| `if current != previous: result.append(...)` | Height changed, record new skyline point | Skyline problem |

---

## Key Insights

### Insight 1: O(n log n) vs O(n²) Transformation
**Visual**: Instead of checking all pairs of intervals (nested loops), sweep once through sorted events
**Code**: `events.sort()` O(n log n) + single pass O(n) = O(n log n) total
**Why**: Sorting events converts 2D interval problem to 1D sorted event processing

### Insight 2: Event Encoding Determines Behavior
**Visual**: START sensor = +1 (counter up), END sensor = -1 (counter down)
**Code**: `delta` value determines how state changes
**Why**: Different problems need different event types (start/end, height changes, point queries)

### Insight 3: State Tracks "Active Set" at Sweep Position
**Visual**: Counter shows how many intervals overlap at current laser position
**Code**: `active_count` or `rooms` represents overlap count
**Why**: At any position x, state accurately reflects all intervals that contain x

### Insight 4: Heap for Maximum Tracking
**Visual**: Height gauge always shows tallest active building
**Code**: Max heap (`heights[0]`) gives current maximum in O(1)
**Why**: Skyline changes when max height changes, heap efficiently tracks this

### Insight 5: Event Order Matters at Same Position
**Visual**: At same x-coordinate, START sensors before END sensors (handle touching intervals correctly)
**Code**: `events.sort(key=lambda x: (x[0], x[1]))` where x[1] encodes type priority
**Why**: If meeting ends at time 10 and another starts at 10, they don't overlap (room can be reused)

---

## Real-World Code Mappings

### Use Case 1: Calendar - Find Free Time Slots

**Visual**: Sweep timeline, track concurrent meetings, identify gaps (counter = 0)

| Visual Element | Production Code | System |
|----------------|-----------------|--------|
| Timeline | Time axis (minutes in day) | Calendar day view |
| Event sensors | Meeting start/end times | Calendar events |
| Counter | `concurrent_meetings` | Overlap tracker |
| Gap detector | `if concurrent_meetings == 0: free_slots.append(...)` | Free time finder |

**Code Pattern**:
```python
# Create events for all meetings
events = []
for start, end in meetings:
    events.append((start, +1))
    events.append((end, -1))

events.sort()

concurrent = 0
last_time = 0
free_slots = []

for time, delta in events:
    if concurrent == 0 and last_time < time:
        free_slots.append((last_time, time))  # Gap found!
    concurrent += delta
    last_time = time
```

**Sticky Mapping**: `concurrent == 0` = laser in gap between meetings (no active intervals)

---

### Use Case 2: Computer Graphics - Skyline Rendering

**Visual**: Sweep across building x-coordinates, track max height at each position

| Visual Element | Production Code | Tool |
|----------------|-----------------|------|
| Laser line | Current x-coordinate | Scan position |
| Height gauge | Max heap of active building heights | Priority queue |
| Critical points | Height changes recorded | Skyline output |

**Code Pattern**:
```python
import heapq

events = []
for left, right, height in buildings:
    events.append((left, -height, 'start'))   # Negative for max heap
    events.append((right, height, 'end'))

events.sort()

heights = [0]  # Ground level
result = []
prev_max = 0

for x, h, event_type in events:
    if event_type == 'start':
        heapq.heappush(heights, h)  # h is negative
    else:
        heights.remove(-h)
        heapq.heapify(heights)

    current_max = -heights[0]
    if current_max != prev_max:  # Height changed!
        result.append([x, current_max])
        prev_max = current_max
```

**Sticky Mapping**: Height change = skyline corner point (new building starts/ends)

---

## Common Variations: Same Visual, Different Rules

### Overlap Counting
**Visual**: START sensor +1, END sensor -1, track max count
**Code**: Standard meeting rooms II pattern
**Example**: "Maximum concurrent network connections"

### Interval Merging
**Visual**: Sort intervals, track last interval end, extend if overlap
**Code**: Sort + single pass comparison
**Example**: "Merge overlapping intervals"

### Skyline Problem
**Visual**: Track max height with heap, record when height changes
**Code**: Events with heights, max heap for current max
**Example**: "City skyline from buildings"

### Population Year
**Visual**: Birth = +1, death = -1, track max population
**Code**: Events at birth/death years, sweep and count
**Example**: "Year with maximum alive population"

### Rectangle Area
**Visual**: 2D sweep (vertical lines), track active rectangles
**Code**: More complex, nested sweep or coordinate compression
**Example**: "Total area covered by rectangles"

---

## Self-Check: Do You Have Sticky Understanding?

### Test 1: Code → Visual
See this code:
```python
for time, delta in events:
    rooms += delta
    max_rooms = max(max_rooms, rooms)
```

**Can you visualize?**
"Laser sweeps through event sensors. Each sensor adjusts the counter (+1 or -1). Peak detector continuously records the highest counter value seen."

### Test 2: Visual → Code
Imagine: "I have buildings with start/end x-coordinates and heights. At each x-position, I need to know the tallest building. When a building starts, add its height to the height gauge. When it ends, remove it. Record when the max height changes."

**Can you write the code?**
```python
events = []
for left, right, height in buildings:
    events.append((left, -height, 0))  # Start
    events.append((right, height, 1))  # End

events.sort()
heights = [0]
result = []

for x, h, event_type in events:
    if event_type == 0:  # Start
        heapq.heappush(heights, h)
    else:  # End
        heights.remove(-h)
        heapq.heapify(heights)

    max_h = -heights[0]
    if not result or result[-1][1] != max_h:
        result.append([x, max_h])
```

### Test 3: Explain Why
**Question**: Why is line sweep O(n log n) instead of O(n²) for finding max overlapping intervals?

**Answer**: The naive approach checks all pairs of intervals (O(n²)). Line sweep converts intervals to 2n events, sorts them (O(n log n)), then sweeps once (O(n)). By processing events in sorted order, we track active intervals incrementally without comparing all pairs. The sorting step is the bottleneck, giving O(n log n) total.

---

## The Stickiest Mapping

**Visual**: A vertical laser line sweeping left-to-right across a timeline, triggering event sensors that adjust a counter display, with a peak detector recording the maximum.

**Core Code**: Convert intervals to sorted events, sweep through them once, maintain active state (count or heap), record maximum or height changes.

**Core Insight**: By converting 2D interval problems to 1D sorted event processing, we avoid O(n²) comparisons. The sweep line maintains accurate state at each position, processing each event exactly once.

**When you see line sweep code, you now see a laser sweeping across sensors. When you imagine a sweep line, you know exactly what code to write.**

**The connection is permanent!**

---

## Next Steps

1. **Trace the meeting rooms example** line-by-line with the laser visualization
2. **Trace the skyline problem** with the height gauge metaphor
3. **Solve a LeetCode problem** using sweep line visualization
4. **Explain your solution** using the metaphor + code mapping
5. **Teach someone else** - that's when it truly sticks!

**Time investment**: 2-3 hours
**Return**: Deep, intuitive understanding that lasts years

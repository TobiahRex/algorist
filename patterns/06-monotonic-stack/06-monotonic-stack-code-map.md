# Monotonic Stack - Code-to-Visual Mapping

**Purpose**: Connect the visual metaphor of a tower building queue to actual code implementation, creating sticky understanding through three-way mapping.

---

## The Three-Way Connection

```
Visual Metaphor ←→ Actual Code ←→ Why It Works
  (Building queue)   (Stack + pop/push)   (Each element touched once)
```

---

## Visual Metaphor Overview

**Physical Model**: Queue of buildings waiting to see skyline, ordered by height

- **Buildings** = Array elements (values)
- **Queue line** = Stack data structure
- **Building height** = Element value
- **Taller building arrives** = Violates monotonic property
- **Shorter buildings leave queue** = Popped from stack
- **Buildings they can see** = Next greater/smaller element
- **Order in queue** = Monotonic increasing/decreasing

**Animation**: Buildings join queue. When taller building arrives (monotonic decreasing stack), shorter ones in front leave - they found their "next greater" building. When shorter building arrives (monotonic increasing stack), taller ones leave.

---

## Core State Mappings

### Map State to Visual Elements

| Visual Element | Code Variable | Type | Purpose |
|----------------|---------------|------|---------|
| **Queue of buildings** | `stack` | `List[int]` | Monotonic stack |
| **Building (or position)** | `stack[-1]` or index | `int` | Top of stack |
| **Current building arriving** | `arr[i]` or `i` | `int` | Current element/index |
| **Result array** | `result` | `List[int]` | Next greater/smaller for each |
| **Buildings waiting in queue** | Elements in stack | `List[int]` | Unresolved elements |
| **Building leaves (found answer)** | `popped = stack.pop()` | `int` | Element found its next greater/smaller |
| **Queue order** | Stack ordering | Monotonic property | Increasing or decreasing |

---

## Action Mappings

### Map Visual Actions to Code

| Visual Action | Code Lines | Why This Works |
|---------------|------------|----------------|
| **Initialize empty queue** | `stack = []` | Start with empty stack |
| **New building arrives** | `for i in range(len(arr)):` | Process each element |
| **Is arriving building taller?** | `while stack and arr[stack[-1]] < arr[i]:` | Check monotonic property |
| **Shorter buildings leave** | `popped = stack.pop()` | Pop elements violating order |
| **Leaving building sees answer** | `result[popped] = arr[i]` | Found next greater |
| **New building joins queue** | `stack.append(i)` | Add to stack |
| **Buildings still waiting** | Elements remaining in stack | No answer found yet |
| **Set default for unseen** | `result[popped] = -1` | No next greater exists |

---

## Code-to-Visual Translation Tables

### If You See This Code... Visualize This

| Code Pattern | Visual Image |
|--------------|-------------|
| `stack = []` | Empty building queue |
| `while stack and arr[stack[-1]] < arr[i]:` | Taller building arrives, shorter ones must leave |
| `popped = stack.pop()` | Building leaves queue (found answer) |
| `result[popped] = arr[i]` | Leaving building can now see current taller one |
| `stack.append(i)` | New building joins back of queue |
| `for i in range(len(arr)):` | Buildings arrive one by one |
| `result = [-1] * len(arr)` | Default: no taller building visible |

### If You Visualize This... Look for This Code

| Visual Image | Code Pattern |
|-------------|-------------|
| Empty queue to start | `stack = []` |
| Taller building arrives | `while stack and arr[stack[-1]] < arr[i]:` |
| Shorter buildings forced out | `popped = stack.pop()` |
| Leaving building's answer | `result[popped] = arr[i]` |
| Building joins queue | `stack.append(i)` |
| Process all buildings | `for i in range(len(arr)):` |
| Buildings still waiting at end | Remaining stack elements get -1 |

---

## Execution Trace Example

**Problem**: Find next greater element for `[2, 1, 2, 4, 3]`

### Step-by-Step: Visual + Code Side-by-Side (Monotonic Decreasing Stack)

| Step | Visual State | Code State | Action |
|------|-------------|------------|--------|
| **0** | Queue: [ ], Current: 2 | `stack=[], i=0, arr[0]=2` | Initialize |
| **1** | Queue: [2] | `stack=[0], result=[-1,-1,-1,-1,-1]` | Building 2 joins |
| **2** | Current: 1 (shorter) | `i=1, arr[1]=1, 1<2` | Smaller, joins directly |
| **3** | Queue: [2,1] | `stack=[0,1]` | Both waiting |
| **4** | Current: 2 (taller than 1) | `i=2, arr[2]=2, 2>1` | Building 1 leaves! |
| **5** | Building 1 sees 2 | `result[1]=2, stack=[0]` | Answer for index 1 |
| **6** | Queue: [2,2] | `stack=[0,2]` | Both height 2 |
| **7** | Current: 4 (taller) | `i=3, arr[3]=4, 4>2` | Both 2's leave! |
| **8** | They see 4 | `result[2]=4, result[0]=4` | Answer for indices 0,2 |
| **9** | Queue: [4] | `stack=[3]` | Only 4 waiting |
| **10** | Current: 3 (shorter) | `i=4, arr[4]=3, 3<4` | Smaller, joins |
| **11** | Queue: [4,3] | `stack=[3,4]` | Both waiting |
| **End** | No more buildings | Stack not empty | Set to -1 |
| **12** | Result | `result=[4,2,4,-1,-1]` | Final answer |

**Final Result**: `[4, 2, 4, -1, -1]`

---

### Largest Rectangle in Histogram Example

**Problem**: Find largest rectangle in histogram `[2, 1, 5, 6, 2, 3]`

| Step | Visual State | Code State | Action |
|------|-------------|------------|--------|
| **1** | Bar 0 (h=2) | `stack=[0], max_area=0` | Push index 0 |
| **2** | Bar 1 (h=1<2) | `1<2, pop 0` | Shorter bar arrives |
| **3** | Calculate area for h=2 | `width=1, area=2*1=2` | Bar 0 popped |
| **4** | Bar 2 (h=5) | `stack=[1,2]` | Increasing, push |
| **5** | Bar 3 (h=6) | `stack=[1,2,3]` | Increasing, push |
| **6** | Bar 4 (h=2<6) | `2<6, pop 3,2` | Shorter bar! |
| **7** | h=6, width=1 | `area=6*1=6` | Bar 3 popped |
| **8** | h=5, width=2 | `area=5*2=10` | Bar 2 popped (NEW MAX!) |
| **9** | Continue... | | Process remaining |

**Result**: Maximum rectangle area = 10

---

## Pattern Recognition: Code ↔ Visual

### Common Code Patterns in Monotonic Stack

| Code Pattern | What It Means Visually | When You Use It |
|--------------|------------------------|-----------------|
| `stack = []` | Empty building queue | Initialize |
| `while stack and arr[stack[-1]] < arr[i]:` | Current taller, pop shorter | Monotonic decreasing (next greater) |
| `while stack and arr[stack[-1]] > arr[i]:` | Current shorter, pop taller | Monotonic increasing (next smaller) |
| `popped = stack.pop()` | Building leaves, found answer | Element resolved |
| `result[popped] = arr[i]` | Assign next greater/smaller | Record answer |
| `stack.append(i)` | Building joins queue | Add to stack |
| `for i in range(len(arr)):` | Process all elements | Main loop |

---

## Key Insights

### Insight 1: Monotonic Decreasing → Next Greater
**Visual**: Queue stays tall-to-short; taller arrival forces shorter to leave
**Code**: `while stack and arr[stack[-1]] < arr[i]: pop`
**Why**: Popped elements found their next greater (current element)

### Insight 2: Monotonic Increasing → Next Smaller
**Visual**: Queue stays short-to-tall; shorter arrival forces taller to leave
**Code**: `while stack and arr[stack[-1]] > arr[i]: pop`
**Why**: Popped elements found their next smaller (current element)

### Insight 3: O(n) Time Complexity
**Visual**: Each building enters queue once, leaves at most once
**Code**: Each element pushed once, popped at most once = 2n = O(n)
**Why**: Even though nested loop, amortized analysis shows linear

### Insight 4: Store Indices, Not Values
**Visual**: Remember building positions, not just heights
**Code**: `stack.append(i)` not `stack.append(arr[i])`
**Why**: Need indices to calculate width/distance, access original values

### Insight 5: Histogram Problem Cleverness
**Visual**: When bar leaves queue, it defines rectangle width
**Code**: `width = i if not stack else i - stack[-1] - 1`
**Why**: Popped bar's height × width to nearest shorter bars = rectangle area

---

## Real-World Code Mappings

### Use Case 1: Stock Span Problem

**Visual**: Days stock price ≤ today's price

| Visual Element | Production Code | System |
|----------------|-----------------|--------|
| Stock prices | `prices = [100, 80, 60, 70, 85]` | Daily prices |
| Monotonic stack | Track previous higher prices | Span calculation |
| Span | Days until higher price | Technical indicator |

**Code Pattern**:
```python
# Stock span calculator
def calculate_span(prices):
    stack = []  # Indices of days
    spans = []

    for i in range(len(prices)):
        # Pop days with lower prices
        while stack and prices[stack[-1]] <= prices[i]:
            stack.pop()

        # Span = distance to previous higher price (or start)
        span = i + 1 if not stack else i - stack[-1]
        spans.append(span)

        stack.append(i)

    return spans
```

**Sticky Mapping**: Monotonic decreasing stack tracks higher prices

---

### Use Case 2: Daily Temperatures

**Visual**: Days until warmer temperature

| Visual Element | Production Code | Tool |
|----------------|-----------------|------|
| Temperatures | `temps = [73, 74, 75, 71, 76]` | Daily temps |
| Stack | Track colder days waiting | Next warmer day |
| Answer | Days to wait | Weather forecast |

**Code Pattern**:
```python
# Days until warmer
def daily_temperatures(temps):
    stack = []  # Indices
    result = [0] * len(temps)

    for i in range(len(temps)):
        # Pop colder days (they found warmer day!)
        while stack and temps[stack[-1]] < temps[i]:
            prev_day = stack.pop()
            result[prev_day] = i - prev_day  # Days to wait

        stack.append(i)

    return result
```

**Sticky Mapping**: `i - prev_day` = days until warmer

---

## Common Variations: Same Visual, Different Rules

### Next Greater Element
**Visual**: Queue stays tall-to-short (monotonic decreasing)
**Code**: `while stack and arr[stack[-1]] < arr[i]: pop`
**Example**: "Next greater element in array"

### Next Smaller Element
**Visual**: Queue stays short-to-tall (monotonic increasing)
**Code**: `while stack and arr[stack[-1]] > arr[i]: pop`
**Example**: "Next smaller element"

### Previous Greater/Smaller
**Visual**: Same logic, but iterate right-to-left
**Code**: `for i in range(len(arr)-1, -1, -1):`
**Example**: "Previous greater element"

### Largest Rectangle in Histogram
**Visual**: Monotonic increasing, calculate area on pop
**Code**: `width = i - stack[-1] - 1; area = height * width`
**Example**: "Largest rectangle in histogram"

### Trapping Rain Water
**Visual**: Monotonic decreasing, calculate water volume on pop
**Code**: Calculate trapped water between bars
**Example**: "Trap rain water"

### Stock Span
**Visual**: Monotonic decreasing, calculate span on push
**Code**: `span = i - stack[-1]` if stack exists
**Example**: "Online stock span"

---

## Self-Check: Do You Have Sticky Understanding?

### Test 1: Code → Visual
See this code:
```python
while stack and arr[stack[-1]] < arr[i]:
    popped = stack.pop()
    result[popped] = arr[i]
stack.append(i)
```

**Can you visualize?**
"Buildings in queue are in decreasing height order (tall to short). When taller building arrives, all shorter ones in front must leave the queue - they've found their 'next taller building' (current one). Then new building joins back of queue."

### Test 2: Visual → Code
Imagine: "Queue of buildings ordered tall to short. New building arrives. If it's taller than buildings at front of queue, those shorter buildings leave (they found their answer = current building). Then current building joins queue. Track each leaving building's answer."

**Can you write the code?**
```python
def next_greater_element(arr):
    stack = []  # Monotonic decreasing (indices)
    result = [-1] * len(arr)

    for i in range(len(arr)):
        # Pop shorter buildings (they found next greater)
        while stack and arr[stack[-1]] < arr[i]:
            popped = stack.pop()
            result[popped] = arr[i]

        stack.append(i)

    return result
```

### Test 3: Explain Why
**Question**: Why is this O(n) even though there's a while loop inside for loop?

**Answer**: Each element is pushed to the stack exactly once and popped at most once. Total operations = at most 2n (n pushes + n pops) = O(n). The inner while doesn't restart - it continues from where it left off, consuming elements from the stack. This is amortized O(1) per iteration of the outer loop.

---

## The Stickiest Mapping

**Core Visual**: Queue of buildings ordered by height. When order-violating building arrives, others leave the queue.

**Core Code**: `while stack and violates_order: pop and record; then push current`

**Core Insight**: Monotonic decreasing stack finds next greater (taller buildings make shorter leave). Monotonic increasing finds next smaller (shorter makes taller leave). Each element touched at most twice (one push, one pop) → O(n) time. Stack holds elements still waiting for their answer.

**When you see monotonic stack code, you now see building queues. When you imagine ordered structures finding nearest larger/smaller, you know exactly what code to write.**

**The connection is permanent!**

---

## Next Steps

1. **Draw building queue** and trace next greater element by hand
2. **Trace histogram problem** with bar heights and rectangles
3. **Solve LeetCode problem** using building queue visualization
4. **Explain solution** using the metaphor + amortized analysis
5. **Teach someone else** - that's when it truly sticks!

**Time investment**: 2-3 hours
**Return**: Deep, intuitive understanding that lasts years

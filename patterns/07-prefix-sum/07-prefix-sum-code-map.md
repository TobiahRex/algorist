# Prefix Sum - Code-to-Visual Mapping

**Purpose**: Connect the visual metaphor of mile markers to actual code implementation, creating sticky understanding through three-way mapping.

---

## The Three-Way Connection

```
Visual Metaphor ←→ Actual Code ←→ Why It Works
  (Mile markers)   (Cumulative sum array)   (Subtraction for ranges)
```

---

## Visual Metaphor Overview

**Physical Model**: Highway with cumulative distance markers (mile markers)

- **Highway** = Original array
- **Mile markers** = Prefix sum array (cumulative totals)
- **Marker at position i** = Sum from start to position i
- **Distance between markers** = Range sum query
- **Marker value** = `prefix[i]` (total distance from start)
- **Segment distance** = `prefix[j] - prefix[i-1]` (range [i,j])
- **Starting point (mile 0)** = Base case for calculations

**Animation**: Build mile markers by adding each segment to previous total. To find distance between mile 5 and mile 10, subtract marker 5 from marker 10. Instant O(1) calculation!

---

## Core State Mappings

### Map State to Visual Elements

| Visual Element | Code Variable | Type | Purpose |
|----------------|---------------|------|---------|
| **Highway segments** | `arr` | `List[int]` | Original array |
| **Mile markers** | `prefix` | `List[int]` | Cumulative sum array |
| **Marker at position i** | `prefix[i]` | `int` | Sum from index 0 to i |
| **Distance between markers** | `prefix[j] - prefix[i-1]` | `int` (expression) | Range sum [i, j] |
| **Starting point (mile 0)** | `prefix[0]` or extra `0` | `int` | Base case |
| **Sum tracker** | `running_sum` | `int` | Building prefix sum |
| **Hash map** | `sum_freq` | `dict[int, int]` | For subarray sum problems |

---

## Action Mappings

### Map Visual Actions to Code

| Visual Action | Code Lines | Why This Works |
|---------------|------------|----------------|
| **Place marker 0 at start** | `prefix = [0]` or `prefix[0] = arr[0]` | Initialize |
| **Add segment to previous marker** | `prefix[i] = prefix[i-1] + arr[i]` | Build cumulative sum |
| **Walk highway, place markers** | `for i in range(1, len(arr)):` | Build all markers |
| **Measure distance between markers** | `prefix[j] - prefix[i-1]` | Range sum query |
| **Handle query from start** | `if i == 0: return prefix[j]` | Special case |
| **Track seen sums** | `sum_freq[running_sum] = count` | Subarray sum with hash map |
| **Check if target reachable** | `if (running_sum - k) in sum_freq:` | Subarray equals K |
| **Update hash map** | `sum_freq[running_sum] += 1` | Record current sum |

---

## Code-to-Visual Translation Tables

### If You See This Code... Visualize This

| Code Pattern | Visual Image |
|--------------|-------------|
| `prefix = [0] * (len(arr) + 1)` | Highway with marker at start (mile 0) |
| `prefix[i] = prefix[i-1] + arr[i]` | Add segment to previous marker |
| `for i in range(1, len(arr)):` | Walk highway placing markers |
| `prefix[j] - prefix[i-1]` | Distance between two markers |
| `sum_freq = {0: 1}` | Hash map tracking which distances we've seen |
| `running_sum - k` | Looking backward for a previous marker |
| `if (running_sum - k) in sum_freq:` | Found matching segment! |

### If You Visualize This... Look for This Code

| Visual Image | Code Pattern |
|-------------|-------------|
| Marker at starting point | `prefix = [0] * (n+1)` or `prefix[0] = arr[0]` |
| Add segment to build next marker | `prefix[i] = prefix[i-1] + arr[i]` |
| Distance between mile 5 and 10 | `prefix[10] - prefix[5]` |
| Measure from start to marker j | `prefix[j]` |
| Track which markers seen | `sum_freq[running_sum] = count` |
| Find segment summing to K | `if (running_sum - k) in sum_freq:` |
| Count matching segments | `count += sum_freq[running_sum - k]` |

---

## Execution Trace Example

**Problem**: Range sum queries on `[3, 1, 4, 1, 5, 9, 2, 6]`

### Step-by-Step: Visual + Code Side-by-Side

#### Building Prefix Sum

| Step | Visual State | Code State | Action |
|------|-------------|------------|--------|
| **0** | Highway: [3,1,4,1,5,9,2,6] | `arr = [3,1,4,1,5,9,2,6]` | Original data |
| **1** | Marker 0: 3 | `prefix[0] = 3` | First marker |
| **2** | Marker 1: 3+1=4 | `prefix[1] = 4` | Add segment 1 |
| **3** | Marker 2: 4+4=8 | `prefix[2] = 8` | Add segment 4 |
| **4** | Marker 3: 8+1=9 | `prefix[3] = 9` | Add segment 1 |
| **5** | Marker 4: 9+5=14 | `prefix[4] = 14` | Add segment 5 |
| **6** | Marker 5: 14+9=23 | `prefix[5] = 23` | Add segment 9 |
| **7** | Marker 6: 23+2=25 | `prefix[6] = 25` | Add segment 2 |
| **8** | Marker 7: 25+6=31 | `prefix[7] = 31` | Add segment 6 |

**Prefix Array**: `[3, 4, 8, 9, 14, 23, 25, 31]`

---

#### Querying Range [2, 5]

| Step | Visual State | Code State | Action |
|------|-------------|------------|--------|
| **1** | Need distance from index 2 to 5 | `range_sum(2, 5)` | Query |
| **2** | Marker at 5: 23 | `prefix[5] = 23` | End marker |
| **3** | Marker before 2: 4 | `prefix[1] = 4` | Start marker - 1 |
| **4** | Distance: 23 - 4 = 19 | `23 - 4 = 19` | Subtract! |

**Result**: Sum of `[4, 1, 5, 9]` = 19 ✓ (O(1) query!)

---

### Subarray Sum Equals K Example

**Problem**: Count subarrays with sum = 3 in `[1, 2, 3]`

| Step | Visual State | Code State | Action |
|------|-------------|------------|--------|
| **0** | Hash map: {0: 1} | `sum_freq = {0: 1}, running_sum=0, count=0` | Initialize |
| **1** | Mile marker 0→1, sum=1 | `running_sum=1, need=1-3=-2` | -2 not in map |
| **2** | Record sum 1 | `sum_freq = {0:1, 1:1}` | Track this sum |
| **3** | Mile marker 1→3, sum=3 | `running_sum=3, need=3-3=0` | 0 IS in map! |
| **4** | Found subarray [1,2] | `count += sum_freq[0] = 1` | Subarray from start |
| **5** | Record sum 3 | `sum_freq = {0:1, 1:1, 3:1}` | Track this sum |
| **6** | Mile marker 3→6, sum=6 | `running_sum=6, need=6-3=3` | 3 IS in map! |
| **7** | Found subarray [3] | `count += sum_freq[3] = 1` | Another match |
| **8** | Record sum 6 | `sum_freq = {0:1, 1:1, 3:1, 6:1}` | Track this sum |

**Result**: Count = 2 (subarrays `[1,2]` and `[3]`)

---

## Pattern Recognition: Code ↔ Visual

### Common Code Patterns in Prefix Sum

| Code Pattern | What It Means Visually | When You Use It |
|--------------|------------------------|-----------------|
| `prefix[i] = prefix[i-1] + arr[i]` | Build next mile marker | Constructing prefix sum |
| `prefix[j] - prefix[i-1]` | Distance between markers | Range sum query |
| `sum_freq = {0: 1}` | Track seen distances | Subarray sum problems |
| `running_sum - k` | Look back for target | Find subarray with sum K |
| `count += sum_freq[running_sum - k]` | Found matching segments | Count subarrays |
| `sum_freq[running_sum] += 1` | Mark current position | Record cumulative sum |

---

## Key Insights

### Insight 1: Subtraction Gives Range Sum
**Visual**: Distance between mile 10 and mile 5 = marker 10 - marker 5
**Code**: `sum(i, j) = prefix[j] - prefix[i-1]`
**Why**: `prefix[j]` includes [0..j], subtract [0..i-1] leaves [i..j]

### Insight 2: O(n) Preprocessing, O(1) Queries
**Visual**: Build all markers once, then instant distance lookups
**Code**: Build prefix array O(n), each query O(1)
**Why**: Precomputation trades space for query speed

### Insight 3: Hash Map for Subarray Sum
**Visual**: Remember which mile markers we've seen
**Code**: `sum_freq[running_sum]` tracks how many times we've seen each sum
**Why**: `running_sum - k` tells us what past sum to look for

### Insight 4: The "0: 1" Initialization Trick
**Visual**: Marker at start (mile 0) with count 1
**Code**: `sum_freq = {0: 1}` handles subarrays starting from index 0
**Why**: If `running_sum == k`, then `running_sum - k == 0` (entire array from start)

### Insight 5: 2D Prefix Sum Formula
**Visual**: Rectangle area = bottom-right - top - left + overlap
**Code**: `prefix[r2][c2] - prefix[r1-1][c2] - prefix[r2][c1-1] + prefix[r1-1][c1-1]`
**Why**: Inclusion-exclusion principle for 2D areas

---

## Real-World Code Mappings

### Use Case 1: Google Analytics - Date Range Metrics

**Visual**: Cumulative page views over time

| Visual Element | Production Code | System |
|----------------|-----------------|--------|
| Daily page views | `daily_views = [100, 150, 200, ...]` | Raw metrics |
| Cumulative views | `prefix_views = [100, 250, 450, ...]` | Prefix sum |
| Range query | Views from Jan to Jun | Dashboard query |

**Code Pattern**:
```python
# Analytics dashboard range query
class AnalyticsDashboard:
    def __init__(self, daily_metrics):
        # Build prefix sum of daily metrics
        self.prefix = [0] * (len(daily_metrics) + 1)
        for i in range(len(daily_metrics)):
            self.prefix[i + 1] = self.prefix[i] + daily_metrics[i]

    def get_range_total(self, start_day, end_day):
        # O(1) query for any date range
        return self.prefix[end_day + 1] - self.prefix[start_day]

# Usage
dashboard = AnalyticsDashboard([100, 150, 200, 175, 225])
jan_to_mar = dashboard.get_range_total(0, 2)  # Instant!
```

**Sticky Mapping**: `prefix[end+1] - prefix[start]` = total in range

---

### Use Case 2: Image Processing - Integral Image (Summed Area Table)

**Visual**: 2D mile markers for image pixels

| Visual Element | Production Code | Tool |
|----------------|-----------------|------|
| Pixel values | `image[i][j]` | Grayscale image |
| 2D prefix sum | `integral[i][j]` | Summed area table |
| Box filter | Average of NxN region | Blur operation |

**Code Pattern**:
```python
# OpenCV-style integral image
def compute_integral_image(image):
    rows, cols = len(image), len(image[0])
    integral = [[0] * (cols + 1) for _ in range(rows + 1)]

    for i in range(1, rows + 1):
        for j in range(1, cols + 1):
            integral[i][j] = (
                image[i-1][j-1] +
                integral[i-1][j] +
                integral[i][j-1] -
                integral[i-1][j-1]
            )
    return integral

def box_sum(integral, r1, c1, r2, c2):
    # O(1) rectangle sum query
    return (
        integral[r2+1][c2+1] -
        integral[r1][c2+1] -
        integral[r2+1][c1] +
        integral[r1][c1]
    )
```

**Sticky Mapping**: 4 lookups for any rectangle sum (instead of O(width×height))

---

## Common Variations: Same Visual, Different Rules

### Basic Range Sum Query (Immutable)
**Visual**: Build markers, answer distance queries
**Code**: `prefix[j] - prefix[i-1]`
**Example**: "Range sum query - immutable"

### Subarray Sum Equals K
**Visual**: Hash map of seen mile markers
**Code**: `sum_freq[running_sum - k]` counts
**Example**: "Subarray sum equals K"

### Continuous Subarray Sum (Multiple of K)
**Visual**: Track remainder mile markers
**Code**: `sum_freq[running_sum % k]`
**Example**: "Continuous subarray sum"

### 2D Range Sum Query
**Visual**: 2D grid of cumulative sums
**Code**: Inclusion-exclusion with 4 corners
**Example**: "Range sum query 2D - immutable"

### Maximum Subarray Sum (Kadane's)
**Visual**: Track minimum prefix seen so far
**Code**: `max_sum = max(max_sum, prefix[i] - min_prefix)`
**Example**: "Maximum subarray"

### Product Except Self
**Visual**: Prefix product from left, suffix from right
**Code**: Two passes, multiply left and right
**Example**: "Product of array except self"

---

## Self-Check: Do You Have Sticky Understanding?

### Test 1: Code → Visual
See this code:
```python
prefix = [0] * (len(arr) + 1)
for i in range(len(arr)):
    prefix[i + 1] = prefix[i] + arr[i]

def range_sum(left, right):
    return prefix[right + 1] - prefix[left]
```

**Can you visualize?**
"Build mile markers along highway by adding each segment to previous marker. Extra marker at start (mile 0) makes math clean. To find distance between any two markers, subtract smaller from larger. Instant O(1) lookup!"

### Test 2: Visual → Code
Imagine: "Highway with cumulative mile markers. Marker at position i shows total distance from start to i. To measure segment from mile 5 to mile 10, subtract marker 5 from marker 10. For finding subarrays summing to K, remember which markers you've seen in a hash map, then look backward for (current_sum - K)."

**Can you write the code?**
```python
# Range sum query
def build_prefix(arr):
    prefix = [0]
    for num in arr:
        prefix.append(prefix[-1] + num)
    return prefix

def range_sum(prefix, left, right):
    return prefix[right + 1] - prefix[left]

# Subarray sum = K
def subarray_sum(arr, k):
    sum_freq = {0: 1}
    running_sum = 0
    count = 0

    for num in arr:
        running_sum += num
        if running_sum - k in sum_freq:
            count += sum_freq[running_sum - k]
        sum_freq[running_sum] = sum_freq.get(running_sum, 0) + 1

    return count
```

### Test 3: Explain Why
**Question**: Why does the hash map approach work for subarray sum equals K?

**Answer**: If `running_sum - k` exists in the hash map, it means there's a previous position where the sum was `running_sum - k`. The sum from that position to current is `running_sum - (running_sum - k) = k`. The hash map tracks how many times we've seen each sum, so we know how many subarrays ending at current position have sum K. This is O(n) instead of O(n²) checking all subarrays.

---

## The Stickiest Mapping

**Core Visual**: Highway with cumulative mile markers. Distance between markers = range sum.

**Core Code**: `prefix[i] = prefix[i-1] + arr[i]; range_sum = prefix[j] - prefix[i-1]`

**Core Insight**: Precompute cumulative sums once (O(n)), then any range sum is O(1) via subtraction. For subarray sum problems, use hash map to track seen prefix sums - `running_sum - k` tells us what past sum to look for. This turns O(n²) into O(n).

**When you see prefix sum code, you now see mile markers. When you imagine cumulative distances, you know exactly what code to write.**

**The connection is permanent!**

---

## Next Steps

1. **Draw highway with markers** and trace range sum queries
2. **Trace subarray sum = K** with hash map visualization
3. **Solve LeetCode problem** using mile marker visualization
4. **Explain solution** using the metaphor + complexity analysis
5. **Teach someone else** - that's when it truly sticks!

**Time investment**: 2-3 hours
**Return**: Deep, intuitive understanding that lasts years

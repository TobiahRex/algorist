# Sliding Window - Code-to-Visual Mapping

**Purpose**: Connect the visual metaphor of a sliding window to actual code implementation, creating sticky understanding through three-way mapping.

---

## The Three-Way Connection

```
Visual Metaphor ←→ Actual Code ←→ Why It Works
  (Window sliding)   (Pointers + State)   (Avoid recomputation)
```

---

## Visual Metaphor Overview

**Physical Model**: Two adjustable bookends sliding along a bookshelf

- **Left bookend** = `left` pointer (start of window)
- **Right bookend** = `right` pointer (end of window)
- **Books between bookends** = Current window contents
- **Shelf** = The array/string
- **Card catalog** = Hash map tracking what's in the window
- **Ruler** = Current window size (`right - left + 1`)
- **Trophy case** = Best result found so far (`max_length`)

**Animation**: Right bookend slides forward (expand), left bookend slides forward when window becomes invalid (shrink).

---

## Core State Mappings

### Map State to Visual Elements

| Visual Element | Code Variable | Type | Purpose |
|----------------|---------------|------|---------|
| **Left bookend position** | `self.left` or `left` | `int` | Start index of current window |
| **Right bookend position** | `self.right` or `right` | `int` | End index of current window |
| **Card catalog** | `self.char_count` or `char_count` | `dict[str, int]` | Frequency map of characters in window |
| **Trophy case (best result)** | `self.max_length` or `max_length` | `int` | Maximum valid window size found |
| **Books between bookends** | `s[left:right+1]` | `str` (slice) | Current window substring |
| **Ruler measurement** | `right - left + 1` | `int` (expression) | Current window size |
| **Validity checker** | `all(count <= 1 for count in char_count.values())` | `bool` (expression) | Is window valid? |

---

## Action Mappings

### Map Visual Actions to Code

| Visual Action | Code Lines | Why This Works |
|---------------|------------|----------------|
| **Right bookend slides forward** | `self.right += 1` | Expand window to include next character |
| **Add book to catalog** | `char_count[s[right]] = char_count.get(s[right], 0) + 1` | Track frequency of new character |
| **Check if catalog has duplicates** | `while char_count[s[right]] > 1:` | Detect invalid window state |
| **Left bookend slides forward** | `self.left += 1` | Shrink window from left to restore validity |
| **Remove book from catalog** | `char_count[s[left]] -= 1` | Decrease frequency of removed character |
| **Delete empty catalog entry** | `if char_count[char] == 0: del char_count[char]` | Clean up characters no longer in window |
| **Measure current window** | `current_length = right - left + 1` | Calculate distance between bookends |
| **Update trophy if larger** | `max_length = max(max_length, current_length)` | Remember best window seen |
| **Shelf ends (stop)** | `while right < len(s):` | Terminate when right bookend reaches end |

---

## Code-to-Visual Translation Tables

### If You See This Code... Visualize This

| Code Pattern | Visual Image |
|--------------|-------------|
| `left = 0, right = 0` | Both bookends start at position 0 (window size = 1) |
| `char_count[s[right]] += 1` | Add copy of current book to card catalog |
| `while char_count[s[right]] > 1:` | Found duplicate in catalog - window invalid! |
| `char_count[s[left]] -= 1; left += 1` | Remove leftmost book, slide left bookend right |
| `right - left + 1` | Measure distance between bookends with ruler |
| `max_length = max(...)` | Check if current window beats trophy case record |
| `for right in range(len(s)):` | Right bookend walks shelf from start to end |

### If You Visualize This... Look for This Code

| Visual Image | Code Pattern |
|-------------|-------------|
| Right bookend moves forward one position | `right += 1` in loop |
| Check catalog for duplicates | `if char_count[char] > threshold:` |
| Left bookend catches up to make window valid | `while not valid: left += 1` |
| Update card catalog when book leaves | `char_count[s[left]] -= 1` |
| Record new best window size | `max_length = max(max_length, ...)` |
| Both bookends at same position (size 1) | `right - left + 1 == 1` |

---

## Execution Trace Example

**Problem**: Find longest substring without repeating characters in `"abcabcbb"`

### Step-by-Step: Visual + Code Side-by-Side

| Step | Visual State | Code State | Action |
|------|-------------|------------|--------|
| **1** | Bookends at [a], catalog: {a:1}, trophy: 1 | `left=0, right=0, char_count={'a':1}, max_length=1` | Expand: right moves to 'b' |
| **2** | Bookends at [ab], catalog: {a:1, b:1}, trophy: 2 | `left=0, right=1, char_count={'a':1,'b':1}, max_length=2` | Expand: right moves to 'c' |
| **3** | Bookends at [abc], catalog: {a:1, b:1, c:1}, trophy: 3 | `left=0, right=2, char_count={'a':1,'b':1,'c':1}, max_length=3` | Expand: right moves to 'a' |
| **4** | Bookends at [abca], catalog: {a:2, b:1, c:1}, **INVALID!** | `left=0, right=3, char_count={'a':2,'b':1,'c':1}` | Detect: duplicate 'a'! |
| **5** | Shrink from left: remove 'a', bookends at [bca] | `left=1, right=3, char_count={'a':1,'b':1,'c':1}` | Shrink: left slides to position 1 |
| **6** | Window valid again [bca], trophy still 3 | `left=1, right=3, max_length=3` | Expand: right moves to 'b' |
| **7** | Bookends at [bcab], catalog: {a:1, b:2, c:1}, **INVALID!** | `left=1, right=4, char_count={'a':1,'b':2,'c':1}` | Detect: duplicate 'b'! |
| **8** | Shrink: remove 'b', bookends at [cab] | `left=2, right=4, char_count={'a':1,'b':1,'c':1}` | Shrink: left slides to position 2 |
| ...continue until right reaches end... | | | |

**Final Result**: Trophy case = 3 (`max_length = 3`, corresponding to "abc")

---

## Pattern Recognition: Code ↔ Visual

### Common Code Patterns in Sliding Window

| Code Pattern | What It Means Visually | When You Use It |
|--------------|------------------------|-----------------|
| `for right in range(len(s)):` | Right bookend walks entire shelf | Always (outer loop) |
| `while condition_invalid():` | Left bookend chases right to fix window | Variable window with validity constraint |
| `char_count[s[right]] += 1` | Add new element to window tracker | Every expansion |
| `char_count[s[left]] -= 1; left += 1` | Remove old element from window | Every shrink |
| `if right - left + 1 == k:` | Window reached fixed size | Fixed-size sliding window |
| `result = min(result, right - left + 1)` | Finding minimum valid window | Minimize problem (vs maximize) |
| `result = max(result, right - left + 1)` | Finding maximum valid window | Maximize problem |

---

## Key Insights

### Insight 1: Two-Pointer Asymmetry
**Visual**: Right bookend **always** moves forward; left bookend **conditionally** moves forward
**Code**: `right` in `for` loop (unconditional); `left` in `while` loop (conditional)
**Why**: We expand greedily, shrink only when forced

### Insight 2: O(1) Lookup via Hash Map
**Visual**: Card catalog lets us instantly check "is this book already in the window?"
**Code**: `char_count[char]` lookup is O(1)
**Why**: Without catalog, we'd scan entire window (O(n)) every time

### Insight 3: Amortized O(n) Time Complexity
**Visual**: Each bookend visits each shelf position **at most once**
**Code**: `right` moves n times max, `left` moves n times max → 2n = O(n)
**Why**: Even though there's a nested `while`, each element is added once and removed once

### Insight 4: Space-Time Tradeoff
**Visual**: Keeping a card catalog (extra shelf) speeds up lookups
**Code**: `char_count` dict uses O(k) space where k = alphabet size
**Why**: O(k) extra space eliminates O(n²) nested loops

### Insight 5: Validity Check Determines Behavior
**Visual**: What makes window "invalid" changes the bookend movement rules
**Code**: Condition in `while not valid:` varies by problem
**Examples**:
- "No duplicates" → `char_count[char] > 1`
- "At most K distinct" → `len(char_count) > K`
- "Sum equals target" → `current_sum != target`

---

## Real-World Code Mappings

### Use Case 1: Rate Limiting (Request Window)

**Visual**: Sliding time window tracking request timestamps

| Visual Element | Production Code | System |
|----------------|-----------------|--------|
| Bookends | `window_start_time`, `window_end_time` | Time boundaries |
| Books | `request_timestamps` (deque) | Request events |
| Catalog | `len(request_timestamps)` | Count in window |
| Shelf | Time axis (continuous) | Timeline |
| Trophy | Rate limit threshold (e.g., 100/min) | Max allowed |

**Code Pattern**:
```python
# Expand: Add new request timestamp
request_timestamps.append(current_time)

# Shrink: Remove requests older than 60 seconds
while request_timestamps[0] < current_time - 60:
    request_timestamps.popleft()

# Check: Exceeds rate limit?
if len(request_timestamps) > 100:
    return 429  # Too Many Requests
```

**Sticky Mapping**: `popleft()` = Left bookend slides forward to drop old timestamps

---

### Use Case 2: Monitoring Metrics (Moving Average)

**Visual**: Sliding time window over metric stream

| Visual Element | Production Code | Tool |
|----------------|-----------------|------|
| Window size | Last N minutes | Time constraint |
| Books | Metric data points | Measurements |
| Ruler | `sum(values) / count` | Average calculation |
| Shelf | Time series stream | Continuous data |

**Code Pattern**:
```python
# Expand: New metric arrives
window.append(new_metric)

# Shrink: Drop metrics older than window size
while window[0].timestamp < now - window_duration:
    window.popleft()

# Calculate: Moving average
avg = sum(m.value for m in window) / len(window)
```

**Sticky Mapping**: Window slides through time, just like through array indices

---

## Common Variations: Same Visual, Different Rules

### Fixed-Size Window
**Visual**: Bookends maintain constant distance (locked ruler)
**Code**: `if right - left + 1 == k:` check size, slide both together
**Example**: "Maximum sum of subarray of size K"

### Variable Window - Maximize
**Visual**: Expand greedily, shrink only when invalid, track max size
**Code**: Current pattern (longest substring without repeating)
**Example**: "Longest substring with at most K distinct characters"

### Variable Window - Minimize
**Visual**: Shrink greedily when valid, expand when invalid, track min size
**Code**: Invert validity logic
**Example**: "Minimum window substring"

### Count-Based Validity
**Visual**: Catalog entries count determines validity
**Code**: `len(char_count) <= k` for "at most K distinct"
**Example**: "Fruit into baskets" (at most 2 types)

### Sum-Based Validity
**Visual**: Total value of books in window
**Code**: `current_sum >= target` or `current_sum == target`
**Example**: "Subarray sum equals K"

---

## Self-Check: Do You Have Sticky Understanding?

### Test 1: Code → Visual
See this code:
```python
while char_count[s[right]] > 1:
    char_count[s[left]] -= 1
    left += 1
```

**Can you visualize?**
"Found duplicate in catalog! Left bookend slides right, removing books from catalog, until duplicate is gone."

### Test 2: Visual → Code
Imagine: "Right bookend adds a new book to the window, but the catalog already has this book. We need to slide the left bookend forward until we've removed the first copy."

**Can you write the code?**
```python
char_count[s[right]] += 1  # Add new book
while char_count[s[right]] > 1:  # Duplicate detected
    char_count[s[left]] -= 1  # Remove from catalog
    left += 1  # Slide left bookend
```

### Test 3: Explain Why
**Question**: Why is time complexity O(n) even though there's a nested while loop?

**Answer**: Each position on the shelf is visited by the left bookend **at most once** and the right bookend **at most once**. The inner `while` doesn't restart from scratch - it continues from where it left off. Total operations: right moves n times, left moves at most n times = 2n = O(n).

---

## The Stickiest Mapping

**🎯 CORE VISUAL**: Two bookends sliding along a shelf, with a card catalog tracking what's between them.

**🎯 CORE CODE**: Two pointers (`left`, `right`) iterating through array, with a hash map (`char_count`) tracking window contents.

**🎯 CORE INSIGHT**: By tracking what's in the window with O(1) lookup (hash map = card catalog), we avoid rescanning the window every time, reducing O(n²) to O(n).

**When you see sliding window code, you now see bookends sliding. When you imagine bookends sliding, you now know exactly what code to write.**

**The connection is permanent!** 🚀

---

## Next Steps

1. **Trace the verbose form** (class-based) line-by-line with the visual
2. **Trace the terse form** (interview version) with same visual
3. **Solve a LeetCode problem** using bookend visualization
4. **Explain your solution** using the metaphor + code mapping
5. **Teach someone else** - that's when it truly sticks!

**Time investment**: 2-3 hours
**Return**: Deep, intuitive understanding that lasts years

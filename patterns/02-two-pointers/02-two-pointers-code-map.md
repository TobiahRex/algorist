# Two Pointers - Code-to-Visual Mapping

**Purpose**: Connect the visual metaphor of two pointers to actual code implementation, creating sticky understanding through three-way mapping.

---

## The Three-Way Connection

```
Visual Metaphor ←→ Actual Code ←→ Why It Works
  (Two cursors)   (left/right indices)   (Eliminate search space)
```

---

## Visual Metaphor Overview

**Physical Model**: Two reading cursors on opposite ends of a sorted bookshelf

- **Left cursor** = `left` pointer (start of array)
- **Right cursor** = `right` pointer (end of array)
- **Books** = Array elements (sorted!)
- **Target sum** = What we're searching for
- **Comparison logic** = Move cursor based on current sum vs target
- **Search space** = Region between cursors (shrinks each iteration)

**Animation**: Compare values at both cursors. If sum too small, move left cursor right (need bigger value). If sum too large, move right cursor left (need smaller value). If match, found it!

---

## Core State Mappings

### Map State to Visual Elements

| Visual Element | Code Variable | Type | Purpose |
|----------------|---------------|------|---------|
| **Left cursor position** | `left` or `i` | `int` | Start index (beginning of search space) |
| **Right cursor position** | `right` or `j` | `int` | End index (end of search space) |
| **Book at left cursor** | `arr[left]` | `int` | Current left value |
| **Book at right cursor** | `arr[right]` | `int` | Current right value |
| **Combined value** | `arr[left] + arr[right]` | `int` (expression) | Sum of both cursors |
| **Target** | `target` | `int` | What we're searching for |
| **Search space** | `right - left + 1` | `int` (expression) | Remaining elements to check |
| **Result tracker** | `result` or `pairs` | `list` or `tuple` | Found pairs/solution |

---

## Action Mappings

### Map Visual Actions to Code

| Visual Action | Code Lines | Why This Works |
|---------------|------------|----------------|
| **Place cursors at ends** | `left = 0; right = len(arr) - 1` | Start with full search space |
| **Read values at cursors** | `current_sum = arr[left] + arr[right]` | Check current pair |
| **Found target!** | `if current_sum == target: return (arr[left], arr[right])` | Exact match - done! |
| **Sum too small** | `if current_sum < target: left += 1` | Need larger value, move left cursor right |
| **Sum too large** | `if current_sum > target: right -= 1` | Need smaller value, move right cursor left |
| **Cursors meet** | `while left < right:` | Search space exhausted |
| **Eliminate left region** | `left += 1` | Everything left of left is too small |
| **Eliminate right region** | `right -= 1` | Everything right of right is too large |

---

## Code-to-Visual Translation Tables

### If You See This Code... Visualize This

| Code Pattern | Visual Image |
|--------------|-------------|
| `left = 0, right = len(arr) - 1` | Cursors at opposite ends of sorted bookshelf |
| `arr[left] + arr[right] < target` | Books at cursors sum to less than target - need bigger! |
| `left += 1` | Left cursor slides one position right (toward center) |
| `right -= 1` | Right cursor slides one position left (toward center) |
| `while left < right:` | Keep searching until cursors meet in the middle |
| `arr[left] + arr[right] == target` | Found matching pair! |
| `if arr[i] != arr[i-1]: ...` | Skip duplicate values (in-place modification variant) |

### If You Visualize This... Look for This Code

| Visual Image | Code Pattern |
|-------------|-------------|
| Cursors start at opposite ends | `left = 0; right = len(arr) - 1` |
| Sum at cursors too small | `if current_sum < target: left += 1` |
| Sum at cursors too large | `if current_sum > target: right -= 1` |
| Cursors moving toward each other | `while left < right:` loop |
| Left cursor advances to skip duplicates | `while left < right and arr[left] == arr[left+1]: left += 1` |
| Cursors meet (search done) | Loop terminates when `left >= right` |

---

## Execution Trace Example

**Problem**: Find pair summing to 12 in `[1, 3, 5, 7, 9]`

### Step-by-Step: Visual + Code Side-by-Side

| Step | Visual State | Code State | Action |
|------|-------------|------------|--------|
| **1** | Cursors at [1...9], sum=10<12 | `left=0, right=4, arr[0]+arr[4]=10` | Sum too small, move left→ |
| **2** | Cursors at [3...9], sum=12 ✓ | `left=1, right=4, arr[1]+arr[4]=12` | Found it! |

**Result**: Pair (3, 9) found at indices (1, 4)

---

### Execution Trace: Remove Duplicates In-Place

**Problem**: Remove duplicates from sorted `[1, 1, 2, 2, 3, 4, 4]`

| Step | Visual State | Code State | Action |
|------|-------------|------------|--------|
| **1** | Write=1, Read=1 | `write=1, read=1, arr=[1,1,2,2,3,4,4]` | arr[1]==arr[0], skip |
| **2** | Write=1, Read=2 | `write=1, read=2` | arr[2]!=arr[1], write 2 at pos 1 |
| **3** | Write=2, Read=2 | `write=2, arr=[1,2,2,2,3,4,4]` | Move write pointer |
| **4** | Write=2, Read=3 | `write=2, read=3` | arr[3]==arr[2], skip |
| **5** | Write=2, Read=4 | `write=2, read=4` | arr[4]!=arr[3], write 3 at pos 2 |
| **6** | Write=3, Read=5 | `write=3, arr=[1,2,3,2,3,4,4]` | arr[5]!=arr[4], write 4 at pos 3 |
| **7** | Write=4, Read=6 | `write=4, arr=[1,2,3,4,3,4,4]` | arr[6]==arr[5], skip |

**Final Result**: `[1,2,3,4,...]`, length = 4

---

## Pattern Recognition: Code ↔ Visual

### Common Code Patterns in Two Pointers

| Code Pattern | What It Means Visually | When You Use It |
|--------------|------------------------|-----------------|
| `while left < right:` | Cursors haven't met yet | Opposite direction (two sum, palindrome) |
| `for read in range(n):` | Read cursor scans entire array | Same direction (remove duplicates) |
| `if arr[left] + arr[right] == target:` | Check if current pair matches | Finding pair sum |
| `left += 1` | Move left cursor right | Opposite direction, need bigger value |
| `right -= 1` | Move right cursor left | Opposite direction, need smaller value |
| `if arr[read] != arr[read-1]:` | Found unique element | Same direction, deduplication |
| `arr[write] = arr[read]; write += 1` | Copy unique element, advance write | In-place modification |

---

## Key Insights

### Insight 1: Sorted Input Enables Binary Decisions
**Visual**: Because books are sorted, we know direction to move cursors
**Code**: `if sum < target: left++` (need bigger) `else: right--` (need smaller)
**Why**: Each comparison eliminates half of remaining search space

### Insight 2: Opposite vs Same Direction
**Visual**: Opposite = cursors move toward each other; Same = both move right
**Code**: Opposite uses `while left < right`; Same uses `for` loop with lagging write pointer
**Why**: Different problems need different cursor movements

### Insight 3: O(n) Time Complexity
**Visual**: Each cursor visits each position at most once
**Code**: `left` moves right n times max, `right` moves left n times max → O(n)
**Why**: No backtracking - monotonic cursor movement

### Insight 4: O(1) Space (In-Place)
**Visual**: No extra bookshelf needed - just two cursors on same shelf
**Code**: Only variables are `left`, `right`, no arrays created
**Why**: Modify array in-place, cursors track positions

### Insight 5: Invariant Maintains Correctness
**Visual**: Everything left of left cursor is "too small", everything right of right cursor is "too large"
**Code**: Invariant after each step ensures we don't miss the answer
**Examples**:
- **Two sum**: `arr[i] + anything < target` for all `i < left`
- **Remove duplicates**: `arr[0..write-1]` contains unique elements

---

## Real-World Code Mappings

### Use Case 1: Database Merge Join

**Visual**: Two sorted database tables, cursor on each table

| Visual Element | Production Code | System |
|----------------|-----------------|--------|
| Left cursor | `cursor_table_a` | Pointer to row in Table A |
| Right cursor | `cursor_table_b` | Pointer to row in Table B |
| Comparison | `if table_a.id < table_b.id:` | Compare join keys |
| Advance logic | Move cursor with smaller key | Merge sorted streams |

**Code Pattern**:
```python
# PostgreSQL-style merge join
while cursor_a.has_next() and cursor_b.has_next():
    if cursor_a.current.id == cursor_b.current.id:
        output_joined_row()
        cursor_a.next()
        cursor_b.next()
    elif cursor_a.current.id < cursor_b.current.id:
        cursor_a.next()
    else:
        cursor_b.next()
```

**Sticky Mapping**: `cursor.next()` = move cursor to next row

---

### Use Case 2: Git Diff Algorithm

**Visual**: Two file cursors, one on old file, one on new file

| Visual Element | Production Code | Tool |
|----------------|-----------------|------|
| Cursors | `line_old`, `line_new` | Line pointers |
| Match | `if lines_match(): advance both` | Common lines |
| Mismatch | Record as +/- diff | Changes detected |

**Code Pattern**:
```python
# Simplified Myers diff
while line_old < len(old_file) and line_new < len(new_file):
    if old_file[line_old] == new_file[line_new]:
        # Match - advance both
        line_old += 1
        line_new += 1
    else:
        # Mismatch - record diff
        record_change(old_file[line_old], new_file[line_new])
        line_old += 1
        line_new += 1
```

**Sticky Mapping**: Both cursors advance when lines match

---

## Common Variations: Same Visual, Different Rules

### Opposite Direction (Two Sum)
**Visual**: Cursors start at opposite ends, move toward center
**Code**: `left = 0; right = n-1; while left < right:`
**Example**: "Find pair summing to target"

### Same Direction (Remove Duplicates)
**Visual**: Write cursor lags behind read cursor
**Code**: `write = 0; for read in range(n):`
**Example**: "Remove duplicates in-place"

### Three Pointers (Dutch National Flag)
**Visual**: Three regions: [<pivot], [==pivot], [>pivot]
**Code**: `left = 0, mid = 0, right = n-1`
**Example**: "Sort colors (0,1,2)"

### Palindrome Check
**Visual**: Cursors move inward from both ends, comparing characters
**Code**: `while left < right: if s[left] != s[right]: return False`
**Example**: "Is string a palindrome?"

---

## Self-Check: Do You Have Sticky Understanding?

### Test 1: Code → Visual
See this code:
```python
while left < right:
    if arr[left] + arr[right] > target:
        right -= 1
    else:
        left += 1
```

**Can you visualize?**
"Cursors at opposite ends. If sum too large, move right cursor left (need smaller value). Otherwise move left cursor right (need larger value or exact match)."

### Test 2: Visual → Code
Imagine: "Two cursors on sorted array. Left cursor at 0, right at end. Compare values. If match target, done. If sum too small, move left cursor right. If sum too large, move right cursor left."

**Can you write the code?**
```python
left, right = 0, len(arr) - 1
while left < right:
    current_sum = arr[left] + arr[right]
    if current_sum == target:
        return (arr[left], arr[right])
    elif current_sum < target:
        left += 1
    else:
        right -= 1
return None
```

### Test 3: Explain Why
**Question**: Why does two pointers work in O(n) instead of O(n²)?

**Answer**: Each iteration eliminates at least one position from search space. When sum < target, we know `arr[left]` paired with anything won't work (since `arr[right]` is already the largest). Move left cursor right. When sum > target, `arr[right]` paired with anything won't work. Move right cursor left. Each position visited once → O(n).

---

## The Stickiest Mapping

**Core Visual**: Two cursors on opposite ends of sorted bookshelf, moving toward each other based on comparison.

**Core Code**: `left = 0; right = n-1; while left < right: compare and move`

**Core Insight**: Sorted input lets us make binary decisions about which direction to move cursors. Each move eliminates part of search space. O(n) instead of O(n²).

**When you see two pointers code, you now see cursors closing in. When you imagine cursors on sorted data, you know exactly what code to write.**

**The connection is permanent!**

---

## Next Steps

1. **Trace opposite direction** (two sum) with visual
2. **Trace same direction** (remove duplicates) with visual
3. **Solve LeetCode problem** using cursor visualization
4. **Explain solution** using the metaphor + code mapping
5. **Teach someone else** - that's when it truly sticks!

**Time investment**: 2-3 hours
**Return**: Deep, intuitive understanding that lasts years

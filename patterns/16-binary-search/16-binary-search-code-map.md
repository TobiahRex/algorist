# Binary Search - Code-to-Visual Mapping

**Purpose**: Connect the visual metaphor of cutting search space in half to actual code implementation, creating sticky understanding through three-way mapping.

---

## The Three-Way Connection

```
Visual Metaphor ←→ Actual Code ←→ Why It Works
  (Dictionary splitting)   (Two pointers + mid)   (Eliminate half each step)
```

---

## Visual Metaphor Overview

**Physical Model**: Finding word in physical dictionary by repeatedly opening to middle

- **Dictionary** = Sorted array/search space
- **Left bookmark** = `left` pointer (start of search range)
- **Right bookmark** = `right` pointer (end of search range)
- **Open to middle page** = Calculate `mid` index
- **Word on middle page** = `arr[mid]` value
- **Before/after check** = Comparison with target
- **Move left bookmark forward** = `left = mid + 1`
- **Move right bookmark backward** = `right = mid - 1`
- **Bookmarks cross** = Search space exhausted, not found

**Animation**: Open dictionary to middle, check word. If target comes before, move right bookmark to middle (search left half). If after, move left bookmark to middle (search right half). Repeat until found or bookmarks cross.

---

## Core State Mappings

### Map State to Visual Elements

| Visual Element | Code Variable | Type | Purpose |
|----------------|---------------|------|---------|
| **Left bookmark position** | `left` | `int` | Start of search range |
| **Right bookmark position** | `right` | `int` | End of search range |
| **Middle page** | `mid` | `int` | Calculated midpoint |
| **Word on middle page** | `arr[mid]` | `int/any` | Value at midpoint |
| **Target word** | `target` | `int/any` | Value we're searching for |
| **Search range** | `[left, right]` | `range` | Current valid space |
| **Range size** | `right - left + 1` | `int` | Remaining elements |
| **Bookmarks crossed** | `left > right` | `bool` | Search failed |
| **Found the word** | `arr[mid] == target` | `bool` | Search successful |

---

## Action Mappings

### Map Visual Actions to Code

| Visual Action | Code Lines | Why This Works |
|---------------|------------|----------------|
| **Place bookmarks at start/end** | `left = 0, right = len(arr) - 1` | Initialize search space |
| **Open to middle page** | `mid = left + (right - left) // 2` | Find midpoint (avoid overflow) |
| **Read word on middle page** | `value = arr[mid]` | Access element at midpoint |
| **Compare with target word** | `if arr[mid] == target:` | Check if found |
| **Target is before middle** | `elif arr[mid] > target:` | Target in left half |
| **Move right bookmark left** | `right = mid - 1` | Eliminate right half |
| **Target is after middle** | `else: # arr[mid] < target` | Target in right half |
| **Move left bookmark right** | `left = mid + 1` | Eliminate left half |
| **Check if bookmarks crossed** | `while left <= right:` | Continue while range valid |
| **Word not in dictionary** | `return -1` | Exhausted space without finding |

---

## Code-to-Visual Translation Tables

### If You See This Code... Visualize This

| Code Pattern | Visual Image |
|--------------|-------------|
| `left = 0, right = len(arr) - 1` | Bookmarks at first and last pages |
| `mid = left + (right - left) // 2` | Open dictionary exactly to middle page |
| `arr[mid] == target` | Found the target word on middle page! |
| `arr[mid] < target` | Middle word comes alphabetically before target, search right half |
| `arr[mid] > target` | Middle word comes alphabetically after target, search left half |
| `left = mid + 1` | Move left bookmark past middle to right half |
| `right = mid - 1` | Move right bookmark before middle to left half |
| `left > right` | Bookmarks crossed = target not in dictionary |
| `return mid` | Found at middle page position |

### If You Visualize This... Look for This Code

| Visual Image | Code Pattern |
|-------------|-------------|
| Open to middle page | `mid = left + (right - left) // 2` |
| Found target word | `if arr[mid] == target: return mid` |
| Search left half (before middle) | `right = mid - 1` |
| Search right half (after middle) | `left = mid + 1` |
| Bookmarks haven't crossed | `while left <= right:` |
| Bookmarks crossed, not found | Loop exits, `return -1` |
| Calculate midpoint safely | Use `left + (right - left) // 2`, not `(left + right) // 2` |

---

## Execution Trace Example

**Problem**: Search for target 7 in sorted array `[1, 3, 5, 7, 9, 11, 13]`

### Step-by-Step: Visual + Code Side-by-Side

| Step | Visual State | Code State | Action |
|------|-------------|------------|--------|
| **1** | Bookmarks at positions 0 and 6 | `left=0, right=6, arr=[1,3,5,7,9,11,13]` | Initialize |
| **2** | Open to middle (index 3) | `mid = 0 + (6-0)//2 = 3` | Calculate midpoint |
| **3** | Middle page shows 7 | `arr[3] = 7` | Read middle value |
| **4** | 7 == 7, found it! | `if arr[3] == 7: return 3` | Target found |

**Result**: Found at index 3

**Example 2**: Search for target 6 (not present)

| Step | Visual State | Code State | Action |
|------|-------------|------------|--------|
| **1** | Bookmarks at 0 and 6 | `left=0, right=6` | Initialize |
| **2** | Open to middle (index 3) | `mid = 3, arr[3] = 7` | Check middle |
| **3** | 7 > 6, search left half | `right = mid - 1 = 2` | Eliminate right |
| **4** | Bookmarks at 0 and 2 | `left=0, right=2` | New range |
| **5** | Open to middle (index 1) | `mid = 0 + (2-0)//2 = 1` | New midpoint |
| **6** | arr[1] = 3 < 6, search right | `left = mid + 1 = 2` | Eliminate left |
| **7** | Bookmarks at 2 and 2 | `left=2, right=2` | Range = 1 element |
| **8** | Open to middle (index 2) | `mid = 2, arr[2] = 5` | Check last element |
| **9** | 5 < 6, search right | `left = mid + 1 = 3` | Eliminate left |
| **10** | Bookmarks crossed (3 > 2) | `left=3, right=2, left > right` | Search failed |
| **11** | Not found | `return -1` | Target not in array |

**Result**: -1 (not found)

---

## Pattern Recognition: Code ↔ Visual

### Common Code Patterns in Binary Search

| Code Pattern | What It Means Visually | When You Use It |
|--------------|------------------------|-----------------|
| `left = 0, right = len(arr) - 1` | Start with entire dictionary | Initialization |
| `while left <= right:` | While bookmarks haven't crossed | Main loop |
| `mid = left + (right - left) // 2` | Open to exact middle | Every iteration |
| `if arr[mid] == target:` | Found target word | Success case |
| `elif arr[mid] < target:` | Middle comes before target alphabetically | Search right |
| `left = mid + 1` | Move left bookmark past middle | Eliminate left half |
| `else:` (arr[mid] > target) | Middle comes after target | Search left |
| `right = mid - 1` | Move right bookmark before middle | Eliminate right half |
| `return -1` | Bookmarks crossed without finding | Failure case |

---

## Key Insights

### Insight 1: Eliminate Half Each Iteration
**Visual**: Each page opening eliminates half of remaining pages
**Code**: Either `left = mid + 1` or `right = mid - 1` cuts space in half
**Why**: O(log n) time complexity - 1024 elements takes only 10 comparisons

### Insight 2: Sorted Property Enables Binary Decision
**Visual**: Dictionary alphabetical order lets us know which half to discard
**Code**: Comparison `arr[mid] < target` or `arr[mid] > target` guides direction
**Why**: Without sorted order, can't make elimination decision

### Insight 3: Boundary Conditions Are Critical
**Visual**: Bookmarks exactly touching vs crossing determines success/failure
**Code**: `left <= right` vs `left < right`, `mid + 1` vs `mid`
**Why**: Off-by-one errors common, boundary handling defines correctness

### Insight 4: Midpoint Calculation Avoids Overflow
**Visual**: Find middle by measuring from left edge, not total
**Code**: `left + (right - left) // 2` instead of `(left + right) // 2`
**Why**: In languages with fixed integer size, `left + right` can overflow

### Insight 5: Binary Search on Answer Space
**Visual**: Can search ranges that aren't arrays (e.g., 1 to 1,000,000 for capacity)
**Code**: Apply same logic to solution space with validity check
**Why**: Extends pattern beyond arrays to optimization problems

---

## Real-World Code Mappings

### Use Case 1: Database Index Lookup - B-Tree Search

**Visual**: Database finds record by searching sorted index

| Visual Element | Production Code | System |
|----------------|-----------------|--------|
| Index pages | B-Tree nodes | Sorted keys |
| Current page | Node pointer | Tree navigation |
| Compare with key | Binary search within node | Find position |
| Navigate left/right | Follow child pointers | Tree traversal |
| Found record | Return data pointer | Query result |

**Code Pattern**:
```python
# Database index search (B-Tree uses binary search at each node)
def search_btree_node(node, key):
    # Binary search within node's sorted keys
    left, right = 0, len(node.keys) - 1

    while left <= right:
        mid = left + (right - left) // 2

        if node.keys[mid] == key:
            return node.values[mid]  # Found
        elif node.keys[mid] < key:
            left = mid + 1
        else:
            right = mid - 1

    # Not in this node, follow child pointer
    return search_btree_node(node.children[left], key)
```

**Sticky Mapping**: Each B-Tree node uses binary search to find position

---

### Use Case 2: Git Bisect - Bug Finding

**Visual**: Find first bad commit in sorted timeline

| Visual Element | Production Code | Tool |
|----------------|-----------------|------|
| Commit timeline | Sorted array of commits | Git history |
| Good/bad commits | Target property | Test result |
| Middle commit | Checkout mid commit | Git operation |
| Test result | is_bad(commit) | User feedback |
| Narrow range | Update left/right | Bisect progress |

**Code Pattern**:
```python
# Git bisect simulation
def find_first_bad_commit(commits):
    left, right = 0, len(commits) - 1
    result = -1

    while left <= right:
        mid = left + (right - left) // 2

        if is_bad(commits[mid]):  # User tests commit
            result = mid  # Record this bad commit
            right = mid - 1  # Look for earlier bad commit
        else:
            left = mid + 1  # Search later commits

    return result  # First bad commit
```

**Sticky Mapping**: Binary search on commit timeline to find bug introduction

---

## Algorithm Variations: Same Visual, Different Targets

### Find Exact Match
**Visual**: Find specific word in dictionary
**Code**: Return when `arr[mid] == target`
**Use**: Classic binary search

### Find First Occurrence
**Visual**: Find first page where word appears (may have duplicates)
**Code**: When found, continue searching left: `right = mid - 1`, track result
**Use**: First position in sorted array with duplicates

### Find Last Occurrence
**Visual**: Find last page where word appears
**Code**: When found, continue searching right: `left = mid + 1`, track result
**Use**: Last position in sorted array with duplicates

### Find Insertion Position
**Visual**: Where would new word go in dictionary?
**Code**: Return `left` when `left > right`
**Use**: Insert into sorted array

### Binary Search on Answer
**Visual**: Search range [1, 1000000] for minimum capacity that works
**Code**: `is_valid(mid)` replaces array comparison
**Use**: Optimization problems (minimize/maximize answer)

---

## Self-Check: Do You Have Sticky Understanding?

### Test 1: Code → Visual
See this code:
```python
mid = left + (right - left) // 2
if arr[mid] < target:
    left = mid + 1
else:
    right = mid - 1
```

**Can you visualize?**
"Open dictionary to middle page. Read the middle word. If middle word comes before target alphabetically, move left bookmark past middle to search right half. Otherwise, move right bookmark before middle to search left half."

### Test 2: Visual → Code
Imagine: "I need to find the first page where a word appears, even if it appears on multiple pages."

**Can you write the code?**
```python
left, right = 0, len(arr) - 1
result = -1

while left <= right:
    mid = left + (right - left) // 2

    if arr[mid] == target:
        result = mid        # Found, but keep searching left
        right = mid - 1     # Look for earlier occurrence
    elif arr[mid] < target:
        left = mid + 1
    else:
        right = mid - 1

return result
```

### Test 3: Explain Why
**Question**: Why is it O(log n) time complexity?

**Answer**: Each comparison eliminates half the search space. Starting with n elements: n → n/2 → n/4 → n/8 → ... → 1. Number of steps to reach 1 is log₂(n). For 1024 elements, takes only 10 comparisons (2^10 = 1024). Cutting in half repeatedly is logarithmic.

---

## The Stickiest Mapping

**Core Visual**: Opening dictionary to middle, comparing, eliminating half, repeating until found or bookmarks cross.

**Core Code**: Two pointers (`left`, `right`), calculate `mid`, compare `arr[mid]` with `target`, adjust pointers to eliminate half.

**Core Insight**: Sorted order enables binary decision (left or right half). Each step eliminates 50% of search space, giving O(log n) time. Can search arrays OR answer spaces (any monotonic property).

**When you see binary search code, you now see dictionary pages splitting. When you imagine searching sorted data, you now know exactly what code to write.**

**The connection is permanent!**

---

## Next Steps

1. **Trace the verbose form** line-by-line with the dictionary visual
2. **Trace the terse form** with same visual
3. **Solve LeetCode 704** (Binary Search) using the splitting metaphor
4. **Solve LeetCode 875** (Koko Eating Bananas) for binary search on answer
5. **Handle edge cases** (empty array, duplicates) - that's when it truly sticks!

**Time investment**: 2-3 hours
**Return**: Deep, intuitive understanding that lasts years

# Cyclic Sort - Code-to-Visual Mapping

**Purpose**: Connect the visual metaphor of numbered mailboxes to actual code implementation, creating sticky understanding through three-way mapping.

---

## The Three-Way Connection

```
Visual Metaphor ←→ Actual Code ←→ Why It Works
  (Mailboxes & mail)   (Swap to correct index)   (Number = address mapping)
```

---

## Visual Metaphor Overview

**Physical Model**: Row of numbered mailboxes (1 to N) with misplaced mail

- **Mailboxes** = Array indices
- **Mail/letters** = Numbers in array
- **Mailbox number** = Index position
- **Letter address** = Number value
- **Correctly placed mail** = `arr[i] == i+1` (for range [1,n])
- **Current position** = Index we're examining
- **Swap** = Move letter to its correct mailbox

**Animation**: Walk along mailbox row. If letter at current mailbox doesn't belong here, swap it to its correct mailbox. Keep swapping until current mailbox has correct letter. Move to next mailbox.

---

## Core State Mappings

### Map State to Visual Elements

| Visual Element | Code Variable | Type | Purpose |
|----------------|---------------|------|---------|
| **Mailbox row** | `nums` array | `List[int]` | The data structure |
| **Current mailbox** | `i` (index) | `int` | Position we're examining |
| **Letter at current** | `nums[i]` | `int` | Value at current position |
| **Correct mailbox for letter** | `nums[i] - 1` | `int` (expression) | Where letter belongs (for [1,n]) |
| **Is letter correctly placed?** | `nums[i] == nums[correct_idx]` | `bool` (expression) | Check if already correct |
| **Swap operation** | `nums[i], nums[correct_idx] = swap` | Tuple assignment | Move letter to correct mailbox |

---

## Action Mappings

### Map Visual Actions to Code

| Visual Action | Code Lines | Why This Works |
|---------------|------------|----------------|
| **Start at first mailbox** | `i = 0` | Initialize position |
| **Read letter address** | `correct_idx = nums[i] - 1` | Calculate where it belongs |
| **Check if letter belongs here** | `if nums[i] != nums[correct_idx]:` | Is it misplaced? |
| **Swap to correct mailbox** | `nums[i], nums[correct_idx] = nums[correct_idx], nums[i]` | Move to destination |
| **Letter correct, move to next** | `i += 1` | Advance position |
| **Keep swapping at position** | `while nums[i] != nums[correct_idx]:` | Until current mailbox correct |
| **Walk entire row** | `while i < len(nums):` | Process all positions |
| **Find missing address** | `if nums[i] != i + 1: return i + 1` | Mailbox with wrong letter |

---

## Code-to-Visual Translation Tables

### If You See This Code... Visualize This

| Code Pattern | Visual Image |
|--------------|-------------|
| `i = 0` | Postal worker at first mailbox |
| `correct_idx = nums[i] - 1` | Read letter address (where it should go) |
| `nums[i] != nums[correct_idx]` | Letter is in wrong mailbox |
| `nums[i], nums[correct_idx] = nums[correct_idx], nums[i]` | Swap letters to correct mailboxes |
| `i += 1` | Move to next mailbox |
| `while i < len(nums):` | Walk down entire mailbox row |
| `if nums[i] != i + 1: return i + 1` | Found mailbox with wrong letter = missing number |

### If You Visualize This... Look for This Code

| Visual Image | Code Pattern |
|-------------|-------------|
| Worker at current mailbox | `i = current_position` |
| Read letter's destination | `correct_idx = nums[i] - 1` |
| Letter in wrong mailbox | `if nums[i] != nums[correct_idx]:` |
| Swap letters | `nums[i], nums[correct_idx] = nums[correct_idx], nums[i]` |
| Letter already correct | `else: i += 1` |
| Walk to next mailbox | `i += 1` |
| Find which number is missing | `if nums[i] != i+1: return i+1` |

---

## Execution Trace Example

**Problem**: Sort `[3, 1, 5, 4, 2]` using cyclic sort (numbers 1-5)

### Step-by-Step: Visual + Code Side-by-Side

| Step | Visual State | Code State | Action |
|------|-------------|------------|--------|
| **0** | Mailboxes: [3,1,5,4,2] | `i=0, nums=[3,1,5,4,2]` | Start at mailbox 0 |
| **1** | Letter 3 at box 0, belongs at box 2 | `nums[0]=3, correct_idx=2` | 3 should be at index 2 |
| **2** | Swap 3 and 5 | `nums=[5,1,3,4,2]` | Put 3 in correct place |
| **3** | Letter 5 at box 0, belongs at box 4 | `nums[0]=5, correct_idx=4` | 5 should be at index 4 |
| **4** | Swap 5 and 2 | `nums=[2,1,3,4,5]` | Put 5 in correct place |
| **5** | Letter 2 at box 0, belongs at box 1 | `nums[0]=2, correct_idx=1` | 2 should be at index 1 |
| **6** | Swap 2 and 1 | `nums=[1,2,3,4,5]` | Put 2 in correct place |
| **7** | Letter 1 at box 0, correct! | `nums[0]=1, i=0` | Box 0 correct, move to box 1 |
| **8** | All remaining correct | `i=1,2,3,4 all correct` | Done! |

**Final Result**: `[1,2,3,4,5]` - all letters in correct mailboxes

---

### Finding Missing Number Example

**Problem**: Find missing number in `[4, 0, 3, 1]` (range 0-4)

| Step | Visual State | Code State | Action |
|------|-------------|------------|--------|
| **1** | Sort: [4,0,3,1] → [0,1,3,4] | Cyclic sort | Place all in correct boxes |
| **2** | Check box 0: has 0 ✓ | `nums[0]=0, 0==0` | Correct |
| **3** | Check box 1: has 1 ✓ | `nums[1]=1, 1==1` | Correct |
| **4** | Check box 2: has 3 ✗ | `nums[2]=3, 3≠2` | Wrong! |
| **5** | Box 2 should have 2 | `return 2` | Missing number found! |

**Result**: Missing number = 2

---

## Pattern Recognition: Code ↔ Visual

### Common Code Patterns in Cyclic Sort

| Code Pattern | What It Means Visually | When You Use It |
|--------------|------------------------|-----------------|
| `while i < len(nums):` | Walk down mailbox row | Main loop |
| `correct_idx = nums[i] - 1` | Calculate correct mailbox | For range [1,n] |
| `correct_idx = nums[i]` | Calculate correct mailbox | For range [0,n-1] |
| `if nums[i] != nums[correct_idx]:` | Letter misplaced? | Swap condition |
| `nums[i], nums[correct_idx] = ...` | Swap to correct box | Place correctly |
| `else: i += 1` | Already correct, next box | Advance |
| `if nums[i] != i+1: return i+1` | Find missing number | After sorting |

---

## Key Insights

### Insight 1: Number = Index Mapping
**Visual**: Letter's address number tells us exactly which mailbox it belongs in
**Code**: `correct_idx = nums[i] - 1` (or `nums[i]` for 0-indexed)
**Why**: Only works when numbers are in range [1,n] or [0,n-1]

### Insight 2: In-Place Sorting
**Visual**: No extra mailbox row needed - just swap letters within same row
**Code**: Only variables: `i`, `correct_idx`, no auxiliary array
**Why**: O(1) space instead of O(n)

### Insight 3: O(n) Time with Swaps
**Visual**: Each letter swapped at most once to its final position
**Code**: Each number moved to correct index once, then never touched again
**Why**: At most N swaps total, even though nested-looking loop

### Insight 4: After Sort, Violations Show Problems
**Visual**: After sorting, any mailbox with wrong letter = problem
**Code**: `if nums[i] != i+1:` finds missing/duplicate numbers
**Why**: Correct arrangement is `arr[i] = i+1`, violations are anomalies

### Insight 5: Constraint-Dependent Pattern
**Visual**: Only works when letters are numbered 1-N (or 0 to N-1)
**Code**: Only applicable when `1 <= nums[i] <= n`
**Why**: Other ranges can't use number as index directly

---

## Real-World Code Mappings

### Use Case 1: Database Row ID Validation

**Visual**: Row IDs should be sequential 1 to N, find gaps

| Visual Element | Production Code | System |
|----------------|-----------------|--------|
| Row IDs | `ids = [1,3,5,2,4]` | Database primary keys |
| Sort IDs | Cyclic sort | In-place arrangement |
| Find gaps | Check violations | Missing ID detection |

**Code Pattern**:
```python
# Database ID gap detection
def find_missing_id(ids):
    # Cyclic sort
    i = 0
    while i < len(ids):
        correct_idx = ids[i] - 1
        if ids[i] != ids[correct_idx]:
            ids[i], ids[correct_idx] = ids[correct_idx], ids[i]
        else:
            i += 1

    # Find first gap
    for i in range(len(ids)):
        if ids[i] != i + 1:
            return i + 1  # Missing ID
    return len(ids) + 1
```

**Sticky Mapping**: `ids[i] != i+1` = ID gap in sequence

---

### Use Case 2: Partition Assignment Validation

**Visual**: Kafka partitions 0 to N-1, check all assigned

| Visual Element | Production Code | Tool |
|----------------|-----------------|------|
| Partition IDs | `partitions = [2,0,1,3]` | Kafka partition assignments |
| Cyclic sort | Place in correct order | Validation |
| Missing check | Find unassigned | Gap detection |

**Code Pattern**:
```python
# Kafka partition validation
def validate_partitions(assigned, total_partitions):
    i = 0
    while i < len(assigned):
        correct_idx = assigned[i]
        if assigned[i] != assigned[correct_idx]:
            assigned[i], assigned[correct_idx] = assigned[correct_idx], assigned[i]
        else:
            i += 1

    # Check all partitions assigned
    for i in range(len(assigned)):
        if assigned[i] != i:
            return f"Partition {i} not assigned"
    return "All partitions assigned"
```

**Sticky Mapping**: Cyclic sort validates complete partition coverage

---

## Common Variations: Same Visual, Different Rules

### Basic Cyclic Sort [1,n]
**Visual**: Mailboxes numbered 1 to N
**Code**: `correct_idx = nums[i] - 1`
**Example**: "Sort array in-place"

### Find Missing Number [0,n]
**Visual**: Find which mailbox has wrong letter
**Code**: After sort, `if nums[i] != i: return i`
**Example**: "Missing number from 0 to N"

### Find Duplicate
**Visual**: Which letter appears in two mailboxes?
**Code**: After sort, `if nums[i] != i+1: return nums[i]`
**Example**: "Find the duplicate number"

### Find All Duplicates
**Visual**: All letters appearing in multiple mailboxes
**Code**: After sort, collect all `nums[i] != i+1`
**Example**: "Find all duplicates in array"

### Find All Missing
**Visual**: All mailboxes with wrong letters
**Code**: After sort, collect all indices where `nums[i] != i+1`
**Example**: "Find all disappeared numbers"

### First Missing Positive
**Visual**: Find smallest positive number missing
**Code**: Cyclic sort for positives, find first gap
**Example**: "First missing positive integer"

---

## Self-Check: Do You Have Sticky Understanding?

### Test 1: Code → Visual
See this code:
```python
while i < len(nums):
    correct_idx = nums[i] - 1
    if nums[i] != nums[correct_idx]:
        nums[i], nums[correct_idx] = nums[correct_idx], nums[i]
    else:
        i += 1
```

**Can you visualize?**
"Walk down mailbox row. Read letter at current mailbox, find where it belongs. If it's in wrong mailbox, swap it to correct one. Keep swapping at current position until correct letter is there. Then move to next mailbox."

### Test 2: Visual → Code
Imagine: "Row of mailboxes numbered 1 to N. Mail is scrambled. Walk through each mailbox. Read letter's address, swap it to correct mailbox. Repeat until current mailbox has right letter. Move forward. At the end, mailboxes with wrong letters reveal missing numbers."

**Can you write the code?**
```python
def cyclic_sort_and_find_missing(nums):
    # Sort phase: place letters in correct mailboxes
    i = 0
    while i < len(nums):
        correct_idx = nums[i] - 1
        if correct_idx < len(nums) and nums[i] != nums[correct_idx]:
            nums[i], nums[correct_idx] = nums[correct_idx], nums[i]
        else:
            i += 1

    # Find phase: which mailbox has wrong letter?
    for i in range(len(nums)):
        if nums[i] != i + 1:
            return i + 1  # This number is missing
    return len(nums) + 1
```

### Test 3: Explain Why
**Question**: Why is time complexity O(n) even though there's a while loop inside while loop?

**Answer**: Each number is swapped to its correct position at most once. Once a number is in its correct position, it's never touched again. So even though the loop structure looks nested, the total number of swaps is bounded by N (one swap per number). Therefore, O(n) time, not O(n²).

---

## The Stickiest Mapping

**Core Visual**: Numbered mailboxes with scrambled mail. Each letter's number is its destination mailbox.

**Core Code**: `correct_idx = nums[i] - 1; swap if wrong; else i++`

**Core Insight**: When numbers are in range [1,n] or [0,n-1], we can use the number itself as an index. Cyclic sort places each number at its "home" index in O(n) time and O(1) space. After sorting, any position where `nums[i] != i+1` reveals missing or duplicate numbers.

**When you see cyclic sort code, you now see mailboxes and mail. When you imagine numbered destinations, you know exactly what code to write.**

**The connection is permanent!**

---

## Next Steps

1. **Draw mailboxes** and trace cyclic sort by hand
2. **Work through missing number** detection after sorting
3. **Solve LeetCode problem** using mailbox visualization
4. **Explain solution** using the metaphor + complexity analysis
5. **Teach someone else** - that's when it truly sticks!

**Time investment**: 2-3 hours
**Return**: Deep, intuitive understanding that lasts years

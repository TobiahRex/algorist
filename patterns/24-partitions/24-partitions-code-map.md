# Partition Problems - Code-to-Visual Mapping

**Purpose**: Connect the visual metaphor of fairly dividing items into groups to actual code implementation, creating sticky understanding through three-way mapping.

---

## The Three-Way Connection

```
Visual Metaphor ←→ Actual Code ←→ Why It Works
  (Dividing inheritance)   (DP/Backtracking/Greedy)   (Equal sums or balanced)
```

---

## Visual Metaphor Overview

**Physical Model**: Dividing inheritance assets into equal-value groups

- **Assets to divide** = Array of numbers (values/weights)
- **Heirs** = K groups/partitions/buckets
- **Balance scale** = Checking equal sums
- **Calculator** = Computing sums
- **Memo pad** = DP table tracking "can make sum?"
- **Buckets** = Partitions being filled
- **Min heap** = Always adding to smallest bucket
- **Fair division** = Equal sum partition or balanced partition

**Animation**: **Equal Sum**: Check if total even, DP to find subset with sum=total/2. **K-Partition**: Try assigning items to buckets, backtrack if bucket exceeds target. **Balanced**: Sort descending, always add to smallest bucket.

---

## Core State Mappings

### Map State to Visual Elements

| Visual Element | Code Variable | Type | Purpose |
|----------------|---------------|------|---------|
| **Total inheritance** | `sum(nums)` | `int` | Total value to divide |
| **Target per heir** | `target = total / k` | `int` | Goal sum per partition |
| **Balance scale** | `dp[sum]` | `bool` | Can we make this sum? |
| **Memo pad** | `dp` table | `List[bool]` | DP memoization |
| **Heir buckets** | `buckets = [0] * k` | `List[int]` | Current sum in each partition |
| **Smallest bucket** | `heapq.heappop(heap)` | `(sum, id)` | Min heap tracking |
| **Item assignment** | `buckets[i] += num` | Assignment | Add item to partition |
| **Maximum bucket** | `max(buckets)` | `int` | Largest partition sum |

---

## Action Mappings

### Map Visual Actions to Code

| Visual Action | Code Lines | Why This Works |
|---------------|------------|----------------|
| **Check if total even** | `if total % 2 != 0: return False` | Odd total can't split equally |
| **Calculate target per heir** | `target = total // k` | Equal division goal |
| **Create DP table** | `dp = [False] * (target + 1)` | Track achievable sums |
| **Mark sum as achievable** | `dp[s] = True` | Can make this sum |
| **Update DP backward** | `for s in range(target, num-1, -1):` | Avoid double-counting |
| **Assign to bucket** | `buckets[i] += nums[index]` | Place item in partition |
| **Check bucket overflow** | `if buckets[i] + num <= target:` | Feasibility check |
| **Add to smallest bucket** | `heapq.heappush(heap, (sum, id))` | Greedy balancing |
| **Backtrack assignment** | `buckets[i] -= nums[index]` | Undo choice |

---

## Code-to-Visual Translation Tables

### If You See This Code... Visualize This

| Code Pattern | Visual Image |
|--------------|-------------|
| `total = sum(nums)` | Calculating total inheritance value |
| `if total % 2: return False` | Checking if balance scale can be equal (odd = impossible) |
| `target = total // 2` | Half of inheritance (one heir's share) |
| `dp[0] = True` | Empty subset has sum 0 (base case) |
| `for s in range(target, num-1, -1):` | Filling memo pad backward (avoid reuse) |
| `dp[s] = dp[s] or dp[s - num]` | Can make sum s: either already could, or add num |
| `buckets = [0] * k` | K empty buckets for heirs |
| `buckets[i] += nums[index]` | Adding asset to heir i's bucket |
| `heapq.heappop(heap)` | Finding heir with smallest current total |
| `max(buckets)` | Checking largest heir's total (for balancing) |

### If You Visualize This... Look for This Code

| Visual Image | Code Pattern |
|-------------|-------------|
| Checking if total divisible by heirs | `if total % k != 0: return False` |
| Memo pad tracking achievable sums | `dp = [False] * (target + 1)` |
| Marking sum as possible | `dp[sum] = True` |
| Empty buckets for heirs | `buckets = [0] * k` |
| Adding asset to bucket | `buckets[i] += value` |
| Checking if bucket exceeds limit | `if buckets[i] + value > target: skip` |
| Finding smallest bucket (greedy) | `min_bucket = heapq.heappop(heap)` |
| Undoing asset placement (backtrack) | `buckets[i] -= value` |
| Checking if all buckets equal | `all(b == target for b in buckets)` |

---

## Execution Trace Example

**Problem**: Equal Sum Partition - can partition `[1, 5, 11, 5]` into two equal-sum subsets?

**Total** = 22, **Target** = 11

### Step-by-Step: Visual + Code Side-by-Side

| Step | Visual State | Code State | Action |
|------|-------------|------------|--------|
| **1** | Total inheritance = 22, need two heirs with 11 each | `total=22, target=11` | Calculate target |
| **2** | Check if even: 22 is even ✓ | `22 % 2 == 0` | Feasible |
| **3** | Create memo pad for sums 0 to 11 | `dp = [False] * 12` | Initialize DP |
| **4** | Base case: empty set has sum 0 | `dp[0] = True` | Can make sum 0 |
| **5** | Process asset 1: can make sum 1 | `dp[1] = dp[1] or dp[0] = True` | Mark achievable |
| **6** | Process asset 5: can make 5, 6 (1+5) | `dp[5]=True, dp[6]=True` | Update DP |
| **7** | Process asset 11: can make 11 ✓ | `dp[11] = dp[11] or dp[0] = True` | Found target! |
| **8** | Target 11 achievable! | `dp[11] == True` | Can partition |
| **9** | Partition exists: {11} and {1,5,5} | Both sum to 11 | Solution |

**Final Result**: `dp[11] = True` → Can partition into equal sums

**Key Insight**: DP tracks "can make sum s using subset". If `dp[target]` = True, one subset sums to target, other must sum to total - target = target. Equal partition exists.

---

## Pattern Recognition: Code ↔ Visual

### Common Code Patterns in Partition Problems

| Code Pattern | What It Means Visually | When You Use It |
|--------------|------------------------|-----------------|
| `total % 2 != 0: return False` | Odd total can't split equally | Equal sum partition (2-way) |
| `dp[0] = True` | Empty inheritance has sum 0 | DP base case |
| `for s in range(target, num-1, -1):` | Fill memo backward to avoid reuse | Subset sum DP |
| `dp[s] = dp[s] or dp[s-num]` | Can make sum: old way OR include num | DP recurrence |
| `buckets = [0] * k` | K empty buckets for K partitions | K-partition backtracking |
| `if buckets[i] + num <= target:` | Check if adding to bucket valid | Feasibility constraint |
| `buckets[i] += num; backtrack(); buckets[i] -= num` | Try assignment, undo if fails | Choose-Explore-Unchoose |
| `heapq.heappush(heap, (sum + num, i))` | Add to smallest bucket (greedy) | Balanced partition |
| `max(buckets)` | Largest heir's total (minimize this) | Balanced partition goal |

---

## Key Insights

### Insight 1: Three Flavors of Partition
**Visual**: Different fairness criteria
**Code**: Different algorithms

1. **Equal Sum (2-way)**: Exactly two equal-sum subsets
   - **DP**: Subset sum, target = total/2, O(n × total)
   - **Example**: `[1,5,11,5]` → `{11}` and `{1,5,5}`

2. **K Equal Sums**: Exactly K equal-sum subsets
   - **Backtracking**: Try assignments to buckets, O(k^n) worst case
   - **Example**: `[4,3,2,3,5,2,1]` into K=4 buckets of 5 each

3. **Balanced (minimize max)**: Minimize largest partition sum
   - **Greedy**: Sort descending, add to smallest bucket, O(n log n + n log k)
   - **Example**: Minimize max server load

**Why Different**:
- Equal sum = exact, may be impossible
- Balanced = approximate, always possible

### Insight 2: DP Backward Iteration is Critical
**Visual**: Prevent using same asset twice
**Code**: `for s in range(target, num-1, -1):`
**Why**: If forward, `dp[s]` might already include `num`, then `dp[s + num]` counts it again. Backward ensures each item used once per iteration.

**Example**:
```python
# WRONG: Forward iteration
for s in range(num, target + 1):
    dp[s] = dp[s] or dp[s - num]  # May count num twice!

# CORRECT: Backward iteration
for s in range(target, num - 1, -1):
    dp[s] = dp[s] or dp[s - num]  # Each num used once
```

### Insight 3: K-Partition Backtracking Optimizations
**Visual**: Smart bucket assignment to prune faster
**Code**:
1. **Sort descending**: Try largest items first (fail fast)
2. **Skip empty buckets**: If bucket is empty and assignment fails, trying other empty buckets also fails
3. **Target check**: If total % k != 0 or max(nums) > target, impossible

**Pattern**:
```python
nums.sort(reverse=True)  # Optimization 1

for i in range(k):
    if buckets[i] + nums[index] <= target:
        buckets[i] += nums[index]
        if backtrack(index + 1):
            return True
        buckets[i] -= nums[index]

        if buckets[i] == 0:  # Optimization 2
            break  # Skip other empty buckets

return False
```

### Insight 4: Greedy Balanced Partition is Fast Approximation
**Visual**: Always add asset to poorest heir
**Code**: Min heap of bucket sums, always pop smallest, add item, push back
**Why**: Fast O(n log k), good approximation, but not always optimal

**Trade-off**:
- Exact K equal sums: NP-complete (backtracking)
- Balanced (approximate): Polynomial (greedy)

### Insight 5: Impossibility Conditions
**Visual**: When balance scale can never be equal
**Code**:
- **Equal sum**: `total % 2 != 0` (odd total)
- **K equal sums**: `total % k != 0` or `max(nums) > target`

**Why**: If conditions fail, no solution exists. Return False immediately.

---

## Real-World Code Mappings

### Use Case 1: Equal Sum Partition (DP)

**Visual**: Dividing estate into two equal-value groups

| Visual Element | Production Code | System |
|----------------|-----------------|--------|
| Estate assets | `nums = [items]` | Array of values |
| Total value | `sum(nums)` | Total inheritance |
| Target per heir | `target = total // 2` | Goal per partition |
| Memo pad | `dp = [False] * (target + 1)` | DP table |
| Check achievable | `dp[s]` | Can make sum s? |
| Update memo | `dp[s] = dp[s] or dp[s - num]` | Recurrence |

**Code Pattern**:
```python
def canPartition(nums):
    total = sum(nums)
    if total % 2:
        return False

    target = total // 2
    dp = [False] * (target + 1)
    dp[0] = True

    for num in nums:
        for s in range(target, num - 1, -1):
            dp[s] = dp[s] or dp[s - num]

    return dp[target]
```

**Sticky Mapping**: DP tracks achievable sums, backward iteration avoids double-counting

---

### Use Case 2: K Equal Sum Partitions (Backtracking)

**Visual**: Dividing assets into K heirs with equal totals

| Visual Element | Production Code | System |
|----------------|-----------------|--------|
| K heirs | `k` parameter | Number of partitions |
| Heir buckets | `buckets = [0] * k` | Current sum per partition |
| Target per heir | `target = total // k` | Goal per partition |
| Try assignment | `buckets[i] += nums[index]` | Place item in bucket |
| Check overflow | `if buckets[i] + num <= target:` | Feasibility |
| Undo assignment | `buckets[i] -= nums[index]` | Backtrack |

**Code Pattern**:
```python
def canPartitionKSubsets(nums, k):
    total = sum(nums)
    if total % k or max(nums) > total // k:
        return False

    target = total // k
    nums.sort(reverse=True)  # Largest first
    buckets = [0] * k

    def backtrack(index):
        if index == len(nums):
            return all(b == target for b in buckets)

        for i in range(k):
            if buckets[i] + nums[index] <= target:
                buckets[i] += nums[index]

                if backtrack(index + 1):
                    return True

                buckets[i] -= nums[index]

                if buckets[i] == 0:
                    break  # Skip other empty buckets

        return False

    return backtrack(0)
```

**Sticky Mapping**: Try assigning items to buckets, backtrack if exceeds target, skip equivalent empty buckets

---

### Use Case 3: Balanced Partition (Greedy)

**Visual**: Minimize largest heir's total (load balancing)

| Visual Element | Production Code | System |
|----------------|-----------------|--------|
| Sort assets | `nums.sort(reverse=True)` | Largest first |
| Min heap of heirs | `heap = [(0, i) for i in range(k)]` | Track smallest bucket |
| Add to smallest | `heapq.heappop(heap)` | Get minimum |
| Update bucket | `heapq.heappush(heap, (sum + num, i))` | Add item, re-insert |
| Max bucket | `max(s for s, _ in heap)` | Largest partition |

**Code Pattern**:
```python
import heapq

def minimizeMaxSum(nums, k):
    nums.sort(reverse=True)

    # Min heap: (sum, partition_id)
    heap = [(0, i) for i in range(k)]

    for num in nums:
        current_sum, partition_id = heapq.heappop(heap)
        heapq.heappush(heap, (current_sum + num, partition_id))

    # Maximum sum among all partitions
    return max(s for s, _ in heap)
```

**Sticky Mapping**: Greedy: always add asset to poorest heir, minimizes maximum

---

## Common Variations: Same Visual, Different Rules

### Equal Sum Partition (2-Way DP)
**Visual**: Balance scale with two equal sides
**Code**: `dp[target]` where `target = total / 2`
**Complexity**: O(n × sum), pseudo-polynomial
**Example**: Inheritance division, team balancing

### K Equal Sum Partitions (Backtracking)
**Visual**: K buckets, all must reach same total
**Code**: Backtracking with buckets, target = total / k
**Complexity**: O(k^n) worst case, NP-complete
**Example**: Fair task assignment, balanced teams

### Balanced Partition (Greedy Minimize Max)
**Visual**: K buckets, minimize largest bucket
**Code**: Sort + min heap greedy assignment
**Complexity**: O(n log n + n log k), polynomial
**Example**: Load balancing, server job distribution

### Subset Sum Equals K
**Visual**: Find subset with exact sum K (not necessarily total/2)
**Code**: `dp[K]` tracks if K achievable
**Complexity**: O(n × K), pseudo-polynomial
**Example**: Change-making, target sum problems

---

## Self-Check: Do You Have Sticky Understanding?

### Test 1: Code → Visual
See this code:
```python
total = sum(nums)
if total % 2:
    return False
target = total // 2
dp = [False] * (target + 1)
dp[0] = True
for num in nums:
    for s in range(target, num - 1, -1):
        dp[s] = dp[s] or dp[s - num]
return dp[target]
```

**Can you visualize?**
"Calculate total inheritance. If odd, can't balance scale. Target is half. Memo pad tracks achievable sums. For each asset, check backward if adding it makes new sums. Return if target sum achievable (can split equally)."

### Test 2: Visual → Code
Imagine: "Load balancer distributing jobs to K servers, always assigning next job to least loaded server (greedy), minimizing max server load."

**Can you write the code?**
```python
import heapq

def balance_load(jobs, k):
    jobs.sort(reverse=True)  # Largest jobs first
    heap = [(0, i) for i in range(k)]  # (load, server_id)

    for job in jobs:
        load, server = heapq.heappop(heap)
        heapq.heappush(heap, (load + job, server))

    return max(load for load, _ in heap)
```

### Test 3: Explain Why
**Question**: Why do we iterate backward (`for s in range(target, num-1, -1)`) in equal sum partition DP?

**Answer**: To ensure each item is considered only once per DP update. If we iterate forward, `dp[s]` might already include the current `num`, then updating `dp[s + num]` would count `num` twice. Backward iteration ensures we use the "old" values of `dp` (without current `num`) when computing new values, simulating 0/1 choice (include or exclude item).

---

## The Stickiest Mapping

**Core Visual**: Dividing inheritance into fair groups - equal sums (exact), K equal sums (backtracking), or balanced (greedy).

**Core Code**:
- **Equal sum**: DP subset sum with `target = total/2`, backward iteration
- **K equal sums**: Backtracking with buckets, target per bucket, pruning
- **Balanced**: Greedy sort + min heap, always add to smallest

**Core Insight**:
- Partition = divide items into groups
- Equal (exact) → DP or backtracking (may be impossible)
- Balanced (approximate) → Greedy (always possible, fast)
- Check impossibility early (odd total, total % k != 0, max > target)

**When you see partition code, you now see inheritance being divided among heirs. When you imagine fair division, you know exactly what code to write.**

**The connection is permanent!**

---

## Next Steps

1. **Trace equal sum partition** with DP table filling backward
2. **Trace K-partition backtracking** with bucket assignments
3. **Trace greedy balancing** with min heap and load distribution
4. **Solve a partition problem** by choosing DP vs backtracking vs greedy
5. **Teach someone else** - that's when it truly sticks!

**Time investment**: 2-3 hours
**Return**: Deep, intuitive understanding that lasts years

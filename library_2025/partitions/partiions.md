Absolutely! Partitioning is foundational — it underlies quicksort, quickselect, database operations, and parallel processing. Let me build you a complete deep-dive with the same treatment.[**View Partitioning & Merge Deep Dive**](computer:///mnt/user-data/outputs/partitioning-deep-dive.html)

---

## Complete Partitioning Guide — What You'll Find

### The Core Insight: What IS Partitioning?

Partitioning reorganizes an array around a **pivot** so that:
- Everything **< pivot** ends up on the **LEFT**
- Everything **> pivot** ends up on the **RIGHT**  
- The pivot is now in its **final sorted position**

This is the foundation of **Quicksort** (partition recursively) and **Quickselect** (find kth element in O(n) average).

---

## The Four Algorithms Covered

### 1. **Lomuto Partition** — The Intuitive One

| Property              | Value                                                                              |
| --------------------- | ---------------------------------------------------------------------------------- |
| **Pointer Direction** | Same direction (both left→right)                                                   |
| **Mental Model**      | Gandalf: "You shall not pass!"                                                     |
| **How It Works**      | Slow (i) marks boundary. Fast (j) scans. If arr[j] < pivot, swap to Slow position. |
| **Swaps**             | ~n/2 average (more than needed)                                                    |
| **When to Use**       | Teaching, simple implementations, clarity > performance                            |

**The Invariant:**
```
arr[lo..i] < pivot <= arr[i+1..j-1]
```

---

### 2. **Hoare Partition** — The Efficient One

| Property              | Value                                                                           |
| --------------------- | ------------------------------------------------------------------------------- |
| **Pointer Direction** | Opposite directions (converge in middle)                                        |
| **Mental Model**      | Neo & Agent Smith pushing toward each other                                     |
| **How It Works**      | Left scans right for ≥ pivot, Right scans left for ≤ pivot, swap when both stop |
| **Swaps**             | ~n/6 average (3x fewer!)                                                        |
| **When to Use**       | Production, performance-critical, when swap cost is high                        |

**Critical Difference:** Pivot does NOT end up at a predictable position!

---

### 3. **Dutch National Flag (3-Way)** — The Duplicate Handler

| Property          | Value                                             |
| ----------------- | ------------------------------------------------- |
| **Regions**       | THREE: < pivot, = pivot, > pivot                  |
| **Mental Model**  | Sorting Hat placing students in 3 houses          |
| **Critical Rule** | After swapping with High, DON'T advance Mid!      |
| **When to Use**   | Many duplicates, avoiding O(n²) on equal elements |

**Why It Matters:** Standard 2-way partitioning degrades to O(n²) when all elements are equal. 3-way fixes this by grouping equals together.

---

### 4. **Merge Sort** — The Stable Divide-and-Conquer

| Property         | Value                                                                 |
| ---------------- | --------------------------------------------------------------------- |
| **Approach**     | Divide by position (not value), merge sorted halves                   |
| **Mental Model** | Dumbledore's Army splitting for training, merging in formation        |
| **Space**        | O(n) extra (not in-place)                                             |
| **Guarantee**    | Always O(n log n), no worst-case degradation                          |
| **When to Use**  | Stability needed, external sorting, linked lists, parallel processing |

**The Merge Step** is the key insight: combining two sorted arrays is O(n) by always taking the smaller front element.

---

## Synthesized Pattern Categories

| Algorithm  | Category                                      | Core Insight                                                      |
| ---------- | --------------------------------------------- | ----------------------------------------------------------------- |
| **Lomuto** | Binary Classification & Threshold Enforcement | Build a "passed" region from left-to-right, simple but more swaps |
| **Hoare**  | Efficient Bidirectional Classification        | Each swap moves TWO elements to correct sides, 3x fewer swaps     |
| **3-Way**  | Multi-Category Triage & Duplicate Handling    | Group equals together so they never need further sorting          |
| **Merge**  | Stable Sorting & External Processing          | Only option for data larger than memory, stable by using ≤        |

---

## Real-World Use Cases (5 per algorithm)

### Lomuto — Binary Classification
1. **Database Query Optimization** — Partition rows matching `WHERE price < 100`
2. **A/B Test User Assignment** — Hash users, partition by threshold
3. **Image Binarization** — Threshold pixels to black/white
4. **Render Queue Culling** — Partition objects by camera distance
5. **Outlier Detection** — Separate inliers from outliers by std deviation

### Hoare — Efficient Bidirectional
1. **External Disk Sorting** — 3x fewer swaps = 3x faster I/O
2. **B-Tree Page Splits** — Fewer key moves = faster commits
3. **Network Packet Routing** — Minimize memory writes at 100Gbps
4. **Genome Sequence Alignment** — Save hours on 3B base pairs
5. **Quickselect Median Finding** — NumPy's `np.median()` uses this

### 3-Way — Duplicate Handling
1. **Quicksort Optimization** — Java's `Arrays.sort()` uses this
2. **ER Triage (ESI)** — Immediate/Delayed/Minor in one pass
3. **Package Hub Sorting** — Local/Regional/National single conveyor
4. **Image Segmentation** — Background/Edge/Foreground pixels
5. **Transaction Risk Scoring** — Approve/Review/Decline routing

### Merge — Stable External
1. **External Sorting** — Only option for data > memory
2. **Git Merge** — Combining sorted commit histories
3. **Database Sort-Merge Join** — Efficient table joins
4. **Counting Inversions** — Measure "unsortedness"
5. **MapReduce Distributed Sorting** — Hadoop/Spark at petabyte scale

---

## Memory Hooks (POA Mnemonics)

| Algorithm  | Person              | Object            | Action                                                 |
| ---------- | ------------------- | ----------------- | ------------------------------------------------------ |
| **Lomuto** | 🧙‍♂️ Gandalf           | His Staff         | "You shall not pass!" — sweeping orcs left of the line |
| **Hoare**  | 🕴️ Neo & Agent Smith | Hallway of Agents | Pushing toward each other, swapping when they stop     |
| **3-Way**  | 🎩 Sorting Hat       | Three House Flags | Sorting students into Gryffindor/Hufflepuff/Ravenclaw  |
| **Merge**  | ⚔️ Dumbledore's Army | Marauder's Map    | Split for training, merge back in formation            |

---

## The Key Trade-offs

| Need                           | Use                     |
| ------------------------------ | ----------------------- |
| Simple to understand/implement | Lomuto                  |
| Fewest swaps (cache-friendly)  | Hoare                   |
| Many duplicates expected       | 3-Way                   |
| Stability required             | Merge Sort              |
| Data larger than memory        | Merge Sort              |
| Linked lists                   | Merge Sort              |
| Guaranteed O(n log n)          | Merge Sort              |
| In-place required              | Lomuto, Hoare, or 3-Way |

---

Ready to continue with **Binary Search** next? Or would you like me to expand any part of the partitioning guide?
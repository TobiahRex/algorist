# Pattern Library - Master Algorithmic Thinking Through Internal Monologue

*Reverse-engineering expertise: Learning by observing how senior engineers think through patterns*

---

## The 4-Stage Mental Pipeline

Every pattern follows the same cognitive progression:

1. **Problem → Pattern** (Recognition): What triggers map problem keywords to this pattern?
2. **Pattern → Structure** (What do I need?): What data structures, pointers, state variables?
3. **Structure → Behavior** (How does it move?): What are the movement rules, invariants, termination conditions?
4. **Behavior → Code** (Expression): Verbose form first (proof of understanding), then terse form (interview ready)

---

## 📚 Pattern Files (29 Total)

### 📏 LINEAR STRUCTURES (8 patterns)

| # | Pattern | Description | Status |
|---|---------|-------------|--------|
| 01 | [Sliding Window](./01-sliding-window.md) | Contiguous subsequence optimization | ✅ COMPLETE |
| 02 | [Two Pointers](./02-two-pointers.md) | Sorted input, pairs/triplets | ✅ COMPLETE |
| 03 | [Fast & Slow Pointers](./03-fast-slow-pointers.md) | Cycle detection | ✅ COMPLETE |
| 04 | [Merge Intervals](./04-merge-intervals.md) | Overlapping ranges | ✅ COMPLETE |
| 05 | [Cyclic Sort](./05-cyclic-sort.md) | [1..n] in-place sorting | ✅ COMPLETE |
| 06 | [Monotonic Stack](./06-monotonic-stack.md) | Next greater/smaller | ✅ COMPLETE |
| 07 | [Prefix Sum](./07-prefix-sum.md) | Static range queries | ✅ COMPLETE |
| 08 | [Line Sweep](./08-line-sweep.md) | Event-based intervals | ✅ COMPLETE |

### 🌳 TREES & GRAPHS (7 patterns)

| # | Pattern | Description | Status |
|---|---------|-------------|--------|
| 09 | [Tree Traversals](./09-tree-traversals.md) | Pre/In/Post-Order DFS | ✅ COMPLETE |
| 10 | [BFS](./10-bfs.md) | Level-order, shortest path | ✅ COMPLETE |
| 11 | [DFS](./11-dfs.md) | Exhaustive search | ✅ COMPLETE |
| 12 | [Topological Sort](./12-topological-sort.md) | DAG ordering | ✅ COMPLETE |
| 13 | [Union Find](./13-union-find.md) | Connected components | ✅ COMPLETE |
| 14 | [Trie](./14-trie.md) | Prefix matching | ✅ COMPLETE |
| 15 | [Shortest Path](./15-shortest-path.md) | Dijkstra, Bellman-Ford | ✅ COMPLETE |

### 🎯 SELECTION & SEARCH (3 patterns)

| # | Pattern | Description | Status |
|---|---------|-------------|--------|
| 16 | [Binary Search](./16-binary-search.md) | Sorted data O(log n) | ✅ COMPLETE |
| 17 | [Top K / Heap](./17-top-k-heap.md) | Priority, streaming | ✅ COMPLETE |
| 18 | [K-way Merge](./18-k-way-merge.md) | Sorted lists merge | ✅ COMPLETE |

### 🔀 COMBINATORIAL & OPTIMIZATION (6 patterns)

| # | Pattern | Description | Status |
|---|---------|-------------|--------|
| 19 | [Backtracking](./19-backtracking.md) | Exhaustive + pruning | ✅ COMPLETE |
| 20 | [Dynamic Programming](./20-dynamic-programming.md) | Overlapping subproblems | ✅ COMPLETE |
| 21 | [Greedy](./21-greedy.md) | Local → global optimal | ✅ COMPLETE |
| 22 | [Branch & Bound](./22-branch-and-bound.md) | Optimization + pruning | ✅ COMPLETE |
| 23 | [Constraint Satisfaction](./23-constraint-satisfaction.md) | Variables + domains | ✅ COMPLETE |
| 24 | [Partitions](./24-partitions.md) | Equal sum splits | ✅ COMPLETE |

### 🔧 ADVANCED TECHNIQUES (2 patterns)

| # | Pattern | Description | Status |
|---|---------|-------------|--------|
| 25 | [Bit Manipulation](./25-bit-manipulation.md) | Bitwise operations | ✅ COMPLETE |
| 26 | [String Matching](./26-string-matching.md) | KMP, Rabin-Karp | ✅ COMPLETE |

### 📊 ADVANCED DATA STRUCTURES (3 patterns)

| # | Pattern | Description | Status |
|---|---------|-------------|--------|
| 27 | [Segment Tree](./27-segment-tree.md) | Range queries + updates | ✅ COMPLETE |
| 28 | [Fenwick Tree](./28-fenwick-tree.md) | Prefix sums + updates | ✅ COMPLETE |
| 29 | [Suffix Array](./29-suffix-array.md) | Substring matching | ✅ COMPLETE |

---

## 🎓 How to Use This Library

### For Learning a New Pattern
1. **Read the pattern file** (01-29) to activate the mental model
2. **Focus on Internal Monologue section** - how to think through problems
3. **Study Thought Narratives** - solving problems as if first time
4. **Practice LeetCode problems** from the pattern file (organized by difficulty)

### For Interview Prep
1. **Review Self-Check questions** at top of each pattern
2. **Study Interview Communication Template** - what to say in interviews
3. **Practice Decision Trees** - 5-second pattern recognition
4. **Solve Medium → Hard problems** from LeetCode tables

### For Review
1. **Check Self-Check questions only** - if all checked, skip to next pattern
2. **If any unchecked** - re-read relevant sections
3. **Test yourself**: Can you explain structure + behavior in plain language?

### When Stuck on a Problem
1. **Read pattern keywords** in problem description
2. **Use Decision Trees** to identify the right pattern
3. **Open that pattern file** and read Thought Narratives
4. **Apply the 4-Stage Pipeline** to think through the solution

---

## 🧠 Philosophy

> "Code is just the expression of structure and behavior. If I can't articulate the structure (what exists) and behavior (how it moves) in plain language, I don't understand the pattern—I'm just copying syntax."

**The goal**: **Internalize the thinking process**, not just code templates.

**What makes this different**:
- ❌ Not just code templates
- ❌ Not just problem lists
- ✅ **Thought narratives** - how senior engineers think
- ✅ **Internal monologue** - the self-talk during problem-solving
- ✅ **Pattern recognition** - 5-second trigger mapping
- ✅ **Interview communication** - what to say out loud

---

## 🗺️ Pattern Concept Tree

A visual mental model of how patterns relate:

```mermaid
graph TB
    Root["Algorithmic Patterns<br/>(29 patterns)"]

    subgraph Linear["📏 LINEAR STRUCTURES (8)"]
        SW["01. Sliding Window"]
        TP["02. Two Pointers"]
        FSP["03. Fast & Slow"]
        MI["04. Merge Intervals"]
        CS["05. Cyclic Sort"]
        MS["06. Monotonic Stack"]
        PS["07. Prefix Sum"]
        LS["08. Line Sweep"]
    end

    subgraph TreesGraphs["🌳 TREES & GRAPHS (7)"]
        TT["09. Tree Traversals"]
        BFS["10. BFS"]
        DFS["11. DFS"]
        Topo["12. Topological Sort"]
        UF["13. Union Find"]
        Trie["14. Trie"]
        SP["15. Shortest Path"]
    end

    subgraph Selection["🎯 SELECTION & SEARCH (3)"]
        BS["16. Binary Search"]
        Heap["17. Top K / Heap"]
        KM["18. K-way Merge"]
    end

    subgraph Combo["🔀 COMBINATORIAL (6)"]
        Back["19. Backtracking"]
        DP["20. Dynamic Programming"]
        Greedy["21. Greedy"]
        BB["22. Branch & Bound"]
        CSP["23. Constraint Satisfaction"]
        Part["24. Partitions"]
    end

    subgraph Advanced["🔧 ADVANCED (5)"]
        Bit["25. Bit Manipulation"]
        SM["26. String Matching"]
        SegTree["27. Segment Tree"]
        Fenwick["28. Fenwick Tree"]
        Suffix["29. Suffix Array"]
    end

    Root --> Linear
    Root --> TreesGraphs
    Root --> Selection
    Root --> Combo
    Root --> Advanced

    style Root fill:#4a1942,stroke:#f472b6,stroke-width:3px,color:#e0e0e0
    style SW fill:#1e3a5f,stroke:#22d3ee,stroke-width:2px,color:#e0e0e0
    style TP fill:#1e3a5f,stroke:#22d3ee,stroke-width:2px,color:#e0e0e0
    style SegTree fill:#1a4a3a,stroke:#4ade80,stroke-width:3px,color:#e0e0e0
    style Fenwick fill:#1a4a3a,stroke:#4ade80,stroke-width:3px,color:#e0e0e0
    style Suffix fill:#1a4a3a,stroke:#4ade80,stroke-width:3px,color:#e0e0e0
```

---

## 🔍 Decision Tree: Which Pattern to Use?

**Use this for 5-second pattern recognition:**

```mermaid
flowchart TD
    Start{Problem Type?}

    Start -->|Array/String| Array
    Start -->|Tree/Graph| Graph
    Start -->|Optimization| Opt
    Start -->|Range Queries| Range

    Array{Array Pattern?}
    Array -->|Contiguous subarray| SW["01. Sliding Window"]
    Array -->|Two elements, sorted| TP["02. Two Pointers"]
    Array -->|Overlapping intervals| MI["04. Merge Intervals"]
    Array -->|Numbers [1..n]| CS["05. Cyclic Sort"]
    Array -->|Next greater/smaller| MS["06. Monotonic Stack"]
    Array -->|Cumulative sums| PS["07. Prefix Sum"]

    Graph{Graph Pattern?}
    Graph -->|Level-by-level| BFS["10. BFS"]
    Graph -->|All paths| DFS["11. DFS"]
    Graph -->|DAG dependencies| Topo["12. Topological Sort"]
    Graph -->|Connected components| UF["13. Union Find"]
    Graph -->|Shortest path| SP["15. Dijkstra/Bellman-Ford"]
    Graph -->|Prefix strings| Trie["14. Trie"]

    Opt{Optimization Type?}
    Opt -->|Generate all| Back["19. Backtracking"]
    Opt -->|Overlapping subproblems| DP["20. Dynamic Programming"]
    Opt -->|Local → Global optimal| Greedy["21. Greedy"]
    Opt -->|Discrete optimization| BB["22. Branch & Bound"]
    Opt -->|Variables + Constraints| CSP["23. Constraint Satisfaction"]
    Opt -->|Equal sum groups| Part["24. Partitions"]

    Range{Update Pattern?}
    Range -->|Static array| PS["07. Prefix Sum"]
    Range -->|Point updates + range sum| Fenwick["28. Fenwick Tree"]
    Range -->|Range updates + any op| SegTree["27. Segment Tree"]
    Range -->|Pattern matching| Suffix["29. Suffix Array"]

    style Start fill:#4a1942,stroke:#f472b6,stroke-width:3px,color:#e0e0e0
    style SW fill:#1a4a3a,stroke:#4ade80,stroke-width:2px,color:#e0e0e0
    style SegTree fill:#1a4a3a,stroke:#4ade80,stroke-width:3px,color:#e0e0e0
    style Fenwick fill:#1a4a3a,stroke:#4ade80,stroke-width:3px,color:#e0e0e0
    style Suffix fill:#1a4a3a,stroke:#4ade80,stroke-width:3px,color:#e0e0e0
```

---

## 🔗 Pattern Relationships

**How patterns build on each other:**

```mermaid
graph LR
    subgraph Foundation["Foundation Patterns"]
        TP["02. Two Pointers"]
        BS["16. Binary Search"]
        DFS["11. DFS"]
    end

    subgraph Derived["Derived Patterns"]
        SW["01. Sliding Window<br/>(extends Two Pointers)"]
        Back["19. Backtracking<br/>(extends DFS)"]
        DP["20. DP<br/>(memoized recursion)"]
    end

    subgraph RangeQueries["Range Query Evolution"]
        PS["07. Prefix Sum<br/>(static)"]
        Fenwick["28. Fenwick Tree<br/>(prefix sums + updates)"]
        SegTree["27. Segment Tree<br/>(any operation + updates)"]
    end

    subgraph StringOps["String Pattern Matching"]
        Naive["Naive O(nm)"]
        KMP["26. KMP O(n+m)"]
        Suffix["29. Suffix Array<br/>(multiple patterns)"]
    end

    TP --> SW
    DFS --> Back
    Back --> DP

    PS --> Fenwick
    Fenwick -.->|More general| SegTree
    PS -.->|No updates| SegTree

    Naive --> KMP
    KMP -.->|Many queries| Suffix

    style PS fill:#4a3a0a,stroke:#fbbf24,stroke-width:2px,color:#e0e0e0
    style Fenwick fill:#1a4a3a,stroke:#4ade80,stroke-width:3px,color:#e0e0e0
    style SegTree fill:#1a4a3a,stroke:#4ade80,stroke-width:3px,color:#e0e0e0
    style Suffix fill:#1a4a3a,stroke:#4ade80,stroke-width:3px,color:#e0e0e0
```

---

## 📊 Decision Matrices

### Range Query Structures: When to Use What

| Feature | Prefix Sum | Fenwick Tree | Segment Tree |
|---------|------------|--------------|--------------|
| Point Update | ❌ O(n) | ✅ O(log n) | ✅ O(log n) |
| Range Update | ❌ | ❌ | ✅ O(log n) w/ lazy |
| Range Sum Query | ✅ O(1) | ✅ O(log n) | ✅ O(log n) |
| Range Min/Max Query | ❌ | ❌ | ✅ O(log n) |
| Arbitrary Associative Op | ❌ | ❌ | ✅ O(log n) |
| Space Complexity | O(n) | O(n) | O(4n) |
| Code Complexity | Simple | Medium | Complex |
| **Use When** | Read-only | Prefix sums + updates | Any range op + updates |
| **Pattern #** | [07](./07-prefix-sum.md) | [28](./28-fenwick-tree.md) | [27](./27-segment-tree.md) |

### String Pattern Structures: When to Use What

| Feature | Trie | Suffix Array | KMP |
|---------|------|--------------|-----|
| Multiple Patterns | ✅ Prefixes | ✅ Substrings | ❌ Single |
| Build Time | O(total chars) | O(n log n) | O(m) |
| Query Time | O(m) | O(m log n) | O(n) |
| Space | O(alphabet × nodes) | O(n) | O(m) |
| **Use When** | Autocomplete, prefix match | Many substring queries | One-time search |
| **Pattern #** | [14](./14-trie.md) | [29](./29-suffix-array.md) | [26](./26-string-matching.md) |

---

## 🚀 Quick Reference

**Pattern by Number**: [01](./01-sliding-window.md) · [02](./02-two-pointers.md) · [03](./03-fast-slow-pointers.md) · [04](./04-merge-intervals.md) · [05](./05-cyclic-sort.md) · [06](./06-monotonic-stack.md) · [07](./07-prefix-sum.md) · [08](./08-line-sweep.md) · [09](./09-tree-traversals.md) · [10](./10-bfs.md) · [11](./11-dfs.md) · [12](./12-topological-sort.md) · [13](./13-union-find.md) · [14](./14-trie.md) · [15](./15-shortest-path.md) · [16](./16-binary-search.md) · [17](./17-top-k-heap.md) · [18](./18-k-way-merge.md) · [19](./19-backtracking.md) · [20](./20-dynamic-programming.md) · [21](./21-greedy.md) · [22](./22-branch-and-bound.md) · [23](./23-constraint-satisfaction.md) · [24](./24-partitions.md) · [25](./25-bit-manipulation.md) · [26](./26-string-matching.md) · [27](./27-segment-tree.md) · [28](./28-fenwick-tree.md) · [29](./29-suffix-array.md)

**By Category**:
- 📏 **Linear**: [01-08](./01-sliding-window.md)
- 🌳 **Trees & Graphs**: [09-15](./09-tree-traversals.md)
- 🎯 **Search**: [16-18](./16-binary-search.md)
- 🔀 **Combinatorial**: [19-24](./19-backtracking.md)
- 🔧 **Advanced**: [25-29](./25-bit-manipulation.md)

---

## 🧭 Navigation

**↑ Back**: [Library 2025](../../README.md)

**→ Related**:
- [Learning Methodology](../overview/learning-methodology.html) - How to study
- [Visual Shapes](../shapes/) - Core algorithm shapes
- [Applications](../../applications/) - Multi-pattern projects

**⚡ Start Learning**: [01. Sliding Window](./01-sliding-window.md)

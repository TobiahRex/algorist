# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Algorist** is a personal algorithm and data structures study repository focused on understanding real-world applications of DSA concepts rather than just passing interviews. The repository emphasizes:

- **Memory Palace Framework**: Using spatial memorization techniques (mermaid diagrams, visualizations)
- **Person-Object-Action (POA) Mnemonics**: Creating memorable associations for algorithms
- **Pattern Mapping**: Connecting problem structures to algorithm patterns
- **Real-World Applications**: Mapping theory to practical engineering challenges

The repo blends multiple learning methodologies across different codebases structured by year and topic.

## Repository Structure

### Core Directories

- **`library_2025/CORE/`**: Current, well-organized pattern-based learning system
  - **`patterns/`**: 29 algorithmic patterns with mental models (01-29)
    - Mental models and 4-stage thinking pipeline
    - Mermaid diagrams and decision trees
    - LeetCode problem tables
    - Real-world use cases
  - **`applications/`**: Multi-pattern production implementations
    - `scheduling/`: Weighted intervals, task dependencies, EDF, interval partitioning
    - `constraint-satisfaction/`: N-Queens, Sudoku, graph coloring, AC-3
    - `partitions/`: Subset sum, equal partition, K-partition, balanced partition
    - `optimization/`: TSP B&B, Knapsack B&B, job scheduling, combinations

- **`library_2025/`** (legacy subdirectories - being phased out):
  - `graph_algos/`: Graph algorithms (DFS, BFS, shortest paths, MST, cycle detection, network flow)
  - `dp/`: Dynamic programming examples
  - `backtracking_greedy/`: Backtracking and greedy algorithm patterns
  - `sorting/`: Sorting implementations
  - `trees/`: Tree-based algorithms and data structures

- **`library_2022/`**: Legacy organized study materials (being deprecated)
  - `graphs/`: Graph theory concepts and techniques
  - `arrays/`: Array manipulation problems (sorted arrays, two-pointer patterns, etc.)
  - `recursion/`: Recursive patterns and backtracking
  - `trees/`: Tree traversals and problems
  - `mathematics/`: Number theory and mathematical algorithms

- **`algorist-toolbox/`**: Jupyter notebooks and Python scripts (being deprecated)
  - Recursion patterns (subsets, combinations, n-queens, backtracking)
  - Tree problems and traversals
  - Binary trees and BST implementations
  - Graph complexity analysis
  - Interactive learning notebooks

- **`behavior_patterns/optimizations/`**: Complex algorithm implementations (migrated to applications/)
  - Scheduling algorithms (now in `CORE/applications/scheduling/`)
  - CSP and graph coloring (now in `CORE/applications/constraint-satisfaction/`)
  - Partitions (now in `CORE/applications/partitions/`)
  - Branch & bound (now in `CORE/applications/optimization/`)

## Development Commands

### JavaScript/Node Projects

```bash
# Install dependencies (uses yarn)
yarn install

# Run tests
npm test

# Run specific test file
npm test -- path/to/test.js

# Lint code (ESLint configured for TypeScript/JavaScript)
npm run lint  # if available, otherwise: npx eslint .
```

### Python Projects

```bash
# library_2025 implementations (Python 3)
python library_2025/graph_algos/path_finding/dijkstra/dijkstra.py

# Run Jupyter notebooks in algorist-toolbox/
jupyter notebook

# Test individual Python files
python -m pytest library_2025/  # if pytest available
python path/to/file.py
```

### Note on Testing

- Jest is configured for JavaScript testing (see `package.json`)
- Most Python files are standalone implementations (no structured test suite currently)
- Jupyter notebooks in `algorist-toolbox/` serve as interactive test/exploration environments

## Code Architecture & Patterns

### Algorithm Organization Philosophy

**By Category Priority** (library_2025):
1. **Category 1**: BFS, DFS, basic Sorting
2. **Category 2**: Binary Search, DP, Greedy, Hash Maps/Sets
3. **Category 3**: BST, Fenwick Trees, Union Find, Heaps
4. **Category 4**: Bitwise operations, Game Theory, Shortest Paths
5. **Category 5**: Convex Hull, MST, Strongly Connected Components
6. **Category 6**: FFT, Max Flow

### Pattern Recognition Framework

**29 Algorithmic Patterns** organized by category in `library_2025/CORE/patterns/`:

**Linear Structures (01-08)**:
- **01. Sliding Window**: Contiguous subarray optimization
- **02. Two Pointers**: Sorted input, pairs/triplets
- **03. Fast & Slow Pointers**: Cycle detection
- **04. Merge Intervals**: Overlapping ranges
- **05. Cyclic Sort**: [1..n] in-place sorting
- **06. Monotonic Stack**: Next greater/smaller
- **07. Prefix Sum**: Static range queries
- **08. Line Sweep**: Event-based intervals

**Trees & Graphs (09-15)**:
- **09. Tree Traversals**: Pre/In/Post-Order DFS
- **10. BFS**: Level-order, shortest path
- **11. DFS**: Exhaustive search
- **12. Topological Sort**: DAG ordering
- **13. Union Find**: Connected components
- **14. Trie**: Prefix matching
- **15. Shortest Path**: Dijkstra, Bellman-Ford

**Selection & Search (16-18)**:
- **16. Binary Search**: Sorted data O(log n)
- **17. Top K / Heap**: Priority, streaming
- **18. K-way Merge**: Sorted lists merge

**Combinatorial & Optimization (19-24)**:
- **19. Backtracking**: Exhaustive + pruning
- **20. Dynamic Programming**: Overlapping subproblems
- **21. Greedy**: Local → global optimal
- **22. Branch & Bound**: Optimization + pruning
- **23. Constraint Satisfaction**: Variables + domains
- **24. Partitions**: Equal sum splits

**Advanced Techniques & Data Structures (25-29)**:
- **25. Bit Manipulation**: Bitwise operations
- **26. String Matching**: KMP, Rabin-Karp
- **27. Segment Tree**: Range queries + updates
- **28. Fenwick Tree**: Prefix sums + updates
- **29. Suffix Array**: Substring matching

**Pattern Recognition Triggers**:
- Contiguous subarray → Sliding Window (01)
- Sorted array + pair → Two Pointers (02)
- Overlapping intervals → Merge Intervals (04)
- Graph dependencies → Topological Sort (12)
- Overlapping subproblems → DP (20)
- Local optimal → global → Greedy (21)
- Variables + constraints → CSP (23)

### Implementation Conventions

**Graph Representations**:
- Adjacency list (most common): `{node: [neighbors]}`
- Edge list for specific algorithms (MST, network flow)

**Python Type Hints**:
- Files in `library_2025/` use Python 3 type hints (e.g., `def solve(graph: List[List[int]]) -> int`)
- `algorist-toolbox/` uses type hints but less consistently

**Naming Conventions**:
- Algorithm files follow pattern: `algorithm_name.py`
- Test/practice notebooks prefix with `ip-` (in-progress), `td-` (to-do), or test function name
- Tree/graph classes use PascalCase: `TreeNode`, `GraphNode`

## Key Files & References

| Purpose | Location |
|---------|----------|
| **Pattern Library** | `library_2025/CORE/patterns/README.md` |
| Sliding Window pattern | `library_2025/CORE/patterns/01-sliding-window.md` |
| Two Pointers pattern | `library_2025/CORE/patterns/02-two-pointers.md` |
| Merge Intervals pattern | `library_2025/CORE/patterns/04-merge-intervals.md` |
| Binary Search pattern | `library_2025/CORE/patterns/16-binary-search.md` |
| Backtracking pattern | `library_2025/CORE/patterns/19-backtracking.md` |
| Dynamic Programming pattern | `library_2025/CORE/patterns/20-dynamic-programming.md` |
| Greedy pattern | `library_2025/CORE/patterns/21-greedy.md` |
| **Applications Library** | `library_2025/CORE/applications/README.md` |
| Scheduling algorithms | `library_2025/CORE/applications/scheduling/` |
| Task dependencies (Topological Sort + CPM) | `library_2025/CORE/applications/scheduling/task_dependencies.py` |
| Weighted intervals (DP + Binary Search) | `library_2025/CORE/applications/scheduling/weighted_intervals.py` |
| N-Queens, Sudoku (CSP + Backtracking) | `library_2025/CORE/applications/constraint-satisfaction/` |
| Partition problems (DP + Backtracking) | `library_2025/CORE/applications/partitions/` |
| TSP, Knapsack (Branch & Bound) | `library_2025/CORE/applications/optimization/` |
| **Legacy** | |
| Graph algorithms reference | `library_2025/graph_algos/` |
| Dijkstra's algorithm | `library_2025/graph_algos/path_finding/dijkstra/dijkstra.py` |
| Minimum Spanning Tree | `library_2025/graph_algos/min_spanning_tree/min_spanning_tree.py` |
| Binary tree implementation | `algorist-toolbox/binary_tree.py` |
| Tree traversals | `algorist-toolbox/ip-TREES_traversals.ipynb` |

## Learning Resources

### Current Learning System (2025)

**Primary Resource**: `library_2025/CORE/` (Patterns + Applications)

**Learning Path**:
1. **Patterns First** (01-29): Study individual algorithmic patterns
   - Each pattern file includes: mental model, 4-stage pipeline, decision trees, LeetCode problems
   - Start with Linear Structures (01-08), then Trees & Graphs (09-15)
   - Move to Combinatorial (19-24), then Advanced (25-29)

2. **Applications Second**: See how patterns combine in production systems
   - `scheduling/`: Greedy + DP + Graphs
   - `constraint-satisfaction/`: Backtracking + CSP + Heuristics
   - `partitions/`: DP + Backtracking
   - `optimization/`: Branch & Bound + DP + Greedy

3. **Practice**: LeetCode problems organized by pattern (listed in each pattern file)

**Philosophy**:
- **Patterns** = How to THINK (recognition, mental models, decision making)
- **Applications** = How to BUILD (production systems, pattern combinations)

### Legacy Curriculum Structure (being phased out)

- **Week 1**: Graph traversal (BFS/DFS) + Sorting + Binary Search
- **Week 2**: DP, Greedy, Heaps, Linked Lists, Topological Sort
- **Week 3**: BST, Union Find, String algorithms, Two pointers, Bitwise ops, Shortest paths
- **Week 4**: Convex Hull, MST, SCC, FFT, Max Flow

See `library_2025/README.md` for detailed curriculum breakdown with daily session structure and POA mnemonics.

### Study Pattern (Current - Pattern-Based)

1. **Choose a pattern** from `CORE/patterns/` (01-29)
2. **Read the pattern file**:
   - Self-check questions (can I recognize this pattern?)
   - Mental model and 4-stage pipeline
   - Thought narratives (internal dialogue)
   - Decision trees and visual models
3. **Practice LeetCode** problems from the pattern's table
4. **Study applications** that use this pattern (cross-referenced in pattern file)
5. **Implement** production version from applications/ if relevant

### Study Pattern (Legacy)

1. Read conceptual overview and POA (Person-Object-Action) totem
2. Study pattern recognition examples
3. Implement algorithm from scratch
4. Solve LeetCode problems using the pattern
5. Map to real-world applications

## Common Tasks

### Add a New Pattern

1. Create pattern file in `library_2025/CORE/patterns/` using `PATTERN_TEMPLATE.md` as guide
2. Include: mental model, 4-stage pipeline, decision trees, LeetCode problems, real-world uses
3. Update `patterns/README.md` with pattern entry and cross-references
4. If complex multi-pattern, consider adding to `applications/` instead

### Add a New Application

1. Create subdirectory in `library_2025/CORE/applications/`
2. Add production implementations with mental model comments
3. Create comprehensive README explaining which patterns combine
4. Include real-world use cases and system diagrams
5. Update `applications/README.md` with links

### Study a Specific Topic (Current Approach)

1. **Find the pattern**: Check `library_2025/CORE/patterns/README.md` decision tree
2. **Read pattern file**: `patterns/XX-pattern-name.md` for mental model
3. **Practice problems**: LeetCode table at end of pattern file
4. **See real-world usage**: Check `applications/` for multi-pattern examples
5. **Cross-reference**: Pattern files link to relevant applications

### Study a Specific Topic (Legacy Approach)

1. Check `library_2025/README.md` for curriculum week/day
2. Find implementation in `library_2025/graph_algos/`, `library_2025/dp/`, etc.
3. Check `behavior_patterns/optimizations/` for advanced implementations
4. Review `algorist-toolbox/` for interactive Jupyter exploration (deprecated)
5. Check `library_2022/` for additional reference implementations (deprecated)

## Code Style & Linting

- **JavaScript**: ESLint configured with airbnb style, TypeScript support enabled (see `.eslintrc`)
  - Max line length: 100 characters (120 for TypeScript)
  - No console statements except errors/warnings
  - Prefer `const`/`let` over `var`

- **Python**: No enforced linter currently, but follows PEP 8 implicitly
  - Use type hints for clarity
  - Docstrings for complex algorithms

## Node Version & Dependencies

- **Node.js**: 13.7.0 (specified in `package.json`)
- **Key JS Dependencies**: Babel (transpiling), Jest (testing), Mongoose (DB utilities)
- **Python**: Python 3 (Jupyter, standard library, custom implementations)

## Git Notes

- Current branch: `master`
- Recent work focuses on MST, topological sort, and graph algorithms
- Regular commits include "CHECKPOINT" tags marking study phases

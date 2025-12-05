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

- **`library_2025/`**: Current, well-organized curriculum following a 4-week structured learning plan
  - `graph_algos/`: Graph algorithms (DFS, BFS, shortest paths, MST, cycle detection, network flow)
  - `dp/`: Dynamic programming examples
  - `backtracking_greedy/`: Backtracking and greedy algorithm patterns
  - `sorting/`: Sorting implementations
  - `trees/`: Tree-based algorithms and data structures

- **`library_2022/`**: Legacy organized study materials
  - `graphs/`: Graph theory concepts and techniques
  - `arrays/`: Array manipulation problems (sorted arrays, two-pointer patterns, etc.)
  - `recursion/`: Recursive patterns and backtracking
  - `trees/`: Tree traversals and problems
  - `mathematics/`: Number theory and mathematical algorithms

- **`algorist-toolbox/`**: Jupyter notebooks and Python scripts for experimentation
  - Recursion patterns (subsets, combinations, n-queens, backtracking)
  - Tree problems and traversals
  - Binary trees and BST implementations
  - Graph complexity analysis
  - Interactive learning notebooks

- **`behavior_patterns/`**: Algorithm pattern recognition and archetypes
  - `array_pointers/`: Two-pointer and sliding window patterns
  - `grid_traversal/`: 2D grid navigation patterns
  - Pattern matching reference guides

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

**Two-Pointer Pattern** (`behavior_patterns/array_pointers/`):
- Sorted input + target value → Two pointers moving inward
- Partitioning/segregation → Multiple pointers with pivot
- In-place array manipulation (remove duplicates, move zeros)

**Sliding Window Pattern** (`behavior_patterns/array_pointers/sliding_windows/`):
- Longest/shortest substring/subarray → Variable window with shrinking
- Fixed-size window → k consecutive elements aggregation
- Use hash map/set for char frequency tracking

**Graph Traversal**:
- BFS: Level-order, shortest paths in unweighted graphs
- DFS: Exhaustive search, topological sort, cycle detection
- Pattern: Choose based on whether you need all-levels (BFS) or depth-first exhaustion (DFS)

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
| Graph algorithms reference | `library_2025/graph_algos/` |
| Dijkstra's algorithm | `library_2025/graph_algos/path_finding/dijkstra/dijkstra.py` |
| Minimum Spanning Tree | `library_2025/graph_algos/min_spanning_tree/min_spanning_tree.py` |
| Cycle detection | `library_2025/graph_algos/cycle_detection/` |
| Topological sort | `library_2022/graphs/techniques/topological_sort/` |
| Two-pointer patterns | `behavior_patterns/array_pointers/` |
| Binary tree implementation | `algorist-toolbox/binary_tree.py` |
| Tree traversals | `algorist-toolbox/ip-TREES_traversals.ipynb` |

## Learning Resources

### Curriculum Structure
- **Week 1**: Graph traversal (BFS/DFS) + Sorting + Binary Search
- **Week 2**: DP, Greedy, Heaps, Linked Lists, Topological Sort
- **Week 3**: BST, Union Find, String algorithms, Two pointers, Bitwise ops, Shortest paths
- **Week 4**: Convex Hull, MST, SCC, FFT, Max Flow

See `library_2025/README.md` for detailed curriculum breakdown with daily session structure and POA mnemonics.

### Study Pattern

1. Read conceptual overview and POA (Person-Object-Action) totem
2. Study pattern recognition examples
3. Implement algorithm from scratch
4. Solve LeetCode problems using the pattern
5. Map to real-world applications

## Common Tasks

### Add a New Algorithm Implementation

1. Create file in appropriate `library_2025/` subdirectory (e.g., `algorithm_name.py`)
2. Include type hints and docstring
3. Add related problems/tests as comments or separate files
4. Reference in corresponding README if available

### Study a Specific Topic

1. Check `library_2025/README.md` for curriculum week/day
2. Find implementation in `library_2025/graph_algos/`, `library_2025/dp/`, etc.
3. Check `behavior_patterns/` for pattern recognition guides
4. Review `algorist-toolbox/` for interactive Jupyter exploration
5. Check `library_2022/` for additional reference implementations

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

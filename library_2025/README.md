# Data Structures & Algorithms Curriculum

```mermaid
flowchart TD
    subgraph "Memory Palace Framework"
        MP[Memory Palace Structure] --> POA[Person-Object-Action Totems]
        POA --> PM[Problem-Pattern Mapping]
        PM --> RWM[Real-World Mapping]
    end

    subgraph "4-Week Curriculum Flow"
        WK1[Week 1: Category 1 & 2 Essentials]
        WK2[Week 2: Category 2 & 3 Intermediate]
        WK3[Week 3: Category 3 & 4 Advanced]
        WK4[Week 4: Category 5 & 6 Specialized]
    end

    subgraph "Learning Components"
        C1[Conceptual Theory]
        C2[Pattern Recognition]
        C3[Problem Solving Practice]
        C4[Implementation Exercises]
        C5[Real-World Applications]
    end

    subgraph "Algorithm Categories by Priority"
        CAT1[Category 1: BFS, DFS, Sorting]
        CAT2[Category 2: Binary Search, DP, Greedy, etc.]
        CAT3[Category 3: BST, Fenwick Trees, Union Find, etc.]
        CAT4[Category 4: Bitwise, Game Theory, Shortest Paths, etc.]
        CAT5[Category 5: Convex Hull, MST, SCC, etc.]
        CAT6[Category 6: FFT, Max Flow]
    end

    MP --> WK1
    WK1 --> WK2
    WK2 --> WK3
    WK3 --> WK4
    
    CAT1 --> WK1
    CAT2 --> WK1
    CAT2 --> WK2
    CAT3 --> WK2
    CAT3 --> WK3
    CAT4 --> WK3
    CAT5 --> WK4
    CAT6 --> WK4
    
    C1 --> WK1
    C2 --> WK1
    C3 --> WK2
    C4 --> WK3
    C5 --> WK4
```

```mermaid
flowchart TD
    subgraph "Knowledge Input"
        A1[Abstract Concept] --> A2[Algorithm Pattern]
        A2 --> A3[Visual Representation]
    end
    
    subgraph "Mental Processing"
        B1[Pattern Recognition]
        B2[Mnemonic Association]
        B3[Memory Palace Integration]
    end
    
    subgraph "Application Output"
        C1[Pattern Mapping]
        C2[Problem Categorization]
        C3[Solution Implementation]
        C4[Real-World Application]
    end
    
    A3 --> B1
    B1 --> B2
    B2 --> B3
    
    B3 --> C1
    C1 --> C2
    C2 --> C3
    C3 --> C4
    
    style A1 fill:#ff0000,stroke:#333
    style A2 fill:#ff0000,stroke:#333
    style A3 fill:#ff0000,stroke:#333
    
    style B1 fill:#0000ff,stroke:#333
    style B2 fill:#0000ff,stroke:#333
    style B3 fill:#0000ff,stroke:#333
    
    style C1 fill:#00ff00,stroke:#333,color:#000
    style C2 fill:#00ff00,stroke:#333,color:#000
    style C3 fill:#00ff00,stroke:#333,color:#000
    style C4 fill:#00ff00,stroke:#333,color:#000
```

```mermaid
graph TD
    subgraph "Memory Palace Structure"
        MP1[Location 1: Foundations]
        MP2[Location 2: Search & Sort]
        MP3[Location 3: Data Organization]
        MP4[Location 4: Advanced Techniques]
        MP5[Location 5: Specialized Applications]
    end
    
    subgraph "POA Framework"
        POA[Person-Object-Action] --> P[Person: Algorithm Category/Type]
        POA --> O[Object: Data Structure/Context]
        POA --> A[Action: Operation/Transformation]
    end
    
    subgraph "Pattern Recognition"
        PR1[Problem Type]
        PR2[Solution Strategy]
        PR3[Implementation Pattern]
    end
    
    POA --> MP1
    POA --> MP2
    POA --> MP3
    POA --> MP4
    POA --> MP5
    
    MP1 --> PR1
    PR1 --> PR2
    PR2 --> PR3
    
    style MP1 fill:#ff0000,stroke:#333
    style MP2 fill:#ff0000,stroke:#333
    style MP3 fill:#ff0000,stroke:#333
    style MP4 fill:#ff0000,stroke:#333
    style MP5 fill:#ff0000,stroke:#333
    
    style P fill:#0000ff,stroke:#333
    style O fill:#0000ff,stroke:#333
    style A fill:#0000ff,stroke:#333
    
    style PR1 fill:#00ff00,stroke:#333,color:#000
    style PR2 fill:#00ff00,stroke:#333,color:#000
    style PR3 fill:#00ff00,stroke:#333,color:#000
```

## Terminology and Key Concepts

Before diving into the curriculum, let's establish common terminology:

- **Memory Palace**: A spatial memorization technique that uses visualizations of familiar locations to organize and recall information
- **POA Framework**: Person-Object-Action method for creating memorable associations
- **Pattern Mapping**: Connecting problem structures to known algorithm patterns
- **Totem**: A memorable POA combination that anchors a specific algorithm or data structure concept

## 4-Week Curriculum Breakdown
Here's a comprehensive 4-week curriculum:

### Week 1: Foundations & Essential Patterns

**Focus**: Category 1 (BFS/DFS, Sorting) + Initial Category 2 Topics

#### Day 1-2: Graph Traversal Foundations
- **Theory**: BFS vs DFS mental model - BFS as breadth-first using queues (level order) vs DFS as depth-first using stacks (pre/in/post-order)
- **Pattern Recognition**: When to use BFS (shortest paths, level-based problems) vs DFS (exhaustive search, backtracking)
- **POA Example**: "Explorer (person) with Map (object) Navigating (action)" for BFS/DFS
- **Problem Mapping**: LeetCode problems that don't immediately look like graph problems but are solvable with BFS/DFS

#### Day 3-4: Sorting Algorithms
- **Theory**: Comparison-based vs non-comparison sorting
- **Pattern Recognition**: When to use different sorting algorithms (insertion, merge, quick, etc.)
- **POA Example**: "Librarian (person) with Books (object) Organizing (action)" for sorting
- **Applied Practice**: Solving problems where sorting is an essential but non-obvious step

#### Day 5-7: Binary Search & Hash Maps/Sets
- **Theory**: Binary search for sorted collections, hash map/set for O(1) lookups
- **Pattern Recognition**: Identifying when to use binary search vs hash-based approaches
- **POA Examples**: 
  - "Hunter (person) with Telescope (object) Focusing (action)" for binary search
  - "Receptionist (person) with Rolodex (object) Retrieving (action)" for hash maps/sets
- **Problem Mapping**: Applying these tools to non-obvious problems

### Week 2: Intermediate Patterns & Structures

**Focus**: Remaining Category 2 + Initial Category 3 Topics

#### Day 1-3: Dynamic Programming & Greedy Algorithms
- **Theory**: DP as dependency graph approach, greedy algorithms for local optimization
- **Pattern Recognition**: State variables, memoization, and optimization criteria
- **POA Examples**:
  - "Architect (person) with Blueprint (object) Planning (action)" for DP
  - "Chef (person) with Ingredients (object) Prioritizing (action)" for greedy algorithms
- **Problem Transformations**: Converting between recursive, top-down, and bottom-up approaches

#### Day 4-5: Heaps & Prefix Sums
- **Theory**: Heap operations, prefix sum concepts and applications
- **Pattern Recognition**: K-smallest/largest problems, range sum problems
- **POA Examples**:
  - "Bouncer (person) with Priority List (object) Selecting (action)" for heaps
  - "Accountant (person) with Ledger (object) Summing (action)" for prefix sums
- **Real-World Mapping**: Applications in streaming data, prioritization systems, financial calculations

#### Day 6-7: Linked Lists, Stacks & Topological Sort
- **Theory**: Linked structures, stack operations, and directed acyclic graphs
- **Pattern Recognition**: Dependency ordering, parenthesis matching, reversing operations
- **POA Examples**:
  - "Railway Controller (person) with Train Cars (object) Connecting (action)" for linked lists
  - "Dishwasher (person) with Plates (object) Stacking (action)" for stacks
  - "Project Manager (person) with Task List (object) Sequencing (action)" for topological sort

### Week 3: Advanced Patterns & Techniques

**Focus**: Remaining Category 3 + Category 4 Topics

#### Day 1-2: Binary Search Trees & Union Find
- **Theory**: Tree traversal, balanced trees, disjoint sets, path compression
- **Pattern Recognition**: Hierarchical data, set operations, connectivity problems
- **POA Examples**:
  - "Taxonomist (person) with Species (object) Classifying (action)" for BST
  - "Ambassador (person) with Countries (object) Uniting (action)" for Union Find
- **Implementation Focus**: Self-balancing trees, Union-Find optimizations

#### Day 3-4: String Algorithms & Two Pointers
- **Theory**: String hashing, Knuth-Morris-Pratt, sliding window
- **Pattern Recognition**: Substring problems, palindromes, anagrams
- **POA Examples**:
  - "Linguist (person) with Dictionary (object) Analyzing (action)" for string algorithms
  - "Fencer (person) with Foils (object) Positioning (action)" for two pointers
- **Real-World Applications**: Text processing, pattern matching, search engines

#### Day 5-7: Bitwise Operations & Shortest Paths
- **Theory**: Bit manipulation, Dijkstra's algorithm, Bellman-Ford
- **Pattern Recognition**: State compression, optimization problems, graph distances
- **POA Examples**:
  - "Electrician (person) with Circuit (object) Toggling (action)" for bitwise operations
  - "Navigator (person) with Roadmap (object) Routing (action)" for shortest paths
- **Implementation Practice**: Optimized implementations of these algorithms

### Week 4: Specialized Algorithms & Integration

**Focus**: Categories 5 & 6 + Comprehensive Integration

#### Day 1-2: Convex Hull & Minimum Spanning Trees
- **Theory**: Graham scan, Jarvis march, Kruskal's/Prim's algorithms
- **Pattern Recognition**: Geometric boundaries, network design problems
- **POA Examples**:
  - "Surveyor (person) with Boundary Markers (object) Enclosing (action)" for convex hull
  - "City Planner (person) with Utilities (object) Connecting (action)" for MST
- **Real-World Applications**: Computer graphics, network infrastructure design

#### Day 3-4: Advanced Graph Algorithms & Decomposition
- **Theory**: Strongly connected components, square root decomposition
- **Pattern Recognition**: Complex graph structures, query optimization
- **POA Examples**:
  - "Detective (person) with Criminal Network (object) Uncovering (action)" for SCC
  - "Strategist (person) with Territory (object) Subdividing (action)" for decomposition
- **Applied Problems**: Network analysis, territory division

#### Day 5-7: FFT & Max Flow
- **Theory**: Fast Fourier Transform, Ford-Fulkerson, Edmonds-Karp
- **Pattern Recognition**: Signal processing, network capacity problems
- **POA Examples**:
  - "Musician (person) with Soundwave (object) Transforming (action)" for FFT
  - "Logistics Manager (person) with Pipeline (object) Maximizing (action)" for max flow
- **Real-World Applications**: Digital signal processing, resource allocation, transportation networks

## Daily Session Structure

Each day's learning session will follow this pattern:

1. **Concept Introduction** (30 min)
   - Theory overview with Mermaid diagrams
   - POA memory palace totem introduction

2. **Pattern Recognition** (45 min)
   - Problem categorization exercises
   - Common problem patterns and transformations

3. **Implementation Practice** (60 min)
   - TypeScript/Go implementation examples
   - LeetCode problem solving with pattern analysis

4. **Real-World Mapping** (45 min)
   - Industry applications of the algorithm/structure
   - How these concepts appear in real engineering challenges

## Assessment and Reinforcement Strategy

Throughout the curriculum, we'll implement:

1. **Pattern Blindspot Testing**: Presenting problems that don't obviously map to their optimal algorithm solution
2. **Interleaved Practice**: Mixing problems from different categories to strengthen recognition
3. **Spaced Repetition**: Revisiting earlier concepts as we advance through the curriculum
4. **Implementation Challenges**: Building more complex systems using multiple data structures and algorithms

Would you like me to dive deeper into any specific week or topic? Or would you prefer we start with detailed content for Week 1?
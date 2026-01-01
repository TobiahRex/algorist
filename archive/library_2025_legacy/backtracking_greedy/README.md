# Backtracking vs. Greedy Algorithms

```mermaid
flowchart TD
    A[Algorithm Approaches] --> B[Backtracking]
    A --> C[Greedy Algorithms]
    
    subgraph "Backtracking"
    B --> B1[Core Concept]
    B1 --> B1_1["Build solution incrementally
    - Explore all possibilities
    - Rollback when hitting dead end
    - Uses recursion with state"]
    
    B --> B2[Common Problems]
    B2 --> B2_1["Problems
    - N-Queens
    - Sudoku
    - Permutations/Combinations
    - Subset Sum
    - Word Search"]
    
    B --> B3[Time Complexity]
    B3 --> B3_1["Usually exponential O(b^d)
    - b = branching factor
    - d = solution depth"]
    
    B --> B4[Optimization]
    B4 --> B4_1["Pruning
    - Constraint propagation
    - State memoization
    - Branch ordering"]
    end
    
    subgraph "Greedy Algorithms"
    C --> C1[Core Concept]
    C1 --> C1_1["Make locally optimal choice
    - Never reconsider choices
    - Hope for global optimum
    - No backtracking"]
    
    C --> C2[Common Problems]
    C2 --> C2_1["Minimum Spanning Tree
    - Huffman Coding
    - Activity Selection
    - Fractional Knapsack
    - Coin Change (some cases)"]
    
    C --> C3[Time Complexity]
    C3 --> C3_1["Usually polynomial
    - O(n log n) with sorting
    - O(n) without sorting"]
    
    C --> C4[Correctness]
    C4 --> C4_1["Requires proof
    - Greedy choice property
    - Optimal substructure
    - Not always optimal"]
    end
    
    subgraph "Comparison"
    D1[Solution Space]
    D1 --> D1_1["Backtracking: Explores full space
        Greedy: Explores single path"]
    
    D2[Optimality]
    D2 --> D2_1["Backtracking: Always optimal (if complete)
        Greedy: Only when problem has greedy property"]
    
    D3[Efficiency]
    D3 --> D3_1["Backtracking: Slower but thorough
        Greedy: Faster but potentially suboptimal"]
    
    D4[Implementation]
    D4 --> D4_1["Backtracking: Recursive with state tracking
        Greedy: Iterative with local decisions"]
    end

    classDef primary fill:#2C3E50,stroke:#2C3E50,color:white
    classDef backtracking fill:#3498DB,stroke:#3498DB,color:white
    classDef greedy fill:#E74C3C,stroke:#E74C3C,color:white
    classDef comparison fill:#27AE60,stroke:#27AE60,color:white
    classDef details fill:#34495E,stroke:#34495E,color:white
    
    class A primary
    class B,B1,B2,B3,B4 backtracking
    class C,C1,C2,C3,C4 greedy
    class D1,D2,D3,D4 comparison
    class B1_1,B2_1,B3_1,B4_1,C1_1,C2_1,C3_1,C4_1,D1_1,D2_1,D3_1,D4_1 details
```

## Data Flow & Transformation Concepts

### Common Terminology

- **State Space**: The set of all possible states in a problem
- **Solution Space**: Valid solutions within the state space
- **Decision Point**: Point where algorithm must choose between options
- **Constraints**: Rules that limit valid solutions
- **Optimization Criteria**: Measurement of solution quality
- **Pruning**: Eliminating branches of exploration that cannot lead to valid solutions

## Mental Model Breakdown

### Backtracking Algorithms

#### Core Concept
Backtracking explores potential solutions by incrementally building candidates and abandoning them ("backtracking") as soon as they cannot lead to a valid solution.

#### Data Flow Pattern
1. **Choice**: Make a decision (add element to current solution)
2. **Constraint Check**: Verify if current partial solution is valid
3. **Recursion**: If valid, explore further with the new state
4. **Backtrack**: If invalid or fully explored, undo the choice and try alternatives

#### Common Problems & Implementations

**N-Queens Problem**:

```python
def solve_n_queens(n):
    def is_valid(board, row, col):
        # Check column
        for irow in range(row):
            if board[irow] == col:
                return False
            
        # Check diagonals
        for irow in range(row):
            if abs(board[irow] - col) == abs(irow - row):
                return False
        
        return True
    
    def backtrack(row, current_board):
        if row == n:
            solutions.append(current_board[:])
            return
        
        for col in range(n):
            if is_valid(current_board, row, col):
                current_board[row] = col
                backtrack(row + 1, current_board)
                # Backtrack by continuing loop (implicitly undoing the choice)
    
    solutions = []
    backtrack(0, [-1] * n)
    return solutions
```

**Subset Sum Problem**:
```python
def subset_sum(nums, target):
    def backtrack(start, current_sum, current_subset):
        if current_sum == target:
            solutions.append(current_subset[:])
            return
        
        if current_sum > target or start >= len(nums):
            return
        
        # Include current number
        current_subset.append(nums[start])
        backtrack(start + 1, current_sum + nums[start], current_subset)
        
        # Exclude current number (backtrack)
        current_subset.pop()
        backtrack(start + 1, current_sum, current_subset)
    
    solutions = []
    backtrack(0, 0, [])
    return solutions
```

### Greedy Algorithms

#### Core Concept
Greedy algorithms make the locally optimal choice at each step with the hope that these local choices will lead to a globally optimal solution.

#### Data Flow Pattern
1. **Sort/Order**: Arrange choices by some criteria (often)
2. **Selection**: Iteratively select the best available option
3. **Update**: Update problem state based on selection
4. **Repeat**: Continue until solution is complete

#### Common Problems & Implementations

**Activity Selection Problem**:
```python
def activity_selection(start_times, end_times):
    # Create activities and sort by end time
    activities = sorted(zip(start_times, end_times), key=lambda x: x[1])
    
    selected = [activities[0]]  # Select first activity
    last_end_time = activities[0][1]
    
    # Greedily select activities
    for activity in activities[1:]:
        start, end = activity
        if start >= last_end_time:  # If compatible with last selected
            selected.append(activity)
            last_end_time = end
    
    return selected
```

**Fractional Knapsack Problem**:
```python
def fractional_knapsack(values, weights, capacity):
    # Calculate value-to-weight ratios
    items = [(values[i]/weights[i], values[i], weights[i]) 
             for i in range(len(values))]
    
    # Sort by value-to-weight ratio (descending)
    items.sort(reverse=True)
    
    total_value = 0
    remaining_capacity = capacity
    
    for ratio, value, weight in items:
        if remaining_capacity >= weight:
            # Take the whole item
            total_value += value
            remaining_capacity -= weight
        else:
            # Take a fraction of the item
            total_value += ratio * remaining_capacity
            break  # Knapsack is full
    
    return total_value
```

## Key Differences and Trade-offs

### 1. Exploration Strategy
- **Backtracking**: Explores multiple paths in the solution space, with the ability to abandon unsuccessful paths.
- **Greedy**: Explores a single path, making irrevocable decisions at each step.

### 2. Optimality
- **Backtracking**: Guarantees optimal solutions (if allowed to run to completion) by exploring all possibilities.
- **Greedy**: Only optimal when the problem has the "greedy choice property" and "optimal substructure".

### 3. Time Complexity
- **Backtracking**: Usually exponential, O(b^d) where b is branching factor and d is solution depth.
- **Greedy**: Usually polynomial, often O(n log n) if sorting is involved.

### 4. Problem Types
- **Backtracking**: Excels at combinatorial problems, puzzles, and constraint satisfaction problems.
- **Greedy**: Excels at optimization problems where local optimality leads to global optimality.

## Recognizing Which to Use

### When to Use Backtracking
- Need to find all possible solutions
- Problem requires examining combinations or permutations
- Problem has many constraints that eliminate large portions of the search space
- No obvious greedy strategy exists
- Examples: Sudoku, Word Search, Combination Sum, Permutations

### When to Use Greedy
- Can prove that local optimal choices lead to global optimum
- Problem has optimal substructure (optimal solution contains optimal sub-solutions)
- Example problems: Minimum Spanning Tree, Huffman Coding, Interval Scheduling

## Optimizing Each Approach

### Backtracking Optimizations
1. **Pruning**: Early elimination of invalid paths
2. **State Memoization**: Storing results of previously explored states (combines with Dynamic Programming)
3. **Constraint Propagation**: Reducing future search space based on current choices
4. **Variable/Value Ordering**: Prioritizing choices that are most likely to succeed

### Greedy Algorithm Verification
1. **Greedy Choice Property**: Prove that a locally optimal choice is part of some globally optimal solution
2. **Optimal Substructure**: Prove that an optimal solution to the problem contains optimal solutions to subproblems
3. **Exchange Argument**: Prove that any non-greedy solution can be improved by making it more "greedy"

Would you like me to focus on specific aspects of these algorithms in more detail? For example:
1. More in-depth examples of backtracking problems and optimizations
2. Proofs of correctness for greedy algorithms
3. Hybrid approaches that combine backtracking with other techniques
4. Real-world applications of these algorithms
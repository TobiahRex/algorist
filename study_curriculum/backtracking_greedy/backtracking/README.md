# Backtracking

Backtracking typically involves iterating across levels of a decision tree. At each level, there's a series of choices to make. Going down a level resembles making a single choice, and so at that new deeper level, the choices are slightly different (they probably don't include the choices you've already made). Either way, we need to now iterate across each of those choices. 
This approach is expensive and typically results in exponential time complexity, often denoted as O(b^d), where b is the branching factor and d is the depth of the solution tree. However, with pruning, we can significantly reduce the number of branches we need to explore, thus improving the overall time complexity. 

| Problem    | Time Complexity (Without Pruning) | Time Complexity (With Pruning) |
| ---------- | --------------------------------- | ------------------------------ |
| N-Queens   | O(n!)                             | O(n^n)                         |
| Subset Sum | O(2^n)                            | O(2^(n/2))                     |

Pruning helps eliminate large portions of the search space that do not lead to valid solutions, making the algorithm more efficient.

## Iterate Combinations via Tracing Tree

```mermaid
flowchart TD
    %% Structural Pattern for Generating Combinations
    subgraph "Standard Pattern for Generating Combinations"
        Start["Start State"] --> Level1["Level 1: Try all choices"]
        Level1 --> Choice1["Choice 1"]
        Level1 --> Choice2["Choice 2"]
        Level1 --> Choice3["Choice 3"]
        
        Choice1 --> Level2_1["Level 2: Try all choices"]
        Choice2 --> Level2_2["Level 2: Try all choices"]
        Choice3 --> Level2_3["Level 2: Try all choices"]
        
        Level2_1 --> C1_1["Choice 1"]
        Level2_1 --> C1_2["Choice 2"]
        Level2_1 --> C1_3["Choice 3"]
        
        Level2_2 --> C2_1["Choice 1"]
        Level2_2 --> C2_2["Choice 2"]
        Level2_2 --> C2_3["Choice 3"]
        
        Level2_3 --> C3_1["Choice 1"]
        Level2_3 --> C3_2["Choice 2"]
        Level2_3 --> C3_3["Choice 3"]
        
        %% Show final level
        C1_1 --> Level3_1["Level 3: Try all choices"]
        C1_2 --> Level3_2["Level 3: Try all choices"]
        C1_3 --> Level3_3["Level 3: Try all choices"]
        
        %% Style definitions
        classDef level fill:#87CEEB,stroke:#333,stroke-width:2px,color:#000
        classDef choice fill:#98FB98,stroke:#333,stroke-width:2px,color:#000
        classDef terminal fill:#000000,stroke:#333,stroke-width:2px,color:#fff
        
        class Start,Level1,Level2_1,Level2_2,Level2_3,Level3_1,Level3_2,Level3_3 level
        class Choice1,Choice2,Choice3,C1_1,C1_2,C1_3,C2_1,C2_2,C2_3,C3_1,C3_2,C3_3 choice
    end
```

The standard pattern for generating combinations has these key components:

1. **Level Structure**:
   - Each level represents a position in the combination
   - Number of levels = length of combination
   - Each level tries all possible choices

2. **Choice Structure**:
   - At each level, try every possible choice
   - Number of choices = size of choice set
   - Each choice leads to next level

3. **Recursive Pattern**:
```python
def generate_combinations(level, current_state):
    if level == max_level:
        # Process complete combination
        return
        
    for choice in possible_choices:
        # Try this choice
        current_state[level] = choice
        # Move to next level
        generate_combinations(level + 1, current_state)
        # Backtrack (implicitly by continuing loop)
```

4. **Key Characteristics**:
   - Each level is independent
   - All choices at each level are tried
   - State is passed down the tree
   - Backtracking happens by continuing the loop

### This pattern appears in many problems:
- N-Queens: Each level is a row, choices are columns
- Permutations: Each level is a position, choices are remaining numbers
- Subsets: Each level is whether to include an element
- Sudoku: Each level is a cell, choices are numbers 1-9


### What's different between problems? 🎯

The main difference between problems is:
1. **Choices**: What constitutes a "choice" at each level
2. **Pruning**: What constraints are applied to prune invalid branches
3. **Valid Criteria**: What constitutes a valid complete combination


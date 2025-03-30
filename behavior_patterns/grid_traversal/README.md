# Grid Traversal Patterns

0. **Adjacent Cells Pattern (8-way)**
```python
# Classic surrounding cells
directions = [
    (-1,-1), (-1,0), (-1,1),  # Top 3
    (0,-1),          (0,1),   # Side 2
    (1,-1),  (1,0),  (1,1)    # Bottom 3
]
```

```python
def adjacent_cells_8_way(grid):
    for i in [-1, 0, 1]:
        for j in [-1, 0, 1]:
            if i == 0 and j == 0:
                continue
            print(i, j)

adjacent_cells_8_way([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
```



1. **Adjacent Cells (4-way)**
```python
# Cardinal directions only
directions = [
    (-1,0),         # North
    (0,-1), (0,1),  # West, East
    (1,0)          # South
]
```
```python
def adjacent_cells_4_way(grid):
    for i in [-1, 0, 1]:
        for j in [-1, 0, 1]:
            if i == 0 and j == 0:
                continue
            if abs(i) == abs(j):
                continue
            print(i, j)

adjacent_cells_4_way([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
```

1. **Bishop Pattern (Diagonals)**
```python
# All diagonal directions
diagonals = [
    (-1,-1), (-1,1),  # NW, NE
    (1,-1),  (1,1)    # SW, SE
]

# To traverse entire diagonal:
def get_diagonal_cells(i, j, grid):
    paths = []
    for di, dj in diagonals:
        ni, nj = i, j
        while 0 <= ni < len(grid) and 0 <= nj < len(grid[0]):
            paths.append((ni, nj))
            ni, nj = ni + di, nj + dj
```

4. **Knight Pattern**
```python
# Chess knight moves
knight_moves = [
    (-2,-1), (-2,1),  # Top
    (-1,-2), (-1,2),  # Upper sides
    (1,-2),  (1,2),   # Lower sides
    (2,-1),  (2,1)    # Bottom
]
```

5. **Spiral Pattern**
```python
def spiral_traverse(grid):
    if not grid: return []
    result = []
    top, bottom = 0, len(grid)-1
    left, right = 0, len(grid[0])-1
    
    while top <= bottom and left <= right:
        # Right
        for j in range(left, right+1):
            result.append(grid[top][j])
        top += 1
        
        # Down
        for i in range(top, bottom+1):
            result.append(grid[i][right])
        right -= 1
        
        if top <= bottom:
            # Left
            for j in range(right, left-1, -1):
                result.append(grid[bottom][j])
            bottom -= 1
            
        if left <= right:
            # Up
            for i in range(bottom, top-1, -1):
                result.append(grid[i][left])
            left += 1
```

6. **Snake Pattern**
```python
def snake_traverse(grid):
    result = []
    for i in range(len(grid)):
        if i % 2 == 0: # even rows
            # Left to right
            for j in range(len(grid[0])):
                result.append(grid[i][j])
        else: # odd rows
            # Right to left
            for j in range(len(grid[0])-1, -1, -1): # move right to left stopping at the first column (0 index)
                result.append(grid[i][j])
```

7. **Diagonal Zigzag**
This pattern is useful for iterating every square in a grid in a diagonal zigzag pattern.
INTUITION:
  * Tools
     - We need an upper & lower bound.
     - We need a _compass_ to tell us which direction to go.
     - We need to collect the results as we go.
  * Implementation
     - We start at the top left corner.
     - We need to reverse direction when we hit the edge of the grid.
       - Edge's are Top Vertical, Bottom Vertical, Left Horizontal, Right Horizontal.
       - Horizontal edges are reversed by first moving horizontally, then reversing.
       - Vertical edges are reversed by first moving vertically, then reversing.
```python
def diagonal_traverse(grid):
    if not grid: return []
    m, n = len(grid), len(grid[0])
    row = col = 0
    going_up = True
    result = []
    
    while len(result) < m * n:
        result.append(grid[row][col])
        
        if going_up:
            if col == n-1: # at right vertical edge - go down and reverse direction
                row += 1
                going_up = False
            elif row == 0: # at top horizontal edge - go right and reverse direction
                col += 1
                going_up = False
            else: # go up
                row -= 1
                col += 1
        else:
            if row == m-1: # at bottom horizontal edge - go right and reverse direction
                col += 1
                going_up = True
            elif col == 0: # at left vertical edge - go down and reverse direction
                row += 1
                going_up = True
            else: # go down
                row += 1
                col -= 1
```

1. **Ring by Ring (Onion Peel)**
Example of _rings_:
6x6 grid:
ring 0:
[1  2  3  4  5  6]   Original size: 6x6
[7  8  9  A  B  C]  (6-0)x(6-0)
[D  E  F  G  H  I]   Each ring consumes:
[J  K  L  M  N  O]   - 2 rows (top and bottom)
[P  Q  R  S  T  U]   - 2 columns (left and right)
[V  W  X  Y  Z  *]

ring 1:                
[·  ·  ·  ·  ·  ·]   Remaining size: 4x4
[·  8  9  A  B  ·]   (6-2)x(6-2)
[·  E  F  G  H  ·]
[·  K  L  M  N  ·]   Lost 2 from each side
[·  Q  R  S  T  ·]
[·  ·  ·  ·  ·  ·]

ring 2:
[·  ·  ·  ·  ·  ·]   Remaining size: 2x2
[·  ·  ·  ·  ·  ·]   (6-4)x(6-4)
[·  ·  F  G  ·  ·]
[·  ·  L  M  ·  ·]   Lost 4 from each side
[·  ·  ·  ·  ·  ·]   (2 more from each side)
[·  ·  ·  ·  ·  ·]

NOTES:
- When thinking about bracket notation, there's a few patterns that come to mind.
They can most easily be recalled by focusing on the key questions that these patterns
help answer:
    * Which coordinate is fixed? Which is dynamic per iteration?
      * e.g. `clxn[static][dynamic]` or `clxn[dynamic][static]`
    * Which cardinal direction is the traversal moving?
      * e.g. `clxn[i][j]` or `clxn[j][i]`
    * How is the boundary being defined? Is the boundary moving inwards or outwards?
      * e.g. `clxn[n-1-i][j]` expresses 2 patterns
        * The row's are static and the columns are dynamic: `clxn[n-1-i][j]`
        * The columns are static and the rows are dynamic: `clxn[i][n-1-j]`
        * The static variable is moving over time, so it becomes important to consider,
          how it's changing as we iterate. It's change must be expressed in relation to
          some other variable. In this case, the static variable is the upper-bound of the travel space: last-row/last-column. Everything starts with those upper-bounds in mind. Then we have a 3rd variable that is changing, which is the _ring_ number, as the ring number increases, the travel space decreases.
- When iterating in some different direction than the last direction, but daisy-chaining
 the travel pattern together, it's important to remember to adjust the starting point of the second travel sequence off of the last iteration of the first travel sequence.
 That's why we see `... range(n-2-ring, ring-1, -1)` in the example below. The `n-2` is
 such because we're iterating one column to the left of the last column we just finished iterating over.
```python
def ring_traverse(grid):
    m, n = len(grid), len(grid[0])
    ring = 0
    result = []
    
    while ring * 2 < m and ring * 2 < n:
        # Top edge
        for j in range(ring, n-ring):
            result.append(grid[ring][j])
        # Right edge
        for i in range(ring+1, m-ring):
            result.append(grid[i][n-1-ring])
        # Bottom edge (if needed)
        if ring * 2 + 1 < m:
            for j in range(n-2-ring, ring-1, -1): # right to left across bottom edge
                result.append(grid[m-1-ring][j])
        # Left edge (if needed)
        if ring * 2 + 1 < n:
            for i in range(m-2-ring, ring, -1): # bottom to top across left edge
                result.append(grid[i][ring])
        ring += 1
```

Would you like to:
1. Explore any of these patterns in detail?
2. See specific problems that use these patterns?
3. Discuss how these patterns combine with DP approaches?
4. Look at 3D grid traversal patterns?

These patterns are indeed crucial for both graph problems and dynamic programming!

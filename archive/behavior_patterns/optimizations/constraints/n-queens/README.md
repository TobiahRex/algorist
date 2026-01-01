# Constraint Satisfaction Problems (CSP)
> constraints eliminate choices.

_Propagation_ is how we eliminate choices, which is to say, eliminate ambiguity. Think about when you try to solve sudoku by finding combo's of numbers that must exist across two squares in a row, now you know those numbers cannot exist anywhere else on that row - you've eliminated 6 theoretical squares using _propagation_ aka __Constraint Propagation__.

## 💡 Early decisions have cascading consequences
A poor early choice doesn't just affect that choice, it poisons the entire downstream search space. How to fight against this possibility?
  1. **Variable** ordering (Most constrained variable)
  2. **Value** ordering (Least constrained value)

The search space is n^n (everywhere). But constraints reduce it to n! (permutations). Good propagation reduces further to near-linear time.

> The gap between theoretical and practical complexity is where constraint programming shines. 

## Invariant
Queens are placed with no conflicts. 
Available columns for queen -> `d = {0..n-1} - attacked_squares`.

If available columns is EMPTY -> BACKTRACK
If d == n -> SOLUTION
Otherwise -> try each available column, recurse

## Use Cases
1. _Radio Frequency Assignment_: Cell towers must be assigned frequences. Towers within range of each other cannot share frequencies (interference). Each tower is a "queen" each freq is a "column" and promity creates "diagonal" conflicts. The FCC and telecom companies solve massive frequency assignment problems using constraint propagation techniques derived from N-Queens research. 
2. _Parallel Machine Scheduling_: Jobs must be assigned to machines. Certain job paris conflict (share resources, have dependencies). Each job is a queen, each machine is a column, conflicts are diagonals. Manufacturing plants use constraint solvers for this daily. Toyota's production system implicity solves N-Queens-like problems for assemlby line balancing. 
3. _Exam Scheduling_: Schedule exams so no student has two exams at the same time. Exams are queens, time slots are columns, shared students create conflicts. Universities worldwide use constraint solvers for this. The problem is exactly N-Queens with a non-uniform conflict grpah (some pairs conflict, others don't).

# Pattern: Mutual Exclusion & Resource Non-Interference
Every N-Queens use case shares the same structure:
N entities must each claim a resource from the same pool, but certain pairs of claims are incompatible. The "diagonal" constraint generalizes to any pairwise exclusion rule. The backracking solution is universal - try assignments, propagate constraints, backtrack on conflicts. 

# Complexity
### Time: O(n!)
### Space: O(n)

----

## Diagonal Intuition

Reviewing the n-queens code to see how `r-c` and `r+c` are used for diagonals.


## The key insight

On a grid, diagonals are sets of cells where a linear combination of row and column stays constant.

### Forward diagonal (`/`) — top-left to bottom-right: `r - c`

Moving down-right, both row and column increase by 1, so `r - c` stays constant.

Example on a 4×4 board:
```
     c=0  c=1  c=2  c=3
r=0   0   -1   -2   -3   ← r-c values
r=1   1    0   -1   -2
r=2   2    1    0   -1
r=3   3    2    1    0
```

All cells with `r - c = 0` form one diagonal: `(0,0), (1,1), (2,2), (3,3)`.  
All cells with `r - c = -1` form another: `(0,1), (1,2), (2,3)`.  
All cells with `r - c = 1` form another: `(1,0), (2,1), (3,2)`.

### Backward diagonal (`\`) — top-right to bottom-left: `r + c`

Moving down-left, row increases by 1 and column decreases by 1, so `r + c` stays constant.

Example on a 4×4 board:
```
     c=0  c=1  c=2  c=3
r=0   0    1    2    3   ← r+c values
r=1   1    2    3    4
r=2   2    3    4    5
r=3   3    4    5    6
```

All cells with `r + c = 3` form one diagonal: `(0,3), (1,2), (2,1), (3,0)`.  
All cells with `r + c = 2` form another: `(0,2), (1,1), (2,0)`.  
All cells with `r + c = 4` form another: `(1,3), (2,2), (3,1)`.

## Why this works

- Forward diagonal (`/`): `r - c = constant` (difference is constant)
- Backward diagonal (`\`): `r + c = constant` (sum is constant)

Each unique constant value identifies a unique diagonal. Using sets of these constants lets you check diagonal conflicts in O(1) per cell.

In your code:
```7:8:behavior_patterns/optimizations/constraints/n-queens/n-queens.py
        self.diag1 = set() # / > r-c
        self.daig2 = set() # \ > r+c
```

When placing a queen at `(row, col)`, you add `row - col` to `diag1` and `row + col` to `diag2`. Any other cell with the same `r-c` or `r+c` is on the same diagonal and conflicts.

# Constraint Satisfaction Problems (CSP)
> constraints eliminate choices.

## Domain Reduction & Arc Consistency
Every number you place, _reduces the **domain**_ of cells in it's row, column, and box. Propagation can solve most cells without any guessing. The _"Naked Singles"_ technique (cll has only one possibility) is basic propagation. _"Hidden Singles"_ (number has only one valid cell in a unit) is stronger propagation. _"Naked Pairs"_, _"X-Wing"_ etc are increasingly sophisticated propagation rules. The philosophical truth: **Most of the solution is determined by constraints, not search.** Backtracking is only needed when propagation can't make progress. A well-implemented Sudoku solver uses search for maybe 1% of cells. The rest is pure deduction.

### 💡 The ratio of propagation to search (prop:search) determines practical difficulty.
The hardest Sudoku's AI Escargot require 50-60 search nodes, with good propagation. Compare that with 10^20 nodes without propagation. 


## Invariant
All filled cells satisfy Sudoku rules (no duplicates)
Each empty cell has a DOMAIN of possible values.

DOMAIN = {1..9} - (row values U col values U box values)

If any domain becomes EMPTY -> BACKTRACK (invalid state)
If cell has domain size 1 -> PROPAGATE (forced value)
Otherwise -> pick cell with smallest domain (MRV), guess.

## Use Cases
1. _Timetable Scheduling_: Assign classes to time slots and rooms. Each class has a domain (valid slots). Constraints: no teacher teaches two classes at once, no room double-booked, student conflicts. This is exactly Sudoku with irregular boxes. Universities use constraint solvers derived from Sudodku research. A 1000-class schedule is a 1000-cell Sudoku with complex **constraint topology**.
2. _Cryptarithmetic & Code Breaking_: SEND + MORE = MONEY. Assign digits to letters. Each letter has domain (0-9). Constraints: different letters get different digits, arithmetic must work. Classic puzzles, but also real code breaking. Constraint propagation plus backtracking cracks these. Bletchley Park techniques for Enigma included constraint propagation.
3. _Protein Structure Prediction_: Assign amino acids to 3D positions. Each position has a domain (possible configurations). Constraints: bonds, steric clashes, energy minimization. Simplified lattice models are literally Sudoku-like. Folding @ home uses constraint propagation techniques. The "box" constraint becomes local structure motifs. 

# Pattern: Domain Reduction in Structured Constraint Networks
Sudoku represents any problem where entities must be assigned values from a shared domain, with local consistency requirements. The 9x9 grid with row/column/box constraints generalizes to any network where nodes have domains and edges represent "must be different" constraints. Arc consistency algorithms from Sudoku research power industrial constraint solvers.

# Complexity
### Time:
 - `O(9^(n^2))` worst case
 - `O(n^2)` typical with propagation
### Space: `O(n^2)`

----


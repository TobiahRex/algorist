"""
AC-3 Algorithm - Arc Consistency for Constraint Satisfaction Problems

Mental Model: "Pre-process constraints to eliminate impossible values"

Problem: Before backtracking search, reduce domain sizes by enforcing arc consistency

Pattern Recognition:
- "constraint propagation" → AC-3
- "reduce search space before search" → Preprocessing
- "binary constraints between variables" → Arc consistency applicable

Key Insight:
Arc (X, Y) is consistent if: for every value x in Domain[X],
  there exists some value y in Domain[Y] such that (x, y) satisfies the constraint

AC-3 repeatedly removes inconsistent values until no more changes
Result: Domains shrunk, search tree smaller (exponentially better!)

Structure:
- Queue of arcs (X, Y) to check
- For each arc, remove values from Domain[X] that have no support in Domain[Y]
- When Domain[X] changes, re-queue all arcs (*, X) pointing to X
- Fixed point reached when queue empty

Behavior:
1. Initialize queue with all arcs (both directions for each constraint)
2. Pop arc (X, Y)
3. For each value x in Domain[X]:
     If no value y in Domain[Y] satisfies constraint:
       Remove x from Domain[X]
       Add all arcs (Z, X) to queue (propagate change)
4. Repeat until queue empty or domain becomes empty (no solution)

Real-World:
- Sudoku: AC-3 eliminates obvious impossibilities before guessing
- Scheduling: Remove conflicting time slots before search
- Map coloring: Reduce color choices based on neighbors
"""

from collections import deque
from typing import Dict, Set, List, Tuple, Callable


class CSPWithAC3:
    """
    Constraint Satisfaction Problem solver with AC-3 preprocessing
    """
    def __init__(self, variables, domains, constraints):
        """
        variables: list of variable names
        domains: dict {var: set of possible values}
        constraints: dict {(var1, var2): constraint_function}
          constraint_function(val1, val2) -> bool (True if consistent)
        """
        self.variables = variables
        self.domains = {var: set(domain) for var, domain in domains.items()}
        self.constraints = constraints

        # Build bidirectional constraint map for efficiency
        self.neighbors = {var: set() for var in variables}
        for (x, y) in constraints:
            self.neighbors[x].add(y)
            self.neighbors[y].add(x)

    def ac3(self):
        """
        AC-3 algorithm: Enforce arc consistency

        Returns: True if consistent (solvable), False if inconsistency detected
        Side effect: Reduces self.domains
        """
        # Initialize queue with all arcs
        queue = deque()
        for (x, y) in self.constraints:
            queue.append((x, y))
            queue.append((y, x))  # Bidirectional

        while queue:
            x, y = queue.popleft()

            # Revise domain of X based on constraint with Y
            if self.revise(x, y):
                # Domain[X] changed!

                # Check for failure: empty domain means no solution
                if not self.domains[x]:
                    return False

                # Propagate: re-check all arcs pointing to X
                for z in self.neighbors[x]:
                    if z != y:  # Don't add (Y, X) we just processed
                        queue.append((z, x))

        return True

    def revise(self, x, y):
        """
        Remove values from Domain[X] that have no support in Domain[Y]

        Returns: True if Domain[X] was revised (changed)
        """
        revised = False
        constraint_func = self.constraints.get((x, y)) or self.constraints.get((y, x))

        if not constraint_func:
            return False  # No constraint between x and y

        # Check each value in Domain[X]
        to_remove = set()
        for val_x in self.domains[x]:
            # Find if there exists supporting value in Domain[Y]
            has_support = any(
                self._satisfies_constraint(x, val_x, y, val_y, constraint_func)
                for val_y in self.domains[y]
            )

            if not has_support:
                to_remove.add(val_x)
                revised = True

        self.domains[x] -= to_remove
        return revised

    def _satisfies_constraint(self, var1, val1, var2, val2, constraint_func):
        """Check if (val1, val2) satisfies the constraint"""
        try:
            # Try both orderings (depends on how constraint was defined)
            if (var1, var2) in self.constraints:
                return constraint_func(val1, val2)
            else:
                return constraint_func(val2, val1)
        except:
            return False

    def backtracking_search(self):
        """
        Backtracking search AFTER AC-3 preprocessing

        Much faster due to reduced domains!
        """
        assignment = {}

        def backtrack(assignment):
            if len(assignment) == len(self.variables):
                return assignment

            # Select unassigned variable (MRV heuristic: pick var with smallest domain)
            unassigned = [v for v in self.variables if v not in assignment]
            var = min(unassigned, key=lambda v: len(self.domains[v]))

            for value in self.domains[var]:
                if self.is_consistent(var, value, assignment):
                    assignment[var] = value

                    result = backtrack(assignment)
                    if result:
                        return result

                    del assignment[var]

            return None

        return backtrack(assignment)

    def is_consistent(self, var, value, assignment):
        """Check if assigning value to var is consistent with current assignment"""
        for neighbor in self.neighbors[var]:
            if neighbor in assignment:
                constraint_func = self.constraints.get((var, neighbor)) or \
                                self.constraints.get((neighbor, var))
                if constraint_func:
                    try:
                        if (var, neighbor) in self.constraints:
                            if not constraint_func(value, assignment[neighbor]):
                                return False
                        else:
                            if not constraint_func(assignment[neighbor], value):
                                return False
                    except:
                        return False
        return True


# Example: Map Coloring with AC-3
def solve_map_coloring():
    """
    Australia map coloring: WA, NT, SA, Q, NSW, V, T
    Constraint: Adjacent regions must have different colors
    """
    variables = ['WA', 'NT', 'SA', 'Q', 'NSW', 'V', 'T']
    colors = {'red', 'green', 'blue'}
    domains = {var: colors.copy() for var in variables}

    # Define adjacency constraints (not equal)
    def not_equal(c1, c2):
        return c1 != c2

    constraints = {
        ('WA', 'NT'): not_equal,
        ('WA', 'SA'): not_equal,
        ('NT', 'SA'): not_equal,
        ('NT', 'Q'): not_equal,
        ('SA', 'Q'): not_equal,
        ('SA', 'NSW'): not_equal,
        ('SA', 'V'): not_equal,
        ('Q', 'NSW'): not_equal,
        ('NSW', 'V'): not_equal,
    }

    print("=== Map Coloring: Australia ===")
    print(f"Variables: {variables}")
    print(f"Initial domains: {colors}")
    print(f"Constraints: Adjacent regions must differ\n")

    csp = CSPWithAC3(variables, domains, constraints)

    print("Domain sizes before AC-3:")
    for var in variables:
        print(f"  {var}: {len(csp.domains[var])} values")

    # Run AC-3
    if csp.ac3():
        print("\n✓ AC-3 succeeded (CSP is arc-consistent)")
        print("\nDomain sizes after AC-3:")
        for var in variables:
            print(f"  {var}: {len(csp.domains[var])} values - {csp.domains[var]}")
    else:
        print("\n✗ AC-3 failed (no solution exists)")
        return None

    # Solve with backtracking (much faster now!)
    print("\nRunning backtracking search...")
    solution = csp.backtracking_search()

    if solution:
        print("✓ Solution found:")
        for var in variables:
            print(f"  {var}: {solution[var]}")
    else:
        print("✗ No solution found")

    return solution


# Example: Sudoku with AC-3
def solve_sudoku_with_ac3(grid):
    """
    Sudoku solver using AC-3 preprocessing

    grid: 9x9 list with 0 for empty cells
    """
    variables = [(i, j) for i in range(9) for j in range(9)]

    # Initial domains
    domains = {}
    for i in range(9):
        for j in range(9):
            if grid[i][j] == 0:
                domains[(i, j)] = set(range(1, 10))
            else:
                domains[(i, j)] = {grid[i][j]}

    # Define constraints: all-different in row, column, box
    def all_different(v1, v2):
        return v1 != v2

    constraints = {}

    # Row constraints
    for i in range(9):
        for j1 in range(9):
            for j2 in range(j1 + 1, 9):
                constraints[((i, j1), (i, j2))] = all_different

    # Column constraints
    for j in range(9):
        for i1 in range(9):
            for i2 in range(i1 + 1, 9):
                constraints[((i1, j), (i2, j))] = all_different

    # 3x3 box constraints
    for box_row in range(3):
        for box_col in range(3):
            cells = [(box_row*3 + i, box_col*3 + j) for i in range(3) for j in range(3)]
            for c1 in cells:
                for c2 in cells:
                    if c1 < c2:
                        constraints[(c1, c2)] = all_different

    csp = CSPWithAC3(variables, domains, constraints)

    print("Running AC-3 on Sudoku...")
    if csp.ac3():
        print("✓ AC-3 completed")

        # Check if solved by AC-3 alone
        if all(len(csp.domains[var]) == 1 for var in variables):
            print("✓ Solved by AC-3 alone (no search needed)!")
            solution = {var: list(csp.domains[var])[0] for var in variables}
        else:
            print("Running backtracking search...")
            solution = csp.backtracking_search()

        if solution:
            print("\nSolved Sudoku:")
            for i in range(9):
                if i % 3 == 0 and i > 0:
                    print()
                row = []
                for j in range(9):
                    if j % 3 == 0 and j > 0:
                        row.append('|')
                    row.append(str(solution[(i, j)]))
                print(' '.join(row))
            return solution
    else:
        print("✗ No solution (inconsistent puzzle)")

    return None


if __name__ == '__main__':
    # Test 1: Map coloring
    solve_map_coloring()
    print("\n" + "="*50 + "\n")

    # Test 2: Sudoku
    sudoku_grid = [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ]

    print("=== Sudoku with AC-3 ===")
    solve_sudoku_with_ac3(sudoku_grid)

"""
Graph Coloring - Assign colors to vertices so no adjacent vertices share a color

Mental Model: "Scheduling meetings in time slots with conflict constraints"

Problem: Color graph vertices with minimum colors such that adjacent vertices differ

Pattern Recognition:
- "assign values with neighbor constraints" → Graph Coloring (CSP variant)
- "minimize number of colors" → Chromatic number problem (NP-hard)
- "register allocation", "exam scheduling", "frequency assignment" → Real-world coloring

Key Insight:
Decision version (K colors enough?) is NP-complete
Optimization (find minimum K) is NP-hard
Greedy coloring: O(V + E), approximation (not always optimal)
Backtracking + pruning: Exact but exponential

Structure:
- Graph: adjacency list
- Colors: integers 0, 1, 2, ... (or actual colors)
- Coloring: dict {vertex: color}
- Constraints: adjacent vertices must have different colors

Behavior (Greedy):
1. Order vertices (heuristic: largest degree first)
2. For each vertex, assign smallest color not used by neighbors
3. Time: O(V^2), guarantees at most Δ+1 colors (Δ = max degree)

Behavior (Backtracking):
1. Try each color for current vertex
2. Recursively color remaining vertices
3. Backtrack if no valid color exists
4. Optimization: Use greedy bound to prune
"""

from collections import defaultdict
from typing import Dict, List, Set, Optional


class Graph:
    """Graph representation for coloring algorithms"""

    def __init__(self, vertices):
        self.V = vertices
        self.adj = defaultdict(set)

    def add_edge(self, u, v):
        """Add undirected edge"""
        self.adj[u].add(v)
        self.adj[v].add(u)

    def degree(self, v):
        """Return degree of vertex v"""
        return len(self.adj[v])


def greedy_coloring(graph, ordering=None):
    """
    Greedy graph coloring algorithm

    ordering: list of vertices (custom order), or None for default
    If None, uses Welsh-Powell ordering (largest degree first)

    Returns: (coloring dict, num_colors)

    Mental trace for triangle graph (0-1-2-0):
    - Order by degree: all degree 2 → [0,1,2]
    - Vertex 0: assign color 0
    - Vertex 1: neighbor 0 has color 0 → assign color 1
    - Vertex 2: neighbors 0,1 have colors 0,1 → assign color 2
    - Result: 3 colors (optimal for triangle)
    """
    if ordering is None:
        # Welsh-Powell: Order by degree descending
        ordering = sorted(graph.adj.keys(), key=graph.degree, reverse=True)

    coloring = {}

    for vertex in ordering:
        # Find colors used by neighbors
        neighbor_colors = {coloring[neighbor] for neighbor in graph.adj[vertex]
                          if neighbor in coloring}

        # Assign smallest available color
        color = 0
        while color in neighbor_colors:
            color += 1

        coloring[vertex] = color

    num_colors = max(coloring.values()) + 1 if coloring else 0
    return coloring, num_colors


def backtracking_coloring(graph, max_colors=None):
    """
    Exact graph coloring using backtracking

    Finds minimal coloring (chromatic number)
    Exponential time but optimal result

    max_colors: Upper bound on colors (use greedy result as initial bound)
    """
    vertices = list(graph.adj.keys())
    n = len(vertices)

    # Use greedy as upper bound if not provided
    if max_colors is None:
        _, max_colors = greedy_coloring(graph)

    best = {'coloring': None, 'num_colors': max_colors + 1}

    def is_safe(vertex, color, coloring):
        """Check if color is safe for vertex"""
        return all(coloring.get(neighbor) != color
                  for neighbor in graph.adj[vertex])

    def backtrack(v_idx, coloring, num_colors_used):
        # Pruning: Already using too many colors
        if num_colors_used >= best['num_colors']:
            return

        # All vertices colored
        if v_idx == n:
            if num_colors_used < best['num_colors']:
                best['coloring'] = coloring.copy()
                best['num_colors'] = num_colors_used
            return

        vertex = vertices[v_idx]

        # Try each color from 0 to num_colors_used (at most)
        for color in range(num_colors_used + 1):
            if is_safe(vertex, color, coloring):
                coloring[vertex] = color

                new_num_colors = max(num_colors_used, color + 1)
                backtrack(v_idx + 1, coloring, new_num_colors)

                del coloring[vertex]

    backtrack(0, {}, 0)
    return best['coloring'], best['num_colors']


def chromatic_number(graph):
    """
    Find chromatic number (minimum colors needed)

    Uses backtracking with iterative deepening:
    Try K=1, then K=2, ..., until valid coloring found
    """
    vertices = list(graph.adj.keys())
    n = len(vertices)

    def can_color_with_k(k):
        """Check if graph can be colored with k colors"""
        coloring = {}

        def backtrack(v_idx):
            if v_idx == n:
                return True

            vertex = vertices[v_idx]

            for color in range(k):
                if all(coloring.get(neighbor) != color
                      for neighbor in graph.adj[vertex]):
                    coloring[vertex] = color

                    if backtrack(v_idx + 1):
                        return True

                    del coloring[vertex]

            return False

        return backtrack(0)

    # Binary search on number of colors
    # Lower bound: max clique size or 2 (for connected graph)
    # Upper bound: greedy result or Δ+1
    _, upper = greedy_coloring(graph)
    lower = 1

    while lower < upper:
        mid = (lower + upper) // 2
        if can_color_with_k(mid):
            upper = mid
        else:
            lower = mid + 1

    return lower


class GraphColoringSolver:
    """
    Graph coloring solver with multiple strategies
    """
    def __init__(self, graph):
        self.graph = graph

    def solve(self, method='greedy'):
        """
        method='greedy': Fast approximation (Welsh-Powell)
        method='backtracking': Exact minimal coloring
        method='chromatic': Find chromatic number
        """
        if method == 'greedy':
            return greedy_coloring(self.graph)
        elif method == 'backtracking':
            return backtracking_coloring(self.graph)
        elif method == 'chromatic':
            chi = chromatic_number(self.graph)
            # Get actual coloring with chi colors
            coloring, _ = backtracking_coloring(self.graph, max_colors=chi)
            return coloring, chi
        else:
            raise ValueError(f"Unknown method: {method}")

    def visualize(self, coloring):
        """Print coloring"""
        color_names = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Pink', 'Brown']

        print("Vertex coloring:")
        for vertex in sorted(coloring.keys()):
            color_idx = coloring[vertex]
            color_name = color_names[color_idx] if color_idx < len(color_names) else f"Color{color_idx}"
            neighbors = list(self.graph.adj[vertex])
            print(f"  Vertex {vertex}: {color_name} (degree={len(neighbors)}, neighbors={neighbors})")


# Real-world applications
def schedule_exams(courses, conflicts):
    """
    Exam scheduling: Assign exams to time slots with conflict constraints

    courses: list of course IDs
    conflicts: list of (course1, course2) tuples (students in both)

    Returns: (schedule dict, num_time_slots)
    """
    graph = Graph(courses)
    for c1, c2 in conflicts:
        graph.add_edge(c1, c2)

    solver = GraphColoringSolver(graph)
    coloring, num_slots = solver.solve('greedy')

    print("=== Exam Schedule ===")
    schedule = defaultdict(list)
    for course, slot in coloring.items():
        schedule[slot].append(course)

    for slot in sorted(schedule.keys()):
        print(f"Time Slot {slot + 1}: {schedule[slot]}")

    print(f"\nTotal time slots needed: {num_slots}")
    return coloring, num_slots


def assign_registers(variables, conflicts):
    """
    Register allocation (compiler optimization)

    variables: list of program variables
    conflicts: list of (var1, var2) tuples (live at same time)

    Returns: register assignment dict
    """
    graph = Graph(variables)
    for v1, v2 in conflicts:
        graph.add_edge(v1, v2)

    solver = GraphColoringSolver(graph)
    coloring, num_registers = solver.solve('greedy')

    print("=== Register Allocation ===")
    registers = defaultdict(list)
    for var, reg in coloring.items():
        registers[reg].append(var)

    for reg in sorted(registers.keys()):
        print(f"Register R{reg}: {registers[reg]}")

    print(f"\nTotal registers needed: {num_registers}")
    return coloring, num_registers


if __name__ == '__main__':
    # Test 1: Simple graph (triangle)
    print("=== Triangle Graph ===")
    g1 = Graph([0, 1, 2])
    g1.add_edge(0, 1)
    g1.add_edge(1, 2)
    g1.add_edge(2, 0)

    solver1 = GraphColoringSolver(g1)

    print("Greedy coloring:")
    coloring_greedy, num_greedy = solver1.solve('greedy')
    solver1.visualize(coloring_greedy)
    print(f"Colors used: {num_greedy}\n")

    print("Backtracking (optimal):")
    coloring_bt, num_bt = solver1.solve('backtracking')
    solver1.visualize(coloring_bt)
    print(f"Colors used: {num_bt}\n")

    print(f"Chromatic number: {chromatic_number(g1)}\n")

    # Test 2: Petersen graph (famous graph, chromatic number = 3)
    print("=== Petersen Graph ===")
    g2 = Graph(range(10))
    edges = [(0,1), (1,2), (2,3), (3,4), (4,0),  # Outer pentagon
             (5,7), (7,9), (9,6), (6,8), (8,5),  # Inner star
             (0,5), (1,6), (2,7), (3,8), (4,9)]  # Connections
    for u, v in edges:
        g2.add_edge(u, v)

    solver2 = GraphColoringSolver(g2)
    coloring, num_colors = solver2.solve('greedy')
    print(f"Greedy coloring: {num_colors} colors")

    chi = chromatic_number(g2)
    print(f"Chromatic number: {chi}\n")

    # Test 3: Real-world - Exam scheduling
    print("=== Real-World Application ===")
    courses = ['CS101', 'CS102', 'MATH201', 'PHYS101', 'CHEM101', 'ENG101']
    conflicts = [
        ('CS101', 'CS102'),    # Many students take both
        ('CS101', 'MATH201'),
        ('CS102', 'MATH201'),
        ('PHYS101', 'MATH201'),
        ('CHEM101', 'PHYS101'),
    ]

    schedule_exams(courses, conflicts)
    print()

    # Test 4: Register allocation
    variables = ['a', 'b', 'c', 'd', 'e']
    var_conflicts = [
        ('a', 'b'),  # Live at same time
        ('a', 'c'),
        ('b', 'd'),
        ('c', 'd'),
        ('d', 'e'),
    ]

    assign_registers(variables, var_conflicts)

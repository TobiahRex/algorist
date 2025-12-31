"""
Traveling Salesman Problem (TSP) - Branch & Bound Solution

Mental Model: "Salesman visits all cities, returns home - minimize total distance"

Problem: Find shortest route visiting all cities exactly once and returning to start

Pattern Recognition:
- "visit all nodes exactly once" → Hamiltonian cycle
- "minimize total distance" → Optimization (not just feasibility)
- "exponential search space" → Branch & Bound with pruning

Key Insight:
Brute force: n! paths (factorial explosion)
Branch & Bound: Prune paths that can't possibly beat current best
Bounding function: Use MST of unvisited cities as lower bound
  (Optimistic: assumes we can connect remaining cities optimally)

Structure:
- Current path: partially built tour
- Best solution so far: incumbent (track globally)
- Lower bound: current_cost + MST(unvisited) + cost_to_return
- Priority queue: Explore most promising nodes first (best-first search)

Behavior:
1. Start from city 0, branch to all other cities
2. For each partial path, compute lower bound
3. If lower_bound >= best_complete_tour, prune (can't improve)
4. If path completes all cities, update best if better
5. Use priority queue to explore promising paths first (more pruning)
"""

import heapq
from typing import List, Tuple, Optional


def tsp_brute_force(dist_matrix):
    """
    Brute force: Try all permutations - O(n!)
    Only for comparison/small inputs (n <= 10)
    """
    n = len(dist_matrix)
    cities = list(range(1, n))  # Start from city 0

    def permute(cities_left, path, cost):
        if not cities_left:
            # Complete tour: return to start
            total = cost + dist_matrix[path[-1]][0]
            return total, path + [0]

        best_cost = float('inf')
        best_path = None

        for i, city in enumerate(cities_left):
            remaining = cities_left[:i] + cities_left[i+1:]
            new_cost = cost + dist_matrix[path[-1]][city]
            tour_cost, tour_path = permute(remaining, path + [city], new_cost)

            if tour_cost < best_cost:
                best_cost = tour_cost
                best_path = tour_path

        return best_cost, best_path

    return permute(cities, [0], 0)


def compute_mst_cost(dist_matrix, cities):
    """
    Minimum Spanning Tree cost for given cities (Prim's algorithm)
    Used as lower bound: optimistic estimate of connecting remaining cities

    Time: O(n^2) but cities list is small in practice
    """
    if len(cities) <= 1:
        return 0

    visited = {cities[0]}
    mst_cost = 0

    while len(visited) < len(cities):
        min_edge = float('inf')
        next_city = None

        for v in visited:
            for u in cities:
                if u not in visited:
                    if dist_matrix[v][u] < min_edge:
                        min_edge = dist_matrix[v][u]
                        next_city = u

        mst_cost += min_edge
        visited.add(next_city)

    return mst_cost


def tsp_branch_and_bound(dist_matrix):
    """
    Branch & Bound with MST lower bound

    State: (lower_bound, path, cost, unvisited)
    Bound: current_cost + MST(unvisited) + min_return_cost

    Mental trace for 4 cities:
    - Start: [0], bound = MST(1,2,3) + dist[0][1..3]
    - Branch: try [0,1], [0,2], [0,3]
    - For [0,1]: bound = cost(0→1) + MST(2,3) + min(dist[1][2], dist[1][3])
    - If bound >= best_complete, prune this branch
    - Continue with most promising (lowest bound) first
    """
    n = len(dist_matrix)
    best_cost = float('inf')
    best_path = None

    # Priority queue: (lower_bound, path, current_cost, unvisited_set)
    # Lower bound used as priority (explore promising nodes first)
    unvisited = set(range(1, n))
    initial_bound = compute_mst_cost(dist_matrix, list(range(n)))

    pq = [(initial_bound, [0], 0, frozenset(unvisited))]
    nodes_explored = 0
    nodes_pruned = 0

    while pq:
        lower_bound, path, cost, unvisited = heapq.heappop(pq)
        nodes_explored += 1

        # Pruning: If this path can't beat best, skip
        if lower_bound >= best_cost:
            nodes_pruned += 1
            continue

        # Base case: All cities visited
        if not unvisited:
            # Complete tour by returning to start
            total_cost = cost + dist_matrix[path[-1]][0]
            if total_cost < best_cost:
                best_cost = total_cost
                best_path = path + [0]
            continue

        # Branch: Try each unvisited city
        current_city = path[-1]

        for next_city in unvisited:
            new_path = path + [next_city]
            new_cost = cost + dist_matrix[current_city][next_city]
            new_unvisited = unvisited - {next_city}

            # Compute lower bound for this branch
            # = current_cost + MST(remaining) + min_cost_to_return
            mst_remaining = compute_mst_cost(dist_matrix, list(new_unvisited))

            # Estimate cost to close the tour (return to city 0)
            if new_unvisited:
                # Still more cities: estimate as min distance from next_city to any remaining
                min_return = min(dist_matrix[next_city][c] for c in new_unvisited)
            else:
                # No more cities: exact cost to return
                min_return = dist_matrix[next_city][0]

            new_bound = new_cost + mst_remaining + min_return

            # Only add to queue if promising
            if new_bound < best_cost:
                heapq.heappush(pq, (new_bound, new_path, new_cost, frozenset(new_unvisited)))

    print(f"Nodes explored: {nodes_explored}, Nodes pruned: {nodes_pruned}")
    return best_cost, best_path


def tsp_branch_bound_dfs(dist_matrix):
    """
    DFS variant of Branch & Bound (simpler, uses less memory)

    Uses global best to prune during DFS traversal
    No priority queue, but still effective with good pruning
    """
    n = len(dist_matrix)
    best = {'cost': float('inf'), 'path': None}

    def bound(path, cost, unvisited):
        """Lower bound for current partial path"""
        if not unvisited:
            return cost + dist_matrix[path[-1]][0]

        # Current cost + MST of remaining + min return
        mst_cost = compute_mst_cost(dist_matrix, list(unvisited))
        min_return = min(dist_matrix[path[-1]][c] for c in unvisited)
        return cost + mst_cost + min_return

    def dfs(path, cost, unvisited):
        # Prune if can't improve
        if bound(path, cost, unvisited) >= best['cost']:
            return

        # Complete tour
        if not unvisited:
            total = cost + dist_matrix[path[-1]][0]
            if total < best['cost']:
                best['cost'] = total
                best['path'] = path + [0]
            return

        # Branch to each unvisited city
        current = path[-1]
        for city in sorted(unvisited):  # Heuristic: try nearest cities first
            new_cost = cost + dist_matrix[current][city]
            dfs(path + [city], new_cost, unvisited - {city})

    dfs([0], 0, set(range(1, n)))
    return best['cost'], best['path']


class TSPSolver:
    """
    TSP solver with multiple strategies
    """
    def __init__(self, dist_matrix):
        self.dist = dist_matrix
        self.n = len(dist_matrix)

    def solve(self, method='branch_bound'):
        """
        method='brute_force': O(n!) - only for n <= 10
        method='branch_bound': Priority queue B&B (recommended)
        method='branch_bound_dfs': DFS B&B (simpler, less memory)
        """
        if method == 'brute_force':
            return tsp_brute_force(self.dist)
        elif method == 'branch_bound':
            return tsp_branch_and_bound(self.dist)
        elif method == 'branch_bound_dfs':
            return tsp_branch_bound_dfs(self.dist)
        else:
            raise ValueError(f"Unknown method: {method}")

    def visualize_tour(self, path):
        """Print tour with costs"""
        if not path:
            return

        print("Tour:", ' → '.join(map(str, path)))
        total = 0
        for i in range(len(path) - 1):
            cost = self.dist[path[i]][path[i+1]]
            total += cost
            print(f"  {path[i]} → {path[i+1]}: {cost}")
        print(f"Total cost: {total}")


# Real-world applications
def optimize_delivery_route(locations, depot_index=0):
    """
    Logistics: Find optimal delivery route starting and ending at depot

    locations: list of (x, y) coordinates
    Returns: (total_distance, route)
    """
    n = len(locations)

    # Compute Euclidean distance matrix
    dist_matrix = [[0] * n for _ in range(n)]
    for i in range(n):
        for j in range(n):
            if i != j:
                dx = locations[i][0] - locations[j][0]
                dy = locations[i][1] - locations[j][1]
                dist_matrix[i][j] = (dx**2 + dy**2) ** 0.5

    solver = TSPSolver(dist_matrix)
    return solver.solve('branch_bound')


if __name__ == '__main__':
    # Test case: Small symmetric TSP
    dist_matrix = [
        [0, 10, 15, 20],
        [10, 0, 35, 25],
        [15, 35, 0, 30],
        [20, 25, 30, 0]
    ]

    print("Distance matrix:")
    for row in dist_matrix:
        print(row)
    print()

    solver = TSPSolver(dist_matrix)

    # Compare methods
    print("=== Brute Force ===")
    cost_bf, path_bf = solver.solve('brute_force')
    solver.visualize_tour(path_bf)
    print()

    print("=== Branch & Bound (Priority Queue) ===")
    cost_bb, path_bb = solver.solve('branch_bound')
    solver.visualize_tour(path_bb)
    print()

    print("=== Branch & Bound (DFS) ===")
    cost_dfs, path_dfs = solver.solve('branch_bound_dfs')
    solver.visualize_tour(path_dfs)
    print()

    # Verify all methods find same optimal solution
    assert cost_bf == cost_bb == cost_dfs, "All methods should find same optimal cost"
    print(f"✓ All methods agree: optimal cost = {cost_bf}")

    # Real-world example: Delivery route
    print("\n=== Delivery Route Optimization ===")
    locations = [(0, 0), (2, 4), (5, 1), (3, 6), (7, 2)]
    cost, route = optimize_delivery_route(locations)
    print(f"Locations: {locations}")
    print(f"Optimal route: {route}")
    print(f"Total distance: {cost:.2f}")

"""
0/1 Knapsack - Branch & Bound Solution

Mental Model: "Thief choosing items for knapsack - maximize value, respect weight limit"

Problem: Given items with weights and values, select subset to maximize value
         without exceeding capacity (can't take fractions)

Pattern Recognition:
- "maximize value" + "capacity constraint" → 0/1 Knapsack
- "can't take fractions" → Discrete optimization (not greedy)
- "exponential choices" (2^n subsets) → Branch & Bound

Key Insight:
DP solution: O(n * capacity) - pseudo-polynomial (good for small capacity)
Branch & Bound: Better for large capacity, prunes unpromising branches
Upper bound: Fractional knapsack on remaining items (optimistic relaxation)

Structure:
- Node: (items_considered, current_value, current_weight, bound)
- Bound: current_value + fractional_knapsack(remaining_items, remaining_capacity)
- Best solution: track globally
- Priority queue: Explore highest bound first (best-first search)

Behavior:
1. For each item: branch into "take it" or "leave it"
2. Compute upper bound using fractional knapsack relaxation
3. If bound <= best_value_so_far, prune branch
4. Update best when complete solution found
5. Priority queue ensures we find good solutions early (better pruning)
"""

import heapq
from typing import List, Tuple


def fractional_knapsack_bound(items, capacity, current_value, current_weight, start_index):
    """
    Fractional knapsack relaxation for upper bound

    Greedy: Take items by value/weight ratio until capacity full
    Can take fractions of last item (optimistic!)

    This gives upper bound on what's achievable with remaining items
    If bound <= best_known, we can prune this branch
    """
    if current_weight >= capacity:
        return current_value

    # Sort remaining items by value/weight ratio (descending)
    remaining = [(items[i][1] / items[i][0], items[i][0], items[i][1], i)
                 for i in range(start_index, len(items))]
    remaining.sort(reverse=True)

    bound = current_value
    weight = current_weight

    for ratio, w, v, idx in remaining:
        if weight + w <= capacity:
            # Take entire item
            weight += w
            bound += v
        else:
            # Take fraction of item (relaxation!)
            fraction = (capacity - weight) / w
            bound += v * fraction
            break

    return bound


def knapsack_branch_bound(items, capacity):
    """
    Branch & Bound with fractional knapsack upper bound

    items: list of (weight, value) tuples
    capacity: max weight

    Returns: (max_value, selected_items_indices)

    Mental trace for items=[(2,3), (3,4), (4,5), (5,6)], capacity=8:
    - Root: bound = fractional([all], 8) = 13 (take all fractionally)
    - Branch: take item 0 (w=2,v=3) or skip
      - Take: bound = 3 + fractional([(3,4),(4,5),(5,6)], 6) = 3+10=13
      - Skip: bound = fractional([(3,4),(4,5),(5,6)], 8) = 13
    - Continue branching, prune when bound <= best_complete_solution
    """
    n = len(items)
    best_value = 0
    best_selection = []

    # Priority queue: (-upper_bound, level, current_value, current_weight, items_taken)
    # Negative bound for max-heap behavior
    initial_bound = fractional_knapsack_bound(items, capacity, 0, 0, 0)
    pq = [(-initial_bound, 0, 0, 0, [])]

    nodes_explored = 0
    nodes_pruned = 0

    while pq:
        neg_bound, level, value, weight, taken = heapq.heappop(pq)
        bound = -neg_bound
        nodes_explored += 1

        # Pruning: Can't beat current best
        if bound <= best_value:
            nodes_pruned += 1
            continue

        # All items considered
        if level == n:
            if value > best_value:
                best_value = value
                best_selection = taken[:]
            continue

        # Branch 1: Take item[level] (if fits)
        item_weight, item_value = items[level]
        if weight + item_weight <= capacity:
            new_value = value + item_value
            new_weight = weight + item_weight
            new_taken = taken + [level]

            # Compute bound for this branch
            new_bound = fractional_knapsack_bound(items, capacity, new_value, new_weight, level + 1)

            if new_bound > best_value:
                heapq.heappush(pq, (-new_bound, level + 1, new_value, new_weight, new_taken))

        # Branch 2: Skip item[level]
        skip_bound = fractional_knapsack_bound(items, capacity, value, weight, level + 1)

        if skip_bound > best_value:
            heapq.heappush(pq, (-skip_bound, level + 1, value, weight, taken))

    print(f"Nodes explored: {nodes_explored}, Nodes pruned: {nodes_pruned}")
    return best_value, best_selection


def knapsack_dp(items, capacity):
    """
    Dynamic Programming solution for comparison
    Time: O(n * capacity), Space: O(capacity)

    Better than B&B when capacity is small
    Worse when capacity is very large (pseudo-polynomial)
    """
    n = len(items)
    dp = [0] * (capacity + 1)

    for weight, value in items:
        # Iterate backwards to avoid using same item twice
        for w in range(capacity, weight - 1, -1):
            dp[w] = max(dp[w], dp[w - weight] + value)

    # Backtrack to find items
    selected = []
    w = capacity
    for i in range(n - 1, -1, -1):
        item_weight, item_value = items[i]
        if w >= item_weight and dp[w] == dp[w - item_weight] + item_value:
            selected.append(i)
            w -= item_weight

    return dp[capacity], selected[::-1]


def knapsack_branch_bound_dfs(items, capacity):
    """
    DFS variant: Simpler, less memory overhead

    Uses global best to prune during DFS
    No priority queue, but still effective
    """
    n = len(items)
    best = {'value': 0, 'items': []}

    def bound(level, value, weight):
        """Upper bound for current state"""
        return fractional_knapsack_bound(items, capacity, value, weight, level)

    def dfs(level, value, weight, taken):
        nonlocal best

        # All items considered
        if level == n:
            if value > best['value']:
                best['value'] = value
                best['items'] = taken[:]
            return

        # Pruning
        if bound(level, value, weight) <= best['value']:
            return

        # Branch 1: Take item (if fits)
        item_weight, item_value = items[level]
        if weight + item_weight <= capacity:
            dfs(level + 1, value + item_value, weight + item_weight, taken + [level])

        # Branch 2: Skip item
        dfs(level + 1, value, weight, taken)

    dfs(0, 0, 0, [])
    return best['value'], best['items']


class KnapsackSolver:
    """
    0/1 Knapsack solver with multiple strategies
    """
    def __init__(self, items, capacity):
        """
        items: list of (weight, value) tuples
        capacity: maximum weight
        """
        self.items = items
        self.capacity = capacity
        self.n = len(items)

    def solve(self, method='branch_bound'):
        """
        method='dp': Dynamic Programming (best for small capacity)
        method='branch_bound': Priority queue B&B (best for large capacity)
        method='branch_bound_dfs': DFS B&B (simpler, less memory)
        """
        if method == 'dp':
            return knapsack_dp(self.items, self.capacity)
        elif method == 'branch_bound':
            return knapsack_branch_bound(self.items, self.capacity)
        elif method == 'branch_bound_dfs':
            return knapsack_branch_bound_dfs(self.items, self.capacity)
        else:
            raise ValueError(f"Unknown method: {method}")

    def visualize_solution(self, selected_indices):
        """Print selected items and stats"""
        print("Selected items:")
        total_weight = 0
        total_value = 0

        for idx in selected_indices:
            weight, value = self.items[idx]
            total_weight += weight
            total_value += value
            print(f"  Item {idx}: weight={weight}, value={value}")

        print(f"\nTotal weight: {total_weight}/{self.capacity}")
        print(f"Total value: {total_value}")
        print(f"Utilization: {total_weight/self.capacity*100:.1f}%")


# Real-world applications
def optimize_cargo_loading(packages, truck_capacity):
    """
    Logistics: Load packages to maximize value while respecting weight limit

    packages: list of (weight_kg, value_dollars) tuples
    truck_capacity: max weight in kg

    Returns: (max_value, package_indices)
    """
    solver = KnapsackSolver(packages, truck_capacity)
    return solver.solve('branch_bound')


def select_investments(investments, budget):
    """
    Finance: Select projects to maximize ROI within budget

    investments: list of (cost, expected_return) tuples
    budget: available capital

    Returns: (max_return, selected_investment_indices)
    """
    solver = KnapsackSolver(investments, budget)
    value, selected = solver.solve('branch_bound')

    print("Investment Portfolio:")
    total_cost = 0
    total_return = 0
    for idx in selected:
        cost, ret = investments[idx]
        total_cost += cost
        total_return += ret
        print(f"  Investment {idx}: cost=${cost}k, return=${ret}k")

    print(f"\nTotal invested: ${total_cost}k / ${budget}k")
    print(f"Expected return: ${total_return}k")
    print(f"ROI: {(total_return/total_cost - 1)*100:.1f}%")

    return total_return, selected


if __name__ == '__main__':
    # Test case
    items = [
        (2, 3),   # Item 0: weight=2, value=3
        (3, 4),   # Item 1
        (4, 5),   # Item 2
        (5, 6),   # Item 3
        (9, 10),  # Item 4
    ]
    capacity = 10

    print(f"Items (weight, value): {items}")
    print(f"Capacity: {capacity}\n")

    solver = KnapsackSolver(items, capacity)

    # Compare methods
    print("=== Dynamic Programming ===")
    value_dp, selected_dp = solver.solve('dp')
    solver.visualize_solution(selected_dp)
    print()

    print("=== Branch & Bound (Priority Queue) ===")
    value_bb, selected_bb = solver.solve('branch_bound')
    solver.visualize_solution(selected_bb)
    print()

    print("=== Branch & Bound (DFS) ===")
    value_dfs, selected_dfs = solver.solve('branch_bound_dfs')
    solver.visualize_solution(selected_dfs)
    print()

    # Verify optimal value
    assert value_dp == value_bb == value_dfs, "All methods should find optimal value"
    print(f"✓ All methods agree: optimal value = {value_dp}\n")

    # Performance comparison for large capacity
    print("=== Large Capacity Test ===")
    items_large = [(i+1, (i+1)*2) for i in range(20)]
    capacity_large = 100

    solver_large = KnapsackSolver(items_large, capacity_large)

    print("DP approach:")
    value_dp_large, _ = solver_large.solve('dp')
    print(f"  Max value: {value_dp_large}\n")

    print("Branch & Bound approach:")
    value_bb_large, _ = solver_large.solve('branch_bound')
    print(f"  Max value: {value_bb_large}\n")

    # Real-world example
    print("=== Investment Selection ===")
    investments = [
        (50, 75),   # Project A: $50k cost, $75k return
        (30, 40),   # Project B
        (60, 90),   # Project C
        (20, 25),   # Project D
        (40, 55),   # Project E
    ]
    budget = 100

    select_investments(investments, budget)

# Depth: O(V) - In worst case, we visit all vertices
# Breadth: O(E) - In worst case, we examine all edges
# Final: O(E + V log V) with efficient priority queue

import heapq
from math import inf


def a_star_search(graph, start, goal, heuristic):
    open_set = [(0 + heuristic[start], 0, start, [start])]  # (f, g, node, path)
    closed_set = set()

    while open_set:
        _, g, current, path = heapq.heappop(open_set)

        if current == goal:
            return path, g

        if current in closed_set:
            continue

        closed_set.add(current)

        for neighbor, weight in graph[current].items():
            if neighbor in closed_set:
                continue

            new_g = g + weight
            new_f = new_g + heuristic[neighbor]
            new_path = path + [neighbor]

            heapq.heappush(open_set, (new_f, new_g, neighbor, new_path))

    return None, float("inf")  # No path found


# Example usage:
graph = {
    "A": {"B": 1, "C": 3},
    "B": {"A": 1, "C": 1, "D": 4},
    "C": {"A": 3, "B": 1, "D": 1},
    "D": {"B": 4, "C": 1},
}

# Heuristic values (straight-line distance to goal)
heuristic = {"A": 4, "B": 2, "C": 1, "D": 0}  # D is the goal

path, cost = a_star_search(graph, "A", "D", heuristic)
print(f"Path: {path}, Cost: {cost}")  # Output: Path: ['A', 'B', 'C', 'D'], Cost: 3


def a_star_path(graph, start, end, heuristic):
    """
    Find shortest path using A* search with a heuristic function.

    Args:
        graph: Dictionary of node -> list of (neighbor, weight) tuples
        start: Starting node
        end: Target node
        heuristic: Function that estimates cost from node to end

    Returns:
        shortest_path: List of nodes in the shortest path
        distance: Total distance of the path
    """
    # Priority queue for A*
    # (f_score, g_score, node, parent)
    open_set = [(heuristic(start, end), 0, start, None)]
    # g_score: cost from start to node
    g_scores = {start: 0}
    # f_score: g_score + heuristic
    f_scores = {start: heuristic(start, end)}
    # Closed set (visited nodes)
    closed_set = set()
    # Parents dictionary for path reconstruction
    parents = {start: None}

    while open_set:
        _, g_score, current, parent = heapq.heappop(open_set)

        # Update parent
        parents[current] = parent

        # If we reached the end, reconstruct path
        if current == end:
            path = []
            while current:
                path.append(current)
                current = parents[current]
            return path[::-1], g_score

        # Skip if already processed
        if current in closed_set:
            continue

        closed_set.add(current)

        # Process neighbors
        for neighbor, weight in graph[current]:
            if neighbor in closed_set:
                continue

            tentative_g = g_score + weight

            if neighbor not in g_scores or tentative_g < g_scores[neighbor]:
                # This path is better than any previous one
                parents[neighbor] = current
                g_scores[neighbor] = tentative_g
                f_scores[neighbor] = tentative_g + heuristic(neighbor, end)
                heapq.heappush(
                    open_set, (f_scores[neighbor], tentative_g, neighbor, current)
                )

    # No path exists
    return [], inf

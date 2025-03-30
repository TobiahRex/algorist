# Depth: O(V) - In worst case, we visit all vertices
# Breadth: O(E) - In worst case, we examine all edges
# Final: O(E + V log V) with efficient priority queue

import heapq


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

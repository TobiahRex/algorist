import heapq
from math import inf


def dijkstra(graph, start, end):
    """
    Find shortest path in a weighted graph using Dijkstra's algorithm.

    Args:
        graph: Dictionary of node -> list of (neighbor, weight) tuples
        start: Starting node
        end: Target node

    Returns:
        shortest_path: List of nodes in the shortest path
        distance: Total distance of the path
    """
    # Priority queue for Dijkstra
    # (distance, node, parent)
    priority_queue = [(0, start, None)]
    # Distances dictionary
    distances = {start: 0}
    # Parents dictionary for path reconstruction
    parents = {start: None}
    # Visited nodes
    visited = set()

    while priority_queue:
        distance, current, parent = heapq.heappop(priority_queue)

        # Skip if we've already found a better path
        if current in visited:
            continue

        # Update parent
        parents[current] = parent

        # If we reached the end, reconstruct path
        if current == end:
            path = []
            while current:
                path.append(current)
                current = parents[current]
            return path[::-1], distance

        visited.add(current)

        # Process neighbors
        for neighbor, weight in graph[current]:
            if neighbor in visited:
                continue

            new_distance = distance + weight

            # If we found a better path to neighbor
            if neighbor not in distances or new_distance < distances[neighbor]:
                distances[neighbor] = new_distance
                heapq.heappush(priority_queue, (new_distance, neighbor, current))

    # No path exists
    return [], inf

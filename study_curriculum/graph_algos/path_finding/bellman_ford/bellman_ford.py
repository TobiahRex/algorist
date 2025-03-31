from math import inf


def bellman_ford(graph, start, end):
    """
    Find shortest path with possible negative weights using Bellman-Ford.

    Args:
        graph: Dictionary of node -> list of (neighbor, weight) tuples
        start: Starting node
        end: Target node

    Returns:
        shortest_path: List of nodes in the shortest path
        distance: Total distance of the path
        has_negative_cycle: Boolean indicating if a negative cycle exists
    """
    # Get all nodes
    nodes = set(graph.keys())
    for neighbors in graph.values():
        for neighbor, _ in neighbors:
            nodes.add(neighbor)

    # Initialize distances and parents
    distances = {node: inf for node in nodes}
    distances[start] = 0
    parents = {node: None for node in nodes}

    # Relax edges |V|-1 times
    for _ in range(len(nodes) - 1):
        for node in graph:
            for neighbor, weight in graph[node]:
                if (
                    distances[node] != inf
                    and distances[node] + weight < distances[neighbor]
                ):
                    distances[neighbor] = distances[node] + weight
                    parents[neighbor] = node

    # Check for negative cycles
    has_negative_cycle = False
    for node in graph:
        for neighbor, weight in graph[node]:
            if (
                distances[node] != inf
                and distances[node] + weight < distances[neighbor]
            ):
                has_negative_cycle = True
                break

    # If end is unreachable or negative cycle exists
    if distances[end] == inf:
        return [], inf, has_negative_cycle

    # Reconstruct path
    path = []
    current = end
    while current:
        path.append(current)
        current = parents[current]

    return path[::-1], distances[end], has_negative_cycle

from math import inf


def floyd_warshall(graph):
    """
    Find all-pairs shortest paths using Floyd-Warshall algorithm.

    Args:
        graph: Dictionary of node -> list of (neighbor, weight) tuples

    Returns:
        distances: Dictionary of (u,v) -> shortest distance
        next_nodes: Dictionary for path reconstruction
    """
    # Get all nodes
    nodes = list(graph.keys())
    for neighbors in graph.values():
        for neighbor, _ in neighbors:
            if neighbor not in nodes:
                nodes.append(neighbor)

    # Initialize distances and next node matrix
    distances = {}
    next_nodes = {}

    # Set initial distances
    for u in nodes:
        for v in nodes:
            if u == v:
                distances[(u, v)] = 0
                next_nodes[(u, v)] = None
            else:
                distances[(u, v)] = inf
                next_nodes[(u, v)] = None

    # Initialize with direct edges
    for u in graph:
        for v, weight in graph[u]:
            distances[(u, v)] = weight
            next_nodes[(u, v)] = v

    # Floyd-Warshall algorithm
    for k in nodes:
        for i in nodes:
            for j in nodes:
                if distances[(i, k)] + distances[(k, j)] < distances[(i, j)]:
                    distances[(i, j)] = distances[(i, k)] + distances[(k, j)]
                    next_nodes[(i, j)] = next_nodes[(i, k)]

    # Helper function to reconstruct paths
    def get_path(u, v):
        if next_nodes[(u, v)] is None:
            return []

        path = [u]
        while u != v:
            u = next_nodes[(u, v)]
            path.append(u)

        return path

    return distances, next_nodes, get_path

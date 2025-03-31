from math import inf


def dag_shortest_path(graph, start, end):
    """
    Find shortest path in a DAG using topological sort + DP.

    Args:
        graph: Dictionary of node -> list of (neighbor, weight) tuples
        start: Starting node
        end: Target node

    Returns:
        shortest_path: List of nodes in the shortest path
        distance: Total distance of the path
    """

    # Perform topological sort
    def topological_sort():
        visited = set()
        temp = set()
        order = []

        def dfs(node):
            if node in temp:
                raise ValueError("Graph has a cycle - not a DAG")
            if node in visited:
                return

            temp.add(node)

            if node in graph:
                for neighbor, _ in graph[node]:
                    dfs(neighbor)

            temp.remove(node)
            visited.add(node)
            order.append(node)

        for node in graph:
            if node not in visited:
                dfs(node)

        return order[::-1]  # Reverse for correct topological order

    try:
        topo_order = topological_sort()
    except ValueError:
        return [], inf  # Not a DAG

    # Initialize distances and parents
    distances = {node: inf for node in graph}
    distances[start] = 0
    parents = {node: None for node in graph}

    # Process nodes in topological order
    for node in topo_order:
        if distances[node] != inf and node in graph:
            for neighbor, weight in graph[node]:
                if distances[node] + weight < distances.get(neighbor, inf):
                    distances[neighbor] = distances[node] + weight
                    parents[neighbor] = node

    # If end is unreachable
    if end not in distances or distances[end] == inf:
        return [], inf

    # Reconstruct path
    path = []
    current = end
    while current:
        path.append(current)
        current = parents.get(current)

    return path[::-1], distances[end]

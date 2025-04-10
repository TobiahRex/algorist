def dfs_path(graph, start, end):
    """
    Find any path in a graph using DFS.

    Args:
        graph: Dictionary of node -> list of neighbors
        start: Starting node
        end: Target node

    Returns:
        path: List of nodes in a path (not necessarily shortest)
    """

    def dfs_recursive(current, path, visited):
        if current == end:
            return path + [current]

        visited.add(current)

        for neighbor in graph[current]:
            if neighbor not in visited:
                result = dfs_recursive(neighbor, path + [current], visited)
                if result:
                    return result

        return None

    return dfs_recursive(start, [], set()) or []

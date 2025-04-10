from collections import deque


def bfs_shortest_path(graph, start, end):
    """
    Find shortest path in an unweighted graph using BFS.

    Args:
        graph: Dictionary of node -> list of neighbors
        start: Starting node
        end: Target node

    Returns:
        shortest_path: List of nodes in the shortest path
    """
    if start == end:
        return [start]

    # Queue for BFS
    queue = deque([start])
    # Track visited nodes and their parents
    visited = {start: None}

    while queue:
        current = queue.popleft()

        # Process neighbors
        for neighbor in graph[current]:
            if neighbor not in visited:
                visited[neighbor] = current
                queue.append(neighbor)

                # If we found the target, reconstruct path
                if neighbor == end:
                    path = [neighbor]
                    while current:
                        path.append(current)
                        current = visited[current]
                    return path[::-1]  # Reverse to get start->end

    # No path exists
    return []

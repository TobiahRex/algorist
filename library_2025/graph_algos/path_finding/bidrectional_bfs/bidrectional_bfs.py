from collections import deque


def bidirectional_bfs(graph, start, end):
    """
    Find shortest path using bidirectional BFS.

    Args:
        graph: Dictionary of node -> list of neighbors
        start: Starting node
        end: Target node

    Returns:
        shortest_path: List of nodes in the shortest path
    """
    if start == end:
        return [start]

    # Forward and backward queues
    forward_queue = deque([start])
    backward_queue = deque([end])

    # Track visited nodes and their parents
    forward_visited = {start: None}
    backward_visited = {end: None}

    # Track which direction reached each node
    forward_nodes = {start}
    backward_nodes = {end}

    def reconstruct_path(intersection, forward_parents, backward_parents):
        # Build path from start to intersection
        path = []
        node = intersection
        while node is not None:
            path.append(node)
            node = forward_parents[node]
        path = path[::-1]  # Reverse to get correct order

        # Build path from intersection to end (excluding intersection)
        node = backward_parents[intersection]
        while node is not None:
            path.append(node)
            node = backward_parents[node]

        return path

    while forward_queue and backward_queue:
        # Expand forward
        for _ in range(len(forward_queue)):
            current = forward_queue.popleft()

            for neighbor in graph[current]:
                if neighbor not in forward_visited:
                    forward_visited[neighbor] = current
                    forward_queue.append(neighbor)
                    forward_nodes.add(neighbor)

                    # Check if we found a connection
                    if neighbor in backward_nodes:
                        return reconstruct_path(
                            neighbor, forward_visited, backward_visited
                        )

        # Expand backward
        for _ in range(len(backward_queue)):
            current = backward_queue.popleft()

            for neighbor in graph[current]:
                if neighbor not in backward_visited:
                    backward_visited[neighbor] = current
                    backward_queue.append(neighbor)
                    backward_nodes.add(neighbor)

                    # Check if we found a connection
                    if neighbor in forward_nodes:
                        return reconstruct_path(
                            neighbor, forward_visited, backward_visited
                        )

    # No path exists
    return []

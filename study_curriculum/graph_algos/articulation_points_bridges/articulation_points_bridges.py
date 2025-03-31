# Depth: O(V) - We process each vertex once
# Breadth: O(E) - We process each edge once
# Final: O(V+E)


def find_articulation_points(graph):
    n = len(graph)
    discovery = {node: -1 for node in graph}
    low = {node: -1 for node in graph}
    articulation_points = set()
    time = [0]

    def dfs(u, parent):
        children = 0
        discovery[u] = low[u] = time[0]
        time[0] += 1

        for v in graph[u]:
            if v == parent:
                continue

            if discovery[v] == -1:  # If v is not visited
                children += 1
                dfs(v, u)

                low[u] = min(low[u], low[v])

                # Case 1: u is root and has multiple children
                if parent is None and children > 1:
                    articulation_points.add(u)

                # Case 2: u is not root and low value of one of its children
                # is more than or equal to discovery value of u
                if parent is not None and low[v] >= discovery[u]:
                    articulation_points.add(u)

            else:  # Update low value of u for already visited adjacent v
                low[u] = min(low[u], discovery[v])

    for node in graph:
        if discovery[node] == -1:
            dfs(node, None)

    return articulation_points


# Example usage:
graph = {
    "A": ["B", "C"],
    "B": ["A", "D"],
    "C": ["A", "D"],
    "D": ["B", "C", "E"],
    "E": ["D", "F", "G"],
    "F": ["E"],
    "G": ["E"],
}
print(find_articulation_points(graph))  # Output: {'D', 'E'}

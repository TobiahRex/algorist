# Depth: O(F) - Where F is the maximum flow value
# Breadth: O(E) - Each augmenting path can be found in O(E) time
# Final: O(E*F)


def ford_fulkerson(graph, source, sink):
    parent = {}
    max_flow = 0

    def bfs():
        nonlocal parent
        parent = {}
        visited = {source}
        queue = [source]

        while queue:
            u = queue.pop(0)
            for v in graph[u]:
                if v not in visited and residual_capacity[u][v] > 0:
                    queue.append(v)
                    visited.add(v)
                    parent[v] = u

        return sink in visited

    # Create residual capacity matrix
    residual_capacity = {u: {v: graph[u].get(v, 0) for v in graph} for u in graph}

    # Augment flow while there is a path from source to sink
    while bfs():
        # Find minimum residual capacity along the path
        path_flow = float("inf")
        s = sink
        while s != source:
            path_flow = min(path_flow, residual_capacity[parent[s]][s])
            s = parent[s]

        # Update residual capacities
        max_flow += path_flow
        s = sink
        while s != source:
            u = parent[s]
            residual_capacity[u][s] -= path_flow
            if s not in residual_capacity:
                residual_capacity[s] = {}
            if u not in residual_capacity[s]:
                residual_capacity[s][u] = 0
            residual_capacity[s][u] += path_flow
            s = parent[s]

    return max_flow


# Example usage:
graph = {
    "S": {"A": 3, "B": 2},
    "A": {"B": 1, "C": 3, "D": 4},
    "B": {"D": 2},
    "C": {"T": 2},
    "D": {"C": 1, "T": 3},
    "T": {},
}
print(ford_fulkerson(graph, "S", "T"))  # Output: 5

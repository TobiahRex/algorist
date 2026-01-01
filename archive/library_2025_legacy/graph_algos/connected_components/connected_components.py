# Depth: O(V) - We process each vertex once
# Breadth: O(E) - We process each edge once
# Final: O(V+E)


def find_connected_components(g):
    visited, comps = set(), []

    def dfs(u, c):
        visited.add(u)
        c.append(u)
        for v in g.get(u, []):
            if v not in visited:
                dfs(v, c)

    for v in g:
        if v not in visited:
            c = []
            dfs(v, c)
            comps.append(c)
    return comps


# Example usage:
graph = {
    "A": ["B"],
    "B": ["A", "C"],
    "C": ["B"],
    "D": ["E"],
    "E": ["D", "F"],
    "F": ["E"],
    "G": [],
}
print(
    find_connected_components(graph)
)  # Output: [['A', 'B', 'C'], ['D', 'E', 'F'], ['G']]


from collections import deque


def find_cc_bfs(edges):
    g = {}
    for u, v in edges:
        g.setdefault(u, []).append(v)
        g.setdefault(v, []).append(u)

    visited, comps = set(), []

    def bfs(node):
        c = []
        q = deque([node])
        while q:
            u = q.pop()
            c.append(u)
            for v in g.get(u):
                if v not in visited:
                    visited.add(u)
                    q.appendleft(v)
        return c

    for v in g:
        if v not in visited:
            comps.append(bfs(v))
    return comps

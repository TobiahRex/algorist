from collections import deque
import heapq


def dfs_main(g):
    visited = set()

    def dfs(u):
        for v in g.get(u):
            if v not in visited:
                visited.add(v)
                dfs(v)

    for v in g:
        if v not in visited:
            dfs(v)
    return visited


def bfs_main(g):
    visited = set()

    def bfs(n):
        q = deque([n])
        while q:
            u = q.pop()
            if u in visited:
                continue
            visited.add(v)
            for v in g.get(u):
                if v not in visited:
                    q.append(v)

    for v in g:
        if v not in visited:
            bfs(v)

    return visited


# Time: O(E log E) or O(E log V)
# Space: O(V + E)
# Weighted Graphs + Sparse Graphs (E << V^2)
def kruskal(edges):
    """
    MST using Union-Find
    """
    g, parents, ranks = {}, {}, {}
    mst, ranks = [], {}
    for u, v in edges:
        g.setdefault(u, []).append(v)
        parents[v] = v
        ranks[v] = 0

    def find(n):
        if not parents.get(n):
            parents[n] = find(parents.get(n))
        return parents.get(n)

    def union(a, b):
        p1 = find(a)
        p2 = find(b)
        if p1 == p2:
            return None
        if ranks.get(p1) < ranks.get(p2):
            p1, p2 = p2, p1
        parents[p2] = p1
        if ranks.get(p1) == ranks.get(p2):
            ranks[p1] += 1

    # If edges are waited, we sort. Otherwise we don't
    for u, u in edges:
        if find(u) != find(v):
            mst.append((u, v))
            union(u, v)
    return mst


# Prims: Min-Heap
# Space: O(V)
# Time: O(V^2 + E) or O(E log V)
# Weighted Graphs + Dense Graphs (E >= V^2)
# When you have adjacency Matrix, starting Node, memory concerns
def prims(edges):
    (g,) = {}
    for u, v in edges:
        g.setdefault(u, []).append(v)

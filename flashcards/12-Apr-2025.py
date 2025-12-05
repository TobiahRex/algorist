from collections import deque


def main_dfs(edges):
    g = {}
    for u, v in edges:
        g.setdefault(u, []).append(v)
        g.setdefault(v, []).append(u)

    visited = set()

    def dfs(u):
        for v in g.get(u):
            if v not in visited:
                visited.add(v)
                dfs(v)

    for v in g:
        dfs(v)
    return visited


def main_bfs(edges):
    g = {}
    for u, v in edges:
        g.setdefault(u, set()).add(v)
        g.setdefault(v, set()).add(u)
    visited = set()

    def bfs(node):
        q = deque([node])
        while q:
            u = q.pop()
            if u in visited:
                continue
            visited.add(u)
            for v in g.get(u, set()):
                if v not in visited:
                    q.extend(g.get(v) - visited)

    for v in g:
        if v not in visited:
            bfs(v)
    return visited


def main_bfs(g):
    seen = set()
    for node in g:
        if node not in seen:
            q = deque([node])
            while q:
                u = q.pop()
                if u in seen:
                    continue
                seen.add(u)
                for v in g.get(u, set()):
                    if v not in seen:
                        q.extendleft(g.get(v) - seen)
    return seen


def union_find(edges):
    parents, ranks = {}, {}
    for u, v in edges:
        parents[u] = u
        ranks[v] = 0

    def find(n):
        if n not in parents:
            parents[n] = find(parents.get(n))
        return parents.get(n)

    def union(a, b):
        p1, p2 = find(a), find(b)
        if p1 == p2:
            return
        if ranks.get(p1) < ranks.get(p2):
            p1, p2 = p2, p1
        parents[p2] = p1
        if ranks.get(p1) == ranks.get(p2):
            ranks[p1] += 1

    for u, v in edges:
        if find(v) != find(u):
            union(u, v)


import heapq


def prims(g):
    start = next(iter(g))
    visited, mst, min_heap = set(), [], [(0, start, None)]

    while min_heap:
        w, v, u = heapq.heappop(min_heap)
        if v in visited:
            continue
        visited.add(v)
        if u is not None:
            mst.append((u, v, w))
        for nv, nw in g.get(v, {}).items():
            if nv not in visited:
                heapq.heappush(min_heap, (nw, nv, v))
    return mst


def topo_kahn(edges):
    g, id, topo = {}, {}, []
    for u, v in edges:
        g.setdefault(u, []).append(v)
        id[u] = id.get(u, 0)
        id[v] = id.get(v, 0) + 1
    q = deque([u for u in id if id.get(u) == 0])
    while q:
        u = q.pop()
        topo.append(u)
        for v in g.get(u):
            id[v] -= 1
            if id.get(v) == 0:
                q.appendleft(v)
    return topo

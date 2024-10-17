def topological_sort(n, edges):
    g = build_graph(n, edges)
    has_cycle, topo = dfs(g)
    return [] if has_cycle else topo[::-1]


def dfs(g):
    visited, topo = set(), []
    CLOCK, arr, dep = 0, set(), set()
    stack = [next(iter(g))]
    while stack:
        u = stack.pop()


def build_graph(n, edges):
    g = {i: set() for i in range(n)}
    for u, v in edges:
        g[u].add(v)
    return g

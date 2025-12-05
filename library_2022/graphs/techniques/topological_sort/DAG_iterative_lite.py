from collections import deque

# Kahn's algo
def topological_sort(edges):
    g, in_degree = {}, {}
    for u, v in edges:
        g.setdefault(u, []).append(v)
        in_degree[u] = in_degree.get(u, 0)
        in_degree[v] = in_degree.get(v, 0) + 1

    q = deque([u for u in in_degree if in_degree[u] == 0])
    topo = []

    while q:
        u = q.popleft()
        topo.append(u)
        for v in g.get(u, []):
            in_degree[v] -= 1
            if in_degree[v] == 0:
                q.append(v)

    return topo if len(topo) == len(in_degree) else []


def dfs_iterative_coloring(g):
    topo = []
    arr, dep = set(), set()  # arr = GRAY, dep = BLACK
    stack = [next(iter(g))]
    while stack:
        u = stack.pop()
        if u in arr:  # Node is GRAY (being processed)
            if u not in dep:  # Haven't finished processing
                dep.add(u)  # Mark as BLACK
                topo.append(u)  # Add to topo sort since we've finished processing
            continue
        arr.add(u)  # Mark as GRAY
        stack.append(u)  # Re-add to process after neighbors
        for v in g[u]:
            if v in dep:  # Skip BLACK nodes
                continue
            if v in arr and v not in dep:  # Found GRAY node -> cycle
                return True, []
            if v not in arr:  # Process WHITE nodes
                stack.append(v)
    return False, topo


def build_graph(edges, g={}):
    g = {}
    for u, v in edges:
        g.setdefault(u, []).append(v)


def build_graph(n, edges):
    g = {i: set() for i in range(n)}
    for u, v in edges:
        g[u].add(v)
    return g

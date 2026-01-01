def find_cycle_coloring(edges):
    g, parent, rec_stack, visited = {}, {}, [], set()
    for u, v in edges:
        g.setdefault(u, []).append(v)
        g.setdefault(v, []).append(u)

    def dfs(u):
        if u in rec_stack:
            current = u
            cycle = []
            while current:
                cycle.append(current)
                if current == u and len(cycle) > 0:
                    break
                current = parent.get(current)
                if not current:
                    return None
            return cycle[::-1]

        if u in visited:
            return

        visited.add(u)
        rec_stack.append(u)
        for v in g.get(u):
            parent[v] = u
            cycle = dfs(v)
            if cycle:
                return cycle
        rec_stack.pop()
        if u in parent:
            del parent[u]
        return None

    for v in g.get(next(iter(g))):
        if v not in visited:
            cycle = dfs(v)
            if cycle:
                return cycle
    return []


def find_cycle_coloring(edges):
    g = {}
    for u, v in edges:
        g.setdefault(u, []).append(v)
        g.setdefault(v, []).append(u)

    visited = set()  # Black
    rec_stack = []  # Grey
    parents = {}

    def dfs(u):
        if u in rec_stack:
            current = u
            cycle = []
            while current:
                cycle.append(current)
                if current == u and len(cycle) > 1:
                    break
                current = parents.get(current)
                if not current:
                    return None
            return cycle[::-1]
        if u in visited:
            return None
        visited.add(u)
        rec_stack.append(u)
        for v in g.get(u, []):
            if v not in visited:
                cycle = dfs(v)
                if cycle:
                    return cycle
        rec_stack.pop()

    for v in g:
        if v not in visited:
            cycle = dfs(v)
            if cycle:
                return cycle
    return None

def pre_post_visit_cycle(edges):
    g = {}
    for u, v in edges:
        g.setdefault(u, []).append(v)
        g.setdefault(v, []).append(u)

    CLOCK = 0
    parents, pre, post = {}, {}, {}

    def get_cycle_path(v):
        current = v
        cycle = []
        while current:
            cycle.append(current)
            if current == v and len(cycle) > 1:
                break
            current = parents.get(current)
            if not current:
                return None
        return cycle[::-1]

    def dfs(u):
        nonlocal CLOCK
        CLOCK += 1
        pre[u] = CLOCK

        for v in g.get(u, []):
            # Skip parent to avoid trivial cycles
            if v in parents and parents[v] == u:
                continue

            if v not in pre:
                parents[v] = u
                cycle = dfs(v)
                if cycle:
                    return cycle
            elif v not in post:
                cycle = get_cycle_path(v)
                if cycle:
                    return cycle

        CLOCK += 1
        post[u] = CLOCK
        return None

    for n in g:
        if n not in pre:
            cycle = dfs(0, next(iter(g)))
            if cycle:
                return cycle
    return []


# When we need a cycle detection with a known path
def pre_post_visit_cycle(edges):
    g = {}
    for u, v in edges:
        g.setdefault(u, []).append(v)
        g.setdefault(v, []).append(u)

    CLOCK = 0
    pre, post, parents = {}, {}, {}

    def dfs(u):
        nonlocal CLOCK
        CLOCK += 1
        pre[u] = CLOCK
        for v in g.get(u, []):
            if v not in pre:
                parents[v] = u
                cycle = dfs(v)
                if cycle:
                    return cycle
            elif v not in post:
                if parents.get(v, None) == u:
                    continue
                current = v
                cycle = []
                while current:
                    cycle.append(current)
                    if current == v and len(cycle) > 1:
                        break
                    current = parents[current]
                    if not current:
                        return
                return cycle[::-1]
        CLOCK += 1
        post[v] = CLOCK
        return None

    for v in g:
        if v not in pre:
            cycle = dfs(v)
            if cycle:
                return cycle
    return None

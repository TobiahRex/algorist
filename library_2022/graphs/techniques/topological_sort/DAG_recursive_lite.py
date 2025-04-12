def topological_sort(edges):
    g, arr, dep, topo = {}, {}, {}, []
    for u, v in edges:
        g.setdefault(u, []).append(v)
        g.setdefault(v, [])

    def dfs(CLOCK, u):
        CLOCK += 1
        arr.setdefault(u, CLOCK)
        for v in g.get(u):
            if not arr.get(v):
                CLOCK = dfs(CLOCK, v)
            elif not dep.get(v):
                print("BACK edge")
            elif arr.get(u) < arr.get(v):
                print("FORWARD edge")
            elif arr.get(u) > arr.get(v):
                print("CROSS edge")
        CLOCK += 1
        dep.setdefault(u, CLOCK)
        topo.append(u)
        return CLOCK

    dfs(0, next(iter(g)))
    return topo[::-1]


if __name__ == "__main__":
    edges = [
        [0, 1],
        [0, 2],
        [0, 5],
        [1, 4],
        [2, 3],
        [3, 0],
        [3, 7],
        [4, 5],
        [4, 6],
        [4, 7],
        [5, 1],
        [5, 6],
        [7, 6],
        # ['', ''],
    ]
    print(topological_sort(edges))

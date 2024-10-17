def topological_sort(n, edges):
    adj_map = {i: set() for i in range(n)}
    for src, trgt in edges:
        adj_map[src].add(trgt)
    arr, dep, topo = [0] * n, [0] * n, []
    dfs(0, next(iter(adj_map)), adj_map, arr, dep, topo)
    return topo[::-1]


def dfs(CLOCK, u, g, arr, dep, topo):
    CLOCK += 1
    arr[u] = CLOCK
    for v in g.get(u):
        if not arr[v]:
            CLOCK = dfs(CLOCK, v, g, arr, dep, topo)
        elif not dep[v]:
            print("Back Edge: ", u, v)
        elif dep[v] and (arr[v] > arr[u]):
            print("Forward Edge", u, v)
        elif arr[v] < arr[u]:
            print("Cross Edge: ", u, v)
    CLOCK += 1
    dep[u] = CLOCK
    topo.append(u)
    return CLOCK


if __name__ == "__main__":
    args = {
        "n": 8,
        "edges": [
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
        ],
    }
    print(topological_sort(*args.values()))

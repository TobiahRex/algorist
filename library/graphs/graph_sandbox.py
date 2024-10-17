"""
Eulerian Cycle =
    Every node has even edges | means, the Start & End node will be same
    The graph has all edges in one-connected component.

Psuedo Code:
n = 5
1. Build Graph Matrix
    graph = {
        0: [1, 2, 3, 4],
        1: [0, 3],
        2: [0, 3],
        3: [0, 1, 2, 4],
        4: [0, 3]
    }
2. Traverse Graph: DFS
    visited = set()
    dfs:
        updated visited
    once finished:
        build unvisited list
        for unvisited:
            check to ensure those nodes have no edges.
"""
from collections import deque


def OPTIMAL_check_if_eulerian_cycle_exists(n, edges):
    out = [0] * n
    for i, j in edges:
        out[i] += 1
        out[j] += 1
    for o in out:
        if o & 1:
            return False
    return True


def check_if_eulerian_cycle_exists(n, edges):
    """
    Args:
     n(int32)
     edges(list_list_int32)
    Returns:
     bool
    """
    if not edges:
        return True
    adjacency_list = build_graph(edges)
    if not euler_cycle_possible(adjacency_list):
        return False
    visited = dfs(adjacency_list)
    if has_euler_cycle(adjacency_list, visited):
        return True
    return False


def has_euler_cycle(adj, visited):
    unvisited = visited - set(adj.keys())
    if len(unvisited) == 0:
        return True
    for node in unvisited:
        if adj.get(node):
            return False
    return True


def dfs(adj):
    first_node = next(iter(adj))
    stack = set([first_node])
    visited = set()
    while stack:
        node = stack.pop()
        visited.add(node)
        children = adj.get(node)
        [stack.add(child) for child in children if child not in visited]
    return visited


def euler_cycle_possible(adj):
    odds = 0
    for targets in adj.values():
        if len(targets) & 1:
            odds += 1
    return odds == 0


def build_graph(edges):
    adjacency_list = {}
    for start, end in edges:
        add_edge(adjacency_list, start, end)
        add_edge(adjacency_list, end, start)
    return adjacency_list


def add_edge(adj, n1, n2):
    if n1 not in adj:
        adj[n1] = set([n2])
    else:
        adj[n1].add(n2)


def convert_edge_list_to_adjacency_list(n, edges):
    adj_list = [set()] * n
    for source, target in edges:
        add_edge(adj_list, source, target)
        add_edge(adj_list, target, source)
    return [sorted(l) for l in adj_list]


def add_edge(m, s, t):
    if not m[s]:
        m[s] = set([t])
    else:
        m[s].add(t)


def convert_edge_list_to_adjacency_matrix(n, edges):
    matrix = {i: [0] * n for i in range(0, n)}
    for source, target in edges:
        matrix[source][target] = 1
        matrix[target][source] = 1
    return matrix.values()


def bfs_traversal(n, edges):
    g = build_graph(n, edges)
    visited, path = [None] * n, []
    bfs(g, next(iter(g)), visited, path)
    for i in range(0, n):
        if not visited[i]:
            bfs(g, i, visited, path)
    return path


def build_graph(n, edges):
    g = {i: set() for i in range(0, n)}
    for src, trgt in edges:
        g[src].add(trgt)
        g[trgt].add(src)
    return g


def bfs(g, start_v, visited, path):
    q = deque([start_v])
    q_log = {start_v: 1}
    while q:
        vertex = q.popleft()
        del q_log[vertex]
        visited[vertex] = 1
        path.append(vertex)
        for n in g.get(vertex):
            if not visited[n] and n not in q_log:
                q.append(n)
                q_log[n] = 1


def is_it_a_tree(node_count, *args, **kwargs):
    sets = [-1] * node_count
    is_tree, one_component = union_find(sets, node_count, *args, **kwargs)
    return is_tree and one_component


def union_find(s, node_count, edge_start, edge_end):
    set_count = node_count
    for i, v1 in enumerate(edge_start):
        v1_parent, v1_weight, v2, v2_parent, v2_weight = find_all(s, v1, edge_end[i])
        if has_cycle(v1, v1_parent, v2, v2_parent):
            return False, False
        union(s, v1_weight, v1_parent, v2_weight, v2_parent)
        set_count -= 1
    return True, set_count == 1


def find_all(sets, v1, v2):
    v1_parent, v1_weight = get_parent(sets, v1)
    v2_parent, v2_weight = get_parent(sets, v2)
    return v1_parent, v1_weight, v2, v2_parent, v2_weight


def has_cycle(v1, v1_p, v2, v2_p):
    return any([v1_p == v2, v2_p == v1, v1_p == v2_p])


def get_parent(s, v):
    weight = s[v]
    while weight >= 0:
        v = s[v]
        weight = s[v]
    return v, weight


def union(s, v1_w, v1_p, v2_w, v2_p):
    if v1_w <= v2_w:
        s[v1_p] += v2_w
        s[v2_p] = v1_p
    else:
        s[v2_p] += v1_w
        s[v1_p] = v2_p


# Connected components problem


def count_islands(matrix):
    if one_island(matrix):
        return 1
    islands = 0
    for i in range(len(matrix)):
        for j in range(len(matrix[0])):
            if matrix[i][j] == 1:
                islands += 1
                bfs(matrix, i, j)
    return islands


def bfs(matrix, row, col):
    q = deque([(row, col)])
    while q:
        r, c = q.pop()
        matrix[r][c] = 0
        for i in [-1, 0, 1]:
            for j in [-1, 0, 1]:
                if (i, j) == (0, 0):
                    continue
                (nr, nc) = (r + i, c + j)
                if oob(matrix, nr, nc):
                    continue
                if matrix[nr][nc]:
                    q.appendleft((nr, nc))


def oob(m, row, col):
    if 0 > row or row >= len(m) or 0 > col or col >= len(m[0]) or not m[row][col]:
        return True


def one_island(m):
    total = sum([sum(m[i]) for i in range(len(m))])
    return total == len(m) * len(m[0])


def max_island_size(grid):
    all_island, no_islands = scan_islands(grid)
    if all_island:
        return len(grid) * len(grid[0])
    if no_islands:
        return 0
    size = {"total": 0}
    for i in range(len(grid)):
        for j in range(len(grid[0])):
            if grid[i][j]:
                max_island_bfs(grid, i, j, size)
    return size.get("total")


def max_island_bfs(matrix, row, col, max_size):
    q = deque([(row, col)])
    size = 0
    while q:
        r, c = q.pop()
        size += 1
        matrix[row][col] = 0
        for i in [-1, 0, 1]:
            for j in [-1, 0, 1]:
                if abs(i) == abs(j):
                    continue
                nr, nc = r + i, c + j
                if oob(matrix, nr, nc):
                    continue
                if matrix[nr][nc]:
                    matrix[nr][nc] = 0
                    q.appendleft((nr, nc))
    calc_max(max_size, size)


def oob(m, row, col):
    if 0 > row or row >= len(m) or 0 > col or col >= len(m[0]) or not m[row][col]:
        return True


def calc_max(size, q_length):
    size["total"] = max(size.get("total"), q_length)


def scan_islands(g):
    all_island, no_island = True, True
    for row in g:
        island_count = sum(row)
        if len(row) != island_count:
            all_island = False
        if island_count:
            no_island = False
        if all([not all_island, not no_island]):
            break
    return all_island, no_island


def maxEvents(events):
    """Sort the events by their ending time. Intuitively we want to go to as many events as possible
    so that means we should prioritize (think greedily) the shortest events instead of the longest events.
    We can prioritize by sorting on the end times.

    Then we perform a union of all the days that map to events we're selecting to attend.
    We smartly point the last day of the selected event to the "next day" so as to answer the question:
    "What is my next avilable day if i attend event i?" (parents[start] = next available day). If the
    answer to this question is less than or equal to the scheduled end day `p <= end`, then we know it's in our interest
    to go to the event. Once we take the event, we move the pointer for next available day 1 value to the right.

    The result will be the maximum number of events we can attend given the scheduled events.
    """

    def find(p, v):
        if v == p[v]:
            return p[v]
        p[v] = find(p, p[v])
        return p[v]

    total = 0
    events.sort(key=lambda n: n[1])
    parents = list(range(0, events[-1][1] + 2))
    for start, end in events:
        p = find(parents, start)
        if p <= end:
            total += 1
            parents[p] += 1
    return total


def _maxEvents(events):
    def find(p, v):
        if p[v] != v:
            p[v] = find(p, p[v])  # decompression
        return p[v]

    events.sort(key=lambda n: n[1])  # sort by end-time
    # only need to consider days not later than the end of the last event
    parents = list(range(events[-1][1] + 2))
    ans = 0
    for start, end in events:
        # original: the next available day after the starting date of each event
        # toby: the next available start day given the current day's ending date.
        p = find(parents, start)
        # if the next start day is after the current end day, we can attent the current event.
        # We mark this day as unavailable by pointing it to the next start day

        # if this day is ahead of the end of the current event, we can
        # attend the current event, marking this day as unavailable
        if p <= end:
            ans += 1  # we attend the current event
            parents[p] = (
                p + 1
            )  # we show that the next start date has 1 dependent event (today)
    return ans


if __name__ == "__main__":
    # args = {
    #     "grid": [
    #         [1, 1, 0, 0, 1, 1],
    #         [1, 1, 0, 0, 1, 1],
    #         [0, 1, 1, 0, 1, 1],
    #         [0, 0, 1, 0, 1, 1],
    #         [0, 0, 1, 0, 0, 1],
    #         [0, 1, 1, 1, 0, 1],
    #     ]
    # }
    # args = {
    #     "grid": [
    #         [1],
    #         [1],
    #         [0],
    #         [1],
    #         [1]
    #     ]
    # }
    # print('Island size: ', max_island_size(**args))
    # print('Islands; ', count_islands_optimal(**args))
    result = maxEvents(
        [
            [1, 2],
            [2, 3],
            [2, 2],
            [3, 4],
            [1, 1],
        ]
    )
    # result = maxEvents([
    #     [1, 2],
    #     [2, 3],
    #     [3, 4],
    #     [2, 5],
    #     [1, 5],
    #     [1, 3],
    #     [3, 5]
    # ])
    print(result)

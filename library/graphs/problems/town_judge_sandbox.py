def find_town_judge(n, trust):
    if n == 2:
        return trust[0][1]
    g = build_graph(n, trust)
    state = {"max_in": 0, "zero_out": -1, "visited": [0] * (n + 1)}
    for i in g.keys():
        if not state["visited"][i]:
            bfs(g, i, state)
    judge = state.get("zero_out")
    if state.get("max_in") == (n - 1) and judge != -1:
        return judge
    return -1


def bfs(g, start_node, state):
    stack = [start_node]
    while stack:
        node = stack.pop()
        if not g.get(node):
            state["zero_out"] = node
        for n in g.get(node):
            if not state["visited"][n]:
                stack.append(n)
                state["visited"][n] += 1
            else:
                state["visited"][n] += 1
                state["max_in"] = max(state.get("max_in"), state["visited"][n])


def build_graph(n, edges):
    g = {i + 1: [] for i in range(n)}
    for src, trgt in edges:
        g[src].append(trgt)
    return g


if __name__ == "__main__":
    args = {"n": 3, "trust": [[1, 2], [2, 3], [3, 1], [3, 2]]}
    print("judge: ", find_town_judge(*args.values()))

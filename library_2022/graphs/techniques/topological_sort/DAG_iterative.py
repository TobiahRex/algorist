def topological_sort(n, edges):
    g = build_graph(edges)
    topo = get_topo_by_DFS_it(g)
    return topo


def get_topo_by_DFS_it(g):
    state = {"time": 0, "should_depart": False}
    stack = [next(iter(g))]
    topo = []
    while stack:
        node = g.get(stack[-1])
        check_arrival(node, state)
        for i in range(node.last_neighbor, len(node.neighbors)):
            n = node.neighbors[i]
            node.last_neighbor = i + 1
            if found_good_edge(state, node, n, stack):
                break  # breaking creates DFS behavior
            else:
                return []
        check_departure(state, node, topo, stack)
    return topo


def check_arrival(node, state):
    """Updates a node's internal state upon first visit.
    `should_depart` indicates that

    Args:
        node (dict): node is the current node popped off the stack to analyze.
        state (dict): time value and if the node is a first time visit.
    """
    if not node.arrival:
        state["time"] += 1
        node.arrival = state.get("time")
        node.visited = True
    state["should_depart"] = True


def check_departure(state, node, topo, stack):
    if state.get("should_depart") and not node.departure:
        state["time"] += 1
        node.departure = state.get("time")
        topo.append(stack.pop())
    # elif not state.get('should_depart'):
    # "node" has more neighbors to be added to the stack in the future.


def found_good_edge(state, node, n, stack):
    if not n.visited:
        stack.append(n.value)
        n.visited = True
        state[
            "should_depart"
        ] = False  # we want to inspect other children of parent (node)
        return True
    elif not n.departure:
        print(f"Back-Edge: From {node.value} To {n.value}")
        return False
    elif n.arrival < node.arrival:
        print(f"Cross-Edge: From {node.value} to {n.value}")
    elif n.departure and (node.arrival < n.arrival):
        print(f"Forward-Edge: {node.value} to {n.value}")
    return False


def build_graph(edges):
    class Node:
        def __init__(self, v, a=0, d=None):
            self.value = v
            self.arrival = a
            self.departure = d
            self.visited = False
            self.neighbors = []
            self.last_neighbor = 0

    g = {}
    for _u, _v in edges:
        u, v = g.get(_u, Node(_u)), g.get(_v, Node(_v))
        u.neighbors.append(v)
        g[_u] = u
        if _v not in g:
            g[_v] = v
    return g


def get_results(g, topo):
    topo.reverse()
    for n in topo:
        node = g.get(n)
        print([node.value, node.arrival, node.departure])
    return topo


if __name__ == "__main__":
    args = {
        "n": 8,
        "edges": [
            ["A", "B"],
            ["A", "C"],
            ["A", "F"],
            ["B", "E"],
            ["C", "D"],
            ["D", "A"],
            ["D", "H"],
            ["E", "F"],
            ["E", "G"],
            ["E", "H"],
            ["F", "B"],
            ["F", "G"],
            ["H", "G"],
            # ['', ''],
        ],
    }
    args_2 = {"n": 4, "edges": [[1, 0], [2, 0], [3, 1], [3, 2]]}
    topological_sort(*args_2.values())

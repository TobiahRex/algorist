from collections import defaultdict, deque, Counter

edges = [
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
]


class Solution:
    def is_bipartite(self, edges):
        self.build_edges(edges)
        self.visited = set()
        components = 0
        for _, node in edges:
            if node not in self.visited:
                components += 1
                is_bipartite = self.verify_bipartite(node)
                if not is_bipartite:
                    return False
        return True

    def build_graph(self, edges):
        self.adj_map = defaultdict(set)
        for u, v in edges:
            self.adj_map[u].add(v)

    def verify_bipartite(self, start):
        self.visited.add(start)
        distances, parents = Counter(), {}
        distances[start] = 0
        q = deque([start])
        while q:
            u = q.popleft()
            for v in self.adj_map[u]:
                if v not in self.visited:
                    self.visited.add(v)
                    parents[v] = u
                    distances[v] += 1
                    q.append(v)
                elif parents.get(u) != v:
                    # cycle
                    if distances.get(u) == distances.get(v):
                        # not bi-partite (odd length cycle found)
                        return False
        return True  # is bi-partite


Solution().is_bipartite(edges)

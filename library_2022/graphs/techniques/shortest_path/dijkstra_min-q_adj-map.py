class Graph:
    def __init__(self, edges, V):
        self.V = V
        self.adj_map = Graph.build_graph(V, edges)
        self.visited = set()
        self.distances = {}

    def dijkstra(self, start):
        self.visited.add(start)
        self.distances[start] = 0
        q = [start]
        while q:
            u = self.get_min(q)
            self.visited.add(u)
            for v, cost in self.adj_map.get(u):
                distance_u = self.get_distance(u)
                distance_v = self.get_distance(v)
                if distance_v > distance_u + cost:
                    self.distances[v] = distance_u + cost
                    q.append(v)

    def get_result(self):
        unvisited = set(list(self.adj_map.keys())) - self.visited
        max_delay = max(self.distances.values())
        return -1 if max_delay in [float("inf"), 0] or unvisited else max_delay

    def get_distance(self, vertex):
        if vertex in self.distances:
            return self.distances.get(vertex)
        self.distances[vertex] = float("inf")
        return self.distances.get(vertex)

    def get_min(self, q):
        for i in range(len(q) // 2 - 1, -1, -1):
            self.heapify(q, i, len(q))
        self.swap(q, 0, -1)
        return q.pop()

    def heapify(self, q, i, size):
        min_i, l, r = i, 2 * i + 1, 2 * i + 2
        distance_min = self.get_distance(q[min_i])
        if l < size and self.get_distance(q[l]) < distance_min:
            min_i = l
        if r < size and self.get_distance(q[r]) < distance_min:
            min_i = r
        if min_i != i:
            self.swap(q, min_i, i)
            self.heapify(q, min_i, size)

    @staticmethod
    def swap(a, l, r):
        a[l], a[r] = a[r], a[l]

    @staticmethod
    def build_graph(v, edges):
        adj_map = {i: set() for i in range(1, v + 1)}
        for u, v, c in edges:
            adj_map[u].add((v, c))
        return adj_map


class Solution:
    def networkDelayTime(self, times, n, k):
        g = Graph(times, n)
        g.dijkstra(k)
        return g.get_result()


# Solution().networkDelayTime(times=[[2,1,1], [2,3,1], [3,4,1]], n=4, k=2)
# Solution().networkDelayTime(times=[[1,2,1]], n=2, k=2)
# Solution().networkDelayTime(times=[[1, 2, 1], [2, 3, 2], [1, 3, 1]], n=3, k=2)
# Solution().networkDelayTime(times=[[1, 2, 1], [2, 3, 7], [1, 3, 4], [2, 1, 2]], n=3, k=2)


if __name__ == "__main__":
    result = Solution().networkDelayTime(
        [
            [4, 2, 76],
            [1, 3, 79],
            [3, 1, 81],
            [4, 3, 30],
            [2, 1, 47],
            [1, 5, 61],
            [1, 4, 99],
            [3, 4, 68],
            [3, 5, 46],
            [4, 1, 6],
            [5, 4, 7],
            [5, 3, 44],
            [4, 5, 19],
            [2, 3, 13],
            [3, 2, 18],
            [1, 2, 0],
            [5, 1, 25],
            [2, 5, 58],
            [2, 4, 77],
            [5, 2, 74],
        ],
        5,
        3,
    )
    print("Result: ", result)

4 - (76) > 2
1 - (79) > 3
3 - (81) > 1
4 - (30) > 3
2 - (47) > 1
1 - (61) > 5
1 - (99) > 4
3 - (68) > 4
3 - (46) > 5  # 1
4 - (6) > 1  # 3
5 - (7) > 4  # 2
5 - (44) > 3
4 - (19) > 5
2 - (13) > 3
3 - (18) > 2
1 - (0) > 2  # 4
5 - (25) > 1
2 - (58) > 5
2 - (77) > 4
5 - (74) > 2

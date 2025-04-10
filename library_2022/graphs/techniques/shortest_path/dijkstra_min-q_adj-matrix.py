class Matrix_Graph:
    def __init__(self, verts, matrix):
        self.verts = verts
        self.matrix = matrix
        self.dist = {}

    def get_distance(self, v):
        if v in self.dist:
            return self.dist.get(v)
        self.dist[v] = float("inf")
        return self.dist.get(v)

    def dijkstra(self, start):
        visited = set([start])
        self.dist[start] = 0
        q = [(start, start)]
        path = []
        while q:
            u, prev_u = self.get_min(q)
            visited.add(u)
            path.append((u, prev_u))
            for v, weight in enumerate(self.matrix[u]):
                if not weight or v in visited:
                    continue
                dist_u = self.get_distance(u)
                dist_v = self.get_distance(v)
                if dist_v > dist_u + weight:
                    self.dist[v] = dist_u + weight
                    q.append((v, u))
        print("Paths: ", path)
        return sum(self.dist.values())

    def get_min(self, q):
        for i in range(len(q) // 2 - 1, -1, -1):  # 7
            self.heapify(q, i, len(q))
        self.swap(q, 0, -1)
        return q.pop()

    def heapify(self, q, i, size):
        min_i, l, r = i, 2 * i + 1, 2 * i + 2
        dist_min = self.get_distance(q[min_i][0])
        if l < size and self.get_distance(q[l][0]) < dist_min:
            min_i = l
        if r < size and self.get_distance(q[r][0]) < dist_min:
            min_i = r
        if min_i != i:
            self.swap(q, min_i, i)
            self.heapify(q, min_i, size)

    @staticmethod
    def swap(l, a, b):
        l[a], l[b] = l[b], l[a]

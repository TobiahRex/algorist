from collections import deque


class DSU:
    def __init__(self, n):
        self.parents = [None] * n
        self.rank = [0]*n
        self.rank[0] = float('inf')

    def make_set(self, v):
        self.parents[v] = v
        self.rank[v] = 1

    def find_parent(self, v):
        if self.parents[v] == v:
            return v
        self.parents[v] = self.find_parent(self.parents[v])
        return self.parents[v]

    def union(self, v1, v2):
        p1, p2 = self.find_parent(v1), self.find_parent(v2)
        if p1 != p2:
            if self.rank[p2] > self.rank[p1]:
                p1, p2 = p2, p1
            self.parents[p2] = p1
            self.rank[p1] += 1


class Solution:
    def minReorder(self, n, connections):
        dsu = DSU(n)
        for i in range(n):
            dsu.make_set(i)
        count = 0
        q = deque(connections)
        while q:
            print('q_size', len(q))
            u, v = q.pop()
            if 0 in [v, dsu.find_parent(v)]:  # no count: road is pointing to 0
                dsu.union(0, u)
            elif dsu.find_parent(u) == 0:  # add count: road was pointing away from 0
                count += 1
                dsu.union(u, v)
            # else:
            #     q.appendleft([u, v])
        return count

def min_test():
    v = [10, 8, 6, 4, 2]
    r = min((
            [True, -1, 1],
            [True, -2, 30],
            [True, -1, 3],
            [True, -2, 4],
            [True, -2, 5],
        )
    )
    print(r)

if __name__ == '__main__':
    min_test()
# Depth: O(E log E) - Sorting edges
# Breadth: O(E log V) - Union-Find operations
# Final: O(E log E)


def kruskal_algorithm(vertices, edges):
    # Union-Find data structure
    parent = {v: v for v in vertices}
    rank = {v: 0 for v in vertices}

    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])  # Path compression
        return parent[x]

    def union(x, y):
        p1 = find(x)
        p2 = find(y)

        if p1 == p2:
            return

        # Union by rank using a swap pattern
        if rank[p1] < rank[p2]:
            p1, p2 = p2, p1
        parent[p2] = p1
        if rank[p1] == rank[p2]:
            rank[p1] += 1

    # Sort edges by weight
    edges.sort(key=lambda x: x[2])

    mst = []
    for u, v, weight in edges:
        if find(u) != find(v):  # Check if adding this edge creates a cycle
            union(u, v)
            mst.append((u, v, weight))

    return mst


# Example usage:
vertices = {"A", "B", "C", "D"}
edges = [("A", "B", 1), ("A", "C", 4), ("B", "C", 2), ("B", "D", 5), ("C", "D", 3)]
print(
    kruskal_algorithm(vertices, edges)
)  # Output: [('A', 'B', 1), ('B', 'C', 2), ('C', 'D', 3)]

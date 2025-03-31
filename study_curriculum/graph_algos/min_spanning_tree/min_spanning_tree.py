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
        root_x = find(x)
        root_y = find(y)

        if root_x == root_y:
            return

        # Union by rank
        if rank[root_x] < rank[root_y]:
            parent[root_x] = root_y
        elif rank[root_x] > rank[root_y]:
            parent[root_y] = root_x
        else:
            parent[root_y] = root_x
            rank[root_x] += 1

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

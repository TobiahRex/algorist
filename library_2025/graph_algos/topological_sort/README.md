# Topological Sort

Ordering vertices such that for every directed edge (u, v), vertex u comes before v in the ordering.

```python
# Depth: O(V) - We process each vertex once
# Breadth: O(E) - We process each edge once
# Final: O(V+E)

def topological_sort(graph):
    visited = set()
    topo = []
    
    def dfs(node):
        visited.add(node)
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                dfs(neighbor)
        topo.append(node)
    
    for node in graph:
        if node not in visited:
            dfs(node)
    
    return topo[::-1]  # Reverse to get correct topological order

# Example usage:
graph = {
    'A': ['C'],
    'B': ['C', 'D'],
    'C': ['E'],
    'D': ['F'],
    'E': ['F', 'H'],
    'F': ['G'],
    'G': [],
    'H': []
}
print(topological_sort(graph))  # Output: ['B', 'A', 'C', 'D', 'E', 'F', 'H', 'G']
```

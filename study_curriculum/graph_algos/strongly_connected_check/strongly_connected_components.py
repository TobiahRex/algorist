# Depth: O(V) - We process each vertex twice
# Breadth: O(E) - We process each edge twice
# Final: O(V+E)


def kosaraju_algorithm(graph):
    finishing_order = []
    strongly_connected_components = []

    def dfs_first_pass(node):
        visited.add(node)
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                dfs_first_pass(neighbor)
        finishing_order.append(node)

    def dfs_second_pass(node, component):
        visited.add(node)
        component.append(node)
        for neighbor in reversed_graph.get(node, []):
            if neighbor not in visited:
                dfs_second_pass(neighbor, component)

    # Create reversed graph
    reversed_graph = {}
    for node in graph:
        for neighbor in graph[node]:
            if neighbor not in reversed_graph:
                reversed_graph[neighbor] = []
            reversed_graph[neighbor].append(node)
            if node not in reversed_graph:
                reversed_graph[node] = []

    # First DFS pass to get finishing order
    visited = set()
    for node in graph:
        if node not in visited:
            dfs_first_pass(node)

    # Second DFS pass to find SCCs
    visited = set()
    for node in reversed(finishing_order):
        if node not in visited:
            component = []
            dfs_second_pass(node, component)
            strongly_connected_components.append(component)

    return strongly_connected_components


# Example usage:
graph = {
    "A": ["B"],
    "B": ["C", "E", "F"],
    "C": ["D", "G"],
    "D": ["C", "H"],
    "E": ["A", "F"],
    "F": ["G"],
    "G": ["F"],
    "H": ["D", "G"],
}
print(
    kosaraju_algorithm(graph)
)  # Output: [['A', 'E', 'B'], ['F', 'G'], ['C', 'D', 'H']]

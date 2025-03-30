# Connected Components Detection

Finding all connected components in an undirected graph.

```mermaid
flowchart TD
    Start[Start] --> Init[Initialize visited set and components list]
    Init --> Loop[For each node in graph]
    Loop --> VisitedCheck{Is node visited?}
    VisitedCheck --> |Yes| NextNode[Next Node]
    NextNode --> Loop
    
    VisitedCheck --> |No| CreateComp[Create new component]
    CreateComp --> DFS[DFS from current node]
    
    DFS --> NeighborLoop[For each neighbor]
    NeighborLoop --> NeighborCheck{Is neighbor visited?}
    NeighborCheck --> |Yes| NextNeighbor[Next Neighbor]
    NextNeighbor --> NeighborLoop
    
    NeighborCheck --> |No| AddToComp[Add neighbor to component]
    AddToComp --> MarkVisited[Mark neighbor as visited]
    MarkVisited --> DFS
    
    NeighborLoop --> |Done| AddComp[Add component to components list]
    AddComp --> NextNode
    
    Loop --> |Done| Return[Return components list]
    
    %% Style definitions
    classDef decision fill:#ffff00,stroke:#333,stroke-width:2px,color:#000
    classDef yes fill:#98FB98,stroke:#333,stroke-width:2px,color:#000
    classDef no fill:#FF4444,stroke:#333,stroke-width:2px,color:#000
    classDef loop fill:#87CEEB,stroke:#333,stroke-width:2px,color:#000
    
    %% Apply styles to decision points
    class VisitedCheck,NeighborCheck decision
    
    %% Apply styles to Yes paths and boxes
    class NextNode,NextNeighbor yes
    
    %% Apply styles to No paths and boxes
    class CreateComp,AddToComp,MarkVisited,AddComp no
    
    %% Apply styles to loop elements
    class Loop,NeighborLoop,DFS loop
    
    %% Style the edges
    linkStyle 3,7 stroke:#98FB98,stroke-width:2px  %% Yes paths
    linkStyle 4,8 stroke:#FF4444,stroke-width:2px  %% No paths
    linkStyle 0,1,2,5,6,9,10,11,12,13,14,15 stroke:#87CEEB,stroke-width:2px  %% Loop paths
```

```python
# Depth: O(V) - We process each vertex once
# Breadth: O(E) - We process each edge once
# Final: O(V+E)

def find_connected_components(graph):
    visited = set()
    components = []
    
    def dfs(node, component):
        visited.add(node)
        component.append(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                dfs(neighbor, component)
    
    for node in graph:
        if node not in visited:
            component = []
            dfs(node, component)
            components.append(component)
    
    return components

# Example usage:
graph = {
    'A': ['B'],
    'B': ['A', 'C'],
    'C': ['B'],
    'D': ['E'],
    'E': ['D', 'F'],
    'F': ['E'],
    'G': []
}
print(find_connected_components(graph))  # Output: [['A', 'B', 'C'], ['D', 'E', 'F'], ['G']]
```
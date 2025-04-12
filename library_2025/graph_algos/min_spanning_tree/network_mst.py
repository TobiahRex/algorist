import heapq
from collections import defaultdict
from typing import List, Tuple, Dict, Set, Optional
import math


class NetworkDesigner:
    """
    Designs optimal network infrastructure using MST algorithms.
    """

    def __init__(
        self,
        locations: List[Tuple[float, float]],
        existing_connections: Optional[List[Tuple[int, int]]] = None,
    ):
        """
        Initialize with location coordinates and any existing connections.

        Args:
            locations: List of (x, y) coordinates for each location
            existing_connections: List of (node1, node2) pairs for connections that already exist
        """
        self.locations = locations
        self.num_locations = len(locations)
        self.existing_connections = existing_connections or []

    def calculate_distance(self, node1: int, node2: int) -> float:
        """Calculate Euclidean distance between two locations."""
        x1, y1 = self.locations[node1]
        x2, y2 = self.locations[node2]
        return math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)

    def calculate_cost(
        self,
        node1: int,
        node2: int,
        terrain_factors: Optional[Dict[Tuple[int, int], float]] = None,
    ) -> float:
        """
        Calculate connection cost based on distance and terrain factors.

        Args:
            node1, node2: Indices of locations to connect
            terrain_factors: Dictionary mapping (node1, node2) to a multiplier for difficulty

        Returns:
            Cost of connection
        """
        # Check if connection already exists (free)
        if (node1, node2) in self.existing_connections or (
            node2,
            node1,
        ) in self.existing_connections:
            return 0

        # Basic cost is distance
        cost = self.calculate_distance(node1, node2)

        # Apply terrain factor if provided
        if terrain_factors:
            edge = (
                min(node1, node2),
                max(node1, node2),
            )  # Normalize edge representation
            factor = terrain_factors.get(edge, 1.0)
            cost *= factor

        return cost

    def design_with_kruskal(
        self, terrain_factors: Optional[Dict[Tuple[int, int], float]] = None
    ) -> List[Tuple[int, int, float]]:
        """
        Design optimal network using Kruskal's algorithm.

        Args:
            terrain_factors: Dictionary mapping (node1, node2) to a multiplier for difficulty

        Returns:
            List of (node1, node2, cost) for optimal connections
        """
        # Initialize Union-Find data structure
        parent = list(range(self.num_locations))
        rank = [0] * self.num_locations

        def find(x: int) -> int:
            """Find root of node x with path compression."""
            if parent[x] != x:
                parent[x] = find(parent[x])
            return parent[x]

        def union(x: int, y: int) -> None:
            """Union by rank."""
            root_x = find(x)
            root_y = find(y)

            if root_x == root_y:
                return

            if rank[root_x] < rank[root_y]:
                parent[root_x] = root_y
            else:
                parent[root_y] = root_x
                if rank[root_x] == rank[root_y]:
                    rank[root_x] += 1

        # Create all potential edges
        edges = []
        for i in range(self.num_locations):
            for j in range(i + 1, self.num_locations):
                cost = self.calculate_cost(i, j, terrain_factors)
                edges.append((i, j, cost))

        # Sort edges by cost
        edges.sort(key=lambda x: x[2])

        # Apply Kruskal's algorithm
        mst = []
        for u, v, weight in edges:
            if find(u) != find(v):
                union(u, v)
                mst.append((u, v, weight))
                # If we have n-1 edges, we're done
                if len(mst) == self.num_locations - 1:
                    break

        return mst

    def design_with_prim(
        self, terrain_factors: Optional[Dict[Tuple[int, int], float]] = None
    ) -> List[Tuple[int, int, float]]:
        """
        Design optimal network using Prim's algorithm.

        Args:
            terrain_factors: Dictionary mapping (node1, node2) to a multiplier for difficulty

        Returns:
            List of (node1, node2, cost) for optimal connections
        """
        # Create adjacency list with costs
        adj_list = defaultdict(list)
        for i in range(self.num_locations):
            for j in range(i + 1, self.num_locations):
                cost = self.calculate_cost(i, j, terrain_factors)
                adj_list[i].append((j, cost))
                adj_list[j].append((i, cost))

        # Start with first node
        start_node = 0

        # Track nodes in MST
        in_mst = set([start_node])

        # Priority queue for edges
        edge_heap = []
        for neighbor, cost in adj_list[start_node]:
            heapq.heappush(edge_heap, (cost, start_node, neighbor))

        mst = []

        # Continue until all nodes are in MST
        while edge_heap and len(in_mst) < self.num_locations:
            cost, u, v = heapq.heappop(edge_heap)

            if v not in in_mst:
                in_mst.add(v)
                mst.append((u, v, cost))

                # Add edges from newly added node
                for neighbor, edge_cost in adj_list[v]:
                    if neighbor not in in_mst:
                        heapq.heappush(edge_heap, (edge_cost, v, neighbor))

        return mst

    def calculate_total_cost(self, mst: List[Tuple[int, int, float]]) -> float:
        """Calculate total cost of MST."""
        return sum(cost for _, _, cost in mst)

    def visualize_network(self, mst: List[Tuple[int, int, float]]) -> str:
        """Return ASCII visualization of network."""
        # Simple ASCII visualization - in real implementation, would use matplotlib or similar
        result = "Network Design Visualization:\n"
        result += f"Total locations: {self.num_locations}\n"
        result += f"Total connections: {len(mst)}\n"
        result += f"Total cost: {self.calculate_total_cost(mst):.2f}\n\n"

        result += "Connections:\n"
        for u, v, cost in mst:
            result += f"  Location {u} to Location {v}: Cost = {cost:.2f}\n"

        return result


# Example usage
if __name__ == "__main__":
    # Example locations (x, y coordinates)
    locations = [
        (0, 0),  # Location 0
        (10, 10),  # Location 1
        (20, 0),  # Location 2
        (10, -10),  # Location 3
        (30, 10),  # Location 4
    ]

    # Existing connections (free to use)
    existing_connections = [(0, 1)]

    # Terrain factors (multipliers for difficulty/cost)
    terrain_factors = {
        (1, 2): 1.5,  # Rocky terrain between locations 1 and 2
        (2, 4): 2.0,  # Mountainous area between locations 2 and 4
    }

    # Create network designer
    designer = NetworkDesigner(locations, existing_connections)

    # Design network using Kruskal's algorithm
    kruskal_mst = designer.design_with_kruskal(terrain_factors)
    print("Design using Kruskal's algorithm:")
    print(designer.visualize_network(kruskal_mst))

    # Design network using Prim's algorithm
    prim_mst = designer.design_with_prim(terrain_factors)
    print("Design using Prim's algorithm:")
    print(designer.visualize_network(prim_mst))

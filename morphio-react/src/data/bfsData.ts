import type { PatternProblem } from '../redux/types';

export const bfsProblems: PatternProblem[] = [
  {
    id: 'levelOrderTraversal',
    name: 'Binary Tree Level Order Traversal',
    difficulty: 'medium',
    description: 'Traverse tree level by level, return 2D array of level values',
    examples: [
      {
        input: { tree: '(3,(9),(20,(15),(7)))' },
        display: 'Tree with 3 at root, 9 left, 20 right (15,7 children)',
        expected: [[3], [9, 20], [15, 7]],
      },
      {
        input: { tree: '(1)' },
        display: 'Single node tree',
        expected: [[1]],
      },
      {
        input: { tree: '(1,(2),(3),(4),(5))' },
        display: 'Tree with 1 root, 2,3,4,5 at level 1',
        expected: [[1], [2, 3, 4, 5]],
      },
    ],
    mnemonicEmoji: '📊',
    mnemonicPerson: 'Level Scanner',
    mnemonicObject: 'Queue of Nodes',
    mnemonicAction: 'Processing by depth',
    mnemonicStory:
      'Start at root, scan all neighbors level by level. Use queue: add children as you process parents. First in, first out ensures level-order guarantee.',
        realWorldUses: [
      {
        icon: "📊",
        title: "Printer Queue Job Scheduling",
        description: "Print servers queue jobs in level-order (FIFO). BFS explores queue breadth-first ensuring jobs from same batch are grouped, improving cache locality and throughput on multi-printer systems.",
      },
      {
        icon: "🌐",
        title: "Web Crawler Multi-Level Discovery",
        description: "Web crawlers use BFS to discover pages level-by-level. Starting from seed URLs, they fetch all pages one hop away, then two hops, etc. Ensures breadth-first indexing and crawl efficiency for Google's spider.",
      },
      {
        icon: "🎮",
        title: "Game AI Enemy Detection Radius",
        description: "Game engines use BFS to find all enemies within attack radius, level-by-level from player. Efficient for dynamic range queries and LOD (level-of-detail) optimization in 3D games.",
      },
      {
        icon: "🏥",
        title: "Hospital Room Allocation",
        description: "Hospital systems find available rooms level-by-level (floor 1, then floor 2, etc). BFS ensures nearby rooms are allocated first, reducing patient transfer distances.",
      },
      {
        icon: "📱",
        title: "Social Network Friend Recommendations",
        description: "Facebook's friend suggestion uses BFS to explore connections: direct friends (1 hop), friends of friends (2 hops), etc. Ranking by hop distance provides relevance.",
      },
    ],
  },
  {
    id: 'shortestPathUnweighted',
    name: 'Shortest Path in Unweighted Graph',
    difficulty: 'medium',
    description: 'Find shortest path from source to target in unweighted graph',
    examples: [
      {
        input: { graph: '[[1,2],[2],[0,3],[1]]', start: 0, end: 3 },
        display: 'Graph: 0→1,2 | 1→2 | 2→0,3 | 3→1, find 0→3',
        expected: 2,
      },
      {
        input: { graph: '[[1],[2],[3],[0]]', start: 0, end: 3 },
        display: 'Linear: 0→1→2→3, distance 3',
        expected: 3,
      },
    ],
    mnemonicEmoji: '🗺️',
    mnemonicPerson: 'Route Finder',
    mnemonicObject: 'Shortest Distance',
    mnemonicAction: 'Expanding frontier equally',
    mnemonicStory:
      'BFS expands frontier simultaneously from start. All neighbors at distance 1, then distance 2, etc. First to reach target is guaranteed shortest.',
        realWorldUses: [
      {
        icon: "🗺️",
        title: "GPS Navigation Routing",
        description: "Navigation systems like Google Maps use BFS on unweighted graphs to find shortest-path routes. Bluetooth/WiFi networks are unweighted, making BFS optimal for hop-count minimization.",
      },
      {
        icon: "🎮",
        title: "Chess AI Move Sequence",
        description: "Chess engines use BFS to explore move sequences of equal ply depth. Finding shortest path to checkmate uses breadth-first exploration.",
      },
      {
        icon: "🧭",
        title: "Maze Solver Robot",
        description: "Robots navigating mazes use BFS since each cell move has equal cost. Guarantees shortest path to goal without exploring dead ends unnecessarily.",
      },
      {
        icon: "🌳",
        title: "Genealogy Family Tree",
        description: "Ancestry.com uses BFS to find closest common ancestor between two people. Level-by-level exploration from both directions finds the relationship path.",
      },
      {
        icon: "💻",
        title: "Operating System Process Hierarchy",
        description: "OS kernels use BFS to find process trees and child processes level-by-level. Efficient for signal broadcasting to process groups.",
      },
    ],
  },
  {
    id: 'levelOrderWithNary',
    name: 'N-ary Tree Level Order Traversal',
    difficulty: 'easy',
    description: 'Level-order traversal for tree with N children per node',
    examples: [
      {
        input: { tree: 'N-ary with 1 root, 3 children, grandchildren vary' },
        display: 'Generic N-ary tree structure',
        expected: '[[1], [3,2,4], [5,6,7,8,9]]',
      },
    ],
    mnemonicEmoji: '🌿',
    mnemonicPerson: 'Polyamorous Scanner',
    mnemonicObject: 'N Children Queue',
    mnemonicAction: 'Scanning flexible hierarchies',
    mnemonicStory:
      'Same BFS principle but each node has N children instead of 2. Queue generalization works perfectly for any branching factor.',
    realWorldUses: [
      {
        icon: '📁',
        title: 'Directory Traversal',
        description: 'Scan folder hierarchies level-by-level',
      },
    ],
  },
  {
    id: 'islandsCount',
    name: 'Number of Islands (2D Grid BFS)',
    difficulty: 'medium',
    description: 'Count connected components of land in 2D grid using BFS',
    examples: [
      {
        input: { grid: '[[1,1,0],[1,0,0],[0,0,1]]' },
        display: '3x3 grid: 2 islands',
        expected: 2,
      },
      {
        input: { grid: '[[0,0],[0,0]]' },
        display: '2x2 all water: 0 islands',
        expected: 0,
      },
      {
        input: { grid: '[[1,1,1],[0,1,0],[1,0,1]]' },
        display: '3x3 multiple connected components',
        expected: 3,
      },
    ],
    mnemonicEmoji: '🏝️',
    mnemonicPerson: 'Island Counter',
    mnemonicObject: 'Connected Land Masses',
    mnemonicAction: 'BFS flooding each island',
    mnemonicStory:
      'For each unvisited land cell, run BFS to mark entire island as visited. Each BFS = one island. Count the floods.',
    realWorldUses: [
      {
        icon: '🗺️',
        title: 'Geographic Analysis',
        description: 'Count landmasses, analyze topology',
      },
    ],
  },
];

export const bfsCodeExamples = {
  levelOrderTraversal: {
    verbose: `# Binary Tree Level Order Traversal - VERBOSE

from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class LevelOrderTraversal:
    def __init__(self, root):
        self.root = root

    def traverse(self):
        """BFS level-order traversal"""
        if not self.root:
            return []

        result = []
        queue = deque([self.root])

        while queue:
            level_size = len(queue)  # Process current level
            current_level = []

            for _ in range(level_size):
                node = queue.popleft()
                current_level.append(node.val)

                # Add children to queue for next level
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)

            result.append(current_level)

        return result

# Usage
root = TreeNode(3)
root.left = TreeNode(9)
root.right = TreeNode(20, TreeNode(15), TreeNode(7))
traverser = LevelOrderTraversal(root)
print(traverser.traverse())  # → [[3], [9,20], [15,7]]`,

    terse: `# Binary Tree Level Order Traversal - TERSE

from collections import deque

def levelOrder(root):
    if not root:
        return []

    result = []
    queue = deque([root])

    while queue:
        result.append([node.val for node in queue])
        queue = deque(child for node in queue for child in (node.left, node.right) if child)

    return result`,
  },

  shortestPathUnweighted: {
    verbose: `# Shortest Path in Unweighted Graph - VERBOSE

from collections import deque

class Graph:
    def __init__(self, graph):
        self.graph = graph

    def shortest_path(self, start, end):
        """BFS shortest path"""
        if start == end:
            return 0

        visited = set([start])
        queue = deque([(start, 0)])  # (node, distance)

        while queue:
            node, dist = queue.popleft()

            for neighbor in self.graph[node]:
                if neighbor == end:
                    return dist + 1
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append((neighbor, dist + 1))

        return -1  # No path

# Usage
graph = [[1, 2], [2], [0, 3], [1]]
finder = Graph(graph)
print(finder.shortest_path(0, 3))  # → 2`,

    terse: `# Shortest Path in Unweighted Graph - TERSE

from collections import deque

def shortestPath(graph, start, end):
    if start == end:
        return 0

    visited = {start}
    queue = deque([(start, 0)])

    while queue:
        node, dist = queue.popleft()
        for neighbor in graph[node]:
            if neighbor == end:
                return dist + 1
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, dist + 1))

    return -1`,
  },

  islandsCount: {
    verbose: `# Number of Islands - VERBOSE

from collections import deque

class IslandCounter:
    def __init__(self, grid):
        self.grid = grid
        self.rows = len(grid)
        self.cols = len(grid[0]) if grid else 0
        self.visited = set()

    def bfs(self, r, c):
        """Flood fill island with BFS"""
        queue = deque([(r, c)])
        self.visited.add((r, c))

        while queue:
            row, col = queue.popleft()

            # Check all 4 directions
            for dr, dc in [(0,1), (1,0), (0,-1), (-1,0)]:
                nr, nc = row + dr, col + dc

                if (0 <= nr < self.rows and
                    0 <= nc < self.cols and
                    self.grid[nr][nc] == '1' and
                    (nr, nc) not in self.visited):

                    self.visited.add((nr, nc))
                    queue.append((nr, nc))

    def count_islands(self):
        """Count connected components"""
        count = 0

        for r in range(self.rows):
            for c in range(self.cols):
                if self.grid[r][c] == '1' and (r, c) not in self.visited:
                    self.bfs(r, c)
                    count += 1

        return count

# Usage
grid = [["1","1","0"],["1","0","0"],["0","0","1"]]
counter = IslandCounter(grid)
print(counter.count_islands())  # → 2`,

    terse: `# Number of Islands - TERSE

from collections import deque

def numIslands(grid):
    if not grid:
        return 0

    visited = set()
    count = 0

    def bfs(r, c):
        queue = deque([(r, c)])
        visited.add((r, c))
        while queue:
            row, col = queue.popleft()
            for dr, dc in [(0,1),(1,0),(0,-1),(-1,0)]:
                nr, nc = row + dr, col + dc
                if (0 <= nr < len(grid) and 0 <= nc < len(grid[0]) and
                    grid[nr][nc] == '1' and (nr, nc) not in visited):
                    visited.add((nr, nc))
                    queue.append((nr, nc))

    for r in range(len(grid)):
        for c in range(len(grid[0])):
            if grid[r][c] == '1' and (r, c) not in visited:
                bfs(r, c)
                count += 1

    return count`,
  },
};

export const bfsSynthesizedCategory = {
  icon: '📊',
  title: 'Layer-by-Layer Exploration',
  coreInsight: 'BFS explores a space level-by-level before going deeper. Every node at distance D from the start is processed before any node at distance D+1. This level-by-layer guarantee makes BFS the natural choice when you need shortest paths, level-order information, or guaranteed distance metrics. Use a queue to always process the oldest (earliest-discovered) nodes first. Apply to: finding shortest paths in unweighted graphs, traversing trees by level, checking connectivity, finding all nodes at exactly distance D.',
  commonAcross: [
    'Shortest path (unweighted)',
    'Level-order traversal',
    'Graph connectivity',
    'Bipartite checking',
    'Queue simulations',
    'Puzzle solving (fewest moves)',
    'Network analysis',
    'Social network distance',
  ],
};

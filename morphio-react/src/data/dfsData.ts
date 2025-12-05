import type { PatternProblem } from '../redux/types';

export const dfsProblems: PatternProblem[] = [
  {
    id: 'preorderTraversal',
    name: 'Binary Tree Preorder Traversal',
    difficulty: 'easy',
    description: 'Traverse tree in preorder: Root → Left → Right',
    examples: [
      {
        input: { tree: '(1,(2),(3))' },
        display: 'Tree: 1 (root), 2 (left), 3 (right)',
        expected: [1, 2, 3],
      },
      {
        input: { tree: '(1,(null),(2,(3)))' },
        display: 'Tree: 1, no left child, 2 right, 3 is 2s child',
        expected: [1, 2, 3],
      },
    ],
    mnemonicEmoji: '📈',
    mnemonicPerson: 'Depth Descender',
    mnemonicObject: 'Recursion Stack',
    mnemonicAction: 'Exploring branches completely',
    mnemonicStory:
      'Dive deep into first branch, explore fully before backtracking. Visit node, then recurse left, then recurse right. Pure depth-first commitment.',
        realWorldUses: [
      {
        icon: "📁",
        title: "File System Directory Listing",
        description: "Operating systems traverse file hierarchies in DFS preorder: visit directory, list contents, then recurse. Unix find command and Windows dir /s use this pattern.",
      },
      {
        icon: "🎯",
        title: "HTML DOM Tree Parsing",
        description: "Web browsers parse HTML in DFS preorder: process opening tag, children, closing tag. JavaScript DOM traversal follows DFS order for event bubbling.",
      },
      {
        icon: "🏢",
        title: "Organization Hierarchy Reporting",
        description: "Companies traverse org charts in DFS preorder to generate reporting hierarchies. CEO's report first, then their departments' reports.",
      },
      {
        icon: "💾",
        title: "File Backup Traversal",
        description: "Backup systems traverse file trees in DFS preorder ensuring parent directories are backed up before children, maintaining integrity.",
      },
      {
        icon: "🔍",
        title: "Code Syntax Tree Analysis",
        description: "Compilers traverse abstract syntax trees (ASTs) in DFS preorder for code analysis, optimization, and code generation.",
      },
    ],
  },
  {
    id: 'inorderTraversal',
    name: 'Binary Tree Inorder Traversal',
    difficulty: 'easy',
    description: 'Traverse tree in inorder: Left → Root → Right (sorted for BST)',
    examples: [
      {
        input: { tree: '(1,(2),(3))' },
        display: 'Tree: 1, 2 (left), 3 (right)',
        expected: [2, 1, 3],
      },
      {
        input: { tree: 'BST: (5,(3),(7))' },
        display: 'BST produces sorted output',
        expected: [3, 5, 7],
      },
    ],
    mnemonicEmoji: '📊',
    mnemonicPerson: 'Sorted Explorer',
    mnemonicObject: 'BST In-Order',
    mnemonicAction: 'Left-visit-right pattern',
    mnemonicStory:
      'For BST, inorder traversal gives sorted sequence. Left-root-right order naturally produces ascending values. Perfect for sorted extraction.',
        realWorldUses: [
      {
        icon: "📊",
        title: "Binary Search Tree Value Listing",
        description: "BST inorder traversal returns values in sorted order. Database indices use this to return sorted query results efficiently.",
      },
      {
        icon: "🎵",
        title: "Playlist Order Resolution",
        description: "Music apps resolve playlist ordering using BST inorder traversal. O(n) sorted playlist generation without explicit sorting.",
      },
      {
        icon: "⏱️",
        title: "Task Scheduling by Priority",
        description: "Schedulers maintain tasks in BSTs and use inorder to process by priority without sorting overhead.",
      },
      {
        icon: "📈",
        title: "Financial Report Generation",
        description: "Financial systems generate sorted income statement items using inorder BST traversal from transaction trees.",
      },
      {
        icon: "🎓",
        title: "Grade Book Sorting",
        description: "Schools traverse student grade BSTs in inorder to generate alphabetical gradebooks and sorted reports.",
      },
    ],
  },
  {
    id: 'postorderTraversal',
    name: 'Binary Tree Postorder Traversal',
    difficulty: 'easy',
    description: 'Traverse tree in postorder: Left → Right → Root',
    examples: [
      {
        input: { tree: '(1,(2),(3))' },
        display: 'Tree: 1, 2 (left), 3 (right)',
        expected: [2, 3, 1],
      },
    ],
    mnemonicEmoji: '⬆️',
    mnemonicPerson: 'Bottom-Up Processor',
    mnemonicObject: 'Subtree Results',
    mnemonicAction: 'Processing leaves before parents',
    mnemonicStory:
      'Visit children first, then process parent. Perfect for deletion: remove children before parent. Or aggregating from leaves upward.',
        realWorldUses: [
      {
        icon: "📁",
        title: "File Deletion Cleanup",
        description: "When deleting directories, systems traverse in DFS postorder: delete children first, then parent. rm -r uses this to safely delete trees.",
      },
      {
        icon: "💾",
        title: "Memory Deallocation",
        description: "Garbage collectors use postorder traversal to deallocate objects with dependents: free children first, then parent, preventing dangling pointers.",
      },
      {
        icon: "📊",
        title: "Expression Evaluation",
        description: "Calculators evaluate mathematical expressions using postorder traversal: 3 + (4 * 5) is evaluated with operands before operators.",
      },
      {
        icon: "🏗️",
        title: "Build System Dependency Compilation",
        description: "Build systems like Make compile files in postorder: compile dependencies before dependents. Only recompile when dependencies change.",
      },
      {
        icon: "🎮",
        title: "Game Resource Unloading",
        description: "Game engines unload resources in postorder: unload child game objects before parent scene, ensuring proper cleanup.",
      },
    ],
  },
  {
    id: 'graphPathExist',
    name: 'Path Exists in Graph (DFS)',
    difficulty: 'medium',
    description: 'Check if path exists from source to target using DFS',
    examples: [
      {
        input: { n: 3, edges: '[[0,1],[1,2]]', start: 0, end: 2 },
        display: '3 nodes: 0→1→2, check if 0 reaches 2',
        expected: true,
      },
      {
        input: { n: 6, edges: '[[0,1],[0,2],[3,5],[5,4],[4,3]]', start: 0, end: 5 },
        display: 'Two disconnected components, 0→5 impossible',
        expected: false,
      },
    ],
    mnemonicEmoji: '🚶',
    mnemonicPerson: 'Path Explorer',
    mnemonicObject: 'Connected Nodes',
    mnemonicAction: 'DFS until target found',
    mnemonicStory:
      'Recursively visit neighbors. Mark visited to avoid cycles. If target found, path exists. DFS exhaustively explores one branch completely.',
    realWorldUses: [
      {
        icon: '🌐',
        title: 'Connectivity Check',
        description: 'Verify network/graph connectivity',
      },
    ],
  },
];

export const dfsCodeExamples = {
  preorderTraversal: {
    verbose: `# Binary Tree Preorder Traversal - VERBOSE
# Root → Left → Right

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class PreorderTraversal:
    def __init__(self, root):
        self.root = root
        self.result = []

    def dfs(self, node):
        """DFS preorder: visit node, then left, then right"""
        if not node:
            return

        # 1. Visit node
        self.result.append(node.val)

        # 2. Recurse left
        self.dfs(node.left)

        # 3. Recurse right
        self.dfs(node.right)

    def traverse(self):
        self.dfs(self.root)
        return self.result

# Usage
root = TreeNode(1, TreeNode(2), TreeNode(3))
traverser = PreorderTraversal(root)
print(traverser.traverse())  # → [1,2,3]`,

    terse: `# Binary Tree Preorder Traversal - TERSE

def preorderTraversal(root):
    result = []
    def dfs(node):
        if not node:
            return
        result.append(node.val)
        dfs(node.left)
        dfs(node.right)
    dfs(root)
    return result`,
  },

  inorderTraversal: {
    verbose: `# Binary Tree Inorder Traversal - VERBOSE
# Left → Root → Right (sorted for BST)

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class InorderTraversal:
    def __init__(self, root):
        self.root = root
        self.result = []

    def dfs(self, node):
        """DFS inorder: left, visit node, right"""
        if not node:
            return

        # 1. Recurse left
        self.dfs(node.left)

        # 2. Visit node
        self.result.append(node.val)

        # 3. Recurse right
        self.dfs(node.right)

    def traverse(self):
        self.dfs(self.root)
        return self.result

# Usage (BST)
root = TreeNode(5, TreeNode(3), TreeNode(7))
traverser = InorderTraversal(root)
print(traverser.traverse())  # → [3,5,7] (sorted!)`,

    terse: `# Binary Tree Inorder Traversal - TERSE

def inorderTraversal(root):
    result = []
    def dfs(node):
        if not node:
            return
        dfs(node.left)
        result.append(node.val)
        dfs(node.right)
    dfs(root)
    return result`,
  },

  graphPathExist: {
    verbose: `# Path Exists in Graph - VERBOSE

class Graph:
    def __init__(self, n, edges):
        self.graph = [[] for _ in range(n)]
        for u, v in edges:
            self.graph[u].append(v)
            self.graph[v].append(u)  # Undirected

    def path_exists(self, start, end):
        """DFS to check if path exists"""
        visited = set()

        def dfs(node):
            # Found target
            if node == end:
                return True

            # Already visited, avoid cycle
            if node in visited:
                return False

            visited.add(node)

            # Explore neighbors
            for neighbor in self.graph[node]:
                if dfs(neighbor):
                    return True

            return False

        return dfs(start)

# Usage
graph = Graph(3, [[0, 1], [1, 2]])
print(graph.path_exists(0, 2))  # → True`,

    terse: `# Path Exists in Graph - TERSE

def validPath(n, edges, start, end):
    graph = [[] for _ in range(n)]
    for u, v in edges:
        graph[u].append(v)
        graph[v].append(u)

    visited = set()

    def dfs(node):
        if node == end:
            return True
        if node in visited:
            return False
        visited.add(node)
        return any(dfs(neighbor) for neighbor in graph[node])

    return dfs(start)`,
  },
};

export const dfsSynthesizedCategory = {
  icon: '📈',
  title: 'Depth-First Exhaustive Search',
  coreInsight: 'DFS explores as far as possible along each branch before backtracking. Process a node, recursively process one neighbor, then backtrack when stuck. This naturally handles problems requiring exhaustive exploration: finding all paths, detecting cycles, topological ordering, or computing connected components. Use recursion (call stack) or explicit stack to track the "current path". Unlike BFS which guarantees shortest distance, DFS guarantees exhaustive coverage of one branch before moving to another.',
  commonAcross: [
    'Tree/graph traversal',
    'Cycle detection',
    'Topological sorting',
    'Connected components',
    'All paths finding',
    'Maze solving',
    'Strongly connected components',
    'Expression tree evaluation',
  ],
};


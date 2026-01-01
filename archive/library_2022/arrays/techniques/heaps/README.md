# Heaps

They're a type of tree that is a complete binary tree. A complete binary tree is a tree where all levels are filled except the last one, and the last one is filled from left to right.
Their purpose is to track the minimum or maximum value in a dataset. They're used in priority queues, graph algorithms, and sorting algorithms.
Practically speaking they're implemented as arrays, where the root is at index 0, and the children of a node at index i are at 2i+1 and 2i+2.
They're often meant to be min-heaps, where the root is the minimum value, but they can also be max-heaps, where the root is the maximum value.
To implement as a max-heap, just reverse the comparison operators which effectively reverses the order of the numbers relative to 0 on a number line; said another way the upper-bound is -N and the lower-bound is 0.
That is only necessary if we're not going to write the heap ourselves - in which case we simply need to compare the values to the root and swap if necessary.

## Operations
1. Insert
2. Extract
3. Heapify - rearrange the heap to maintain the max/min property
   1. This process is O(log n) because it's a complete binary tree
   2. It starts at the root and compares the root to its children. Whenever it finds a discrepancy, it swaps the root with the child that violates the max/min property.
   3. It then repeats the process with the child that was swapped.
4. Build - build a heap from an array
   1. This process is O(n) because it's a complete binary tree
   2. It starts at the last parent node and heapifies it, then moves to the next parent node and heapifies it, and so on until it reaches the root.
   3. It then repeats the process with the root.
5. Delete - delete a node from the heap
   1. This process is O(log n) because it's a complete binary tree
   2. It first finds the node to delete, then swaps it with the last node in the heap.
   3. It then heapifies the node that was swapped.
      1. However this process is a bit different since it's heapifying UP the tree instead of DOWN.


## Problems it can help solve
1. Find the kth largest element in an array
   1. Build a max-heap from the array
   2. Extract the root k times
2. Find the kth smallest element in an array
   1. Build a min-heap from the array
   2. Extract the root k times
3. Find the median number in a stream
   1. Build a max-heap and a min-heap
      1. The max-heap will contain the lower half of the numbers
      2. The min-heap will contain the upper half of the numbers
   2. If the max-heap has more numbers than the min-heap, then the median is the root of the max-heap, vice-versa for the min-heap
   3. When evaluating incoming numbers; if the number is less than the root of the max-heap, then insert it into the max-heap, vice-versa for the min-heap
4. As a Priority Queue
   1. Prim's Algorithm
      1. This algorithm is used to find the minimum spanning tree of a graph using a priority queue
      2. The priority Queue is implemented as a min-heap where the "min" is the edge with the smallest weight effectively leveraging a greedy algorithm approach.
      3. Useful for finding the shortest path between all nodes in a graph
   2. Dijkstra's Algorithm
      1. This algorithm is used to find the shortest path between two nodes in a graph using a priority queue
      2. The priority Queue is implemented as a min-heap where the "min" is the node with the shortest distance from the source node effectively leveraging a greedy algorithm approach.
      3. Useful for finding the shortest path between two nodes in a graph
   
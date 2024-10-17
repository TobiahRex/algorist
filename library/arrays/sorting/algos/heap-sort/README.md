# Heap Sort

## Control Flows
1. Building/Inserting into the Heap Structure
2. Pulling Off/Extracting from the Heap Structure

## Description
1. **Building/Inserting into the Heap Structure:** This flow involves the construction of the heap data structure from an unsorted array or list of elements. The key steps in this flow include inserting elements into the heap one by one (usually starting from the middle of the array and moving towards the beginning) and ensuring that the heap property is maintained. This flow is often associated with the `heapify` function, which rearranges elements to build the heap.
```python
def heapify(arr, n, i):
    largest = i  # Initialize the largest element as the root
    left_child = 2 * i + 1  # Left child of the current node
    right_child = 2 * i + 2  # Right child of the current node

    # Compare the left child with the root
    if left_child < n and arr[left_child] > arr[largest]:
        largest = left_child

    # Compare the right child with the largest so far
    if right_child < n and arr[right_child] > arr[largest]:
        largest = right_child

    # If the largest element is not the root, swap them
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]

        # Recursively heapify the affected sub-tree
        heapify(arr, n, largest)

# Example usage:
arr = [4, 10, 3, 5, 1]
n = len(arr)

# Build a max heap from the unsorted array
for i in range(n // 2 - 1, -1, -1):
    heapify(arr, n, i)

print("Max Heap:", arr)
```
In this code:

1. The heapify function is defined to rearrange elements and maintain the max heap property.
2. We start building the max heap by calling heapify on elements in reverse order (from the middle of the array towards the beginning).
3. The output will be the arr variable converted into a max heap. The max heap property ensures that the largest element is at the root of the heap.

----
2. **Pulling Off/Extracting from the Heap Structure:** This flow involves extracting the maximum (or minimum) element from the heap, which is typically the root of the heap. After extracting the maximum element, it is placed at the end of the array (or list), and the heap property is restored by adjusting the remaining elements. This process is repeated until all elements are extracted and sorted. This flow is typically part of the main `heap_sort` function.
```python
def heap_sort(arr):
    n = len(arr)

    # Build a max heap from the unsorted array
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
```

These two flows are the core components of Heap Sort and work together to create a sorted list from an unsorted input. The "building" phase constructs a heap with the largest element at the root, and the "pulling off" phase repeatedly extracts the largest element and builds the sorted output from largest to smallest (or vice versa).


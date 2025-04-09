# Sorting Algorithms

## Mental Models for Basic Sorting Algorithms

### Bubble Sort: "Bubbling Up"
- **Mental Model**: Imagine bubbles rising in water
- **Key Insight**: Largest elements "bubble up" to their correct position
- **Visualization**: 
  ```
  [5, 3, 8, 4, 2] → [3, 5, 4, 2, 8] → [3, 4, 2, 5, 8] → [3, 2, 4, 5, 8] → [2, 3, 4, 5, 8]
  ```
- **Memory Hook**: "Bubbles always rise to the top"
- **When to Use**: Almost never in practice, but great for teaching sorting concepts

```python
def bubble_sort(arr):
    n = len(arr)
    # Traverse through all array elements
    for i in range(n):
        # Flag to optimize if array is already sorted
        swapped = False
        
        # Last i elements are already in place
        for j in range(0, n-i-1):
            # Compare adjacent elements
            if arr[j] > arr[j+1]:
                # Swap if the element found is greater than the next element
                arr[j], arr[j+1] = arr[j+1], arr[j]
                swapped = True
        
        # If no swapping occurred, array is already sorted
        if not swapped:
            break
    
    return arr
```

### Selection Sort: "Finding the Minimum"
- **Mental Model**: Like sorting cards by repeatedly finding the smallest card
- **Key Insight**: Find the minimum element and place it at the beginning
- **Visualization**:
  ```
  [5, 3, 8, 4, 2] → [2, 3, 8, 4, 5] → [2, 3, 8, 4, 5] → [2, 3, 4, 8, 5] → [2, 3, 4, 5, 8]
  ```
- **Memory Hook**: "Always pick the smallest remaining element"
- **When to Use**: When minimizing swaps is critical (e.g., hardware with expensive writes)

```python
def selection_sort(arr):
    n = len(arr)
    
    # Traverse through all array elements
    for i in range(n):
        # Find the minimum element in remaining unsorted array
        min_idx = i
        for j in range(i+1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        
        # Swap the found minimum element with the first element
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    
    return arr
```

### Insertion Sort: "Inserting Cards"
- **Mental Model**: Like sorting playing cards in your hand
- **Key Insight**: Build sorted portion by inserting each element in its correct position
- **Visualization**:
  ```
  [5, 3, 8, 4, 2] → [3, 5, 8, 4, 2] → [3, 5, 8, 4, 2] → [3, 4, 5, 8, 2] → [2, 3, 4, 5, 8]
  ```
- **Memory Hook**: "Insert each card in its proper place"
- **When to Use**: Small datasets, nearly sorted data, or online sorting

```python
def insertion_sort(arr):
    # Traverse through 1 to len(arr)
    for i in range(1, len(arr)):
        key = arr[i]
        j = i-1
        
        # Move elements of arr[0..i-1] that are greater than key
        # to one position ahead of their current position
        while j >= 0 and arr[j] > key:
            arr[j+1] = arr[j]
            j -= 1
        arr[j+1] = key
    
    return arr
```

## Advanced Sorting Algorithms

### Merge Sort: "Divide and Conquer"
- **Mental Model**: Breaking a deck of cards into smaller piles, sorting each pile, then merging
- **Key Insight**: Recursively divide, sort, and merge
- **Visualization**:
  ```
  [5, 3, 8, 4, 2] → [5, 3] [8, 4, 2] → [3, 5] [2, 4, 8] → [2, 3, 4, 5, 8]
  ```
- **When to Use**: When stability is required, external sorting, or guaranteed O(n log n)

```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    # Find the middle point and divide the array into two halves
    mid = len(arr) // 2
    left = arr[:mid]
    right = arr[mid:]
    
    # Recursively sort the two halves
    left = merge_sort(left)
    right = merge_sort(right)
    
    # Merge the sorted halves
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    
    # Compare elements from both arrays and merge in sorted order
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    # Add remaining elements
    result.extend(left[i:])
    result.extend(right[j:])
    
    return result
```

### Quick Sort: "Partition and Conquer"
- **Mental Model**: Organizing books on a shelf by picking a pivot book and arranging others
- **Key Insight**: Choose a pivot, partition around it, recursively sort partitions
- **Visualization**:
  ```
  [5, 3, 8, 4, 2] → [3, 4, 2] [5] [8] → [2] [3, 4] [5] [8] → [2, 3, 4, 5, 8]
  ```
- **When to Use**: General-purpose sorting, in-memory sorting of large datasets

```python
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    
    # Choose the pivot (here we use the last element)
    pivot = arr[-1]
    left = []
    right = []
    
    # Partition elements into left and right based on pivot
    for i in range(len(arr) - 1):
        if arr[i] <= pivot:
            left.append(arr[i])
        else:
            right.append(arr[i])
    
    # Recursively sort left and right partitions and combine with pivot
    return quick_sort(left) + [pivot] + quick_sort(right)

# Optimized version with in-place partitioning
def quick_sort_inplace(arr, low, high):
    if low < high:
        # Partition the array and get the pivot index
        pivot_idx = partition(arr, low, high)
        
        # Recursively sort elements before and after partition
        quick_sort_inplace(arr, low, pivot_idx - 1)
        quick_sort_inplace(arr, pivot_idx + 1, high)
    
    return arr

def partition(arr, low, high):
    # Choose the rightmost element as pivot
    pivot = arr[high]
    i = low - 1  # Index of smaller element
    
    for j in range(low, high):
        # If current element is smaller than or equal to pivot
        if arr[j] <= pivot:
            i += 1  # Increment index of smaller element
            arr[i], arr[j] = arr[j], arr[i]
    
    # Place pivot in correct position
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1
```

### Heap Sort: "Building a Heap"
- **Mental Model**: Organizing a tournament bracket where each parent must beat its children
- **Key Insight**: Build a heap, repeatedly extract maximum
- **Visualization**:
  ```
  [5, 3, 8, 4, 2] → [8, 5, 3, 4, 2] → [2, 5, 3, 4] [8] → [5, 4, 3, 2] [8] → [2, 3, 4, 5, 8]
  ```
- **When to Use**: When guaranteed O(n log n) is needed with minimal extra space

```python
def heap_sort(arr):
    n = len(arr)
    
    # Build a maxheap
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    
    # Extract elements from heap one by one
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        
        # Call max heapify on the reduced heap
        heapify(arr, i, 0)
    
    return arr

def heapify(arr, n, i):
    largest = i  # Initialize largest as root
    left = 2 * i + 1  # left child
    right = 2 * i + 2  # right child
    
    # If left child is larger than root
    if left < n and arr[left] > arr[largest]:
        largest = left
    
    # If right child is larger than largest so far
    if right < n and arr[right] > arr[largest]:
        largest = right
    
    # If largest is not root
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        
        # Recursively heapify the affected sub-tree
        heapify(arr, n, largest)
```

### Counting Sort: "Counting Occurrences"
- **Mental Model**: Counting how many of each type of item you have
- **Key Insight**: Count occurrences of each element, reconstruct array
- **Visualization**:
  ```
  [5, 3, 8, 4, 2] → Count: [0,0,1,1,1,1,0,0,1] → [2, 3, 4, 5, 8]
  ```
- **When to Use**: When elements are integers in a known range

```python
def counting_sort(arr):
    # Find the range of the input array
    max_val = max(arr)
    min_val = min(arr)
    range_of_elements = max_val - min_val + 1
    
    # Create a count array to store count of each element
    count = [0] * range_of_elements
    output = [0] * len(arr)
    
    # Store count of each element
    for i in range(len(arr)):
        count[arr[i] - min_val] += 1
    
    # Change count[i] so that count[i] contains actual position of this element in output array
    for i in range(1, len(count)):
        count[i] += count[i - 1]
    
    # Build the output array
    for i in range(len(arr) - 1, -1, -1):
        output[count[arr[i] - min_val] - 1] = arr[i]
        count[arr[i] - min_val] -= 1
    
    # Copy the output array to arr, so that arr now contains sorted elements
    for i in range(len(arr)):
        arr[i] = output[i]
    
    return arr
```

### Radix Sort: "Digit by Digit"
- **Mental Model**: Sorting library books by call number one digit at a time
- **Key Insight**: Sort by each digit position from least to most significant
- **Visualization**:
  ```
  [5, 3, 8, 4, 2] → [2, 3, 4, 5, 8] (already single digits)
  ```
- **When to Use**: When elements can be compared digit by digit (strings, integers)

```python
def radix_sort(arr):
    # Find the maximum number to know number of digits
    max_num = max(arr)
    exp = 1  # exp is 10^i where i is current digit number
    
    # Do counting sort for every digit
    while max_num // exp > 0:
        counting_sort_by_digit(arr, exp)
        exp *= 10
    
    return arr

def counting_sort_by_digit(arr, exp):
    n = len(arr)
    output = [0] * n  # output array
    count = [0] * 10  # count array for digits 0-9
    
    # Store count of occurrences in count[]
    for i in range(n):
        index = arr[i] // exp
        count[index % 10] += 1
    
    # Change count[i] so that count[i] contains actual position of this digit in output[]
    for i in range(1, 10):
        count[i] += count[i - 1]
    
    # Build the output array
    for i in range(n - 1, -1, -1):
        index = arr[i] // exp
        output[count[index % 10] - 1] = arr[i]
        count[index % 10] -= 1
    
    # Copy the output array to arr, so that arr now contains sorted numbers according to current digit
    for i in range(n):
        arr[i] = output[i]
```

## The Pivot Pattern: A Powerful Algorithmic Technique

The pivot pattern is a fundamental algorithmic technique that appears in many algorithms beyond just Quick Sort. It involves selecting a reference element (the pivot) and partitioning other elements around it based on some criteria.

### Visualizing Partition in Quick Sort

Let's walk through the partition function with a concrete example:

```python
def partition(arr, low, high):
    # Choose the rightmost element as pivot
    pivot = arr[high]
    i = low - 1  # Index of smaller element
    
    for j in range(low, high):
        # If current element is smaller than or equal to pivot
        if arr[j] <= pivot:
            i += 1  # Increment index of smaller element
            arr[i], arr[j] = arr[j], arr[i]
    
    # Place pivot in correct position
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1
```

#### Step-by-Step Visualization

Let's use the array `[7, 2, 1, 6, 8, 5, 3, 4]` with `low = 0` and `high = 7`:

1. **Initial State**:
   ```
   arr = [7, 2, 1, 6, 8, 5, 3, 4]
   pivot = 4 (rightmost element)
   i = -1 (index of smaller element)
   j = 0 (current element being examined)
   ```

2. **First Iteration (j = 0)**:
   ```
   arr[j] = 7 > pivot (4)
   No swap needed
   i remains -1
   ```

3. **Second Iteration (j = 1)**:
   ```
   arr[j] = 2 ≤ pivot (4)
   i becomes 0
   Swap arr[0] and arr[1]
   arr = [2, 7, 1, 6, 8, 5, 3, 4]
   ```

4. **Third Iteration (j = 2)**:
   ```
   arr[j] = 1 ≤ pivot (4)
   i becomes 1
   Swap arr[1] and arr[2]
   arr = [2, 1, 7, 6, 8, 5, 3, 4]
   ```

5. **Fourth Iteration (j = 3)**:
   ```
   arr[j] = 6 > pivot (4)
   No swap needed
   i remains 1
   ```

6. **Fifth Iteration (j = 4)**:
   ```
   arr[j] = 8 > pivot (4)
   No swap needed
   i remains 1
   ```

7. **Sixth Iteration (j = 5)**:
   ```
   arr[j] = 5 > pivot (4)
   No swap needed
   i remains 1
   ```

8. **Seventh Iteration (j = 6)**:
   ```
   arr[j] = 3 ≤ pivot (4)
   i becomes 2
   Swap arr[2] and arr[6]
   arr = [2, 1, 3, 6, 8, 5, 7, 4]
   ```

9. **After Loop**:
   ```
   Place pivot in correct position
   Swap arr[3] and arr[7]
   arr = [2, 1, 3, 4, 8, 5, 7, 6]
   ```

10. **Final Result**:
    ```
    Return 3 (index of pivot)
    arr = [2, 1, 3, 4, 8, 5, 7, 6]
    ```

#### Visual Representation

```
Initial: [7, 2, 1, 6, 8, 5, 3, 4]
         ^
         j=0, i=-1

Step 1:  [7, 2, 1, 6, 8, 5, 3, 4]
         ^
         j=0, i=-1 (7 > 4, no swap)

Step 2:  [2, 7, 1, 6, 8, 5, 3, 4]
            ^
            j=1, i=0 (2 ≤ 4, swap)

Step 3:  [2, 1, 7, 6, 8, 5, 3, 4]
               ^
               j=2, i=1 (1 ≤ 4, swap)

Step 4:  [2, 1, 7, 6, 8, 5, 3, 4]
                  ^
                  j=3, i=1 (6 > 4, no swap)

Step 5:  [2, 1, 7, 6, 8, 5, 3, 4]
                     ^
                     j=4, i=1 (8 > 4, no swap)

Step 6:  [2, 1, 7, 6, 8, 5, 3, 4]
                        ^
                        j=5, i=1 (5 > 4, no swap)

Step 7:  [2, 1, 3, 6, 8, 5, 7, 4]
                           ^
                           j=6, i=2 (3 ≤ 4, swap)

Final:   [2, 1, 3, 4, 8, 5, 7, 6]
                     ^
                     pivot in place
```

### The Pivot Pattern in Other Algorithms

The pivot pattern is a powerful technique that appears in many algorithms:

1. **Quick Select (Finding k-th Smallest Element)**
   - Uses the same partition function as Quick Sort
   - Only recurses on the partition containing the k-th element
   - Average time complexity: O(n)

2. **Binary Search Trees**
   - The root acts as a pivot
   - Elements smaller than the pivot go to the left subtree
   - Elements larger than the pivot go to the right subtree

3. **Median-of-Medians Algorithm**
   - Used to find a good pivot for Quick Select
   - Guarantees O(n) worst-case time complexity

4. **Partitioning in Database Systems**
   - Used for range partitioning in databases
   - Divides data based on value ranges

5. **Load Balancing**
   - Pivots can be used to divide work evenly
   - Example: Dividing tasks between processors

### Optimizing Pivot Selection

The choice of pivot significantly affects performance:

1. **First/Last Element**
   - Simple but vulnerable to worst-case inputs
   - Example: Already sorted arrays

2. **Median-of-Three**
   - Choose median of first, middle, and last elements
   - Better balance for most inputs
   - Helps avoid worst-case scenarios

3. **Random Pivot**
   - Choose a random element as pivot
   - Provides good average-case performance
   - Resistant to adversarial inputs

4. **Median-of-Medians**
   - Guarantees a good pivot
   - Used in algorithms requiring guaranteed performance

### Implementation of Median-of-Three Pivot Selection

```python
def median_of_three(arr, low, high):
    mid = (low + high) // 2
    
    # Find median of first, middle, and last elements
    if arr[low] <= arr[mid] <= arr[high] or arr[high] <= arr[mid] <= arr[low]:
        return mid
    elif arr[mid] <= arr[low] <= arr[high] or arr[high] <= arr[low] <= arr[mid]:
        return low
    else:
        return high

def partition_with_median_of_three(arr, low, high):
    # Choose pivot using median-of-three
    pivot_idx = median_of_three(arr, low, high)
    
    # Move pivot to the end
    arr[pivot_idx], arr[high] = arr[high], arr[pivot_idx]
    
    # Standard partition
    pivot = arr[high]
    i = low - 1
    
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1
```

## Sorting Algorithm Decision Table

| Scenario                                 | Best Algorithm | Why                                        |
| ---------------------------------------- | -------------- | ------------------------------------------ |
| Small dataset (< 50 elements)            | Insertion Sort | Low overhead, good cache performance       |
| Nearly sorted data                       | Insertion Sort | Almost O(n) performance                    |
| Online sorting (data arriving in stream) | Insertion Sort | Can sort as data arrives                   |
| Memory-constrained environment           | Heap Sort      | O(1) extra space                           |
| External sorting (data on disk)          | Merge Sort     | Efficient for sequential access            |
| Stable sort required                     | Merge Sort     | Maintains relative order of equal elements |
| General-purpose in-memory sorting        | Quick Sort     | Excellent average-case performance         |
| Guaranteed O(n log n) needed             | Heap Sort      | No worst-case degradation                  |
| Integers in small range                  | Counting Sort  | O(n+k) where k is range size               |
| Strings or multi-digit numbers           | Radix Sort     | O(d(n+k)) where d is digit count           |
| Hardware with expensive writes           | Selection Sort | Minimizes number of swaps                  |
| Teaching sorting concepts                | Bubble Sort    | Simple to understand and implement         |

## Time and Space Complexity

| Algorithm      | Best Case  | Average Case | Worst Case | Space Complexity | Stable? |
| -------------- | ---------- | ------------ | ---------- | ---------------- | ------- |
| Bubble Sort    | O(n)       | O(n²)        | O(n²)      | O(1)             | Yes     |
| Selection Sort | O(n²)      | O(n²)        | O(n²)      | O(1)             | No      |
| Insertion Sort | O(n)       | O(n²)        | O(n²)      | O(1)             | Yes     |
| Merge Sort     | O(n log n) | O(n log n)   | O(n log n) | O(n)             | Yes     |
| Quick Sort     | O(n log n) | O(n log n)   | O(n²)      | O(log n)         | No      |
| Heap Sort      | O(n log n) | O(n log n)   | O(n log n) | O(1)             | No      |
| Counting Sort  | O(n+k)     | O(n+k)       | O(n+k)     | O(n+k)           | Yes     |
| Radix Sort     | O(d(n+k))  | O(d(n+k))    | O(d(n+k))  | O(n+k)           | Yes     |

## Practical Considerations

### Cache Performance
- Insertion Sort performs well with cache due to sequential access
- Quick Sort's partitioning can cause cache misses
- Merge Sort's sequential merging is cache-friendly

### Memory Access Patterns
- Algorithms with sequential access (Insertion, Merge) perform better on modern hardware
- Random access patterns (Quick Sort) can cause more cache misses

### Stability
- Stability matters when equal elements have different meanings
- Merge Sort and Insertion Sort are stable
- Quick Sort and Heap Sort are not stable

### Adaptive Behavior
- Insertion Sort adapts well to nearly sorted data
- Quick Sort can be made adaptive with median-of-three pivot selection

## Implementation Tips

### Optimizing Quick Sort
- Use median-of-three for pivot selection
- Switch to Insertion Sort for small subarrays
- Handle duplicate elements efficiently

### Optimizing Merge Sort
- Use in-place merging for small arrays
- Switch to Insertion Sort for small subarrays
- Use a temporary buffer for merging

### Optimizing Heap Sort
- Build heap in linear time using bottom-up approach
- Use a binary heap for simplicity
- Consider d-ary heaps for better cache performance


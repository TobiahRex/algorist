def swap(a, l, r):
    print(f"Swapping: {a[l]} w/ {a[r]}")
    a[l], a[r] = a[r], a[l]


def hoares_partition(a):
    left = 0
    right = len(a) - 1
    pivot = a[right // 2]

    while left <= right:
        if a[left] < pivot:
            left += 1
        elif a[left] >= pivot:
            while a[right] > pivot:
                right -= 1
            swap(a, left, right)
            left += 1
            right -= 1
    if pivot < a[right]:
        swap(a, left, right)
    print(a)  # [3, 4, 6, 1, 2, 0, 5, 7, 9, 8]
    # Performed 2 swaps & 7 is in final spot


def median_of_three_pivot(arr, left, right):
    # Calculate the middle index
    mid = left + (right - left) // 2

    # Compare elements at left, middle, and right positions
    a = arr[left]
    b = arr[mid]
    c = arr[right]

    # Find the median among the three elements
    if a < b < c or c < b < a:
        return mid  # Middle element is the median
    elif b < a < c or c < a < b:
        return left  # Left element is the median
    else:
        return right  # Right element is the median


def quicksort(arr, left, right):
    if left < right:
        # Choose the pivot using median-of-three pivot selection
        pivot_index = median_of_three_pivot(arr, left, right)

        # Partition the array and get the new pivot index
        new_pivot_index = partition(arr, left, right, pivot_index)

        # Recursively sort the subarrays
        quicksort(arr, left, new_pivot_index - 1)
        quicksort(arr, new_pivot_index + 1, right)


def partition(arr, left, right, pivot_index):
    # Swap the pivot element with the last element to simplify partitioning
    swap(arr, pivot_index, right)

    # Perform the partitioning
    pivot = arr[right]
    i = (
        left - 1
    )  # Index of smaller element, it starts at -1, because we increment it before doing anything else

    for j in range(left, right):  # Notice that we stop at right - 1
        if (
            arr[j] <= pivot
        ):  # If current value is less than or equal to pivot value, then we should swap it with the element at index i since the size of the "smaller" partition increases by 1
            i += 1  # Move the left pointer forward
            swap(
                arr, i, j
            )  # effectively inserts the current element into the "smaller" partition window group.

    # Place the pivot element back in its correct position (right index). The i'th index marks the right-most element that is smaller than the pivot.
    swap(arr, i + 1, right)

    return i + 1  # Return the new pivot index


def swap(arr, left, right):
    arr[left], arr[right] = arr[right], arr[left]


# Example usage
arr = [3, 7, 2, 9]
# arr = [3, 7, 2, 9, 6, 1, 8, 5, 4]
quicksort(arr, 0, len(arr) - 1)
print(arr)  # Sorted array


if __name__ == "__main__":
    a = [3, 4, 9, 1, 7, 0, 5, 2, 6, 8]
    # hoares_partition(a)
    # hoares_partition_v2(a, 0, len(a) - 1)

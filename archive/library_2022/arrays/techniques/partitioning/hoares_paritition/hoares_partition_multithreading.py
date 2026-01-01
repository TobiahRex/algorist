import threading
import time

THRESHOLD = 100  # Threshold for using multithreading
thread_count = 0

thread_count_lock = threading.Lock()  # The purpose


def median_of_three_pivot(arr, left, right):
    mid = left + (right - left) // 2

    a, b, c = arr[left], arr[mid], arr[right]
    if a < b < c or c < b < a:
        return mid
    if b < a < c or c < a < b:
        return left
    return right


def quicksort(arr, left, right):
    if left < right:
        # Use multi-threading for large subarrays
        if right - left > THRESHOLD:
            pivot_index = median_of_three_pivot(arr, left, right)
            new_pivot_index = partition(arr, left, right, pivot_index)

            left_thread = threading.Thread(
                target=quicksort, args=(arr, left, new_pivot_index - 1)
            )
            right_thread = threading.Thread(
                target=quicksort, args=(arr, new_pivot_index + 1, right)
            )

            with thread_count_lock:
                global thread_count
                thread_count += 2
                print("Thread count: ", thread_count)

            left_thread.start()
            right_thread.start()

            left_thread.join()
            right_thread.join()

            with thread_count_lock:
                thread_count -= 2
                print("Thread count: ", thread_count)

        else:
            # For small subarrays, use a single-threaded approach
            partitioned_index = partition(arr, left, right, right)
            quicksort(arr, left, partitioned_index - 1)
            quicksort(arr, partitioned_index + 1, right)


def partition(arr, left, right, pivot_index):
    pivot = arr[pivot_index]
    swap(arr, pivot_index, right)
    i = left - 1
    for j in range(left, right):
        if arr[j] < pivot:
            i += 1
            swap(arr, i, j)

    swap(arr, i + 1, right)
    return i + 1


def swap(a, l, r):
    a[l], a[r] = a[r], a[l]


import random


def generate_large_input(size, min_value=1, max_value=1000):
    """
    Generate a list of random integers.

    Args:
        size (int): The size of the list (number of elements).
        min_value (int): The minimum value for the generated integers (inclusive).
        max_value (int): The maximum value for the generated integers (inclusive).

    Returns:
        list: A list of random integers.
    """
    return [random.randint(min_value, max_value) for _ in range(size)]


if __name__ == "__main__":
    # Example usage:
    input = generate_large_input(100000, min_value=1)
    # input = [3, 7, 2, 9, 6, 1, 8, 5, 4]
    print("Generated Large Input of size: ", len(input))
    # print("Generated Large Input: ", input)
    start = time.time()
    quicksort(input, 0, len(input) - 1)
    end = time.time()
    # print("Sorted Large Input:", input)
    print("Time taken:", end - start)

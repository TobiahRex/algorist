"""Bubble Sort
1. Pushes larger values 1 index higher if it's greater than the element on it's right.
2. Every iteration sorts the smallest ith element, and puts it in it's final place.
3. j-loop shortens on each i-th iteration.
"""

def bubble_sort(arr):
    for i, _ in enumerate(arr):
        for j in range(len(arr)-1, i-1, -1):
            if arr[j-1] > arr[j]:
                [arr[j-1], arr[j]] = [arr[j], arr[j-1]]
    return arr


if __name__ == '__main__':
    test_cases = [
        [6, 8, 4, 2, 0, 1, 3, 5, 9, 7],
        [2, 4, 6, 8, 1, 0, 5, 3, 7, 9]
    ]
    for case in test_cases:
        print(bubble_sort(case))

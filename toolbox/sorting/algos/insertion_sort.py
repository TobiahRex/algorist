class Solution:
    """Insertion Sort
    - Uses a "bookmark" (BK) technique, where the value on the right-side of the BK is the value we sort.
    - While the value is less than the element on it's left, we keep iterating, until we find a value
    the BK value is smaller than.
    - Once we find that value, we stop sorting the BK element.
    Returns:
        _type_: _description_
    """
    @staticmethod
    def insertion_sort(arr):
        for i in range(1, len(arr)):
            val = arr[i]
            j = i-1
            while(arr[j] > arr[i] and j >= 0):
                arr[j+1] = arr[j]
                j -= 1
            arr[j+1] = val
        return arr


if __name__ == '__main__':
    test_cases = [
        [8, 6, 4, 2, 0, 1, 3, 5, 9, 7],
        [2, 4, 6, 8, 1, 0, 5, 3, 7, 9]
    ]
    for case in test_cases:
        print(Solution.insertion_sort(case))
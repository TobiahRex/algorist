import random

class Solution:
    def __init__(self):
        pass

    def swap(a, l, r):
        a[l], a[r] = a[r], a[l]

    def partition(self, arr, start, end):
        r = random.randint(start, end)
        self.swap(arr, start, r)
        pivot = arr[start]
        left = start
        for i in range(start+1, end+1):
            if arr[i] < pivot:
                left += 1
                self.swap(arr, left, i)
        self.swap(arr, start, left) # put pivot @ final index
        return left

    def quick_sort(self, arr, start=None, end=None):
        if start is None and end is None:
            start = 0
            end = len(arr) - 1
        if start < end:
            partition = self.partition(arr, start, end)
            self.quick_sort(arr, start, partition-1)
            self.quick_sort(arr, partition+1, end)
        return arr

if __name__ == '__main__':
    arr = [10, 3, 8, 2, 1]
    answer = Solution().quick_sort(arr)
    import json
    print('Answer: ', json.dumps(answer, indent=4))


def swap(a, l, r):
    a[l], a[r] = a[r], a[l]


def quick_sort(arr, start=None, end=None):
    if start is None and end is None:
        start, end = 0, len(arr) - 1
    if start < end:
        r = random.randint(start, end)
        swap(arr, start, r)
        pivot, left = arr[start], start
        for right in range(start+1, end+1):
            if arr[right] < pivot:
                left += 1
                swap(arr, left, right)
        swap(arr, start, left)
        quick_sort(arr, start, left-1)
        quick_sort(arr, left+1, end)
    return arr


quick_sort([0, 6, 1, 4, 2, 3, 5, 7, 9, 8])

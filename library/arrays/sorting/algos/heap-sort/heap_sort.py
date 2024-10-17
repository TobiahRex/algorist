class Solution:
    def __init__(self):
        pass

    def run(self):
        test_1 = [5, 3, 1, 2, 4, 6]
        test_2 = [1, 1, 1, 3, 5, 4, 6]
        for t in [
            # test_1,
            test_2
        ]:
            result = self.heap_sort(t)
            print("Answer: ", result)

    def heapify(self, arr, n, i):
        imax = i
        l = i * 2 + 1
        r = i * 2 + 2
        if l < n and arr[l] > arr[imax]:
            imax = l
        if r < n and arr[r] > arr[imax]:
            imax = r
        if imax != i:
            arr[imax], arr[i] = arr[i], arr[imax]
            self.heapify(arr, n, imax)

    def heap_sort(self, arr):
        for i in range(len(arr) // 2 - 1, -1, -1):
            self.heapify(arr, len(arr), i)
        for j in range(len(arr)-1, 0, -1):
            arr[j], arr[0] = arr[0], arr[j]
            self.heapify(arr, j, 0)
        return arr


if __name__ == '__main__':
    Solution().run()

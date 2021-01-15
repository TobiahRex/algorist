class Solution:
    def __init__(self):
        pass

    def run(self):
        test_1 = {
            'numbers': [1, 4, 3, 7, 2, 5, 10, 6, 7, 9],
            'k': 2,
        }
        test_2 = {
            "numbers": [1, 1, 1, 3, 5, 4, 6],
            "k": 3
        }
        for t in [
            test_1,
            test_2
        ]:
            result = self.kth_largest(**t)
            print(result)

    def swap(self, a, l, r):
        a[l], a[r] = a[r], a[l]

    def kth_largest(self, numbers, k):
        arr = numbers
        for i in range(len(arr) // 2, -1, -1):
            self.heapify(arr, len(arr), i)
        k_swaps = 0
        for i in range(len(arr)-1, 0, -1):
            self.swap(arr, 0, i)
            self.heapify(arr, i, 0)
            k_swaps += 1
            if k_swaps >= k:
                break
        return arr[-k:][0]

    def heapify(self, arr, n, root):
        imax = root
        l = 2 * root + 1
        r = 2 * root + 2
        if l < n and arr[imax] < arr[l]:
            imax = l
        if r < n and arr[imax] < arr[r]:
            imax = r
        if imax != root:
            self.swap(arr, imax, root)
            self.heapify(arr, n, imax)


if __name__ == '__main__':
    Solution().run()
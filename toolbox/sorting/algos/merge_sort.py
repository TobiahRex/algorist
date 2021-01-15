class Solution:
    def __init__(self):
        pass

    def merge_sort(self, arr):
        if len(arr) <= 1:
            return arr
        mid = round(len(arr) / 2)
        left = self.merge_sort(arr[0:mid])
        right = self.merge_sort(arr[mid:])
        i = 0
        j = 0
        merge = []
        while(i < len(left) and j < len(right)):
            if left[i] < right[j]:
                merge.append(left[i])
                i+=1
            elif left[i] > right[j]:
                merge.append(right[j])
                j += 1
            else:
                merge.append(left[i])
                merge.append(right[j])
                i += 1
                j += 1
        if i < len(left):
            merge += left[i:]
        elif j < len(right):
            merge += right[j:]
        return merge

if __name__ == '__main__':
    arr = [10, 16, 8, 12, 15, 6, 3, 9, 5]
    answer = Solution().merge_sort(arr)
    print('Answer: ', answer)


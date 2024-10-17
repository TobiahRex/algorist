"""
Given a list of numbers, the task is to insert these numbers into a stream and
find the median of the stream after each insertion. If the median is a non-integer,
consider it’s floor value.

The median of a sorted array is defined as the middle element when the number
of elements is odd and the mean of the middle two elements when the number of
elements is even.
"""

def heapify(arr, n, i):
    if i < 0:
        return
    imin = i
    l = 2 * i + 1
    r = 2 * i + 2
    if r < n and arr[r] < arr[imin]:
        imin = r
    if l < n and arr[l] < arr[imin]:
        imin = l
    if imin != i:
        arr[imin], arr[i] = arr[i], arr[imin]
        heapify(arr, n, i-1)

def get_mid_index(arr):
    if len(arr) % 2 == 0:
        left_mid = (len(arr)-1) // 2
        right_mid = left_mid + 1
        return left_mid, right_mid
    else:
        return len(arr) // 2, -1

def calc_median(arr, ix1, ix2):
    if ix1 > -1 and ix2 > -1:
        return (arr[ix1] + arr[ix2]) // 2
    return arr[ix1]

def call_heapify(min_heap):
    heapify(min_heap, len(min_heap), len(min_heap) // 2 - 1)

def online_median(arr):
    min_heap = []
    results = []
    for val in arr:
        min_heap.append(val)
        call_heapify(min_heap)
        s = []
        left_ix, right_ix = get_mid_index(min_heap)
        for j in range(len(min_heap)-1, -1, -1):
            s.append(min_heap[0])
            min_heap[0], min_heap[j] = min_heap[j], min_heap[0]
            heapify(min_heap, j, 0)
            if len(s) == max(left_ix, right_ix) + 1:
                median = calc_median(s, left_ix, right_ix)
                results.append(median)
                if len(s) == len(min_heap):
                    min_heap = []
                else:
                    min_heap = min_heap[0:len(s)-1]
                for sn in s:
                    min_heap.append(sn)
                    call_heapify(min_heap)
                break
    return results


if __name__ == '__main__':
    test_1 = {
        'arr': [3, 8, 5, 2]
    }
    for t in [
        test_1,
    ]:
        result = online_median(*t.values())
        print('Answer: ', result)
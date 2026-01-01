# def swap(a, l, r):
#     a[l], a[r] = a[r], a[l]


# def heapify(heap):
#     for i in range(len(heap) // 2 - 1, -1, -1):
#         bubble_down(heap, len(heap), i)


# def bubble_down(h, size, root):
#     imax = root
#     left = 2 * root + 1
#     right = 2 * root + 2
#     if left < size and h[imax] < h[left]:
#         imax = left
#     if right < size and h[imax] < h[right]:
#         imax = right
#     if imax != root:
#         swap(h, root, imax)
#         bubble_down(h, size, imax)


# def float_up(heap, i):
#     parent = i // 2 if i > 2 else 0
#     if heap[i] > heap[parent]:
#         swap(heap, i, parent)
#         float_up(heap, parent)


# def get_largest(heap, k):
#     for _ in range(k - 1):
#         heap.pop(0)
#         heapify(heap)
#     return heap[0]


# def kth_largest(k, initial_stream, append_stream):
#     heap = initial_stream
#     heapify(heap)
#     result = []
#     for val in append_stream:
#         if len(heap) >= (len(initial_stream) + 1):
#             if val <= result[-1]:
#                 result.append(result[-1])
#                 continue
#         heap.append(val)
#         float_up(heap, len(heap) - 1)
#         kth_largest = get_largest(heap, k, [])
#         result.append(kth_largest)
#     return result


def max_heapify(heap, size, root):
    iMax = root
    left = 2 * root + 1
    right = 2 * root + 2

    if left < size and heap[left] > heap[iMax]:
        iMax = heap[left]
    if right < size and heap[right] > heap[iMax]:
        iMax = heap[right]
    if iMax != root:
        heap[root], heap[iMax] = heap[iMax], heap[root]
        max_heapify(heap, size, iMax)


def heappop(heap):
    heap[0], heap[-1] = heap[-1], heap[0]
    root = heap.pop()
    max_heapify(heap, len(heap) - 1, 0)
    return root


def heappush(heap, val):
    heap.append(val)
    max_heapify(heap, len(heap), 0)


def kth_largest(k, initial_stream, append_stream):
    heap = initial_stream
    for val in append_stream:
        if val > heap[0]:
            heappush(heap, val)
    for i in range(k - 1):
        heappop(heap)
    return heappop(heap)


if __name__ == "__main__":
    test_1 = {"k": 2, "initial_stream": [1, 2, 3], "append_stream": [4, 5]}
    test_2 = {"k": 3, "initial_stream": [3, 2, 1], "append_stream": [4, 4, 4]}
    result = kth_largest(**test_1)
    print("Answer: ", result)

def heapify(h, n, i):
    imin = i
    left = 2*i+1
    right = 2*i+2
    if left < n and h[left] < h[imin]:
        imin = left
    if right < n and h[right] < h[imin]:
        imin = right
    if imin != i:
        h[imin], h[i] = h[i], h[imin]
        heapify(h, n, imin)

def heap_sort():
    values = [100, 20, 30, 50, 60, 10]
    heap = []
    for v in values:
        heap.append(v)
        for i in range(len(heap) // 2 -1, -1, -1):
            heapify(heap, len(heap), i)
    for j in range(len(heap)-1, 0, -1):
        heap[j], heap[0] = heap[0], heap[j]
        heapify(heap, j, 0)
    print(heap)

if __name__ == '__main__':
    main()
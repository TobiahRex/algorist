def get_min(pq):
    for i in range(len(pq) // 2 - 1, -1, -1):
        heapify(pq, len(pq), i)
    swap(pq, 0, -1)
    return pq.pop()


def heapify(pq, footprint, root):
    imin = root
    for child in [2 * root + 1, 2 * root + 2]:
        if child < footprint and pq[child] < pq[imin]:
            imin = child
    if imin != root:
        swap(pq, imin, root)
        heapify(pq, footprint, imin)


def swap(set, i, j):
    set[i], set[j] = set[j], set[i]

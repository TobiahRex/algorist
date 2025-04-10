import heapq


def find_kth_largest(nums, k):
    # Create a min-heap (note: we negate the elements to simulate a max-heap)
    max_heap = [-num for num in nums]
    heapq.heapify(max_heap)
    for _ in range(k - 1):
        heapq.heappop(max_heap)
    return -heapq.heappop(max_heap)


if __name__ == "__main__":
    test_1 = {"nums": [1, 2, 3, 4, 5], "k": 3}
    test_2 = {"nums": [1, 2, 3, 4, 5, 6], "k": 3}
    result = find_kth_largest(**test_1)
    print("Answer: ", result)

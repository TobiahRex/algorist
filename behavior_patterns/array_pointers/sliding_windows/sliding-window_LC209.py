# Leetcode 209: Minimum Size Subarray Sum


def min_subarray_len(target, nums):
    left, right = 0, 0
    sum = 0
    min_length = float("inf")
    while right < len(nums):
        sum += nums[right]
        while sum >= target:
            sum -= nums[left]
            min_length = min(min_length, right - left + 1)
            left += 1
        right += 1
    return min_length if min_length != float("inf") else 0


print(min_subarray_len(7, [2, 3, 1, 2, 4, 3]))

"""
The major pattern here is to consume more information using the right pointer,
and then shrink the window using the left pointer when the condition is met.

In this case, we were building out a sum and we were tracking the min length.
One could easily extend this pattern to track a max or a min.
"""

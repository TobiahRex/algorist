"""
This problem assumes that the array is sorted.
"""


def two_sum_II(nums, target):
    l, r = 0, len(nums) - 1
    while l <= r:
        total = nums[l] + nums[r]
        if total == target:
            return [l + 1, r + 1]
        elif total < target:
            l += 1
        else:
            r -= 1
    return []

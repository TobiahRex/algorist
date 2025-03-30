def swap(nums, i, j):
    nums[i], nums[j] = nums[j], nums[i]


def dutch_national_flag(nums):
    left, right, scan = -1, len(nums), 0
    while scan != right:
        if nums[scan] == 2:
            # Notice we don't move the scan pointer because we don't know what we swapped with.
            swap(nums, scan, right - 1)
            right -= 1
        elif nums[scan] == 1:
            # Notice we move scan because we swapped with the left.
            swap(nums, scan, left + 1)
            scan += 1
        else:
            # Notice we move scan because, again, we swapped with the left.
            swap(nums, scan, left + 1)
            left += 1
            scan += 1
    return nums


print(dutch_national_flag([0, 0, 2, 2, 0, 2, 0]))

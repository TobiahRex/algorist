# LC: 26


def removeDuplicates(nums):
    s, f = 0, 0

    for f in range(1, len(nums)):
        if nums[s] != nums[f]:
            s += 1
            nums[s] = nums[f]
    return s + 1


"""
This pattern pulls the slower pointer forward BEFORE changing the value. 

The pattern here doesn't require us to save the value that we're writing on top of. Our whole side effect is to be destructive so we increment before and overwrite.
"""

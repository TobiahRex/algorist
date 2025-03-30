def move_zeros(nums):
    z = 0
    for i in range(len(nums)):
        if nums[i] != 0:
            nums[z], nums[i] = nums[i], nums[z]
            z += 1


"""
This problem does an interesting job of showing how you can use a pattern for a non-outcome in some cases, and an actual-outcome in other cases.

The solution depends on a structural change (swapping physical position). 

A slow pointer straggles behind a fast pointer.
The slow pointer is only pushed forward whenever the fast pointer condition is satisfied. This has the side effect of leaving the slow pointer at the last position the fast pointer executed a specific change. So it's a pattern of leaving behind a breadcrumb so to say. 

The ideal mental model of behavior is that the z pointer is not independent. It's chained to the fast pointer, in that it is commanded by the fast pointer.

"""

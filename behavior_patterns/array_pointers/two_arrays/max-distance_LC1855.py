# LC: 1855
def max_distance(nums1, nums2):
    l, r = 0, 0
    max_dist = -float("infinity")

    while l < len(nums1) and r < len(nums2):
        if l <= r and nums1[l] <= nums2[r]:
            max_dist = max(max_dist, r - l)
            r += 1
        else:
            if l > r:
                r += 1
            else:
                l += 1
    return max_dist

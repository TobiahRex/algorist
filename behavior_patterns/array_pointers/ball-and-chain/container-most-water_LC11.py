# LC 11: Container with the most water
"""
You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.
"""


def container_most_water(heights):
    l, r = 0, len(heights) - 1
    max_h20 = -float("infinity")
    while l < r:
        dx = r - l
        dy = min(heights[l], heights[r])
        vol = dx * dy
        max_h20 = max(max_h20, vol)
        if heights[l] <= heights[r]:
            l += 1
        else:
            r -= 1
    return max_h20

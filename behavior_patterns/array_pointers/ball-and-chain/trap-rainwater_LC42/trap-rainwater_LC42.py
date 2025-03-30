"""
42. Trapping Rain Water
Hard
Topics
Companies
Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.



Example 1:


Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.
Example 2:

Input: height = [4,2,0,3,2,5]
Output: 9


Constraints:

n == height.length
1 <= n <= 2 * 104
0 <= height[i] <= 105
"""


def rainwater_trap(hts):
    l, r = 0, len(hts) - 1
    lmax = rmax = total = 0
    while l < r:
        if hts[l] <= hts[r]:
            if hts[l] >= lmax:
                lmax = hts[l]
            else:
                total += lmax - hts[l]
            l += 1
        else:
            if hts[r] >= rmax:
                rmax = hts[r]
            else:
                total += rmax - hts[r]
            r -= 1
    return total

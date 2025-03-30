"""
Given an integer array nums, return all the triplets
[nums[i], nums[j], nums[k]] such that i != j, i != k,
and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.


Example 1:
Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Explanation:
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
The distinct triplets are [-1,0,1] and [-1,-1,2].
Notice that the order of the output and the order of the # triplets does not matter.

Example 2:
Input: nums = [0,1,1]
Output: []
Explanation: The only possible triplet does not sum up to # 0.

Example 3:
Input: nums = [0,0,0]
Output: [[0,0,0]]
Explanation: The only possible triplet sums up to 0.
"""

def three_sum(nums):
    n = len(nums)
    sn = sorted(nums)
    r = []
    for base in range(n):
        if base > 0 and sn[base] == sn[base - 1]:
            continue

        l = base + 1
        r = n - 1
        while l < r:
            n_sum = sn[base] + sn[l] + sn[r]
            if n_sum == 0:
                r.append([sn[base], sn[l], sn[r]])
                while l < r and sn[l] == sn[l + 1]:
                    l += 1
                while l < r and sn[r] == sn[r - 1]:
                    r -= 1
                l += 1
                r -= 1
            elif n_sum < 0:
                l += 1
            else:
                r -= 1
    return r


# LC 141
# LC 234

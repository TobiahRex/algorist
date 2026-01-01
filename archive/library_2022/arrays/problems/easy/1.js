/**
  @function
  Given an array of integers, return indices of the two numbers such that they add up to a specific target.

  You may assume that each input would have exactly one solution, and you may not use the same element twice.

  Example:

  Given nums = [2, 7, 11, 15], target = 9,

  Because nums[0] + nums[1] = 2 + 7 = 9,
  return [0, 1].
*/

/**
 * @function getAnswer
 * Uses a Map to track the current number (key) and the target difference number (value).
 * For every num, check to see if it's compliment is in the map. If so, then we immediately return the two values.
 * @param {array} nums
 * @param {number} target
 * @return {array} [index, index] that equal target
 */
export default function getAnswer({ nums, target }) {
  const m = new Map();

  for (let i = 0; i < nums.length; i++) {
    if (m.has(target - nums[i])) {
      if (m.get(target - nums[i]) === i) continue;
      else {
        return [m.get(target - nums[i]), i];
      }
    }
    else {
      m.set(nums[i], i);
    }
  }
}

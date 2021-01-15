/**
 * @function
  Given an array of integers A sorted in non-decreasing order, return an array of the squares of each number,
  also in sorted non-decreasing order.



  Example 1:

  Input: [-4,-1,0,3,10]
  Output: [0,1,9,16,100]
  Example 2:

  Input: [-7,-3,2,3,11]
  Output: [4,9,9,49,121]
 */

export default function sortedSquares_best(A) {
  let [
    start, end, i, result
  ] = [
    0, A.length - 1, A.length - 1, new Array(A.length)
  ];

  while(start <= end) {
    let [pow1, pow2] = [Math.pow(A[start], 2), Math.pow(A[end], 2)];
    if (pow1 > pow2) {
      result[i--] = pow1;
      start++;
    } else {
      result[i--] = pow2;
      end--;
    }
  }
  return result;
}

function sortedSquares_better(A) {
  let [neg, pos, result, i, j] = [[], [], [], 0, 0];
  while (i < A.length) {
    if (A[i] < 0) neg.push(Math.pow(A[i], 2));
    else pos.push(Math.pow(A[i], 2));
    i += 1;
  }
  i = neg.length - 1;
  while (i > -1 && j < pos.length) {
    if (pos[j] < neg[i]) result.push(pos[j++]);
    else if (neg[i] < pos[j]) result.push(neg[i--]);
    else {
      result.push(neg[i--]);
      result.push(pos[j++]);
    }
  }
  if (j < pos.length) result = result.concat(pos.slice(j));
  while (i > -1) result.push(neg[i--])
  return result;
}

function sortedSquares_naive(nums) {
  return nums
    .sort((a, b) => Math.abs(a) - Math.abs(b))
    .map((n) => Math.pow(n, 2))
}

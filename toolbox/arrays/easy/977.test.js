import sortedSquares from './977';

describe('977: Squares of a Sorted Array', () => {
  test('should return a sorted list of all positive values', () => {
    let nums = [-4, -1, 0, 3, 10];
    expect(sortedSquares(nums)).toEqual([0, 1, 9, 16, 100]);
    nums = [-7, -3, 2, 3, 11];
    expect(sortedSquares(nums)).toEqual([4, 9, 9, 49, 121]);
    nums = [-7];
    expect(sortedSquares(nums)).toEqual([49]);
    nums = [-1, 0, 1];
    expect(sortedSquares(nums)).toEqual([0, 1, 1]);
  });
});

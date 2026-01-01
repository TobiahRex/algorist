import twoSum from './1';

describe('1: Two Sum', () => {
  test('should add two numbers', () => {
    let nums = [2,7,11];
    let target = 9;
    expect(twoSum({ nums, target })).toEqual([0, 1]);
    nums = [4, 4, 5];
    target = 8;
    expect(twoSum({ nums, target })).toEqual([0, 1]);
  });
});
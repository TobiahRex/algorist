import decompressRLElist from './1313';

describe('1313: Decompress Run-Length Encoded List', () => {
  test('should return decompressed list of nums', () => {
    let nums = [1,2,3,4];
    expect(decompressRLElist(nums)).toEqual([2, 4, 4, 4]);
    nums = [1,1,2,3];
    expect(decompressRLElist(nums)).toEqual([1, 3, 3]);
  });
});

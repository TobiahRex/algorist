class Solution:
    def convert(self, s, numRows):
        if numRows == 1: return s
        i, dir = 0, 1
        chunks = [""] * numRows
        start, end = 0, numRows - 1
        for c in list(s):
            chunks[i] += c
            i += dir
            if i in [start, end]:
                dir *= -1
        return ''.join(chunks)


if __name__ == '__main__':
    print(Solution().convert('PAYPALISHIRING', 3))
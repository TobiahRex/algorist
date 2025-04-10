"""Problem Statement: Find length of longest substring of a given string of digits
such that sum of digits in the first half and second half of the the substring is same.
"""

def iterate_thru_table(table_size):
    n = table_size
    table = {i: [0]*n for i in range(n)} # initialize table

    for s_len in range(2, n): # look at all widths starting from 2
        for row in range(n): # look at every row
            col = row + 1
            print('row: ', row, ' | col: ', col)

if __name__ == '__main__':
    args = {
        'table_size': 6
    }
    iterate_thru_table(*args.values())

# col = row + s_len - 1 # length's are index'd by 0 so subtract 1 to find target col.
# lk_ahead = s_len // 2
# table[row][col] = table[row][col-lk_ahead] + table[col-lk_ahead+1][col]

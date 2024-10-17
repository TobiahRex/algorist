def edit_distance_DP(a, b):
    rlen = len(a) + 1
    clen = len(b) + 1
    table = [[0]*clen for _ in range(rlen)]
    for i in range(rlen):
        for j in range(clen):
            if i == 0:
                table[i][j] = j
            elif j == 0:
                table[i][j] = i
            elif a[i-1] == b[j-1]:
                table[i][j] = table[i-1][j-1]
            else:
                _min = min(
                    table[i-1][j], # upper
                    table[i][j-1], # left
                    table[i-1][j-1], # upper-left
                ) + 1
                table[i][j] = _min
    [print(row) for row in table]
    return table[-1][-1]

def count_expressions_R(a, target):
    f = {'count': 0}
    def count(t, i):
        f['count'] += 1
        if i >= len(a): return 0
        add_count = t + a[i]
        minus_count = t - a[i]
        if target in [add_count, minus_count]: return 1
        return count(add_count, i+1) + count(minus_count, i+1)
    result = count(0, 0)
    return result

def show_range(choices):
    vals = sorted(choices)
    results = [abs(abs(vals[i-1]) - abs(v)) for i, v in enumerate(vals) if i > 0]
    print(results)

from collections import Counter as Memo

def count_expressions_DP(a, target):
    choices = Memo({a[0]: 1})
    func_count = 0
    for v in a[1:]:
        n_choices = Memo()
        for choice, count in choices.items():
            for r in [choice + v, choice - v]:
                func_count += 1
                n_choices[r] += count
        choices = n_choices
    return choices[target]


def number_of_ways_DP(coins, total):
    n = total + 1
    t = [0 for _ in range(n)]
    t[0] = 1
    for i, coin in enumerate(coins):
        for j in range(1, n):
            if coin > j:
                continue
            t[j] = t[j-coin] + t[j]
    return t[-1]


def number_of_ways_RXN(coins, total, ix=0, memo={}):
    if total == 0: return 1
    if total < 0: return 0
    if ix >= len(coins): return 0
    if (total, ix) in memo:
        return memo[(total, ix)]
    in_count = number_of_ways_RXN(coins, total-coins[ix], ix, memo)
    ex_count = number_of_ways_RXN(coins, total, ix+1, memo)
    memo[(total, ix)] = in_count + ex_count
    return memo[(total, ix)]

if __name__ == '__main__':
    # result = edit_distance_DP('SUNDAY', 'SATURDAY')
    # print('Edit Distance: ', result)

    # result = count_expressions_DP([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3)
    # result = count_expressions_DP([100, 200, 300, 400, 500], 3)
    # result = count_expressions_DP([2, 3, 5, 7, 11, 13, 17, 19], 3)
    result = number_of_ways_RXN([1, 2, 3], 3)
    print('Result: ', result)

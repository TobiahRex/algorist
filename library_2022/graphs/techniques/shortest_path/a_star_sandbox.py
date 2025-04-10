from math import inf
import cProfile


def knights_tour_a_star(*args):
    impossible, eject_early, return_val = early_check(*args)
    if impossible or eject_early:
        return return_val
    [rows, cols, start_row, start_col, end_row, end_col] = args
    g = {i: [inf] * cols for i in range(rows)}
    visited = {(start_row, start_col): (None, -inf)}
    pq = [(start_row, start_col)]
    while pq:
        row, col = get_min_score(pq)
        if (row, col) == (end_row, end_col):
            break
        g[row][col] = -1
        min_score = inf
        min_neighbor = None
        for i in [-2, -1, 1, 2]:
            for j in [-2, -1, 1, 2]:
                if abs(i) == abs(j):
                    continue
                nr, nc = row + i, col + j
                if should_skip(g, nr, nc):
                    continue
                n_score = calc_hueristic(nr, nc, end_row, end_col)
                if n_score < g[nr][nc]:
                    g[nr][nc] = n_score
                if n_score < min_score:
                    min_score = n_score
                    min_neighbor = (nr, nc)
        if min_neighbor:
            r, c = min_neighbor
            g[r][c] = n_score
            visited[(r, c)] = ((row, col), n_score)
            pq.append((n_score, r, c))
    if (row, col) == (end_row, end_col):
        return count_moves(visited, visited[(row, col)][0])
    return -1


def count_moves(visited, last_node):
    moves = 0
    while last_node:
        moves += 1
        last_node, _ = visited[last_node]
    return moves


def should_skip(g, nr, nc):
    if 0 > nr or nr >= len(g) or 0 > nc or nc >= len(g[0]) or g[nr][nc] == -1:
        return True
    return False


def calc_hueristic(nr, nc, er, ec):
    _mh = abs(er - nr) + abs(ec - nc)
    # mh = round(_mh / 3, 2)
    # if mh == 3:
    #     print()
    # elif mh < 3:
    #     mh += 3
    return _mh


def get_min_score(pq):
    for i in range(len(pq) // 2 - 1, -1, -1):
        heapify(pq, len(pq), i)
    pq[0], pq[-1] = pq[-1], pq[0]
    _, row, col = pq.pop()
    return row, col


def heapify(pq, size, i):
    imin, l, r = i, 2 * i + 1, 2 * i + 2
    if l < size and pq[l][0] < pq[imin][0]:
        imin = l
    if r < size and pq[r][0] < pq[imin][0]:
        imin = r
    if imin != i:
        pq[imin], pq[i] = pq[i], pq[imin]
        heapify(pq, size, imin)


def early_check(rows, cols, start_row, start_col, end_row, end_col):
    is_impossible = False
    eject_early = False
    return_value = None
    if (start_row, start_col) == (end_row, end_col):
        return is_impossible, True, 0
    if any([rows < 3 and cols < 3, rows == 1 or cols == 1]):
        return True, eject_early, -1
    return is_impossible, eject_early, return_value


if __name__ == "__main__":
    args = {
        "rows": 3,
        "cols": 8,
        "start_row": 0,
        "start_col": 6,
        "end_row": 1,
        "end_col": 5,
    }
    args_2 = {
        "rows": 33333,
        "cols": 3,
        "start_row": 333,
        "start_col": 0,
        "end_row": 33332,
        "end_col": 2,
    }
    args_3 = {
        "rows": 4999,
        "cols": 20,
        "start_row": 4998,
        "start_col": 0,
        "end_row": 4998,
        "end_col": 19,
    }
    profile = cProfile.Profile()
    profile.runcall(a_star, *args_2.values())
    print()
    # print('Moves: ', a_star(*args_2.values()))

"""
[
    s, 0, 0, 0, 0
    0, 0, 1, 0, 0
    2, 0, 0, 0, 0
    0, 0, 0, 2, 0
    0, 3, 0, 0, 0
]

"""

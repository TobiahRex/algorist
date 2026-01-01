def combo_sum(candidates, target):
    res = []
    candidates.sort()

    def backtrack(start, path, t):
        if t == 0:
            res.append(path[:])
            return
        
        # branch
        for i in range(start, len(candidates)):
            # constraint check = bound
            if candidates[i] > t:
                break # prune
            path.append(candidates[i])
            backtrack(i, path, t - candidates[i])
            path.pop()

    backtrack(0, [], target)
    return res
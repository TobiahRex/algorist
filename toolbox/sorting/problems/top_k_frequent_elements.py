# LeetCode.347

def find_top_k_frequent_elements(arr, k):
    d = {}
    for n in arr:
        if n in d:
            d[n] += 1
        else:
            d[n] = 1
    if d:
        freq_sorted = sorted(d.items(), key=lambda k: k[1], reverse=True)
        d_sorted = {k: v for k, v in freq_sorted}
        return list(d_sorted.keys())[0:k]
    return []

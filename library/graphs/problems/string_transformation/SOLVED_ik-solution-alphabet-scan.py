"""
IK's solution to the string transformation problem & very fast.
"""
from collections import deque


def string_transformation(words, start, stop):
    if has_edge(start, stop):
        return [start, stop]
    words_set = set(words)
    visited = set([start])
    q = deque([(start, [start])])
    while q:
        node, trail = q.pop()
        for n in get_neighbors(node, words_set):
            if has_edge(n, stop):
                return trail + [n, stop]
            if n not in visited:
                visited.add(n)
                q.appendleft((n, trail + [n]))
    return ["-1"]


def get_neighbors(target, words_set):
    neighbors = []
    if len(words_set) > (26 * len(target)):
        for code in range(ord("a"), ord("z") + 1):
            for i in range(len(target)):
                word = target[:i] + chr(code) + target[i + 1 :]
                if word in words_set:
                    neighbors.append(word)
    else:
        for word in words_set:
            if has_edge(word, target):
                neighbors.append(word)
    return neighbors


def has_edge(w1, w2):
    count = 0
    for i in range(len(w1)):
        if w1[i] != w2[i]:
            count += 1
        if count > 1:
            return False
    return count == 1


if __name__ == "__main__":
    args_2 = {"words": ["cat", "hat", "bad", "had"], "start": "bat", "stop": "had"}
    result = string_transformation(*args_2.values())
    print(result)

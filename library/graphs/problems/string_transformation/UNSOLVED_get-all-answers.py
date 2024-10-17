from collections import deque


def get_all_shortest_transformation_sequences(start, stop, words):
    # if has_edge(start, stop):
    #     return [start, stop]
    _words = set(words)
    visited = set()
    q = deque([(start, start)])
    answers = []
    while q:
        word, trail = q.pop()
        visited.add(word)
        for n in get_neighbors(word, _words):
            if n == stop:
                answers = update_answers(trail.split(",") + [n], answers)
            elif n not in visited:
                # visited.add(n)
                q.appendleft((n, trail + f",{n}"))
    return answers


def has_edge(w1, w2):
    delta = 0
    for i in range(len(w1)):
        if w1[i] != w2[i]:
            delta += 1
        if delta > 1:
            return False
    return delta == 1


def get_neighbors(word, _words):
    neighbors = []
    if len(_words) > (26 * len(word)):
        # replace every letter in word, and see if its in the words list
        for code in range(ord("a"), ord("z") + 1):
            for i in range(len(word)):
                s = word[:i] + chr(code) + word[i + 1 :]
                if s in _words:
                    neighbors.append(s)
    else:
        # iterate across every word in words, and see if it matches word.
        for _word in _words:
            if has_edge(_word, word):
                neighbors.append(_word)
    return neighbors


def update_answers(next_answer, answers):
    if not answers:
        answers = [next_answer]
    elif len(next_answer) < len(answers[0]):
        answers = [next_answer]
    elif len(next_answer) == len(answers[0]):
        answers.append(next_answer)
    return answers


if __name__ == "__main__":
    args = None

    args_2 = {
        "start_word": "abc",
        "target_word": "zzz",
        "words": ["abz", "zbc", "zbz", "zcz", "zzz"],
    }
    """
    abc -> abz -> zbz -> zzz
    abc -> zbc -> zbz -> zzz
    """

    args_3 = {
        "start": "aaa",
        "stop": "zzz",
        "words": ["aab", "zab", "zaz", "zyz", "zzz"],
    }
    result = get_all_shortest_transformation_sequences(*args_2.values())
    print(result)

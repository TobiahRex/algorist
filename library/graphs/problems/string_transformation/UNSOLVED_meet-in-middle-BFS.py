from collections import deque as dq


def string_transformation_BFS_meetInMiddle(words, start, stop):
    if has_edge(start, stop):
        return [start, stop]
    v1, v2 = {start: None}, {stop: None}
    q1, q2 = dq([start]), dq([stop])
    q_on = True
    answer = []
    while q1 or q2:
        from_start, q_on = check_neighbors(q1, v1, v2, stop, words, q_on)
        from_end, q_on = check_neighbors(q2, v2, v1, start, words, q_on)
        path = get_path(from_start, v1, from_end, v2)
        if path:
            if not answer:
                answer = path
            if answer and len(path) < len(answer):
                answer = path
    return answer


def check_neighbors(q, visited, other_visited, stop_word, words, q_on):
    if not q:
        return None, True if q_on else False
    word = q.pop()
    for w in words:
        if word == "kce":
            print()
            """
            A path exists, but it's being short-circuited before looking at every edge for the current node.
            Essentially, you can't NOT look at every edge for a given word. You must finish looking at every edge.
            If there are multiple edges connecting you to the second q, then you should look at them all.
            You shouldn't need to iterate through the entire q at that point?
            """
        if w not in visited and has_edge(word, w):
            visited[w] = word
            if q_on:
                q.appendleft(w)
            if w == stop_word or w in other_visited:
                return w, False
    return None, True if q_on else False


def has_edge(w1, w2):
    count = 0
    for i in range(len(w1)):
        if w1[i] != w2[i]:
            count += 1
        if count > 1:
            return False
    return count == 1


def get_path(from_start, v1, from_end, v2):
    if not from_start and not from_end:
        return
    glue_word = from_start or from_end
    path = dq([])
    get_half_path(glue_word, v1, path, append="left")
    path.append(glue_word)
    get_half_path(glue_word, v2, path, append="right")
    return list(path)


def get_half_path(start_word, visited, path, append):
    last_word = visited[start_word]
    while last_word:
        if append == "left":
            path.appendleft(last_word)
        elif append == "right":
            path.append(last_word)
        last_word = visited[last_word]
    return path


def string_transformation(words, start, stop):
    """
    Attempted brute-force solution using set differences.
    Unfortunately it doesn't work because when we convert a word to a set, we remove duplicate letters which we cannot do.
    """
    unique_words = set(words)
    unique_words.add(start)
    unique_words.add(stop)
    words_hash = {word: {"visited": 0, "set": set(list(word))} for word in unique_words}
    answer = []
    q = dq([start])
    while q:
        cw = q.pop()
        words_hash[cw]["visited"] = 1
        if cw == stop:
            break
        cw_set = words_hash.get(cw).get("set")
        found_next = False
        for next_word, nw in words_hash.items():
            if nw.get("visited"):
                continue
            nw_set = nw.get("set")
            if len(cw_set - nw_set or nw_set - cw_set) == 1:
                if not answer:
                    answer.append(cw)
                found_next = True
                words_hash[next_word]["visited"] = 1
                answer.append(next_word)
                q.append(next_word)
        if answer and not found_next:  # backtrack
            last_word = answer.pop()
    return answer if answer else ["-1"]

    result = OPTIMAL_string_transformation(*args.values())
    print(result)


if __name__ == "__main__":
    args_2 = {"words": ["cat", "hat", "bad", "had"], "start": "bat", "stop": "had"}
    result = string_transformation_v2(*args_2.values())
    print(result)

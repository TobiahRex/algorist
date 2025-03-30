# LC 344
def reverse_string(str: list):
    l, r = 0, len(str) - 1
    while l < r:
        if str[l] != str[r]:
            str[l], str[r] = str[r], str[l]
        l += 1
        r -= 1
    return str

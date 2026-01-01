
class LinkedListNode:
    def __init__(self, value):
        self.value = value
        self.next = None

def extend(value, head, tail):
    link = LinkedListNode(value)
    if not head:
        head = link
    if not tail:
        tail = head
    else:
        tail.next = link
        tail = tail.next
    return head, tail

def merge_k_lists(lists):
    if len(lists) == 1:
        return lists[0]
    elif len(lists) <= 0:
        return []
    mid = len(lists) // 2
    l = merge_k_lists(lists[0:mid])
    r = merge_k_lists(lists[mid:])
    if not l and r: return l or r
    head = None
    tail = None
    while(l and r):
        if l.value < r.value:
            head, tail = extend(l.value, head, tail)
            l = l.next
        elif r.value < l.value:
            head, tail = extend(r.value, head, tail)
            r = r.next
        else:
            head, tail = extend(l.value, head, tail)
            head, tail = extend(r.value, head, tail)
            l = l.next
            r = r.next
    if l:
        while(l):
            head, tail = extend(l.value, head, tail)
            l = l.next
    elif r:
        while(r):
            head, tail = extend(r.value, head, tail)
            r = r.next
    return head

if __name__ == '__main__':
    input = []
    for l in [
        [-10, 5, 9, 11, 13],
        [-10, 10],
        [],
        [-11, 2, 6, 10, 12],
        [],
        [-100],
        [100]
    ]:
        head = None
        tail = None
        for n in l:
            head, tail = extend(n, head, tail)
        input.append(head)
    result = merge_k_lists(input)
    while result:
        print(result.value)
        result = result.next

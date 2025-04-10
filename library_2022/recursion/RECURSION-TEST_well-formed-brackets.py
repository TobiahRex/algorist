
def find_all_well_formed_brackets(n, l=0, slate=[], results=[], lb=0, rb=0):
    if l == 2*n:
        if len(slate) == 2*n:
            if lb == rb:
                results.append(''.join(slate))
        return
    slate.append('(')
    find_all_well_formed_brackets(n, l+1, slate, results, lb + 1, rb)
    slate.pop()
    if rb + 1 <= lb:
        slate.append(')')
        find_all_well_formed_brackets(n, l+1, slate, results, lb, rb + 1)
        slate.pop()
    return results

if __name__ == '__main__':
    print(find_all_well_formed_brackets(3))
    results_3 = [
        '((()))',
        '(()())',
        '(())()',
        '()(())',
        '()()()'
    ]
    results_4 = [
        '(((())))',
        '((()()))',
        '((())())',
        '((()))()',
        '(()(()))',
        '(()()())',
        '(()())()',
        '(())(())',
        '(())()()',
        '()((()))',
        '()(()())',
        '()(())()',
        '()()(())',
        '()()()()'
    ]

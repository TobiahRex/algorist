def swap(a, l, r):
    print(f'Swapping: {a[l]} w/ {a[r]}')
    a[l], a[r] = a[r], a[l]

def hoares_partition():
    a = [3, 4, 9, 1, 7, 0, 5, 2, 6, 8]
    left = 0
    right = len(a) - 1
    pivot = a[right // 2]
    while left <= right:
        if pivot > a[left]:
            left += 1
        elif pivot <= a[left]:
            while pivot < a[right]:
                right -= 1
            swap(a, left, right)
            left += 1
            right -= 1
    if pivot < a[right]:
        swap(a, left, right)
    print(a) # [3, 4, 6, 1, 2, 0, 5, 7, 9, 8]
    # Performed 2 swaps & 7 is in final spot

if __name__ == '__main__':
    hoares_partition()
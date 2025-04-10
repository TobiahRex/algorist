def swap(a, l, r):
    print(f'Swapping: {a[l]} w/ {a[r]}')
    a[l], a[r] = a[r], a[l]

def hoares_partition_OLD(a, left, right):
    pivot = a[right // 2]
    while left < right:
        if pivot > a[left]:
            left += 1
        elif pivot <= a[left]:
            while pivot < a[right]:
                right -= 1
            swap(a, left, right)
            left += 1
            right -= 1
    if pivot < a[right]:
        swap(a, right - 1, right)
    # Performed 2 swaps & 7 is in final spot

def hoares_partition(a, left, right):
    pivot = a[left]
    while left < right:
        while a[left] < pivot:
            left += 1
        while a[right] > pivot:
            right -= 1
        swap(a, left, right)
    return right

if __name__ == '__main__':
    a = [0, 6, 1, 4, 2, 3, 5, 7, 9, 8]
    left = 0
    right = len(a) - 1
    hoares_partition(a, left, right)
    print(a) # [3, 4, 6, 1, 2, 0, 5, 7, 9, 8]

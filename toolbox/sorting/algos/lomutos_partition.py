import random

def swap(a, l, r):
    print(f'Swapping: {a[l]} w/ {a[r]}')
    a[l], a[r] = a[r], a[l]

def lomutos_partition(a, low, high):
    rix = random.randint(0, len(a)-1)
    pivot = a[rix]
    swap(a, rix, high)
    i = low
    for j in range(low, high):
        if a[j] <= pivot:
            if j > i:
                swap(a, j, i)
            i += 1
    swap(a, high, i)
    return a


if __name__ == '__main__':
    a = [3, 4, 9, 1, 7, 0, 5, 2, 6, 8]
    print(
        lomutos_partition(a=a, low=0, high=len(a)-1))
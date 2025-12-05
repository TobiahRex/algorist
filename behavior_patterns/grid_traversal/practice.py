def traverse_8_way():
    for i in [-1, 0, 1]:
        for j in [-1, 0, 1]:
            if (i, j) == (0, 0): continue
            print(i, j)

def diagonals():
    for i in [-1, 1]:
        for j in [-1, 1]:
            print(i, j)

def snake():
    grid = [[i for i in range(0, 8)] for j in range(0, 8)]

if __name__ == '__main__':
    print(diagonals())
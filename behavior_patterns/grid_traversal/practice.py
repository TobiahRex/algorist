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

    for r in range(0, len(grid)):
        if r % 2 == 0:
            for cr in grid[r]:
                print("snake right: ", cr)
        else:
            for cl in range(len(grid[r]) - 1, -1, -1):
                print("snake left: ", grid[r][cl])

def diagonal():
    

if __name__ == '__main__':
    print(snake())

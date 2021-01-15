class DataStructuresAlgorithmsCourse:
    def __init__(self):
        self.topics = [
            {"id": 1, "name": "Basic data structures", "time": 1, "priority": 1.0, "difficulty": 1.0},
            {"id": 2, "name": "Sorting algorithms", "time": 1, "priority": 1.0, "difficulty": 1.0},
            {"id": 3, "name": "Advanced data structures", "time": 2, "priority": 0.5, "difficulty": 0.5},
            {"id": 4, "name": "Algorithm design techniques", "time": 2, "priority": 0.5, "difficulty": 0.5},
            {"id": 5, "name": "Graph algorithms", "time": 2, "priority": 0.5, "difficulty": 0.9},
            {"id": 6, "name": "String algorithms", "time": 1, "priority": 0.2, "difficulty": 0.9},
            {"id": 7, "name": "NP-hard problems and approximation algorithms", "time": 2, "priority": 0.2, "difficulty": 0.9},
            {"id": 8, "name": "Parallel and distributed algorithms", "time": 1, "priority": 0.2, "difficulty": 0.9}
        ]
        self.sub_topics = {
            1: ["Arrays", "Linked lists", "Stacks", "Queues", "Hash tables"],
            2: ["Bubble sort", "Insertion sort", "Selection sort", "Merge sort", "Quick sort"],
            3: ["Trees (binary, AVL, red-black)", "Heaps", "Graphs"],
            4: ["Greedy algorithms", "Divide and conquer", "Dynamic programming"],
            5: ["Breadth-first search", "Depth-first search", "Shortest path (Dijkstra, A*)"],
            6: ["Knuth-Morris-Pratt algorithm", "Boyer-Moore algorithm", "Rabin-Karp algorithm"],
            7: ["Traveling Salesman Problem", "Set Cover", "Vertex Cover"],
            8: ["MapReduce", "Distributed hash tables", "Parallel sorting"]
        }

    def reorder_by_priority(self):
        self.topics.sort(key=lambda x: x["priority"], reverse=True)

course = DataStructuresAlgorithmsCourse()
course.reorder_by_priority()
print(course.topics)

"""
To customize the priority level of each topic, you can simply modify the priority value in the dictionaries. For example, to increase the priority of the "Basic data structures" topic, you can do:

course.topics[0]["priority"] = 1.5
course.reorder_by_priority()
print(course.topics)
"""
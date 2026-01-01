class Node:
    def __init__(self, data=None, next=None):
        self.data = data
        self.next = next

class LinkedListOps:
    def __init__(self):
        self.head = None

    def insert_front(self, data):
        """Insert a new node at the front of the linked list."""
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node

    def insert_position(self, data, position):
        """Insert a new node at a specific position in the linked list."""
        new_node = Node(data)
        if position == 0:
            new_node.next = self.head
            self.head = new_node
        else:
            current_node = self.head
            for i in range(position - 1):
                current_node = current_node.next
            # splice into the node chain
            new_node.next = current_node.next
            current_node.next = new_node

    def insert_end(self, data):
        """Insert a new node at the end of the linked list."""
        new_node = Node(data)
        if self.head is None:
            self.head = new_node
        else:
            current_node = self.head
            while current_node.next is not None:
                current_node = current_node.next
            current_node.next = new_node

    def delete_front(self):
        """Delete the first node of the linked list."""
        if self.head is not None:
            self.head = self.head.next

    def delete_position(self, position):
        """Delete a node at a specific position in the linked list."""
        if self.head is not None:
            if position == 0:
                self.head = self.head.next
            else:
                current_node = self.head
                for i in range(position - 1):
                    current_node = current_node.next
                current_node.next = current_node.next.next

    def delete_end(self):
        """Delete the last node of the linked list."""
        if self.head is not None:
            current_node = self.head
            if current_node.next is None:
                self.head = None
            else:
                while current_node.next.next is not None:
                    current_node = current_node.next
                current_node.next = None

    def traverse(self):
        """Print the data of each node in the linked list."""
        current_node = self.head
        while current_node is not None:
            print(current_node.data)
            current_node = current_node.next

    def search(self, data):
        """Search for a node with a specific data value and return it if found."""
        current_node = self.head
        while current_node is not None:
            if current_node.data == data:
                return current_node
            current_node = current_node.next
        return None

    def sort(self, method='bubble'):
        """Sort the linked list using the specified sorting method."""
        if method == 'bubble':
            # Bubble sort algorithm
            sorted = False
            while not sorted:
                sorted = True
                current_node = self.head
                while current_node.next is not None:
                    if current_node.data > current_node.next.data:
                        # Swap the data values
                        current_node.data, current_node.next.data = current_node.next.data, current_node.data
                        sorted = False
                    current_node = current_node.next
        elif method == 'insertion':
            # Insertion sort algorithm
            for i in range(1, self.size()):
                current_node = self.head
                for j in range(i - 1):
                    current_node = current_node.next
                value = current_node.data
                pos = i
                while pos > 0 and self.node_at(pos - 1).data > value:
                    self.node_at(pos).data = self.node_at(pos - 1).data
                    pos -= 1
                self.node_at(pos).data = value
        elif method == 'merge':
            # Merge sort algorithm
            if self.head is not None:
                # Split the list into two halves
                left, right = self.split()
                # Recursively sort the two halves
                left.sort(method)
                right.sort(method)
                # Merge the sorted halves
                self.head = self.merge(left, right)

    def node_at(self, position):
        """Return the node at a specific position in the linked list."""
        if self.head is not None:
            current_node = self.head
            for i in range(position):
                current_node = current_node.next
            return current_node
        return None


    def split(self):
        """Split the linked list into two halves."""
        if self.head is None:
            return None, None
        if self.head.next is None:
            return self, None
        slow = self.head
        fast = self.head
        while fast.next is not None and fast.next.next is not None:
            slow = slow.next
            fast = fast.next.next
        left = LinkedListOps()
        left.head = self.head
        right = LinkedListOps()
        right.head = slow.next
        slow.next = None
        return left, right

    def merge(self, left, right):
        """Merge two sorted linked lists into a single sorted list."""
        if left.head is None:
            return right.head
        if right.head is None:
            return left.head
        if left.head.data <= right.head.data:
            self.head = left.head
            left.head = left.head.next
        else:
            self.head = right.head
            right.head = right.head.next
        current_node = self.head
        while left.head is not None and right.head is not None:
            if left.head.data <= right.head.data:
                current_node.next = left.head
                left.head = left.head.next
            else:
                current_node.next = right.head
                right.head = right.head.next
            current_node = current_node.next
        if left.head is not None:
            current_node.next = left.head
        if right.head is not None:
            current_node.next = right.head
        return self.head

    def reverse(self):
        """Reverse the linked list in-place."""
        previous = None
        current_node = self.head
        while current_node is not None:
            next = current_node.next
            current_node.next = previous
            previous = current_node
            current_node = next
        self.head = previous

    def middle(self):
        """Find the middle node of the linked list."""
        slow = self.head
        fast = self.head
        while fast.next is not None and fast.next.next is not None:
            slow = slow.next
            fast = fast.next.next
        return slow

    def has_loop(self):
        """Determine whether the linked list contains a loop."""
        slow = self.head
        fast = self.head
        while fast.next is not None and fast.next.next is not None:
            slow = slow.next
            fast = fast.next.next
            if slow == fast:
                return True
        return False

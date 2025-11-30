import type { PatternProblem } from '../redux/types';

export const fastSlowProblems: PatternProblem[] = [
  {
    id: 'linkedListCycle',
    name: 'Linked List Cycle Detection',
    difficulty: 'easy',
    description: 'Detect if a linked list has a cycle using O(1) space',
    examples: [
      {
        input: { values: [3, 2, 0, -4], cycleAt: 1 },
        display: '3→2→0→-4 (cycle back to index 1)',
        expected: true,
      },
      {
        input: { values: [1, 2], cycleAt: 0 },
        display: '1→2 (cycle back to index 0)',
        expected: true,
      },
      {
        input: { values: [1, 2, 3, 4, 5], cycleAt: -1 },
        display: '1→2→3→4→5 (no cycle)',
        expected: false,
      },
      {
        input: { values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], cycleAt: 3 },
        display: '1→2→3→4→...→10 (cycle at index 3)',
        expected: true,
      },
    ],
    mnemonicEmoji: '🐢',
    mnemonicPerson: 'Tortoise & Hare',
    mnemonicObject: 'Circular Track',
    mnemonicAction: 'Racing until collision',
    mnemonicStory:
      'The tortoise moves 1 step, hare moves 2. On a circular track, they must meet. If they do → cycle. If hare reaches end → no cycle. Perfect O(1) space detective.',
    realWorldUses: [
      {
        icon: '🔗',
        title: 'Deadlock Detection',
        description: 'Detect circular dependencies in process scheduling',
      },
      {
        icon: '📡',
        title: 'Network Routing',
        description: 'Find loops in network topology before packets waste bandwidth',
      },
    ],
  },
  {
    id: 'findCycleStart',
    name: 'Find Cycle Start Node',
    difficulty: 'medium',
    description: 'Find the node where a cycle begins in a linked list',
    examples: [
      {
        input: { values: [3, 2, 0, -4], cycleAt: 1 },
        display: '3→2→0→-4→2 (cycle starts at 2)',
        expected: 2,
      },
      {
        input: { values: [1, 2], cycleAt: 0 },
        display: '1→2→1 (cycle starts at 1)',
        expected: 1,
      },
      {
        input: { values: [1, 2, 3, 4, 5], cycleAt: -1 },
        display: '1→2→3→4→5 (no cycle)',
        expected: null,
      },
    ],
    mnemonicEmoji: '🐢',
    mnemonicPerson: 'Crime Scene Investigator',
    mnemonicObject: 'Collision Point',
    mnemonicAction: 'Tracing back to origin',
    mnemonicStory:
      'After tortoise & hare collide (confirming cycle), move one pointer to start and both move 1 step at a time. They meet at cycle entrance. Magic!',
    realWorldUses: [
      {
        icon: '🐛',
        title: 'Bug Detection',
        description: 'Trace back to find source of infinite loop in code',
      },
    ],
  },
  {
    id: 'middleOfList',
    name: 'Find Middle of Linked List',
    difficulty: 'easy',
    description: 'Find the middle node of a linked list in one pass',
    examples: [
      {
        input: { values: [1, 2, 3, 4, 5] },
        display: '1→2→3→4→5',
        expected: 3,
      },
      {
        input: { values: [1, 2, 3, 4, 5, 6] },
        display: '1→2→3→4→5→6',
        expected: 4,
      },
      {
        input: { values: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
        display: '1→2→3→4→5→6→7→8→9',
        expected: 5,
      },
    ],
    mnemonicEmoji: '🐢',
    mnemonicPerson: 'Balance Point Finder',
    mnemonicObject: 'List Midpoint',
    mnemonicAction: 'Racing to equilibrium',
    mnemonicStory:
      'Hare moves 2, tortoise moves 1. When hare reaches end, tortoise is perfectly centered. One pass, no length needed!',
    realWorldUses: [
      {
        icon: '⚖️',
        title: 'Load Balancing',
        description: 'Split task lists into balanced halves for parallel processing',
      },
    ],
  },
  {
    id: 'happyNumber',
    name: 'Happy Number Detection',
    difficulty: 'easy',
    description: 'Determine if a number is happy (reaches 1 via digit sum squares)',
    examples: [
      {
        input: { n: 7 },
        display: 'n=7',
        expected: true,
      },
      {
        input: { n: 2 },
        display: 'n=2',
        expected: false,
      },
      {
        input: { n: 19 },
        display: 'n=19',
        expected: true,
      },
      {
        input: { n: 100 },
        display: 'n=100',
        expected: true,
      },
    ],
    mnemonicEmoji: '🐢',
    mnemonicPerson: 'Number Tracker',
    mnemonicObject: 'Digit Sum Cycle',
    mnemonicAction: 'Racing through transformations',
    mnemonicStory:
      'Take sum of squares of digits. Hare does it twice, tortoise once. If they meet at 1 → happy! If they cycle anywhere else → cycle detected = unhappy.',
    realWorldUses: [
      {
        icon: '🎮',
        title: 'Game Mechanics',
        description: 'Detect win conditions vs. infinite loops in game states',
      },
    ],
  },
];

export const fastSlowCodeExamples = {
  linkedListCycle: {
    verbose: `# Linked List Cycle Detection - VERBOSE
# Detect cycle using Fast & Slow pointers (tortoise & hare)

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class CycleDetector:
    def __init__(self, head):
        self.head = head
        self.slow = head
        self.fast = head
        self.has_cycle = False

    def move_slow(self):
        """Move slow pointer 1 step"""
        if self.slow:
            self.slow = self.slow.next

    def move_fast(self):
        """Move fast pointer 2 steps"""
        if self.fast and self.fast.next:
            self.fast = self.fast.next.next

    def detect(self):
        """Detect cycle using collision"""
        while self.fast and self.fast.next:
            self.move_slow()
            self.move_fast()

            # Collision means cycle exists
            if self.slow == self.fast:
                self.has_cycle = True
                return self.has_cycle

        # No collision = no cycle
        return self.has_cycle

# Usage
head = ListNode(3, ListNode(2, ListNode(0, ListNode(-4))))
head.next.next.next.next = head.next  # Create cycle
detector = CycleDetector(head)
print(detector.detect())  # → True`,

    terse: `# Linked List Cycle Detection - TERSE

class Solution:
    def hasCycle(self, head):
        if not head:
            return False

        slow = fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow == fast:
                return True
        return False`,
  },

  findCycleStart: {
    verbose: `# Find Cycle Start Node - VERBOSE
# Two-phase: detect cycle, then find start node

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class CycleStartFinder:
    def __init__(self, head):
        self.head = head
        self.collision_point = None

    def detect_cycle(self):
        """Phase 1: Detect if cycle exists"""
        slow = fast = self.head

        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow == fast:
                self.collision_point = slow
                return True
        return False

    def find_cycle_start(self):
        """Phase 2: Find cycle start node"""
        if not self.collision_point:
            if not self.detect_cycle():
                return None

        # Move ptr1 to head, ptr2 to collision
        ptr1 = self.head
        ptr2 = self.collision_point

        # Move both 1 step until they meet
        while ptr1 != ptr2:
            ptr1 = ptr1.next
            ptr2 = ptr2.next

        return ptr1.val

# Usage
head = ListNode(3, ListNode(2, ListNode(0, ListNode(-4))))
head.next.next.next.next = head.next  # cycle at node 2
finder = CycleStartFinder(head)
print(finder.find_cycle_start())  # → 2`,

    terse: `# Find Cycle Start Node - TERSE

def detectCycleStart(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            break
    else:
        return None

    # Phase 2: find start
    ptr1, ptr2 = head, slow
    while ptr1 != ptr2:
        ptr1 = ptr1.next
        ptr2 = ptr2.next
    return ptr1`,
  },

  middleOfList: {
    verbose: `# Find Middle of Linked List - VERBOSE

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class MiddleFinder:
    def __init__(self, head):
        self.head = head
        self.slow = head
        self.fast = head

    def find_middle(self):
        """One-pass middle finder"""
        # Move slow 1 step, fast 2 steps
        while self.fast and self.fast.next:
            self.slow = self.slow.next
            self.fast = self.fast.next.next

        return self.slow.val

# Usage
head = ListNode(1, ListNode(2, ListNode(3, ListNode(4, ListNode(5)))))
finder = MiddleFinder(head)
print(finder.find_middle())  # → 3`,

    terse: `# Find Middle of Linked List - TERSE

def findMiddle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow`,
  },

  happyNumber: {
    verbose: `# Happy Number Detection - VERBOSE
# Use fast & slow on digit transformations

class HappyNumberDetector:
    def __init__(self, n):
        self.n = n

    def next_number(self, num):
        """Calculate sum of squares of digits"""
        total = 0
        while num > 0:
            digit = num % 10
            total += digit ** 2
            num //= 10
        return total

    def is_happy(self):
        """Detect cycle: if reaches 1 → happy, else → unhappy"""
        slow = self.n
        fast = self.n

        while True:
            # Move slow 1 step
            slow = self.next_number(slow)

            # Move fast 2 steps
            fast = self.next_number(self.next_number(fast))

            # Found happiness
            if fast == 1:
                return True

            # Cycle detected = unhappy
            if slow == fast:
                return False

# Usage
detector = HappyNumberDetector(7)
print(detector.is_happy())  # → True`,

    terse: `# Happy Number Detection - TERSE

def isHappy(n):
    def next_num(num):
        return sum(int(d) ** 2 for d in str(num))

    slow = fast = n
    while True:
        slow = next_num(slow)
        fast = next_num(next_num(fast))
        if fast == 1:
            return True
        if slow == fast:
            return False`,
  },
};

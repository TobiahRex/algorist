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
        title: 'Operating System Deadlock Detection',
        description: 'OS kernels use cycle detection to prevent deadlocks where Process A waits for Process B, B waits for C, C waits for A (circular dependency). Every process-to-process wait creates a link in a directed graph. The fast/slow pointer algorithm detects cycles in O(1) memory - critical on embedded devices with 64MB RAM. When a cycle is detected, the OS kills one process to break the deadlock.',
      },
      {
        icon: '📡',
        title: 'Network Routing Loop Prevention',
        description: 'BGP (Border Gateway Protocol) routers detect routing loops where packets could circulate infinitely (Router A routes to B, B to C, C back to A). Each hop is a linked list node. Routers check for cycles in path advertisements to prevent bandwidth waste and TTL exhaustion. Detecting loops in O(1) space means minimal router memory usage.',
      },
      {
        icon: '🎮',
        title: 'Game Update Cycle Detection',
        description: 'Game engines detect circular dependencies in update systems. If Entity A updates before B, B before C, and C before A, the game locks. The fast/slow pointer detects this before runtime. Unreal Engine and Unity use this pattern to ensure safe parallel processing.',
      },
      {
        icon: '🏦',
        title: 'Blockchain Transaction Validation',
        description: 'Cryptocurrency systems detect circular transaction chains. If Wallet A sends to B, B to C, C back to A in a loop, the transaction is invalid. Fast/slow detection prevents infinite loops in smart contract execution before gas limits are exceeded.',
      },
      {
        icon: '🔐',
        title: 'Hash Table Collision Loop Detection',
        description: 'In poorly implemented hash tables, collisions can create cycles in the probe chain. When looking up a key, if you encounter a cycle instead of finding an empty slot, the table is corrupt. Fast/slow pointer detection identifies this corruption without allocating extra memory for visited sets.',
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
        title: 'Infinite Loop Debugging',
        description: 'Debuggers use cycle start detection to find where infinite loops originate. When a program hangs, the debugger detects the cycle, then traces back to find the exact line of code creating the loop. This is critical for post-mortem analysis of crashed services.',
      },
      {
        icon: '🔗',
        title: 'Linked Resource Dependency Resolution',
        description: 'Content delivery networks track resource dependencies (Script A requires B, B requires C, C requires A). Finding the cycle start identifies which resource to remove to break the circular dependency. CDN servers use this to avoid infinite resource loading.',
      },
      {
        icon: '🏢',
        title: 'Supply Chain Circular Dependency Breaking',
        description: 'ERP systems model supplier networks. If Supplier A provides to B, B to C, C back to A (circular), the system identifies the cycle start node to break the dependency or flag the issue for manual resolution.',
      },
      {
        icon: '🎯',
        title: 'Recommendation System Loop Detection',
        description: 'Recommendation engines detect when users form circular referrals (User A recommends Product B, which leads to User C, who recommends back to A). Identifying the start of the cycle helps personalize recommendations.',
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
        title: 'Parallel Processing Load Balancing',
        description: 'MapReduce jobs need to split linked task lists into two balanced halves for independent parallel processing. The middle-finding algorithm splits workload without scanning the entire length first. Hadoop uses this pattern to distribute tasks across nodes efficiently.',
      },
      {
        icon: '🎬',
        title: 'Video Codec Keyframe Insertion',
        description: 'Video encoders insert keyframes at optimal positions for seeking. Instead of decoding the entire video to find the middle, the fast/slow pointer finds the temporal midpoint in one pass. This determines where to place I-frames for balanced segment sizes.',
      },
      {
        icon: '📚',
        title: 'Sorted Linked List Median Finding',
        description: 'Database query engines find median values in sorted linked lists without storing in memory. For datasets streaming from disk, finding the middle in one pass and returning the middle value (or average of middle two) gives median in O(n) time, O(1) space.',
      },
      {
        icon: '🌳',
        title: 'Binary Search Tree Self-Balancing',
        description: 'AVL tree and Red-Black tree implementations find the middle of unbalanced sequences during insertion. Using fast/slow pointers, they identify the correct pivot for tree restructuring without pre-computing length.',
      },
      {
        icon: '🔄',
        title: 'Merge Sort In-Place Splitting',
        description: 'In-place merge sort implementations find the middle of arrays to split without allocating new buffers. Finding the midpoint in a linked list using fast/slow pointers allows O(1) extra space merge sort implementation.',
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
        title: 'Game State Stability Detection',
        description: 'Game engines use happy number logic to detect whether game states are stable or will cycle infinitely. When applying transformations (physics updates, AI decisions), if the fast/slow pointers collide, the state loops infinitely. This prevents infinite loops during playtesting.',
      },
      {
        icon: '🔬',
        title: 'Cellular Automaton Cycle Detection',
        description: 'Conway\'s Game of Life and similar cellular automata need to detect if patterns oscillate forever or reach steady state. Fast/slow pointer pattern applied to cellular state snapshots detects cycles in O(1) memory - critical for real-time simulation.',
      },
      {
        icon: '💻',
        title: 'CPU Cycle Detection in Emulators',
        description: 'When emulating CPU instruction sets, if fast/slow tracking of CPU state registers detect a cycle, the emulator has detected infinite instruction loops. Virtual machines use this to avoid runaway simulations that waste battery.',
      },
      {
        icon: '🧮',
        title: 'Numerical Algorithm Convergence Testing',
        description: 'Newton\'s method and other iterative numerical algorithms need to detect divergence. By applying fast/slow pointer pattern to function result sequences, algorithms detect if computation cycles without converging. This prevents infinite iterations in scientific computing.',
      },
      {
        icon: '🔐',
        title: 'Pseudo-Random Number Generator Testing',
        description: 'PRNGs must eventually cycle (cycle detection is a property). Test suites use fast/slow pointers to find the cycle length - generators with very long cycles are higher quality. NIST certifies RNGs partly by cycle properties.',
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

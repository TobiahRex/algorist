# Pointer Patterns

## Patterns
1. **Center Expansion (Palindrome Pattern)**
```
"racecar"
   ↓
   i
 ←   →    Expand from center outward
```
- Used for palindromes, longest palindromic substring
- Start at center, expand both ways
- Can start with one or two centers

1. **Meeting Point Pattern**
```
[1,2,3,4,5]
 ↓       ↓
left → ← right   
```
- Pointers start at ends, move toward each other
- Often used for:
  - Two sum in sorted array
  - Container with most water
  - Trapping rain water

1. **Cyclic Detection (Floyd's Algorithm)**
```
1 → 2 → 3 → 4 → 5
        ↑       ↓
        7 ← 6 ←
slow →
fast → →
```
- Fast/slow pointers to detect cycles
- Used in:
  - Linked list cycle detection
  - Finding cycle start point
  - Array cycle detection

1. **Partition Pattern**
```
[unsorted values]
 ↓           ↓
 i     p     j
[<p][p][>p]
```
- Used in quicksort, Dutch flag problem
- Partition around pivot value
- Multiple pointers maintain regions

1. **Merge Pattern**
```
[1,3,5] [2,4,6]
 ↓       ↓
 p1      p2
 Compare and take smaller
```
- Merge sorted arrays/lists
- Multiple pointers track positions in each array
- Used in merge sort, k-way merge

1. **Island/Grid Pattern**
```
1 1 0    Use pointers as coordinates
1 0 1    (i,j) to explore connected
0 1 1    components
```
- Two pointers as coordinates
- DFS/BFS exploration
- Used for island counting, path finding

1. **Prefix/Suffix Pattern**
```
[1,2,3,4,5]
 →     ←
Build left sum  Build right sum
Compare at each point
```
- Build information from both ends
- Used for:
  - Product of array except self
  - Trapping rain water
  - Find pivot index

1. **Window with Criteria**
```
[1,2,1,2,3]
 ↓   ↓
 l   r     Window must meet certain criteria
```
- Similar to sliding window but with specific conditions
- Used for:
  - Minimum window substring
  - Longest substring without repeating chars
  - K distinct characters

Would you like to:
1. Explore any of these patterns in detail?
2. See specific problem examples for each?
3. Understand how to identify which pattern fits a problem?

These patterns often combine and overlap, but understanding each one's core mechanism helps in problem-solving!

## Problems

0. Meeting Point Pattern
   1. LC 167
1. Center Expansion
   1. LC 5
2. Cyclic Detection
   1. LC 142
3. Partition Pattern
   1. LC 75
4. Merge Pattern
   1. LC 21
5. Island/Grid Pattern
   1. LC 200
6. Prefix/Suffix Pattern
   1. LC 238
7. Window with Criteria Pattern
   1. LC 3
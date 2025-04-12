# Minimum Spanning Tree (Kruskal's Algorithm)

Finding a minimum spanning tree using Kruskal's algorithm with Union-Find.

## Combining on Rank

1. **Purpose of Rank**:
   - Rank represents the approximate height of the tree
   - It's used to keep the tree balanced
   - The goal is to minimize the height of the tree for faster `find` operations

2. **Why We Don't Combine Ranks**:
   ```python
   # Current implementation
   if rank[p1] < rank[p2]:
       p1, p2 = p2, p1
   parent[p2] = p1
   if rank[p1] == rank[p2]:
       rank[p1] += 1
   ```

   - If we combined ranks (e.g., `rank[p1] += rank[p2]`), we would lose the height information
   - The rank would grow much faster than the actual tree height
   - This would make our height approximation inaccurate

3. **What Would Happen If We Combined Ranks**:
   ```python
   # Hypothetical (incorrect) implementation
   if rank[p1] < rank[p2]:
       p1, p2 = p2, p1
   parent[p2] = p1
   rank[p1] += rank[p2]  # This would be wrong!
   ```

   - The rank would grow exponentially
   - A tree of height 3 could have a rank of 15
   - This would defeat the purpose of using rank for balancing

4. **Correct Behavior**:
   - Rank only increases when two trees of equal rank are merged
   - This ensures rank closely approximates the actual tree height
   - The time complexity remains O(α(n)) where α is the inverse Ackermann function

Here's a visual example:

```
Before Union:
Tree 1 (rank 2)     Tree 2 (rank 2)
     A                 D
    / \               / \
   B   C             E   F

After Union (correct):
     A (rank 3)
    /|\
   B C D
     / \
    E   F

After Union (incorrect - if we combined ranks):
     A (rank 4)  # Rank would be sum of both trees
    /|\
   B C D
     / \
    E   F
```

The key insight is that rank is a proxy for tree height, not tree size. By only incrementing rank when merging trees of equal height, we maintain the logarithmic height guarantee that makes Union-Find operations efficient.

Would you like me to:
1. Show how this affects the time complexity?
2. Demonstrate with more complex tree structures?
3. Explain how this relates to path compression?
4. Show how to implement size tracking separately from rank?

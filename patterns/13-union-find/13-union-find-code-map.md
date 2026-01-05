# Union Find - Code-to-Visual Mapping

**Purpose**: Connect the visual metaphor of forest trees merging to actual code implementation, creating sticky understanding through three-way mapping.

---

## The Three-Way Connection

```
Visual Metaphor ←→ Actual Code ←→ Why It Works
  (Merging trees)   (Parent array + Rank)   (Near O(1) connectivity)
```

---

## Visual Metaphor Overview

**Physical Model**: Groups of people holding hands in trees, with leaders at the root

- **Person** = Element/node in the set
- **Holding hand** = Parent pointer
- **Group leader** = Root of the tree (points to self)
- **Group size badge** = Rank array value
- **Asking "who's your leader?"** = find() operation
- **Forming handshake chain** = Path compression
- **Merging groups** = union() operation
- **Smaller group joins larger** = Union by rank

**Animation**: When person asks "who's my leader?", follow hand-holds up to leader, then make everyone point directly to leader (path compression). When merging, smaller group's leader holds hands with larger group's leader.

---

## Core State Mappings

### Map State to Visual Elements

| Visual Element | Code Variable | Type | Purpose |
|----------------|---------------|------|---------|
| **Person's hand holder** | `self.parent[i]` | `int` | Index of parent element |
| **Group leader badge** | `self.parent[i] == i` | `bool` | Is this person the root? |
| **Group size badge** | `self.rank[i]` | `int` | Tree height/rank for balancing |
| **All hand-holding connections** | `self.parent` array | `List[int]` | Parent pointers for all elements |
| **All group badges** | `self.rank` array | `List[int]` | Ranks for all elements |
| **Number of separate groups** | `self.count` | `int` | Total disjoint sets |
| **Leader of person X** | `self.find(x)` | `int` | Root element of X's tree |

---

## Action Mappings

### Map Visual Actions to Code

| Visual Action | Code Lines | Why This Works |
|---------------|------------|----------------|
| **Find your leader** | `self.find(x)` | Follow parent pointers to root |
| **Check if pointing to self** | `if self.parent[x] == x:` | Root nodes point to themselves |
| **Ask parent "who's your leader?"** | `self.find(self.parent[x])` | Recursive climb up tree |
| **Make everyone point to leader** | `self.parent[x] = self.find(self.parent[x])` | Path compression flattens tree |
| **Check if same group** | `self.find(x) == self.find(y)` | Same root = same set |
| **Merge two groups** | `self.union(x, y)` | Connect their leaders |
| **Compare group sizes** | `if self.rank[rootX] < self.rank[rootY]:` | Union by rank decision |
| **Smaller joins larger** | `self.parent[rootX] = rootY` | Attach smaller tree to larger |
| **Same size, pick one and grow** | `self.rank[rootX] += 1` | Increment rank when equal |
| **Reduce group count** | `self.count -= 1` | One less disjoint set after union |

---

## Code-to-Visual Translation Tables

### If You See This Code... Visualize This

| Code Pattern | Visual Image |
|--------------|-------------|
| `parent[i] = i` | Person i is their own group leader (isolated) |
| `parent[x] != x` | Person x is holding hands with someone else |
| `parent[x] = find(parent[x])` | After finding leader, everyone in chain points directly to them |
| `find(x) == find(y)` | X and Y both answer to same group leader |
| `rank[rootX] < rank[rootY]` | Group X's tree is shorter than group Y's tree |
| `parent[rootX] = rootY` | Group X's leader now holds hands with group Y's leader |
| `rank[rootX] += 1` | Group leader's badge number increases (tree got taller) |
| `count -= 1` | Two separate groups merged into one |

### If You Visualize This... Look for This Code

| Visual Image | Code Pattern |
|-------------|-------------|
| Person is their own leader | `parent[i] == i` |
| Follow hand-holds up to leader | `while parent[x] != x: x = parent[x]` or recursive `find()` |
| Make everyone point directly to leader | `parent[x] = find(parent[x])` |
| Check if two people in same group | `find(x) == find(y)` |
| Smaller group joins larger | `if rank[rootX] < rank[rootY]: parent[rootX] = rootY` |
| Groups merge | `union(x, y)` |
| Count separate groups | `count` variable or count unique roots |

---

## Execution Trace Example

**Problem**: Track connected components with edges: (0,1), (1,2), (3,4)

### Step-by-Step: Visual + Code Side-by-Side

| Step | Visual State | Code State | Action |
|------|-------------|------------|--------|
| **1** | 5 isolated people: 0, 1, 2, 3, 4 | `parent=[0,1,2,3,4], rank=[0,0,0,0,0], count=5` | Initialize: everyone is their own leader |
| **2** | Add edge (0,1): 0 and 1 hold hands | `find(0)=0, find(1)=1, union(0,1)` | Find roots: both are roots |
| **3** | Same rank: 1 joins 0, 0's badge grows | `rank[0]=rank[1]=0, parent[1]=0, rank[0]=1, count=4` | Union: attach 1 to 0, increment rank |
| **4** | Groups: {0→1}, {2}, {3}, {4} | `parent=[0,0,2,3,4], rank=[1,0,0,0,0]` | Now 0 is leader of 1 |
| **5** | Add edge (1,2): find leaders | `find(1)=0, find(2)=2, union(1,2)` | Find: 1's leader is 0, 2's leader is 2 |
| **6** | 0's rank (1) > 2's rank (0): 2 joins 0 | `parent[2]=0, count=3` | Union: attach 2 to 0 (no rank change) |
| **7** | Groups: {0→1,2}, {3}, {4} | `parent=[0,0,0,3,4], rank=[1,0,0,0,0]` | Now 0 leads 1 and 2 |
| **8** | Add edge (3,4): both are roots | `find(3)=3, find(4)=4, union(3,4)` | Find roots: 3 and 4 |
| **9** | Same rank: 4 joins 3, 3's badge grows | `parent[4]=3, rank[3]=1, count=2` | Union: attach 4 to 3, increment rank |
| **10** | Final groups: {0→1,2}, {3→4} | `parent=[0,0,0,3,3], rank=[1,0,0,1,0], count=2` | 2 connected components |

**Final Result**: 2 disjoint sets (count = 2)

---

## Pattern Recognition: Code ↔ Visual

### Common Code Patterns in Union Find

| Code Pattern | What It Means Visually | When You Use It |
|--------------|------------------------|-----------------|
| `parent[x] = x` initialization | Everyone starts as their own group leader | Setup |
| `if parent[x] != x:` | Person is not a leader, must climb tree | Find operation check |
| `parent[x] = find(parent[x])` | Path compression: flatten tree | Find optimization |
| `find(x) == find(y)` | Check if same group | Connectivity query |
| `if rank[rootX] < rank[rootY]:` | Compare tree heights | Union by rank decision |
| `parent[rootX] = rootY` | Smaller tree attaches to larger | Union operation |
| `rank[rootX] += 1` | Tree got taller (equal rank merge) | Rank update |
| `count -= 1` | Two groups merged into one | Track number of sets |

---

## Key Insights

### Insight 1: Path Compression Makes Future Finds Fast
**Visual**: When finding leader, everyone in the chain points directly to them
**Code**: `parent[x] = find(parent[x])` during find()
**Why**: Flattens tree from deep chain to shallow star, future finds are O(1)

### Insight 2: Union by Rank Keeps Trees Balanced
**Visual**: Always attach smaller group's leader to larger group's leader
**Code**: `if rank[rootX] < rank[rootY]: parent[rootX] = rootY`
**Why**: Prevents degenerate trees (chains), maintains O(log n) tree height

### Insight 3: Nearly Constant Time with Both Optimizations
**Visual**: Trees stay very flat, finding leader is almost instant
**Code**: Path compression + union by rank
**Why**: Amortized time complexity is O(α(n)) where α is inverse Ackermann function (grows insanely slowly, effectively constant)

### Insight 4: Parent Array IS the Data Structure
**Visual**: The hand-holding connections are all we need to track
**Code**: `parent[i]` stores parent index, that's it
**Why**: Simple array representation, cache-friendly, no extra pointers needed

### Insight 5: Self-Pointing Means Root
**Visual**: Leader holds their own hand (points to self)
**Code**: `parent[i] == i` identifies root
**Why**: Simple sentinel value, no need for special null/flag

---

## Real-World Code Mappings

### Use Case 1: Social Networks - Friend Circles

**Visual**: People form friend groups, find who's in your circle

| Visual Element | Production Code | System |
|----------------|-----------------|--------|
| Person | `user_id` | User account |
| Friend connection | `union(user1, user2)` | Friendship edge |
| Friend circle | `find(user_id)` | Connected component |
| Same circle? | `find(user1) == find(user2)` | Connectivity check |
| Number of circles | `count` of unique roots | Total communities |

**Code Pattern**:
```python
# When users become friends
uf.union(alice_id, bob_id)

# Check if users are indirectly connected
if uf.find(alice_id) == uf.find(bob_id):
    return "In same friend circle"

# Count total friend circles
circles = len(set(uf.find(i) for i in all_users))
```

**Sticky Mapping**: `union()` = Adding friendship, `find()` = Which community?

---

### Use Case 2: Network Topology - Cycle Detection

**Visual**: Routers form network, detect if adding cable creates loop

| Visual Element | Production Code | Tool |
|----------------|-----------------|------|
| Router | Node in graph | Network device |
| Cable | Edge to add | Physical link |
| Detect cycle | `find(u) == find(v)` before adding edge | Loop detection |
| Add connection | `union(u, v)` | Create link |

**Code Pattern**:
```python
# Before adding network cable between routers u and v
if uf.find(u) == uf.find(v):
    return "Redundant connection! Would create cycle."

# Safe to add - they're not yet connected
uf.union(u, v)
```

**Sticky Mapping**: If routers already in same network, cable is redundant

---

## Common Variations: Same Visual, Different Use Cases

### Connected Components Counting
**Visual**: How many separate groups exist?
**Code**: `count` field or count unique `find()` results
**Example**: Number of islands, number of provinces

### Cycle Detection in Undirected Graph
**Visual**: If both nodes already in same group, edge creates cycle
**Code**: `if find(u) == find(v): return "Cycle detected"`
**Example**: Redundant connection, network loops

### Minimum Spanning Tree (Kruskal's)
**Visual**: Add edges by weight, skip if creates cycle
**Code**: Sort edges, for each: if `find(u) != find(v)`: add edge, `union(u,v)`
**Example**: Minimum cost network, optimal cable routing

### Dynamic Connectivity
**Visual**: Elements connect over time, query connectivity dynamically
**Code**: Sequence of `union()` operations, interspersed `find()` queries
**Example**: Accounts merge, percolation

---

## Self-Check: Do You Have Sticky Understanding?

### Test 1: Code → Visual
See this code:
```python
if self.parent[x] != x:
    self.parent[x] = self.find(self.parent[x])
return self.parent[x]
```

**Can you visualize?**
"If person X is not their own leader, ask their parent 'who's your leader?', then make person X point directly to that leader. Return the leader."

### Test 2: Visual → Code
Imagine: "Two groups want to merge. Group 1's leader has rank 3, Group 2's leader has rank 2. Group 2 should join Group 1."

**Can you write the code?**
```python
if rank[root1] > rank[root2]:
    parent[root2] = root1
```

### Test 3: Explain Why
**Question**: Why does path compression make find() nearly O(1)?

**Answer**: Path compression flattens the tree. After finding the root once, all nodes on the path now point directly to the root. Future finds on those nodes take just one hop. Over many operations, trees become very flat (nearly star-shaped), making all finds almost instant.

---

## The Stickiest Mapping

**Core Visual**: Forest of trees where each tree is a group. Finding involves climbing to root, merging involves connecting roots.

**Core Code**: `parent` array where `parent[i]` points to parent node, `find()` follows chain to root, `union()` connects roots.

**Core Insight**: By compressing paths (flattening trees during find) and merging intelligently (smaller to larger), we achieve near-constant time for both find and union operations. The parent array is the only data structure needed.

**When you see Union Find code, you now see groups of people holding hands forming trees. When you imagine merging groups, you now know exactly what code to write.**

**The connection is permanent!**

---

## Next Steps

1. **Trace the verbose form** line-by-line with the visual
2. **Trace the terse form** with same visual
3. **Solve LeetCode 547** (Number of Provinces) using group visualization
4. **Explain your solution** using the hand-holding metaphor
5. **Implement cycle detection** - that's when it truly sticks!

**Time investment**: 2-3 hours
**Return**: Deep, intuitive understanding that lasts years

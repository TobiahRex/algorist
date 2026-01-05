# Shortest Path - Code-to-Visual Mapping

**Purpose**: Connect the visual metaphor of exploring a weighted graph to actual code implementation, creating sticky understanding through three-way mapping.

---

## The Three-Way Connection

```
Visual Metaphor ←→ Actual Code ←→ Why It Works
  (Exploring city with traffic)   (Heap + distances)   (Greedy + relaxation)
```

---

## Visual Metaphor Overview

**Physical Model**: GPS navigation finding fastest route through city with traffic

- **Intersections** = Nodes/vertices in graph
- **Roads** = Edges with weights (travel time)
- **Current location** = Node being processed
- **Distance signs** = `dist` array tracking best distance to each intersection
- **Priority queue** = Min heap of (distance, intersection) to visit
- **Traffic conditions** = Edge weights (low = fast road, high = slow)
- **GPS rerouting** = Relaxation (finding better path updates distance)
- **Visited checkpoints** = Nodes already processed with optimal distance

**Animation**: Start at origin, explore nearest unvisited intersection first, update distance signs when finding faster routes, repeat until reaching all destinations.

---

## Core State Mappings

### Map State to Visual Elements

| Visual Element | Code Variable | Type | Purpose |
|----------------|---------------|------|---------|
| **Distance signs at each intersection** | `dist[node]` | `float` | Best known distance to node |
| **Priority queue of routes** | `heap` | `List[tuple]` | Min heap of (distance, node) |
| **Current exploration** | `current_node` | `int` | Node being processed |
| **Road network** | `graph` adjacency list | `Dict[int, List[tuple]]` | (neighbor, weight) for each node |
| **Best distance to node U** | `dist[u]` | `float` | Shortest path found so far |
| **Road from U to V** | `(v, weight)` in graph[u] | `tuple` | Edge with weight |
| **Infinity (unreachable)** | `float('inf')` | `float` | Not yet discovered |
| **Starting point** | `dist[source] = 0` | `int` | Origin has distance 0 |

---

## Action Mappings

### Map Visual Actions to Code

| Visual Action | Code Lines | Why This Works |
|---------------|------------|----------------|
| **Mark starting point as 0 distance** | `dist[source] = 0` | No travel needed to origin |
| **Put starting location in queue** | `heappush(heap, (0, source))` | Begin exploration |
| **Get nearest unexplored intersection** | `d, u = heappop(heap)` | Greedy: always explore closest first |
| **Ignore outdated route** | `if d > dist[u]: continue` | Already found better path |
| **Look at all roads from current** | `for v, w in graph[u]:` | Explore neighbors |
| **Calculate route via current** | `new_dist = dist[u] + w` | Total distance through U to V |
| **Found faster route!** | `if new_dist < dist[v]:` | Relaxation check |
| **Update distance sign** | `dist[v] = new_dist` | Record better distance |
| **Add to exploration queue** | `heappush(heap, (new_dist, v))` | Explore this neighbor |
| **All reachable intersections explored** | `while heap:` completes | Dijkstra finished |

---

## Code-to-Visual Translation Tables

### If You See This Code... Visualize This

| Code Pattern | Visual Image |
|--------------|-------------|
| `dist = [float('inf')] * n` | All distance signs say "∞" (unreachable) |
| `dist[source] = 0` | Origin sign says "0 km" |
| `heap = [(0, source)]` | Start GPS exploration at origin with 0 distance |
| `d, u = heappop(heap)` | GPS picks nearest unexplored intersection |
| `if d > dist[u]: continue` | Outdated route info, ignore (already found faster) |
| `for v, w in graph[u]:` | Check all roads leaving current intersection |
| `new_dist = dist[u] + w` | Calculate total distance via current location |
| `if new_dist < dist[v]:` | Found shortcut! This route is faster! |
| `dist[v] = new_dist` | Update distance sign at V |
| `heappush(heap, (new_dist, v))` | Add V to exploration queue with new distance |

### If You Visualize This... Look for This Code

| Visual Image | Code Pattern |
|-------------|-------------|
| GPS at starting location | `dist[source] = 0, heap = [(0, source)]` |
| Pick nearest unvisited intersection | `d, u = heappop(heap)` |
| Found faster route via current location | `if dist[u] + weight < dist[v]: dist[v] = ...` |
| Update distance sign | `dist[v] = new_distance` |
| Add intersection to exploration queue | `heappush(heap, (distance, node))` |
| All intersections within range explored | Empty heap, algorithm complete |
| Check if destination reachable | `if dist[destination] == float('inf'): unreachable` |

---

## Execution Trace Example

**Problem**: Find shortest path from A to E in weighted graph

```
A --4--> B --5--> D
|        |        |
2        1        3
|        |        |
v        v        v
C --1--> D --3--> E
```

### Step-by-Step: Visual + Code Side-by-Side

| Step | Visual State | Code State | Action |
|------|-------------|------------|--------|
| **1** | Start at A, all signs say "∞" except A=0 | `dist=[0,∞,∞,∞,∞], heap=[(0,A)]` | Initialize |
| **2** | Explore A (nearest), check roads to B,C | `Pop (0,A), check neighbors B(weight=4), C(weight=2)` | Process A |
| **3** | Update B=4, C=2, add to queue | `dist=[0,4,2,∞,∞], heap=[(2,C),(4,B)]` | Relaxation from A |
| **4** | Explore C (nearest), check road to D | `Pop (2,C), check neighbor D(weight=1)` | Process C |
| **5** | Update D=3 (via C faster than ∞) | `dist=[0,4,2,3,∞], heap=[(3,D),(4,B)]` | D reachable via C |
| **6** | Explore D (nearest), check B,E | `Pop (3,D), check neighbors B(weight=5), E(weight=3)` | Process D |
| **7** | D→B: 3+5=8 > 4 (not better), skip | `dist[D] + 5 = 8 > dist[B]=4, skip` | No improvement to B |
| **8** | D→E: 3+3=6 < ∞, update E | `dist=[0,4,2,3,6], heap=[(4,B),(6,E)]` | E reachable via D |
| **9** | Explore B (nearest), check D | `Pop (4,B), check neighbor D(weight=5)` | Process B |
| **10** | B→D: 4+5=9 > 3 (not better), skip | `dist[B] + 5 = 9 > dist[D]=3, skip` | No improvement to D |
| **11** | Explore E, no neighbors | `Pop (6,E), no neighbors` | Process E |
| **12** | Heap empty, done! | `heap=[], algorithm complete` | Finished |

**Final Result**: Shortest distances from A: `[0, 4, 2, 3, 6]` (A=0, B=4, C=2, D=3, E=6)
**Best path to E**: A→C→D→E (distance = 2+1+3 = 6)

---

## Pattern Recognition: Code ↔ Visual

### Common Code Patterns in Dijkstra

| Code Pattern | What It Means Visually | When You Use It |
|--------------|------------------------|-----------------|
| `dist = [float('inf')] * n` | Mark all intersections as unreachable | Initialization |
| `dist[source] = 0` | Starting point has 0 distance | Setup origin |
| `heap = [(0, source)]` | Begin exploration from origin | Initialize queue |
| `d, u = heappop(heap)` | Pick nearest unexplored intersection | Greedy selection |
| `if d > dist[u]: continue` | Skip outdated queue entry | Optimization |
| `for v, w in graph[u]:` | Check all roads from current location | Explore neighbors |
| `if dist[u] + w < dist[v]:` | Found faster route! | Relaxation |
| `dist[v] = dist[u] + w` | Update distance sign | Record improvement |
| `heappush(heap, (..., v))` | Add to exploration queue | Schedule visit |

---

## Key Insights

### Insight 1: Greedy Choice - Always Explore Nearest First
**Visual**: GPS always navigates to closest unvisited intersection, not random exploration
**Code**: Min heap ensures we pop node with smallest distance
**Why**: Once processed, distance is optimal (greedy choice property with non-negative weights)

### Insight 2: Relaxation Updates Distance When Better Path Found
**Visual**: Rerouting when finding faster route via different intersection
**Code**: `if dist[u] + weight < dist[v]: dist[v] = dist[u] + weight`
**Why**: Keep best distance found so far, update when improvement discovered

### Insight 3: Heap Allows Duplicates for Lazy Deletion
**Visual**: Multiple outdated routes to same intersection in queue
**Code**: `if d > dist[u]: continue` skips outdated entries
**Why**: Cheaper than decreasing key in heap, just ignore stale entries

### Insight 4: Non-Negative Weights Guarantee Optimality
**Visual**: Can't have "negative traffic" making detours faster retroactively
**Code**: Dijkstra assumes all weights >= 0
**Why**: Negative weights break greedy property (Bellman-Ford handles negatives)

### Insight 5: Final dist[] Array Contains All Shortest Paths
**Visual**: Each intersection's distance sign shows fastest route from origin
**Code**: `dist[i]` is shortest path from source to i
**Why**: Greedy exploration ensures optimality for all reachable nodes

---

## Real-World Code Mappings

### Use Case 1: Google Maps - Route Navigation

**Visual**: Find fastest route considering traffic

| Visual Element | Production Code | System |
|----------------|-----------------|--------|
| Intersections | Graph nodes | Location coordinates |
| Roads | Edges with weights | Travel time (dynamic) |
| Traffic conditions | Edge weights updated | Real-time data |
| Shortest path | Dijkstra result | Optimal route |
| Rerouting | Re-run Dijkstra | Traffic change |

**Code Pattern**:
```python
# Graph: intersections and roads with travel times
graph = build_road_network()

# Edge weights = estimated travel time (traffic-adjusted)
for edge in graph:
    edge.weight = base_time * traffic_multiplier

# Run Dijkstra from current location
distances = dijkstra(graph, current_location)

# Path to destination
path = reconstruct_path(parent, destination)
return path, distances[destination]
```

**Sticky Mapping**: Heap explores nearest intersections first, updating ETAs

---

### Use Case 2: Network Routing - OSPF Protocol

**Visual**: Routers find fastest path to forward packets

| Visual Element | Production Code | Tool |
|----------------|-----------------|------|
| Routers | Graph nodes | Network devices |
| Links | Edges with costs | Bandwidth/latency |
| Link cost | Edge weights | Configured metrics |
| Routing table | dist[] array | Forwarding table |
| Topology change | Re-run Dijkstra | Protocol update |

**Code Pattern**:
```python
# Build network topology graph
topology = get_network_topology()

# Run Dijkstra from this router
distances, next_hop = dijkstra_with_path(topology, router_id)

# Populate routing table
for destination in topology.nodes:
    routing_table[destination] = {
        'cost': distances[destination],
        'next_hop': next_hop[destination]
    }
```

**Sticky Mapping**: Each router runs Dijkstra to build forwarding table

---

## Algorithm Variations: Same Visual, Different Rules

### Dijkstra (Non-Negative Weights)
**Visual**: GPS with normal traffic (no negative time travel)
**Code**: Min heap, greedy exploration
**Complexity**: O((V+E) log V) with binary heap
**Use**: Most shortest path problems

### Bellman-Ford (Negative Weights OK)
**Visual**: Roads can have rebates (negative weights), check all roads repeatedly
**Code**: Relax all edges V-1 times
**Complexity**: O(V*E)
**Use**: Negative weights, detect negative cycles

### Floyd-Warshall (All Pairs)
**Visual**: Precompute all-to-all distances, try intermediate stops
**Code**: 3 nested loops, DP table
**Complexity**: O(V³)
**Use**: Dense graphs, need all pairs distances

### A* (Heuristic-Guided)
**Visual**: GPS with estimate of remaining distance to destination
**Code**: Dijkstra with `f(n) = g(n) + h(n)` where h is heuristic
**Complexity**: Depends on heuristic quality
**Use**: Games, pathfinding with goal

---

## Self-Check: Do You Have Sticky Understanding?

### Test 1: Code → Visual
See this code:
```python
d, u = heappop(heap)
if d > dist[u]:
    continue
for v, w in graph[u]:
    if dist[u] + w < dist[v]:
        dist[v] = dist[u] + w
        heappush(heap, (dist[v], v))
```

**Can you visualize?**
"GPS picks nearest unvisited intersection U. If we already found faster route to U (outdated queue entry), skip. Otherwise, check all roads from U. If route through U to V is faster than current distance to V, update V's distance sign and add V to exploration queue."

### Test 2: Visual → Code
Imagine: "I'm at intersection U with distance 10 from origin. Road to V has weight 5. V's current distance sign says 20. I found faster route!"

**Can you write the code?**
```python
u_dist = 10
v_current_dist = 20
road_weight = 5

new_dist = u_dist + road_weight  # 15
if new_dist < v_current_dist:    # 15 < 20: True
    dist[v] = new_dist            # Update to 15
    heappush(heap, (new_dist, v)) # Explore V
```

### Test 3: Explain Why
**Question**: Why does Dijkstra fail with negative edge weights?

**Answer**: Dijkstra greedily assumes once a node is processed (popped from heap), its distance is optimal. But with negative weights, a longer initial path could become shorter later via negative edge. Example: A→B (weight 5), A→C→B (weights 10, -20). Dijkstra picks A→B (5) first, locks it in, never considers A→C→B (total -10). Bellman-Ford relaxes edges repeatedly to handle this.

---

## The Stickiest Mapping

**Core Visual**: GPS exploring city roads, always picking nearest unexplored intersection, updating distance signs when finding faster routes.

**Core Code**: Min heap of (distance, node), `dist` array tracking best distances, greedy exploration with relaxation.

**Core Insight**: By always exploring nearest first (greedy) and updating distances when better paths found (relaxation), we guarantee optimal paths with non-negative weights. Heap makes "pick nearest" efficient (O(log V)), total complexity O((V+E) log V).

**When you see Dijkstra code, you now see GPS navigation. When you imagine shortest path, you now know exactly what code to write.**

**The connection is permanent!**

---

## Next Steps

1. **Trace the verbose form** line-by-line with the GPS visual
2. **Trace the terse form** with same visual
3. **Solve LeetCode 743** (Network Delay Time) using the navigation metaphor
4. **Compare Dijkstra vs Bellman-Ford** - understand negative weight case
5. **Implement path reconstruction** - that's when it truly sticks!

**Time investment**: 2-3 hours
**Return**: Deep, intuitive understanding that lasts years

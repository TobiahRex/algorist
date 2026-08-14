# CSP Foundations: The Wedding Seating Chart

*A physical-world analogy for building a bottom-up and top-down understanding of multi-constraint problems simultaneously.*

Sibling docs:
- [23-constraint-satisfaction.md](23-constraint-satisfaction.md) — the 4-stage pipeline, algorithms, code
- [23-constraint-satisfaction-code-map.md](23-constraint-satisfaction-code-map.md) — links to implementations

This doc is the *conceptual scaffolding* you read before those. It answers: **what is a multi-constraint problem, really, and how do I learn to see one in the wild?**

---

## The Setup

You're planning a wedding.

- **120 guests**
- **15 tables**, 8 seats each
- **A stack of index cards** with rules:
  - *"Grandma needs to be near a bathroom."*
  - *"Don't put Uncle Rick next to his ex-wife."*
  - *"Cousin Sam is allergic to the kids' table."*
  - *"The bride's college friends should sit together."*
  - *"Only one table can have the vegetarian menu."*

That **is** a Constraint Satisfaction Problem. Every CSP concept you'll ever learn has a physical analog here — something you'd actually do with index cards and a floor plan.

---

## The Core Mapping

| Wedding world | CSP world | What it feels like |
|---|---|---|
| A guest needing a seat | **Variable** | An empty slot in your plan |
| The seats they could legally take | **Domain** | The list of options for that slot |
| An index card with a rule | **Constraint** | A predicate over one or more slots |
| "Grandma near bathroom" | **Unary constraint** | A rule about *one* guest |
| "Rick ≠ ex-wife" | **Binary constraint** | A rule linking *two* guests |
| "Table seats exactly 8" | **Global constraint** | A rule spanning *many* guests |
| Crossing off impossible seats for Grandma | **Node consistency** | Pre-filtering each guest's domain |
| "If Rick sits at T3, can his ex still go anywhere?" | **Arc consistency** | Checking pairwise survivability |
| Walking the room re-checking after each seating | **AC-3 propagation** | Cascading "if this, then not that" |
| Pencil-and-erase: try, fail, undo | **Backtracking** | Depth-first exploration |
| Seat the most-restricted guest *first* | **MRV heuristic** | Fail fast — if Grandma can't fit, find out now |
| Pick the seat leaving others the most room | **LCV heuristic** | Don't box in your future self |
| Seat the guest appearing on the most cards | **Degree heuristic** | Break MRV ties via social entanglement |
| Failure traces to Grandma → undo Grandma | **Backjumping** | Skip irrelevant undo steps |
| Shuffle, then swap until rules stop breaking | **Local search / min-conflicts** | Repair rather than construct |
| "Minimize # of unhappy guests" | **MAX-CSP / optimization** | Add an objective function on top |

---

## The Two Spines (and Where They Meet)

### Bottom-Up (the planner's hand moving)

You sit with index cards, a floor plan, and pencil:

1. **Primitives** — guest, seat, rule card.
2. **Consistency** — for each guest, cross off seats ruled out by their own cards.
3. **Propagation** — when you seat one guest, re-walk the room and cross off now-impossible seats for everyone else.
4. **Search** — seat, check, either continue or erase and try another seat.
5. **Heuristics** — whom do I seat next, and in which seat first?
6. **Hybrids** — what if there's a budget, or the chart is too big to solve cleanly?

### Top-Down (the planner's goal)

1. **Recognize the problem** — "I need all 120 people seated without breaking rules." The trigger words: *assign, schedule, place, satisfy, no two..., all different, subject to.*
2. **Model it** — what's a variable, what's a domain, what's a constraint?
3. **Pick a solver** — pure satisfaction? optimization? local search?
4. **Tune heuristics** — which variable first? which value first?
5. **Measure** — nodes expanded, backtracks, propagation cost vs. pruning gained.

### Where they meet: **The Modeling Moment**

You pick up your pencil and face a choice:

- **Model A**: Variables = *guests*. Domain = seats they could take.
- **Model B**: Variables = *seats*. Domain = guests who could fill them.
- **Model C**: Variables = *tables*. Domain = 8-guest groupings.

These feel equivalent. **They are not.**

- Model A is great when guests have many specific restrictions (lots of pruning per assignment).
- Model B is great when seats have strong properties (near-bathroom, near-speaker).
- Model C is great when table-level rules dominate (vegetarian table, kids' table, college-friends table).

The wrong model turns a 10-minute problem into a 10-hour one. **This choice is simultaneously the top-down question "how do I think about this?" and the bottom-up question "what does my pencil touch first?"** That's why top-down and bottom-up cannot be learned in isolation — they fuse at modeling.

---

## The 30-Second Drill (for any new problem)

1. **What's a guest?** → variable
2. **What's a seat?** → domain
3. **What's an index card?** → constraint — and which kind (unary / binary / global)?
4. **Who's Grandma?** → the most-constrained variable — start there
5. **What's the floor plan?** → constraint graph — sparse tree, or dense mess?

If you can answer these five for *any* problem, you've done the hardest part. The rest (AC-3, MRV, LCV, backtracking) is mechanical once the modeling is right.

---

## The Constraint Graph = The Floor Plan

Draw a dot for each guest. Draw a line between two guests if *any* index card mentions both of them.

That picture is the **constraint graph**. Its *shape* determines tractability:

- **Tree-shaped** — solvable in O(nd²) via directional arc consistency. Easy.
- **Low-treewidth** (few cycles, thin cutset) — polynomial via cutset conditioning. Tractable.
- **Dense** — NP-hard in general. You need heuristics and luck.

Same wedding, two different encodings → two different floor plans → two different complexity classes. **This is why modeling matters so much.**

---

## Extending the Analogy to Adjacent Patterns

| If the wedding adds... | You've moved into pattern... |
|---|---|
| A budget, picking the *best* seating | **Branch & Bound** (CSP + objective) |
| Too many rules to satisfy all — minimize broken | **Local search / MAX-CSP** |
| Rules that chain (if A at T1, then B *must* at T2) | **SAT-style logical CSP** |
| A sequence of weddings sharing the venue | **Scheduling** (CSP + time) |
| Only *some* guests can appear (invite list) | **Subset selection / partitions** |

The moment you see a problem "shaped like a wedding," you have a scaffold. Stretch it until it breaks, then notice *where* it breaks — that's the boundary of this pattern.

---

## Why This Matters for Your Study

- **Bottom-up alone** → you know AC-3 cold but freeze when a real problem arrives, because you don't know what to make a variable.
- **Top-down alone** → you understand "wedding seating" but write brute force that takes the heat-death of the universe.
- **Both together** → you see the problem, run the 30-second drill, and *immediately* know: "Grandma has the smallest domain; start there with MRV; the constraint graph is dense, so I need AC-3, not just forward checking."

That fluency is the target. Everything else (proofs, code, LeetCode) reinforces it.

---

## Worked Example

See the companion walkthrough in this file's §Appendix, or the primary pattern doc, for N-Queens mapped through this framework.

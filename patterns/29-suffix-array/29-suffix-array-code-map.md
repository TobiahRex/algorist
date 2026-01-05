# Suffix Array - Code-to-Visual Mapping

**Purpose**: Connect the visual metaphor of sorted bookmarks to actual code implementation, creating sticky understanding through three-way mapping.

---

## The Three-Way Connection

```
Visual Metaphor ←→ Actual Code ←→ Why It Works
  (Sorted Bookmarks)   (SA + LCP)   (Lexicographic ordering)
```

---

## Visual Metaphor Overview

**Physical Model**: Bookmarks sorted in alphabetical order in a book

- **Book pages** = Original text
- **Bookmarks** = Suffix starting positions
- **Bookmark order** = Lexicographically sorted suffixes
- **Bookmark label** = Starting index of suffix
- **Bookmark shelf** = Suffix array (sorted positions)
- **Similarity tags** = LCP array (how much adjacent bookmarks share)
- **Binary search** = Finding section in sorted bookmarks
- **Longest common tag** = Longest repeated substring (max LCP)
- **Preprocessing time** = O(n log n) to sort bookmarks

**Animation**: Sort all bookmarks alphabetically, tag similarities between adjacent ones, search via binary lookup.

---

## Core State Mappings

### Map State to Visual Elements

| Visual Element | Code Variable | Type | Purpose |
|----------------|---------------|------|---------|
| **Book text** | `text` | `str` | The string we're analyzing |
| **All bookmarks** | Conceptual | All suffixes | Every position to end of text |
| **Sorted bookmarks** | `suffix_array` or `sa` | `List[int]` | Starting indices in sorted order |
| **Bookmark i** | `sa[i]` | `int` | Starting position of i-th sorted suffix |
| **Suffix at bookmark i** | `text[sa[i]:]` | `str` | Actual suffix string |
| **Similarity tag** | `lcp[i]` | `int` | Longest common prefix with previous bookmark |
| **Rank of position** | `rank[i]` | `int` | Which position in sorted order is suffix i? |
| **Number of bookmarks** | `n` | `int` | Text length (one bookmark per position) |

---

## Action Mappings

### Map Visual Actions to Code

| Visual Action | Code Lines | Why This Works |
|---------------|------------|----------------|
| **Create all bookmarks** | `[(text[i:], i) for i in range(n)]` | Generate all suffixes with positions |
| **Sort bookmarks** | `sorted(suffixes)` or Manber-Myers | Lexicographic ordering |
| **Extract positions** | `sa = [idx for suffix, idx in sorted_suffixes]` | Keep only starting indices |
| **Tag similarities** | Build LCP using Kasai's algorithm | Compare adjacent sorted suffixes |
| **Binary search bookmarks** | `bisect_left`, `bisect_right` on SA | Find pattern range |
| **Find longest common tag** | `max(lcp)` | Largest LCP = longest repeat |
| **Count distinct bookmarks** | `n*(n+1)/2 - sum(lcp)` | Total substrings - duplicates |
| **Build rank lookup** | `rank[sa[i]] = i` | Inverse mapping |

---

## Code-to-Visual Translation Tables

### If You See This Code... Visualize This

| Code Pattern | Visual Image |
|--------------|-------------|
| `sa = sorted(range(n), key=lambda i: text[i:])` | Create bookmarks for each position, sort alphabetically |
| `sa[i]` | Starting position of the i-th bookmark in sorted order |
| `text[sa[i]:]` | Read the actual suffix pointed to by bookmark i |
| `lcp[i]` | Similarity tag showing how many chars bookmarks i and i-1 share |
| `rank[i]` | Reverse lookup: "Where is bookmark for position i?" |
| `max(lcp)` | Longest similarity tag = longest repeated substring |
| Binary search on `sa` | Search sorted bookmarks for pattern |
| Kasai's algorithm | Walk text in original order, compute similarities efficiently |

### If You Visualize This... Look for This Code

| Visual Image | Code Pattern |
|-------------|-------------|
| Shelf of sorted bookmarks | `sa = build_suffix_array(text)` |
| Bookmark i points to position | `starting_pos = sa[i]` |
| Read suffix at bookmark i | `suffix = text[sa[i]:]` |
| Similarity between adjacent bookmarks | `lcp[i] = longest_common_prefix(sa[i], sa[i-1])` |
| Find pattern in bookmarks | Binary search on `sa` |
| Longest shared content | `max_lcp = max(lcp); position = sa[argmax(lcp)]` |
| Reverse lookup bookmark position | `rank[suffix_start] = position_in_sa` |

---

## Execution Trace Example

**Problem**: Build suffix array for "banana$", find longest repeated substring

### Step 1: Create All Bookmarks (Suffixes)

```
Position | Suffix
---------|----------
0        | banana$
1        | anana$
2        | nana$
3        | ana$
4        | na$
5        | a$
6        | $
```

### Step 2: Sort Bookmarks Alphabetically

```
Sorted   | Suffix     | Starting Position (SA)
Order    |            | sa[i]
---------|------------|--------------------
0        | $          | 6
1        | a$         | 5
2        | ana$       | 3
3        | anana$     | 1
4        | banana$    | 0
5        | na$        | 4
6        | nana$      | 2
```

**Suffix Array**: `[6, 5, 3, 1, 0, 4, 2]`

### Step 3: Build LCP Array (Similarity Tags)

Compare adjacent bookmarks:

| i | sa[i] | Suffix | Previous Suffix | LCP (shared chars) |
|---|-------|--------|-----------------|-------------------|
| 0 | 6 | $ | (none) | 0 |
| 1 | 5 | a$ | $ | 0 (no match) |
| 2 | 3 | ana$ | a$ | 1 ('a') |
| 3 | 1 | anana$ | ana$ | 3 ('ana') |
| 4 | 0 | banana$ | anana$ | 0 (no match) |
| 5 | 4 | na$ | banana$ | 0 (no match) |
| 6 | 2 | nana$ | na$ | 2 ('na') |

**LCP Array**: `[0, 0, 1, 3, 0, 0, 2]`

### Step 4: Find Longest Repeated Substring

```
Max LCP value: 3 (at index 3)
Adjacent suffixes with LCP=3:
  - ana$ (position 3)
  - anana$ (position 1)

They share: 'ana'

Longest repeated substring: 'ana'
Appears at positions: 1 and 3 in original text
```

**Verify in text**: `b[ana]na$` ← positions 1 and 3 ✓

### Step 5: Search for Pattern 'ana' (Binary Search)

```
SA (sorted): [6, 5, 3, 1, 0, 4, 2]
Suffixes:    [$, a$, ana$, anana$, banana$, na$, nana$]

Binary search for 'ana':
- Lower bound: Find first suffix >= 'ana' → index 2 (ana$)
- Upper bound: Find last suffix starting with 'ana' → index 3 (anana$)

Matches found at:
- sa[2] = 3 (position 3 in text)
- sa[3] = 1 (position 1 in text)

Result: 'ana' found at positions [1, 3]
```

---

## Pattern Recognition: Code ↔ Visual

### Common Code Patterns in Suffix Array

| Code Pattern | What It Means Visually | When You Use It |
|--------------|------------------------|-----------------|
| `sa = sorted(range(n), key=...)` | Sort all bookmarks alphabetically | Naive O(n² log n) construction |
| Manber-Myers doubling | Smart sorting using prefix ranks | O(n log n) construction |
| Kasai's algorithm | Walk text, compute LCP efficiently | O(n) LCP construction |
| Binary search on SA | Search sorted bookmarks for pattern | O(m log n) pattern matching |
| `max(lcp)` | Find longest similarity tag | Longest repeated substring |
| `n*(n+1)/2 - sum(lcp)` | All substrings - duplicates | Count distinct substrings |
| `rank[sa[i]] = i` | Build reverse bookmark lookup | Inverse suffix array |

---

## Key Insights

### Insight 1: Suffix Array = Space-Efficient Suffix Tree
**Visual**: Bookmarks in array vs tree structure with pointers
**Code**: SA = integer array (4-8 bytes/element) vs tree (40+ bytes/node)
**Why**: Achieves same functionality with O(n) space instead of O(n) complex structure

### Insight 2: LCP Array Unlocks Substring Queries
**Visual**: Similarity tags reveal repeated content
**Code**: `max(lcp)` = longest repeated substring, `sum(lcp)` = duplicate count
**Why**: Adjacent sorted suffixes with high LCP share long prefix = repetition

### Insight 3: Binary Search on Sorted Bookmarks
**Visual**: Pattern lookup in alphabetically sorted bookmarks
**Code**: `bisect_left` and `bisect_right` find pattern range in O(m log n)
**Why**: SA is sorted; all pattern occurrences are consecutive in SA

### Insight 4: Preprocessing Amortizes Over Queries
**Visual**: Sorting bookmarks once enables fast lookups forever
**Code**: O(n log n) build + O(m log n) × k queries vs O(nm) × k naive searches
**Why**: Fixed text searched many times (genome, documents, logs)

### Insight 5: Kasai's Algorithm Exploits Structure
**Visual**: Walk text in original order, LCP drops by at most 1 per step
**Code**: `h = max(0, h-1)` reuses previous LCP computation
**Why**: If suffix[i] and suffix[i+1] share k chars, their next chars share k-1

---

## Real-World Code Mappings

### Use Case 1: Genome Sequencing (DNA Alignment)

**Visual**: Bookmarks for every position in 3-billion-base genome

| Visual Element | Production Code | System |
|----------------|-----------------|--------|
| Reference genome | `text` (3B characters) | ACGT sequence |
| All gene positions | Suffix array (3B integers) | Sorted suffixes |
| Gene query | Binary search on SA | Find matching sequences |
| Longest repeats | Max LCP | Identify repeated genes |

**Code Pattern**:
```python
class GenomeIndex:
    def __init__(self, genome: str):
        """Build index for 3-billion-base genome."""
        self.genome = genome
        self.sa = build_suffix_array(genome)  # ~5 minutes
        self.lcp = build_lcp_array(genome, self.sa)  # ~2 minutes

    def find_gene(self, gene_sequence: str) -> List[int]:
        """Find all occurrences of gene in genome."""
        # Binary search: O(m log n) for m-length gene
        n = len(self.genome)
        m = len(gene_sequence)

        # Find range in sorted suffixes
        left = bisect_left(self.sa, gene_sequence,
                          key=lambda i: self.genome[i:i+m])
        right = bisect_right(self.sa, gene_sequence,
                            key=lambda i: self.genome[i:i+m])

        # Return positions in genome
        return sorted([self.sa[i] for i in range(left, right)])

# Example: BLAST-like search
genome_idx = GenomeIndex(human_genome)  # Build once
positions = genome_idx.find_gene("ATCG" * 250)  # Query many times
```

**Sticky Mapping**: Preprocess genome bookmarks once, search thousands of genes in milliseconds

---

### Use Case 2: Text Compression (Burrows-Wheeler Transform)

**Visual**: Sorted bookmarks enable character grouping

| Visual Element | Production Code | Tool |
|----------------|-----------------|------|
| Suffix array | SA of text | Sorted bookmarks |
| Last char of each suffix | BWT transformation | Grouping similar chars |
| Reversible transform | Inverse BWT | Decompress |

**Code Pattern**:
```python
def burrows_wheeler_transform(text: str) -> str:
    """Compress text using BWT (requires suffix array)."""
    n = len(text)
    # Build suffix array
    sa = build_suffix_array(text)

    # BWT = last character of each sorted suffix
    bwt = []
    for i in range(n):
        pos = sa[i]
        last_char = text[pos - 1] if pos > 0 else text[n - 1]
        bwt.append(last_char)

    return ''.join(bwt)

# Example: bzip2-style compression
original = "banana$"
bwt = burrows_wheeler_transform(original)
# Result: "annb$aa" (groups similar chars for compression)
```

**Sticky Mapping**: SA enables BWT which groups repeated chars → better compression

---

## Common Variations: Different Construction Algorithms

### Naive Sort
**Visual**: Sort all bookmark strings directly
**Code**: `sorted(range(n), key=lambda i: text[i:])`
**Complexity**: O(n² log n)
**When**: Small strings (n < 1000)

### Manber-Myers (Prefix Doubling)
**Visual**: Sort by first 1 char, then 2, then 4, ... (doubling)
**Code**: Rank pairs, radix sort, double length each iteration
**Complexity**: O(n log n)
**When**: General purpose (n < 1M)

### SA-IS (Induced Sorting)
**Visual**: Classify suffixes, recursive construction
**Code**: L/S-type classification, induced sorting, recursion
**Complexity**: O(n) guaranteed
**When**: Very large texts (genome-scale)

---

## Self-Check: Do You Have Sticky Understanding?

### Test 1: Code → Visual
See this code:
```python
max_lcp = max(lcp)
idx = lcp.index(max_lcp)
substring = text[sa[idx]:sa[idx] + max_lcp]
```

**Can you visualize?**
"Find the bookmark pair with longest similarity tag (max LCP). The substring they share is the longest repeated substring in the text."

### Test 2: Visual → Code
Imagine: "I have sorted bookmarks for 'banana$'. I want to find all positions where 'ana' appears using binary search."

**Can you write the code?**
```python
pattern = "ana"
m = len(pattern)

# Binary search for range
left = bisect_left(sa, pattern,
                  key=lambda i: text[i:i+m])
right = bisect_right(sa, pattern,
                     key=lambda i: text[i:i+m])

# Collect positions
positions = sorted([sa[i] for i in range(left, right)])
# Result: [1, 3]
```

### Test 3: Explain Why
**Question**: Why does suffix array pattern matching take O(m log n)?

**Answer**: Binary search on sorted array takes O(log n) steps. Each comparison needs to check up to m characters of pattern against suffix. Total: O(m × log n). With LCP optimization, can reduce comparison to O(1) per step → O(log n + m).

---

## The Stickiest Mapping

**🎯 CORE VISUAL**: Sorted bookmarks for every text position, tagged with similarity to adjacent bookmarks. Binary search finds patterns instantly.

**🎯 CORE CODE**: SA = sorted starting indices, LCP = longest common prefixes, binary search for pattern ranges.

**🎯 CORE INSIGHT**: Preprocess text once (O(n log n)) to enable fast pattern matching (O(m log n)), repeated substring detection (O(n)), and compression (BWT).

**When you see suffix array code, you now see sorted bookmarks with similarity tags. When you need multiple substring operations on fixed text, you build the bookmark shelf.**

**The connection is permanent!** 🚀

---

## Next Steps

1. **Build SA by hand** for "banana$"
2. **Construct LCP array** using Kasai's algorithm
3. **Binary search** for pattern "ana"
4. **Solve a LeetCode problem** using suffix array
5. **Map to production system** (genome search, compression, plagiarism)

**Time investment**: 2-3 hours
**Return**: Master heavyweight text analysis, foundation for bioinformatics and text mining

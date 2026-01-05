# String Matching - Code-to-Visual Mapping

**Purpose**: Connect the visual metaphor of pattern sliding and smart skipping to actual code implementation, creating sticky understanding through three-way mapping.

---

## The Three-Way Connection

```
Visual Metaphor ←→ Actual Code ←→ Why It Works
  (Pattern Sliding)   (KMP/Rabin-Karp)   (Avoid redundant comparisons)
```

---

## Visual Metaphor Overview

**Physical Model**: Transparent ruler sliding over text on a page

- **Ruler** = Pattern we're searching for
- **Page** = Text we're searching in
- **Ruler position** = Current alignment with text
- **Pencil marks on ruler** = LPS array (KMP) or hash value (Rabin-Karp)
- **Smart skip distance** = How far to slide ruler after mismatch
- **Naive sliding** = Move ruler 1 position at a time (slow)
- **Smart sliding** = Jump ruler based on pattern structure (fast)
- **Hash stamp** = Rolling hash (Rabin-Karp's fingerprint)

**Animation**: Slide ruler across page, skip intelligently when mismatch detected, verify when hash matches.

---

## Core State Mappings

### Map State to Visual Elements

| Visual Element | Code Variable | Type | Purpose |
|----------------|---------------|------|---------|
| **Text (page)** | `text` | `str` | The string we're searching in |
| **Pattern (ruler)** | `pattern` | `str` | The substring we're looking for |
| **Text pointer** | `i` | `int` | Current position in text |
| **Pattern pointer** | `j` | `int` | Current position in pattern |
| **LPS array (pencil marks)** | `lps[]` | `List[int]` | Longest proper prefix = suffix |
| **Pattern hash (stamp)** | `pattern_hash` | `int` | Rolling hash of pattern |
| **Window hash (current)** | `text_hash` | `int` | Hash of current text window |
| **Match positions** | `matches[]` | `List[int]` | Found occurrences |

---

## Action Mappings

### Map Visual Actions to Code

| Visual Action | Code Lines | Why This Works |
|---------------|------------|----------------|
| **Slide ruler 1 position** | `i += 1` | Naive: move forward one char |
| **Align ruler at position i** | `text[i:i+m] == pattern` | Check if pattern matches |
| **Smart skip (KMP)** | `j = lps[j-1]` | Jump back in pattern, not text |
| **Match found** | `matches.append(i - m + 1)` | Record starting position |
| **Build pencil marks (LPS)** | `while i < m: compute lps[i]` | Preprocessing pattern |
| **Stamp hash on pattern** | `pattern_hash = hash(pattern)` | Rabin-Karp: compute once |
| **Slide hash window** | `hash = (hash - old)*base + new` | Rolling hash: O(1) update |
| **Verify hash collision** | `if text[i:i+m] == pattern` | Rabin-Karp: check actual chars |
| **Never backtrack in text** | `i` only increments (KMP) | Text pointer always moves forward |

---

## Code-to-Visual Translation Tables

### If You See This Code... Visualize This

| Code Pattern | Visual Image |
|--------------|-------------|
| `lps[i] = len(matched_prefix)` | Pencil mark showing "if mismatch here, go back to position X" |
| `j = lps[j-1]` | Smart skip: ruler jumps back to pre-computed position |
| `while text[i] == pattern[j]` | Ruler aligned: keep matching character by character |
| `pattern_hash = hash(pattern)` | Stamp pattern's "fingerprint" once |
| `hash = (hash - text[i]*h)*base + text[i+m]` | Slide hash stamp: remove left char, add right char |
| `if hash == pattern_hash` | Hash matches! But verify with actual comparison (collision possible) |
| `i -= i` (never happens in KMP!) | KMP never backtracks in text—brilliant optimization |

### If You Visualize This... Look for This Code

| Visual Image | Code Pattern |
|-------------|-------------|
| Ruler slides across page | `for i in range(len(text))` |
| Pencil marks on ruler (preprocessing) | Build LPS: `lps[i] = longest_prefix_suffix(pattern[:i+1])` |
| Smart skip when mismatch | `j = lps[j-1]` (KMP) |
| Hash stamp slides | `hash = roll_hash(hash, old_char, new_char)` |
| Verify fingerprint match | `if hash == pattern_hash and text[i:i+m] == pattern` |
| Record match position | `matches.append(start_position)` |

---

## Execution Trace Example

**Problem**: Find "ABABAC" in "ABABDABACDABABAC" using KMP

### Step 1: Build LPS Array (Pencil Marks)

| Position | Pattern | LPS Value | Meaning |
|----------|---------|-----------|---------|
| 0 | A | 0 | No proper prefix |
| 1 | AB | 0 | No matching prefix/suffix |
| 2 | ABA | 1 | 'A' matches |
| 3 | ABAB | 2 | 'AB' matches |
| 4 | ABABA | 3 | 'ABA' matches |
| 5 | ABABAC | 0 | No matching prefix/suffix |

**LPS Array**: `[0, 0, 1, 2, 3, 0]`

### Step 2: Search Using LPS

| Step | Text Position | Pattern Position | Text Char | Pattern Char | Action |
|------|---------------|------------------|-----------|--------------|--------|
| 1 | 0 | 0 | A | A | Match! i++, j++ |
| 2 | 1 | 1 | B | B | Match! i++, j++ |
| 3 | 2 | 2 | A | A | Match! i++, j++ |
| 4 | 3 | 3 | B | B | Match! i++, j++ |
| 5 | 4 | 4 | D | A | **Mismatch!** j = lps[3] = 2 (skip to position 2) |
| 6 | 4 | 2 | D | A | Mismatch! j = lps[1] = 0 |
| 7 | 4 | 0 | D | A | Mismatch! i++ (no match, move forward) |
| 8 | 5 | 0 | A | A | Match! i++, j++ |
| ... | ... | ... | ... | ... | Continue until match found at position 10 |

**Key Insight**: When mismatch at position 4, instead of starting over from text position 1, we jump back in pattern to position 2 (using LPS). Text pointer never backtracks!

---

## Pattern Recognition: Code ↔ Visual

### Common Code Patterns in String Matching

| Code Pattern | What It Means Visually | When You Use It |
|--------------|------------------------|-----------------|
| Build LPS array | Preprocess ruler: mark skip distances | KMP preprocessing O(m) |
| `j = lps[j-1]` when mismatch | Smart skip based on pencil marks | KMP search - avoid redundant checks |
| `hash(pattern)` once | Stamp pattern fingerprint | Rabin-Karp preprocessing |
| Rolling hash update | Slide hash window: remove left, add right | Rabin-Karp search O(n) |
| `if hash matches: verify chars` | Hash collision check | Rabin-Karp verification |
| `i` never decreases | Text pointer only moves forward | KMP efficiency guarantee |
| Multiple patterns → Trie | Build dictionary of rulers | Aho-Corasick for multi-pattern |

---

## Key Insights

### Insight 1: KMP Never Backtracks in Text
**Visual**: Text pointer `i` only moves forward; we backtrack in pattern using LPS
**Code**: `i += 1` always increments; `j = lps[j-1]` adjusts pattern position
**Why**: LPS tells us "we've already matched this prefix, skip to where we can continue"

### Insight 2: Rolling Hash O(1) Update
**Visual**: Sliding hash stamp: remove leftmost digit, add rightmost digit
**Code**: `hash = (hash - text[i]*h) * base + text[i+m]`
**Why**: Treat string as base-256 number; sliding window = subtract left, multiply, add right

### Insight 3: Hash Collision Requires Verification
**Visual**: Two different texts can have same fingerprint (rare but possible)
**Code**: `if text_hash == pattern_hash: verify text[i:i+m] == pattern`
**Why**: Hash function maps infinite strings to finite integers (pigeonhole principle)

### Insight 4: LPS Array Encodes Pattern Structure
**Visual**: Pencil marks show "longest prefix that's also a suffix"
**Code**: `lps[i]` = length of longest proper prefix of `pattern[0..i]` that equals suffix
**Why**: When mismatch at position j, we've already matched `lps[j-1]` characters

### Insight 5: Preprocessing Amortizes Over Multiple Searches
**Visual**: Marking ruler once helps thousands of slides
**Code**: O(m) preprocessing + O(n) search × k queries = O(m + kn) vs O(kmn) naive
**Why**: Reuse same pattern many times on different texts (or many patterns on same text)

---

## Real-World Code Mappings

### Use Case 1: Text Editor Find (VS Code)

**Visual**: Ruler sliding through million-line file

| Visual Element | Production Code | System |
|----------------|-----------------|--------|
| Document | `text` (multi-MB file) | Large text buffer |
| Search term | `pattern` | User input |
| Matching engine | Boyer-Moore/KMP | Fast search algorithm |
| Smart skip | Bad character/good suffix rules | Skip large portions |
| Highlight matches | `matches[]` positions | UI rendering |

**Code Pattern**:
```python
# VS Code uses Boyer-Moore for find
def find_in_file(text: str, pattern: str) -> List[int]:
    # Preprocess pattern (build skip tables)
    bad_char = build_bad_character_table(pattern)

    # Search with skipping
    i = 0
    matches = []
    while i <= len(text) - len(pattern):
        # Match from right to left (Boyer-Moore)
        j = len(pattern) - 1
        while j >= 0 and text[i+j] == pattern[j]:
            j -= 1

        if j < 0:
            matches.append(i)  # Found match
            i += 1
        else:
            # Skip based on mismatched character
            i += max(1, bad_char[text[i+j]])

    return matches
```

**Sticky Mapping**: Preprocessing enables smart skips → sublinear average time

---

### Use Case 2: Plagiarism Detection (Turnitin)

**Visual**: Many pattern stamps checking against database

| Visual Element | Production Code | Tool |
|----------------|-----------------|------|
| Student paper | `text` | Document to check |
| Database phrases | `patterns[]` | Known plagiarized content |
| Hash fingerprints | Rabin-Karp hashes | Quick comparison |
| Multi-pattern search | Aho-Corasick trie | Check many patterns at once |

**Code Pattern**:
```python
# Rabin-Karp for multiple patterns
def find_plagiarism(text: str, database: List[str]) -> Dict[str, List[int]]:
    results = {}

    for pattern in database:
        # Compute pattern hash
        pattern_hash = compute_hash(pattern)
        m = len(pattern)

        # Rolling hash through text
        text_hash = compute_hash(text[:m])
        for i in range(len(text) - m + 1):
            if text_hash == pattern_hash:
                # Verify actual match (collision check)
                if text[i:i+m] == pattern:
                    results.setdefault(pattern, []).append(i)

            # Roll hash: remove left, add right
            if i < len(text) - m:
                text_hash = roll_hash(text_hash, text[i], text[i+m], m)

    return results
```

**Sticky Mapping**: Hash comparison O(1) avoids O(m) string comparison for most positions

---

## Common Variations: Different Algorithms, Same Goal

### Naive Search
**Visual**: Ruler slides 1 position at a time, checks all characters
**Code**: `for i in range(n-m+1): if text[i:i+m] == pattern: match!`
**When**: Very short texts, simple implementation

### KMP (Knuth-Morris-Pratt)
**Visual**: Smart ruler with pencil marks (LPS), never backtrack in text
**Code**: Build LPS, use `j = lps[j-1]` on mismatch
**When**: Streaming data, guaranteed O(n+m), avoid backtracking

### Rabin-Karp
**Visual**: Hash stamp sliding, verify on collision
**Code**: Rolling hash, verify when `hash == pattern_hash`
**When**: Multiple patterns, DNA sequences, simple to implement

### Boyer-Moore
**Visual**: Ruler scans right-to-left, skips characters
**Code**: Bad character + good suffix tables, scan backwards
**When**: Long patterns, English text (used in `grep`)

### Aho-Corasick
**Visual**: Trie of pattern rulers, one pass finds all
**Code**: Build trie of patterns, traverse text once
**When**: Many patterns (IDS, virus scanning)

---

## Self-Check: Do You Have Sticky Understanding?

### Test 1: Code → Visual
See this code:
```python
while i < n:
    if text[i] == pattern[j]:
        i += 1
        j += 1
    elif j > 0:
        j = lps[j-1]  # Smart skip
    else:
        i += 1
```

**Can you visualize?**
"Ruler aligns with text. If match: slide both pointers. If mismatch: check pencil marks (LPS) to see how far back to move ruler (but don't move text pointer back!). If at start of pattern, move text pointer forward."

### Test 2: Visual → Code
Imagine: "I have a hash stamp for pattern 'ABC'. I want to slide it across 'XYZABC' and check fingerprints."

**Can you write the code?**
```python
pattern = "ABC"
text = "XYZABC"
pattern_hash = hash(pattern)
m = len(pattern)

# Check each window
for i in range(len(text) - m + 1):
    window_hash = hash(text[i:i+m])
    if window_hash == pattern_hash:
        if text[i:i+m] == pattern:  # Verify
            print(f"Match at position {i}")
```

### Test 3: Explain Why
**Question**: Why does KMP have O(n) search time even with nested while loop?

**Answer**: Text pointer `i` increases at least once per outer loop iteration (either match advances both, or mismatch advances `i`). Inner while adjusts pattern pointer `j` but never resets `i`. Each character visited at most twice: once advancing, once during pattern adjustment. Amortized O(n).

---

## The Stickiest Mapping

**🎯 CORE VISUAL**: Transparent ruler (pattern) sliding over text, with smart skip marks to avoid redundant comparisons.

**🎯 CORE CODE**: Preprocessing (LPS, hash, tables) enables O(n) or O(n+m) search instead of O(nm) naive approach.

**🎯 CORE INSIGHT**: Pay O(m) once to analyze pattern structure, then search in O(n) time without backtracking or with smart skips. Amortizes over multiple searches.

**When you see string matching code, you now see rulers sliding intelligently. When you imagine pattern search, you know which algorithm fits your constraints.**

**The connection is permanent!** 🚀

---

## Next Steps

1. **Trace KMP** on "ABABDABACDABABAC" finding "ABABAC"
2. **Implement rolling hash** for Rabin-Karp
3. **Build LPS array** by hand for a pattern
4. **Solve a LeetCode problem** using KMP or Rabin-Karp
5. **Map to production use case** (text editor, DNA alignment)

**Time investment**: 2-3 hours
**Return**: Master efficient text search, foundation for bioinformatics and compression

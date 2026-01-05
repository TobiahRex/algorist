# Trie (Prefix Tree) - Code-to-Visual Mapping

**Purpose**: Connect the visual metaphor of a branching word tree to actual code implementation, creating sticky understanding through three-way mapping.

---

## The Three-Way Connection

```
Visual Metaphor ←→ Actual Code ←→ Why It Works
  (Branching tree)   (Nested dictionaries)   (O(m) prefix operations)
```

---

## Visual Metaphor Overview

**Physical Model**: A tree where each path from root to leaf spells a word

- **Root junction** = Root TrieNode (empty starting point)
- **Signpost** = TrieNode with character
- **Path** = Sequence of characters from root
- **Red signpost** = End-of-word marker (is_word = True)
- **Arrows from signpost** = Children dictionary
- **Walking path** = Traversing characters in word
- **Branch point** = Node with multiple children (shared prefix diverges)
- **Dead end** = Character not found in children

**Animation**: Insert "cat": walk root→c→a→t, creating signposts as needed, paint final 't' red. Search "car": walk root→c→a→r, if 'r' signpost is red, word exists!

---

## Core State Mappings

### Map State to Visual Elements

| Visual Element | Code Variable | Type | Purpose |
|----------------|---------------|------|---------|
| **Signpost** | `TrieNode` | `object` | One node in the tree |
| **Arrows from signpost** | `node.children` | `dict[str, TrieNode]` | Map character → child node |
| **Red paint on signpost** | `node.is_word` | `bool` | Marks end of complete word |
| **Starting point** | `self.root` | `TrieNode` | Entry point for all operations |
| **Current position** | `node` variable | `TrieNode` | Where we are during traversal |
| **Path walked so far** | Prefix accumulated | `str` | Characters from root to current |
| **Arrow for letter 'a'** | `node.children['a']` | `TrieNode or None` | Child node for character 'a' |

---

## Action Mappings

### Map Visual Actions to Code

| Visual Action | Code Lines | Why This Works |
|---------------|------------|----------------|
| **Start at root junction** | `node = self.root` | Begin all operations at root |
| **Walk to next signpost** | `node = node.children[char]` | Follow character to child |
| **Check if path exists** | `if char in node.children:` | See if arrow for character exists |
| **Build new signpost** | `node.children[char] = TrieNode()` | Create new child node |
| **Walk and build if needed** | `node = node.add_child(char)` | Create path as we go |
| **Paint signpost red** | `node.is_word = True` | Mark end of word |
| **Check if signpost is red** | `if node.is_word:` | Verify complete word |
| **List all arrows from signpost** | `for char, child in node.children.items():` | Iterate through children |
| **Walk until path ends** | `for char in word: node = node.children[char]` | Traverse word character by character |
| **Dead end (path missing)** | `if char not in node.children: return None` | Character not found |

---

## Code-to-Visual Translation Tables

### If You See This Code... Visualize This

| Code Pattern | Visual Image |
|--------------|-------------|
| `self.root = TrieNode()` | Create empty junction at starting point |
| `node.children = {}` | Signpost with no arrows yet |
| `node.children[char] = TrieNode()` | Build new signpost and arrow for character |
| `node = node.children[char]` | Walk along arrow for character to next signpost |
| `node.is_word = True` | Paint current signpost red (word ends here) |
| `if node.is_word: return True` | Reached red signpost = word exists |
| `char not in node.children` | No arrow for character = dead end |
| `for char, child in node.children.items()` | Look at all arrows from this signpost |

### If You Visualize This... Look for This Code

| Visual Image | Code Pattern |
|-------------|-------------|
| Start at root junction | `node = self.root` |
| Walk path for word | `for char in word: node = node.children[char]` |
| Build signpost if missing | `if char not in node.children: node.children[char] = TrieNode()` |
| Paint final signpost red | `node.is_word = True` |
| Check if signpost is red | `return node.is_word` |
| No arrow for character | `if char not in node.children: return False` |
| Collect all words from here | DFS: `for char, child in node.children.items(): dfs(child, path + char)` |

---

## Execution Trace Example

**Problem**: Insert words "cat", "car", "dog", then search for "car" and "cats"

### Step-by-Step: Visual + Code Side-by-Side

| Step | Visual State | Code State | Action |
|------|-------------|------------|--------|
| **1** | Empty tree: just root junction | `root.children = {}, root.is_word = False` | Initialize empty trie |
| **2** | Insert "cat": start at root | `node = root, word = "cat"` | Begin insert operation |
| **3** | Walk 'c': no arrow, build signpost | `node.children['c'] = TrieNode(), node = node.children['c']` | Create 'c' node |
| **4** | Walk 'a': no arrow, build signpost | `node.children['a'] = TrieNode(), node = node.children['a']` | Create 'a' node |
| **5** | Walk 't': no arrow, build, paint red | `node.children['t'] = TrieNode(), node = node.children['t'], node.is_word = True` | Create 't' node and mark word end |
| **6** | Tree: root→c→a→t(red) | Structure complete for "cat" | Word inserted |
| **7** | Insert "car": walk root→c→a (exists!) | `node = root, follow 'c', follow 'a'` | Reuse shared prefix |
| **8** | At 'a', add arrow for 'r', paint red | `node.children['r'] = TrieNode(), node.is_word = True` | Branch from shared prefix |
| **9** | Tree: root→c→a→{t(red), r(red)} | Shared prefix "ca", diverges at 't'/'r' | Two words share prefix |
| **10** | Insert "dog": new branch from root | `root.children['d'] = TrieNode(), walk d→o→g, mark red` | Separate branch |
| **11** | Search "car": walk root→c→a→r | `node = root, node = node.children['c'], node = node.children['a'], node = node.children['r']` | Traverse tree |
| **12** | Reached 'r' signpost, is it red? YES! | `return node.is_word == True` | Word found |
| **13** | Search "cats": walk root→c→a→t→s | `node = root, follow 'c', 'a', 't', then 's'` | Try to traverse |
| **14** | At 't', no arrow for 's' = dead end | `if 's' not in node.children: return False` | Character not found |

**Final Result**: Tree has 3 words with shared prefix "ca"

---

## Pattern Recognition: Code ↔ Visual

### Common Code Patterns in Trie

| Code Pattern | What It Means Visually | When You Use It |
|--------------|------------------------|-----------------|
| `node = TrieNode()` | Create new signpost | Every node creation |
| `node.children = {}` | Signpost with no arrows yet | Initialization |
| `for char in word:` | Walk path character by character | Insert/search/prefix operations |
| `if char not in node.children:` | Check if arrow exists | Decision point |
| `node.children[char] = TrieNode()` | Build new signpost and arrow | Insert when path missing |
| `node = node.children[char]` | Walk to next signpost | Traversal |
| `node.is_word = True` | Paint signpost red | Mark word end |
| `if node is None: return False` | Dead end reached | Search failed |
| `for char, child in node.children.items():` | Explore all arrows from signpost | DFS for autocomplete |

---

## Key Insights

### Insight 1: Shared Prefixes Share Nodes
**Visual**: "cat" and "car" share root→c→a path, diverge at t/r
**Code**: Same TrieNode objects for 'c' and 'a' used by both words
**Why**: Space efficiency - O(total characters) not O(number of words * average length)

### Insight 2: End-of-Word Marker Distinguishes Prefixes
**Visual**: "car" and "care" both exist, but only "care" has red 'e' signpost
**Code**: `is_word` flag on nodes
**Why**: "car" is complete word AND prefix of "care" - flag distinguishes them

### Insight 3: O(m) Operations Independent of Dictionary Size
**Visual**: Only walk as far as the word length, regardless of how many words exist
**Code**: Insert/search loop over `len(word)` characters
**Why**: Tree depth is word length, not dictionary size - scales with query, not data

### Insight 4: Dictionary as Children Enables Any Alphabet
**Visual**: Arrows can be labeled with any character (not just a-z)
**Code**: `children` is dict, not fixed array
**Why**: Works with Unicode, numbers, special chars - flexible but uses more space than array

### Insight 5: Prefix Operations via Subtree Collection
**Visual**: From any signpost, collect all words by walking all paths below
**Code**: DFS from node collecting all words in subtree
**Why**: Autocomplete, spell check suggestions - explore all branches from prefix

---

## Real-World Code Mappings

### Use Case 1: Autocomplete - Search Suggestions

**Visual**: User types "py", show all words starting with "py"

| Visual Element | Production Code | System |
|----------------|-----------------|--------|
| User input | `prefix = "py"` | Search query |
| Walk to "py" signpost | `node = traverse_to(prefix)` | Find prefix node |
| Explore all paths from "py" | `dfs(node, prefix, results)` | Collect completions |
| Red signposts below | Words added to results | Suggestions |
| Top K results | Heap of most frequent | Ranking |

**Code Pattern**:
```python
# Navigate to prefix
node = root
for char in "py":
    if char not in node.children:
        return []  # Prefix doesn't exist
    node = node.children[char]

# DFS to collect all words from this node
results = []
def dfs(node, path):
    if node.is_word:
        results.append(path)
    for char, child in node.children.items():
        dfs(child, path + char)

dfs(node, "py")
return results  # ["python", "pygame", "pytorch", ...]
```

**Sticky Mapping**: Walk to prefix, then explore all branches below

---

### Use Case 2: Spell Checker - Word Validation

**Visual**: Check if typed word exists, suggest corrections if not

| Visual Element | Production Code | Tool |
|----------------|-----------------|------|
| Word to check | `word = "recieve"` | User input |
| Walk path | Try to traverse word | Validation |
| Dead end or not red | Word not in dictionary | Typo detected |
| Try variations | Edit distance 1 from each node | Suggestions |
| Red signposts nearby | Valid words close to typo | Corrections |

**Code Pattern**:
```python
# Check if word exists
def is_valid(word):
    node = root
    for char in word:
        if char not in node.children:
            return False
        node = node.children[char]
    return node.is_word

if not is_valid("recieve"):
    # Generate candidates: delete, swap, insert, replace chars
    # Check each candidate in trie
    suggestions = find_close_matches("recieve", edit_distance=1)
    # Returns: ["receive", "deceive", ...]
```

**Sticky Mapping**: Walk path for word, check if final signpost is red

---

## Common Variations: Same Visual, Different Rules

### Standard Trie
**Visual**: Each character is one signpost, shared prefixes merge
**Code**: `TrieNode` with `children` dict and `is_word` flag
**Example**: Autocomplete, spell check

### Compressed Trie (Radix Tree)
**Visual**: Chains of single-child nodes merged into one signpost with label "car" instead of c→a→r
**Code**: Nodes store strings, not single chars
**Example**: IP routing, memory-efficient tries

### Suffix Trie
**Visual**: Insert all suffixes of a string ("cat" → "cat", "at", "t")
**Code**: For string S, insert S[i:] for all i
**Example**: Substring search, pattern matching

### Trie with Frequency
**Visual**: Each red signpost has a number badge (word count)
**Code**: `node.count` tracks frequency
**Example**: Top K frequent words, ranked suggestions

### Bitwise Trie
**Visual**: Binary tree with 0/1 edges instead of a-z
**Code**: Children are array `[left, right]` for bits
**Example**: Maximum XOR problems

---

## Self-Check: Do You Have Sticky Understanding?

### Test 1: Code → Visual
See this code:
```python
node = self.root
for char in word:
    if char not in node.children:
        node.children[char] = TrieNode()
    node = node.children[char]
node.is_word = True
```

**Can you visualize?**
"Start at root junction. For each character, check if arrow exists. If not, build new signpost and arrow. Walk to that signpost. After traversing all characters, paint the final signpost red."

### Test 2: Visual → Code
Imagine: "I'm at a signpost. I need to collect all complete words that can be reached from here by walking all possible paths."

**Can you write the code?**
```python
def collect_words(node, prefix, results):
    if node.is_word:
        results.append(prefix)
    for char, child in node.children.items():
        collect_words(child, prefix + char, results)
```

### Test 3: Explain Why
**Question**: Why is Trie search O(m) while hash table is also O(m), but Trie can do prefix search and hash table cannot?

**Answer**: Both are O(m) for exact match because you process m characters. But Trie maintains structure: after finding prefix, you can DFS to collect all words below. Hash table only says "yes/no" for exact keys - no concept of "words starting with X". Trie trades extra space for this structural advantage.

---

## The Stickiest Mapping

**Core Visual**: Branching tree of signposts where paths spell words, red signposts mark word endings.

**Core Code**: Nested dictionary structure (`TrieNode` with `children` dict and `is_word` flag), traverse character by character.

**Core Insight**: By sharing prefixes, Trie makes all operations O(m) where m is word length, independent of dictionary size. Walking the tree = processing the characters. The structure enables prefix queries that hash tables cannot do.

**When you see Trie code, you now see signposts and paths. When you imagine autocomplete, you now know exactly what code to write.**

**The connection is permanent!**

---

## Next Steps

1. **Trace the verbose form** line-by-line with the signpost visual
2. **Trace the terse form** with same visual
3. **Solve LeetCode 208** (Implement Trie) using the tree metaphor
4. **Implement autocomplete** - collect words from prefix node
5. **Build spell checker** - that's when it truly sticks!

**Time investment**: 2-3 hours
**Return**: Deep, intuitive understanding that lasts years

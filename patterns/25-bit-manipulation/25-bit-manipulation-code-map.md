# Bit Manipulation - Code-to-Visual Mapping

**Purpose**: Connect the visual metaphor of switches and binary operations to actual code implementation, creating sticky understanding through three-way mapping.

---

## The Three-Way Connection

```
Visual Metaphor ←→ Actual Code ←→ Why It Works
  (Switches/Bits)   (Bitwise Ops)   (Hardware-level operations)
```

---

## Visual Metaphor Overview

**Physical Model**: Binary switches on a control panel

- **Individual switch** = Single bit (0=off, 1=on)
- **Control panel** = 32-bit or 64-bit integer
- **Switch positions** = Binary representation (e.g., 1100 = 12)
- **Toggle button** = XOR operation
- **Master switch** = Set/clear specific bits
- **Inspection light** = Check if bit is set
- **Counter display** = Number of switches ON (Hamming weight)
- **Power of 2 detector** = Exactly one switch ON

**Animation**: Flip individual switches (set/clear/toggle bits), inspect lights (check bits), count active switches (count set bits).

---

## Core State Mappings

### Map State to Visual Elements

| Visual Element | Code Variable | Type | Purpose |
|----------------|---------------|------|---------|
| **Number value** | `n` | `int` | The integer whose bits we manipulate |
| **Switch position k** | `k` | `int` | Which bit position (0-indexed from right) |
| **Bit mask** | `1 << k` | `int` (expression) | Pattern to isolate bit k |
| **Inverse mask** | `~(1 << k)` | `int` (expression) | Pattern with bit k cleared |
| **All switches** | Binary representation | `str` (visualization) | Full 32-bit pattern |
| **Active switches count** | `count` | `int` | Number of set bits (Hamming weight) |
| **Rightmost ON switch** | `n & -n` | `int` (expression) | Isolate lowest set bit |
| **XOR accumulator** | `result ^= x` | `int` | Running XOR (cancels duplicates) |

---

## Action Mappings

### Map Visual Actions to Code

| Visual Action | Code Lines | Why This Works |
|---------------|------------|----------------|
| **Turn switch k ON** | `n \| (1 << k)` | OR with mask sets bit to 1 |
| **Turn switch k OFF** | `n & ~(1 << k)` | AND with inverted mask clears bit |
| **Toggle switch k** | `n ^ (1 << k)` | XOR flips bit: 0→1, 1→0 |
| **Check if switch k is ON** | `(n >> k) & 1` | Shift to position 0, mask lowest bit |
| **Clear rightmost ON switch** | `n & (n-1)` | Brian Kernighan's trick |
| **Find rightmost ON switch** | `n & -n` | Two's complement magic |
| **Count ON switches** | `while n: n &= n-1; count++` | Remove rightmost bit until 0 |
| **XOR all elements** | `result = 0; for x: result ^= x` | Self-canceling property |
| **Check power of 2** | `n > 0 && (n & (n-1)) == 0` | Exactly one bit set |

---

## Code-to-Visual Translation Tables

### If You See This Code... Visualize This

| Code Pattern | Visual Image |
|--------------|-------------|
| `n \| (1 << k)` | Turn ON switch at position k (all other switches unchanged) |
| `n & ~(1 << k)` | Turn OFF switch at position k (create mask with that bit cleared) |
| `n ^ (1 << k)` | Toggle switch at position k (flip from ON↔OFF) |
| `(n >> k) & 1` | Slide switch panel right by k, look at rightmost switch |
| `n & (n-1)` | Turn OFF the rightmost ON switch (12=1100 → 8=1000) |
| `n & -n` | Isolate rightmost ON switch (12=1100 → 4=0100) |
| `a ^ b ^ a` | Toggle switches twice with same pattern → back to original |
| `n > 0 && (n & (n-1)) == 0` | Check: exactly one switch ON? (power of 2) |

### If You Visualize This... Look for This Code

| Visual Image | Code Pattern |
|-------------|-------------|
| Turn ON one specific switch | `n \| (1 << k)` |
| Turn OFF one specific switch | `n & ~(1 << k)` |
| Flip one switch | `n ^ (1 << k)` |
| Check status of switch k | `(n >> k) & 1` or `n & (1 << k) != 0` |
| Count total ON switches | Brian Kernighan: `while n: n &= n-1; count++` |
| Find position of rightmost ON switch | `log2(n & -n)` |
| All switches OFF except one | Power of 2 check |

---

## Execution Trace Example

**Problem**: Find single number in `[4, 1, 2, 1, 2]` where all others appear twice

### Step-by-Step: Visual + Code Side-by-Side

| Step | Visual State (Binary) | Code State | Action |
|------|----------------------|------------|--------|
| **1** | result = 0000 | `result = 0` | Initialize accumulator |
| **2** | XOR with 4 (0100) → 0100 | `result ^= 4 → result = 4` | First number: becomes result |
| **3** | XOR with 1 (0001) → 0101 | `result ^= 1 → result = 5` | Combine with second number |
| **4** | XOR with 2 (0010) → 0111 | `result ^= 2 → result = 7` | Combine with third number |
| **5** | XOR with 1 (0001) → 0110 | `result ^= 1 → result = 6` | **1 cancels itself!** (XOR property) |
| **6** | XOR with 2 (0010) → 0100 | `result ^= 2 → result = 4` | **2 cancels itself!** (XOR property) |

**Final Result**: `0100` = 4 (the unique number)

**Why it works**: `a ^ a = 0` (same bits cancel), `a ^ 0 = a` (identity), XOR is commutative/associative

---

## Pattern Recognition: Code ↔ Visual

### Common Code Patterns in Bit Manipulation

| Code Pattern | What It Means Visually | When You Use It |
|--------------|------------------------|-----------------|
| `n \| (1 << k)` | Set switch k to ON | Setting flags, permissions |
| `n & ~(1 << k)` | Set switch k to OFF | Clearing flags |
| `n ^ (1 << k)` | Toggle switch k | Flip state (dark mode toggle) |
| `(n >> k) & 1` | Read switch k status | Check if feature enabled |
| `n & (n-1)` | Remove rightmost ON switch | Count set bits, power of 2 check |
| `n & -n` | Isolate rightmost ON switch | Find lowest set bit (Fenwick tree) |
| `for mask in range(1 << n)` | Try all switch combinations | Generate all subsets (2^n) |
| `result ^= x` (in loop) | XOR accumulator | Find unique element |

---

## Key Insights

### Insight 1: XOR Self-Cancellation
**Visual**: Toggling same switch twice returns to original state
**Code**: `a ^ b ^ a = b` (a cancels itself)
**Why**: XOR is its own inverse; perfect for finding unique elements among duplicates

### Insight 2: Power of 2 Detection
**Visual**: Power of 2 = exactly one switch ON (e.g., 8 = 1000, 16 = 10000)
**Code**: `n & (n-1) == 0` clears rightmost bit; if result is 0, only one bit was set
**Why**: Subtracting 1 flips all trailing bits including the rightmost set bit

### Insight 3: Bit Masking for Sets
**Visual**: Each switch represents inclusion of element i in subset
**Code**: `if mask & (1 << i)` checks if element i is in subset
**Why**: 2^n combinations = all possible ON/OFF patterns for n switches

### Insight 4: Two's Complement Trick
**Visual**: `-n` flips all bits and adds 1; `n & -n` isolates rightmost ON switch
**Code**: `n & -n` extracts lowest set bit (e.g., 12 & -12 = 4)
**Why**: Two's complement representation aligns rightmost bit positions

### Insight 5: O(1) Bit Operations
**Visual**: Flipping switches is instantaneous (hardware operation)
**Code**: All bitwise ops (`&`, `|`, `^`, `~`, `<<`, `>>`) are O(1)
**Why**: CPU executes bit operations in single clock cycle vs loops O(n)

---

## Real-World Code Mappings

### Use Case 1: Unix File Permissions

**Visual**: Permission switches (rwxrwxrwx = 9 bits)

| Visual Element | Production Code | System |
|----------------|-----------------|--------|
| Read switch (bit 2) | `0b100` = 4 | r-- |
| Write switch (bit 1) | `0b010` = 2 | -w- |
| Execute switch (bit 0) | `0b001` = 1 | --x |
| Check permission | `perm & READ_BIT` | Test if readable |
| Grant permission | `perm \| WRITE_BIT` | Make writable |
| Revoke permission | `perm & ~EXEC_BIT` | Remove execute |

**Code Pattern**:
```python
# Check if file is readable
if permissions & 0b100:  # Check read bit
    open_file()

# Grant write permission
permissions |= 0b010  # Set write bit

# Revoke execute permission
permissions &= ~0b001  # Clear execute bit
```

**Sticky Mapping**: `|` = turn switch ON, `&~` = turn switch OFF, `&` = check switch status

---

### Use Case 2: Feature Flags (32 flags in 1 integer)

**Visual**: Feature toggle panel (32 switches)

| Visual Element | Production Code | Tool |
|----------------|-----------------|------|
| Dark mode switch (bit 0) | `DARK_MODE = 1 << 0` | Enable/disable |
| Beta features (bit 1) | `BETA = 1 << 1` | Feature toggle |
| Analytics (bit 2) | `ANALYTICS = 1 << 2` | Tracking on/off |
| User flags variable | `user.settings` (32-bit int) | Compact storage |

**Code Pattern**:
```python
# Enable dark mode
user.settings |= DARK_MODE  # Turn ON bit 0

# Disable analytics
user.settings &= ~ANALYTICS  # Turn OFF bit 2

# Toggle beta features
user.settings ^= BETA  # Flip bit 1

# Check if dark mode enabled
if user.settings & DARK_MODE:
    apply_dark_theme()
```

**Sticky Mapping**: 32 boolean flags compressed into 1 integer, O(1) check/update

---

## Common Variations: Same Visual, Different Operations

### Set Bit
**Visual**: Turn switch ON (force to 1)
**Code**: `n | (1 << k)`
**Example**: Enable feature flag

### Clear Bit
**Visual**: Turn switch OFF (force to 0)
**Code**: `n & ~(1 << k)`
**Example**: Disable permission

### Toggle Bit
**Visual**: Flip switch (0→1, 1→0)
**Code**: `n ^ (1 << k)`
**Example**: Dark mode toggle

### Check Bit
**Visual**: Is switch ON?
**Code**: `(n >> k) & 1` or `(n & (1 << k)) != 0`
**Example**: Test if feature enabled

### Count Set Bits (Hamming Weight)
**Visual**: How many switches are ON?
**Code**: Brian Kernighan: `while n: n &= n-1; count++`
**Example**: Permission counting

### Isolate Rightmost Bit
**Visual**: Find first ON switch from right
**Code**: `n & -n`
**Example**: Fenwick tree operations

### Generate All Subsets
**Visual**: Try every switch combination
**Code**: `for mask in range(1 << n)`
**Example**: Enumerate all possibilities

---

## Self-Check: Do You Have Sticky Understanding?

### Test 1: Code → Visual
See this code:
```python
n & (n - 1)
```

**Can you visualize?**
"Turn OFF the rightmost ON switch. Example: 12 (1100) - 1 = 11 (1011), 12 & 11 = 8 (1000). Rightmost 1-bit removed."

### Test 2: Visual → Code
Imagine: "I have a control panel with 8 switches. I want to turn ON switches 0, 2, and 5."

**Can you write the code?**
```python
n = 0  # All switches OFF
n |= (1 << 0)  # Turn ON switch 0
n |= (1 << 2)  # Turn ON switch 2
n |= (1 << 5)  # Turn ON switch 5
# Result: n = 0b00100101 = 37

# Or more concisely:
n = (1 << 0) | (1 << 2) | (1 << 5)
```

### Test 3: Explain Why
**Question**: Why does `n & (n-1) == 0` test for power of 2?

**Answer**: Power of 2 has exactly one bit set (e.g., 8 = 1000). Subtracting 1 flips all trailing bits including the set bit (8-1 = 7 = 0111). ANDing these gives 0 (1000 & 0111 = 0000). Only works when exactly one bit is set.

---

## The Stickiest Mapping

**🎯 CORE VISUAL**: Binary switches on control panel—each switch is a bit you can flip ON/OFF/toggle instantly.

**🎯 CORE CODE**: Bitwise operators (`&`, `|`, `^`, `~`, `<<`, `>>`) manipulate individual bits in O(1) time.

**🎯 CORE INSIGHT**: XOR cancels duplicates (`a ^ a = 0`), masking isolates bits, bit patterns represent sets (2^n subsets), hardware executes in single cycle.

**When you see bit manipulation code, you now see switches. When you imagine switches, you know exactly what bitwise operation to use.**

**The connection is permanent!** 🚀

---

## Next Steps

1. **Trace the XOR trick** for finding single number
2. **Implement power of 2 check** with visualization
3. **Solve a LeetCode problem** using bit manipulation
4. **Map to real-world use case** (permissions, feature flags)
5. **Teach someone else** the XOR self-cancellation property

**Time investment**: 1-2 hours
**Return**: Master low-level optimization, understand system internals

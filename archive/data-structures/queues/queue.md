# Queue Implementation Notes

## 🧠 Mental Models

### 1. "The Line at a Store" Model
- `front`: The person being served right now (at the cashier)
- `rear`: The last person in line
- When someone joins (enqueue) → They go to the back of the line
- When someone leaves (dequeue) → They leave from the front
- Empty store: front = rear (no one in line)
- Full store: rear hit the maximum capacity (store can't fit more people)

### 2. "Movie Reel" Model
- Think of the array like a film strip
- `front` pointer is where we're currently "playing" from
- `rear` pointer is where we last "recorded" to
- We only move forward, never backward (just like a film reel)

## 💭 Code Structure & Patterns

```javascript
// Core State Pattern
// -----------------
front = -1    // Starting position (-1 means "before first slot")
rear = -1     // Starting position (-1 means "no elements yet")
q = []        // The actual storage

// Dynamic vs Fixed Size Pattern
// ---------------------------
constructor(size) {
  // Flexible growth vs Pre-allocated space
  // Like choosing between expandable or fixed-size waiting area
  q = size < 0 ? [] : new Array(size)
}

// Enqueue Pattern (Adding)
// ----------------------
enqueue(data) {
  // 1. Check if there's room
  // 2. Move rear pointer forward
  // 3. Place new item at rear
  // Think: "Person joins at end of line"
}

// Dequeue Pattern (Removing)
// ------------------------
dequeue() {
  // 1. Check if there's anything to take
  // 2. Move front pointer forward
  // 3. Take item at front
  // 4. Clear the slot (hygiene)
  // Think: "Person leaves from front of line"
}

// State Check Patterns
// ------------------
isFull()  // rear hit the wall (size-1)
isEmpty() // front caught up with rear
```

## 🎯 Key Implementation Insights

1. **Pointer Movement**
   - Pointers only move forward (increment)
   - Never move backward (no decrement)
   - Reset only when queue is reconstructed

2. **Boundary Conditions**
   - Empty: `front === rear`
   - Full: `rear === size-1`
   - Invalid operations return -1

3. **Memory Management**
   - Clear slots after dequeue (set to undefined)
   - Helps prevent memory leaks
   - Makes debugging easier

4. **Performance Characteristics**
   - Enqueue: O(1) - just add at rear
   - Dequeue: O(1) - just take from front
   - Space: O(n) where n is size

## 🚫 Common Pitfalls to Remember

1. Forgetting to check for full/empty before operations
2. Not clearing dequeued slots
3. Trying to move pointers backward
4. Not handling the -1 initial state correctly

This structure gives us both the technical implementation details and strong mental models to remember how Queues work. The "Line at a Store" model is particularly helpful for remembering the FIFO (First-In-First-Out) nature, while the "Movie Reel" model helps remember the forward-only pointer movement pattern.

# Two-Pointer and Sliding Window

🔍 Two-Pointer Pattern

Core idea:
Maintain two indices that scan through the data — often moving toward or away from each other — to narrow down a search space or partition data.

⸻

🧭 Archetype: Extract → Locate and Retrieve
	•	Find two numbers that add to a target in a sorted array
Leetcode 167 – Two Sum II
👉 Sorted input? Try left + right sum check. Move pointers accordingly.
	•	Find the closest pair in two sorted arrays
Use two pointers moving toward each other to minimize the absolute difference.

⸻

🔀 Archetype: Organize → Group and Partition
	•	Partition an array around a pivot
Leetcode 75 – Dutch National Flag
👉 Use three pointers (low, mid, high) to segregate 0s, 1s, 2s.
	•	Remove duplicates from sorted array
Leetcode 26
👉 Slow/fast pointer to overwrite duplicates in place.

⸻

🎭 Archetype: Convert → Normalize and Map
	•	Reverse a string or array in-place
Leetcode 344
👉 Swap characters from both ends inward.
	•	Move zeroes to the end
Leetcode 283
👉 Fast pointer finds non-zero, slow pointer marks overwrite location.

⸻

🪟 Sliding Window Pattern

Core idea:
Maintain a window [start, end] that moves across the array or string. Useful when dealing with subarrays/substrings and needing aggregated info (sum, count, set).

⸻

📏 Archetype: Distill → Summarize and Aggregate
	•	Maximum sum of k consecutive elements
Leetcode 643 – Maximum Average Subarray I
👉 Fixed-size window.
	•	Minimum size subarray sum ≥ target
Leetcode 209
👉 Shrink window from the left when condition is met.

⸻

🧼 Archetype: Distill → Filter and Clean
	•	Longest substring without repeating characters
Leetcode 3
👉 Expand window, shrink when duplicate found (use set or map).
	•	Longest substring with at most k distinct characters
Leetcode 340
👉 Shrink window when distinct count exceeds k.

⸻

🔍 Archetype: Extract → Match and Parse
	•	Find all anagrams of pattern in string
Leetcode 438
👉 Use sliding window + char count map comparison.
	•	Check if one string is a permutation of another
Leetcode 567
👉 Sliding window of pattern length with character count comparison.

⸻

📦 Archetype: Organize → Sort and Order
	•	Longest continuous increasing subsequence
Leetcode 674
👉 Expand window while elements are increasing.

⸻

Quick Rules of Thumb for Pattern Matching:

Problem Clue	Likely Pattern
“Longest” or “Shortest” substring/subarray	Sliding Window
“Sorted array” + “target”	Two Pointers
“Remove duplicates” or “partition”	Two Pointers
“Check for anagram/permutation”	Sliding Window + HashMap
“Fixed window size”	Sliding Window (Fixed)
“Variable-sized condition” (e.g. sum ≥ target)	Sliding Window (Shrinking)

Would a visual pattern matrix or flashcards version of this help for memorization later?
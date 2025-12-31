"""
Weighted Interval Scheduling - Select non-overlapping intervals to maximize profit

Mental Model: "Consultant choosing projects - can't work on overlapping projects, maximize revenue"

Problem: Given intervals with weights, select maximum-weight subset with no overlaps

Pattern Recognition:
- "non-overlapping intervals" + "maximize value" → Weighted Interval Scheduling
- "choose or skip" + "overlapping subproblems" → Dynamic Programming
- "sorted by end time" + "binary search for compatible" → O(n log n) DP

Key Insight:
Greedy fails (can't just take highest weight or earliest finish)
DP: Sort by end time, for each interval decide: take it + compatible past, or skip it
Binary search finds latest compatible interval (all intervals ending before current start)

Structure:
- Intervals: [(start, end, weight), ...]
- DP[i]: Maximum weight using intervals 0..i
- Compatible[i]: Latest interval j where end[j] <= start[i] (found via binary search)

Behavior:
1. Sort intervals by end time
2. For each interval i:
   - Option 1: Skip it → dp[i] = dp[i-1]
   - Option 2: Take it → dp[i] = weight[i] + dp[compatible[i]]
   - dp[i] = max(option1, option2)
3. Backtrack to find actual intervals selected

Real-World:
- Project selection (consulting, freelancing)
- Event scheduling with profits
- Resource allocation with ROI
"""

from typing import List, Tuple
import bisect


def weighted_interval_scheduling_dp(intervals):
    """
    Weighted interval scheduling using DP

    intervals: list of (start, end, weight) tuples
    Returns: (max_weight, selected_intervals)

    Time: O(n log n) - sort + binary search for each interval
    Space: O(n) - DP array

    Mental trace for [(1,3,5), (2,5,6), (4,6,5), (6,7,4), (5,8,11), (7,9,2)]:
    1. Sort by end time: [(1,3,5), (2,5,6), (4,6,5), (6,7,4), (5,8,11), (7,9,2)]
    2. Build DP:
       - Interval 0 (1,3,5): Take it → dp[0] = 5
       - Interval 1 (2,5,6): Compatible=none, dp[1] = max(5, 6) = 6
       - Interval 2 (4,6,5): Compatible=0, dp[2] = max(6, 5+5) = 10
       - Interval 3 (6,7,4): Compatible=1, dp[3] = max(10, 4+6) = 10
       - Interval 4 (5,8,11): Compatible=1, dp[4] = max(10, 11+6) = 17
       - Interval 5 (7,9,2): Compatible=3, dp[5] = max(17, 2+10) = 17
    3. Max weight = 17 (take intervals 1 and 4)
    """
    if not intervals:
        return 0, []

    # Sort by end time
    intervals = sorted(intervals, key=lambda x: x[1])
    n = len(intervals)

    # Find compatible intervals using binary search
    def find_compatible(i):
        """Find latest interval j where end[j] <= start[i]"""
        start_i = intervals[i][0]
        # Binary search for largest end time <= start_i
        left, right = 0, i - 1
        result = -1

        while left <= right:
            mid = (left + right) // 2
            if intervals[mid][1] <= start_i:
                result = mid
                left = mid + 1
            else:
                right = mid - 1

        return result

    # Build DP table
    dp = [0] * n
    dp[0] = intervals[0][2]  # First interval

    for i in range(1, n):
        weight = intervals[i][2]

        # Option 1: Don't take interval i
        option_skip = dp[i - 1]

        # Option 2: Take interval i + best compatible solution
        compatible_idx = find_compatible(i)
        option_take = weight + (dp[compatible_idx] if compatible_idx >= 0 else 0)

        dp[i] = max(option_skip, option_take)

    # Backtrack to find selected intervals
    selected = []
    i = n - 1

    while i >= 0:
        if i == 0:
            if dp[0] > 0:
                selected.append(intervals[0])
            break

        # Check if we took interval i
        weight = intervals[i][2]
        compatible_idx = find_compatible(i)
        option_take = weight + (dp[compatible_idx] if compatible_idx >= 0 else 0)

        if option_take >= dp[i - 1]:
            # We took it
            selected.append(intervals[i])
            i = compatible_idx
        else:
            # We skipped it
            i -= 1

    selected.reverse()
    return dp[n - 1], selected


def weighted_interval_scheduling_memoization(intervals):
    """
    Top-down DP with memoization (recursive)

    Same time/space complexity, but more intuitive recursion
    """
    if not intervals:
        return 0, []

    intervals = sorted(intervals, key=lambda x: x[1])
    n = len(intervals)
    memo = {}

    def find_compatible(i):
        start_i = intervals[i][0]
        left, right = 0, i - 1
        result = -1
        while left <= right:
            mid = (left + right) // 2
            if intervals[mid][1] <= start_i:
                result = mid
                left = mid + 1
            else:
                right = mid - 1
        return result

    def solve(i):
        """Max weight using intervals 0..i"""
        if i < 0:
            return 0
        if i in memo:
            return memo[i]

        # Option 1: Skip interval i
        option_skip = solve(i - 1)

        # Option 2: Take interval i
        compatible_idx = find_compatible(i)
        option_take = intervals[i][2] + solve(compatible_idx)

        memo[i] = max(option_skip, option_take)
        return memo[i]

    max_weight = solve(n - 1)

    # Backtrack (same as iterative version)
    selected = []
    i = n - 1
    while i >= 0:
        if i == 0:
            if memo.get(0, 0) > 0:
                selected.append(intervals[0])
            break

        compatible_idx = find_compatible(i)
        option_take = intervals[i][2] + memo.get(compatible_idx, 0)

        if option_take >= memo.get(i - 1, 0):
            selected.append(intervals[i])
            i = compatible_idx
        else:
            i -= 1

    selected.reverse()
    return max_weight, selected


class WeightedIntervalScheduler:
    """
    Weighted interval scheduling solver with multiple strategies
    """
    def __init__(self, intervals):
        """
        intervals: list of (start, end, weight) tuples
        """
        self.intervals = intervals
        self.n = len(intervals)

    def solve(self, method='dp'):
        """
        method='dp': Bottom-up DP (recommended)
        method='memoization': Top-down DP
        """
        if method == 'dp':
            return weighted_interval_scheduling_dp(self.intervals)
        elif method == 'memoization':
            return weighted_interval_scheduling_memoization(self.intervals)
        else:
            raise ValueError(f"Unknown method: {method}")

    def visualize_solution(self, selected_intervals):
        """Print selected intervals with Gantt-style timeline"""
        if not selected_intervals:
            print("No intervals selected")
            return

        print("Selected intervals:")
        total_weight = 0
        for start, end, weight in selected_intervals:
            total_weight += weight
            # Simple Gantt representation
            timeline = ['-'] * 50
            start_pos = min(int(start * 2), 49)
            end_pos = min(int(end * 2), 49)
            for i in range(start_pos, end_pos + 1):
                timeline[i] = '█'
            print(f"  [{start:2d}, {end:2d}] weight={weight:3d}  {''.join(timeline)}")

        print(f"\nTotal weight: {total_weight}")
        print(f"Number of intervals: {len(selected_intervals)}")


# Real-world applications
def maximize_project_revenue(projects):
    """
    Consulting: Select projects to maximize revenue with no time conflicts

    projects: list of (start_week, end_week, revenue_thousands) tuples
    Returns: (max_revenue, selected_projects)
    """
    scheduler = WeightedIntervalScheduler(projects)
    max_revenue, selected = scheduler.solve('dp')

    print("=== Project Selection ===")
    print(f"Total projects: {len(projects)}")
    print(f"Maximum revenue: ${max_revenue}k")
    print(f"Projects selected: {len(selected)}")

    if selected:
        print("\nSelected project timeline:")
        for start, end, revenue in selected:
            print(f"  Week {start}-{end}: ${revenue}k")

    return max_revenue, selected


def optimize_event_schedule(events):
    """
    Event planning: Maximize profit from venue bookings

    events: list of (start_hour, end_hour, profit) tuples
    Returns: (max_profit, selected_events)
    """
    scheduler = WeightedIntervalScheduler(events)
    max_profit, selected = scheduler.solve('dp')

    print("=== Event Scheduling ===")
    print(f"Total event requests: {len(events)}")
    print(f"Maximum profit: ${max_profit}")

    if selected:
        print("\nAccepted events:")
        for i, (start, end, profit) in enumerate(selected, 1):
            print(f"  Event {i}: {start}:00-{end}:00 (${profit})")

    return max_profit, selected


if __name__ == '__main__':
    # Test 1: Basic example
    print("=== Test 1: Basic Weighted Intervals ===")
    intervals = [
        (1, 3, 5),   # Interval 0
        (2, 5, 6),   # Interval 1
        (4, 6, 5),   # Interval 2
        (6, 7, 4),   # Interval 3
        (5, 8, 11),  # Interval 4
        (7, 9, 2),   # Interval 5
    ]

    scheduler = WeightedIntervalScheduler(intervals)

    # Compare methods
    print("Bottom-up DP:")
    max_weight_dp, selected_dp = scheduler.solve('dp')
    scheduler.visualize_solution(selected_dp)
    print()

    print("Top-down Memoization:")
    max_weight_memo, selected_memo = scheduler.solve('memoization')
    scheduler.visualize_solution(selected_memo)
    print()

    assert max_weight_dp == max_weight_memo, "Both methods should find same max weight"
    print(f"✓ Optimal solution: max weight = {max_weight_dp}\n")

    # Test 2: Real-world - Project selection
    print("=== Test 2: Consulting Projects ===")
    projects = [
        (1, 4, 50),   # Project A: Week 1-4, $50k
        (3, 5, 30),   # Project B: Week 3-5, $30k
        (0, 6, 60),   # Project C: Week 0-6, $60k (conflicts with all)
        (4, 7, 40),   # Project D: Week 4-7, $40k
        (8, 10, 70),  # Project E: Week 8-10, $70k
        (5, 9, 35),   # Project F: Week 5-9, $35k
    ]

    maximize_project_revenue(projects)
    print()

    # Test 3: Real-world - Event venue
    print("=== Test 3: Venue Event Bookings ===")
    events = [
        (8, 11, 300),   # Morning conference
        (9, 12, 250),   # Morning workshop
        (11, 14, 400),  # Lunch event
        (13, 17, 500),  # Afternoon gala
        (14, 18, 350),  # Evening reception
        (16, 20, 450),  # Dinner event
    ]

    optimize_event_schedule(events)
    print()

    # Test 4: Edge cases
    print("=== Test 4: Edge Cases ===")

    # No overlaps - take all
    no_overlap = [(1, 2, 5), (3, 4, 6), (5, 6, 7)]
    max_w, sel = weighted_interval_scheduling_dp(no_overlap)
    print(f"No overlaps: max_weight={max_w}, count={len(sel)} (should take all)")

    # All overlap - take best
    all_overlap = [(1, 10, 5), (1, 10, 20), (1, 10, 15)]
    max_w, sel = weighted_interval_scheduling_dp(all_overlap)
    print(f"All overlap: max_weight={max_w}, count={len(sel)} (should take weight=20)")

    # Empty input
    max_w, sel = weighted_interval_scheduling_dp([])
    print(f"Empty input: max_weight={max_w}, count={len(sel)}")

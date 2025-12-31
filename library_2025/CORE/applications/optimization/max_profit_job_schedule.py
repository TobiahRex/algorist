class JobScheduler:
    """
    Maximum profit from non-overlapping jobs (weighted interval scheduling).
    
    Mental Model: Freelancer Selecting Gigs
    - Each gig has start, end, and payment
    - Can't work two gigs at once
    - Want maximum total payment
    
    Algorithm:
    1. Sort jobs by end time
    2. For each job, decide: take it or skip it?
       - Skip: profit = best so far
       - Take: profit = this job + best ending before this starts
    3. Binary search finds "best ending before this starts"
    
    Why Sort by End Time:
    After processing job i, dp[i] represents the optimal solution
    for all jobs ending by time end[i]. This monotonicity enables DP.
    
    Why Binary Search:
    Finding "latest job ending before start[i]" naively is O(n).
    Since we sorted by end time, binary search finds it in O(log n).
    """
    
    def __init__(self, startTime, endTime, profit):
        import bisect
        self.jobs = sorted(zip(endTime, startTime, profit))
        self.n = len(self.jobs)
    
    def find_last_non_conflict(self, idx, ends):
        """
        Find index of latest job ending before job[idx] starts.
        Uses binary search on sorted end times.
        
        Returns index in dp array (0-indexed, where 0 is "no jobs").
        """
        import bisect
        start = self.jobs[idx][1]  # Start time of current job
        # Find rightmost end time <= start
        return bisect.bisect_right(ends, start) - 1
    
    def solve(self) -> int:
        """
        DP with binary search optimization.
        
        dp[i] = max profit using first i jobs (1-indexed)
        ends[i] = end time of i-th job (for binary search)
        
        Transition:
        dp[i] = max(dp[i-1],  # Skip job i
                    profit[i] + dp[last_non_conflict(i)])  # Take job i
        """
        import bisect
        
        # dp[0] = 0, ends[0] = 0 (dummy for "no jobs")
        dp = [0]
        ends = [0]
        
        for end, start, profit in self.jobs:
            # Find last job that ends before this one starts
            last_idx = bisect.bisect_right(ends, start) - 1
            
            # Option 1: Skip this job (keep previous best)
            skip_profit = dp[-1]
            
            # Option 2: Take this job
            take_profit = dp[last_idx] + profit
            
            # Choose better option
            best = max(skip_profit, take_profit)
            
            dp.append(best)
            ends.append(end)
        
        return dp[-1]
    
    def solve_with_jobs(self) -> tuple:
        """
        Extended: also return which jobs were selected.
        """
        import bisect
        
        dp = [0]
        ends = [0]
        choices = [None]  # Track decisions for reconstruction
        
        for i, (end, start, profit) in enumerate(self.jobs):
            last_idx = bisect.bisect_right(ends, start) - 1
            skip_profit = dp[-1]
            take_profit = dp[last_idx] + profit
            
            if take_profit > skip_profit:
                dp.append(take_profit)
                choices.append(('take', last_idx, i))
            else:
                dp.append(skip_profit)
                choices.append(('skip', len(dp) - 2, None))
            
            ends.append(end)
        
        # Reconstruct selected jobs
        selected = []
        idx = len(dp) - 1
        while idx > 0:
            action, prev_idx, job_idx = choices[idx]
            if action == 'take':
                selected.append(self.jobs[job_idx])
                idx = prev_idx
            else:
                idx = prev_idx
        
        return dp[-1], selected[::-1]

# Usage:
# scheduler = JobScheduler([1,2,3,3], [3,4,5,6], [50,10,40,70])
# print(scheduler.solve())  # 120 (jobs [1,3]→50 + [3,6]→70)

class MilitarySupplyScheduler:
    """
    Extended Job Scheduling for military logistics.

    Extensions beyond LeetCode #1235:
    1. Multiple vehicles (k resources, not 1)
    2. Precedence constraints (fuel before ammo)
    3. Capacity per vehicle (weight/volume limits)
    4. Geographic routing (depot → waypoints → destination)
    5. Uncertainty (mission windows may shift)
    """

    def __init__(self, missions, vehicles, precedence_graph):
        self.missions = missions  # [(start, end, priority, cargo)]
        self.vehicles = vehicles  # [(capacity, location, availability)]
        self.precedence = precedence_graph  # DAG of dependencies

    def solve(self):
        # Step 1: Topological sort for precedence (#207)
        order = self.get_valid_ordering()
        if order is None:
            return None  # Circular dependency = impossible

        # Step 2: For each vehicle, solve weighted job scheduling (#1235)
        # with the constraint that precedence is respected
        assignments = {}
        for vehicle in self.vehicles:
            eligible = self.get_eligible_missions(vehicle, order)
            schedule = self.weighted_interval_scheduling(eligible)
            assignments[vehicle.id] = schedule

        # Step 3: Check if all critical missions covered
        return self.validate_and_optimize(assignments)


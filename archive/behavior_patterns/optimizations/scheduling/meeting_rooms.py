"""
Minimum resource = maximum concurrent demand

Event-based approach
1. seperate start and ends
2. sort
3. sweep

starts = +1
ends = -1

max cumulative value = answer

'resource capacity planning' - provision for peak concurrent load
"""

# Time: O(n log n)
# Space: O(n)

def minMeetingRooms(intervals):
    starts = sorted(i[0] for i in intervals)
    ends = sorted(i[1] for i in intervals)
    rooms = max_rooms = 0
    s = e = 0

    while s < len(starts):
        # valid interval?
        if starts[s] < ends[e]:
            rooms += 1
            max_rooms = max(max_rooms, rooms)
        else:
            rooms -= 1
            e += 1

    return max_rooms


class MeetingRoomsII:
    def __init__(self, meetings: list):
        self.m = meetings

    def min_rooms_two_pointer(self) -> int:
        if not self.m:
            return 0

        starts = [i[0] for i in self.m]
        ends = [i[1] for i in self.m]

        in_use = max_rooms = 0
        s = e = 0
        n = len(self.m)

        while s < n:
            if starts[s] < ends[s]:
                in_use += 1
                max_rooms = max(max_rooms, in_use)
                s += 1
            else:
                in_use -= 1
                e += 1

        return max_rooms

    def solve(self) -> int:
        return self.min_rooms_two_pointer()

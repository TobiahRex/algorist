
# Problem 1 - 2 Sum In A Sorted Array
Given an array sorted in non-decreasing order and a target number, find the indices of the two values from the array that sum up to the given target number.

## Example
```
{
"numbers": [1, 2, 3, 5, 10],
"target": 7
}
```
Output:
```
[1, 3]
```
Sum of the elements at index 1 and 3 is 7.

## Notes
- In case when no answer exists, return an array of size two with both values equal to -1, i.e., [-1, -1].
- In case when multiple answers exist, you may return any of them.
- The order of the indices returned does not matter.
- A single index cannot be used twice.
## Constraints:
- 2 <= array size <= 105
- -105 <= array elements <= 105
- -105 <= target number <= 105
- Array can contain duplicate elements.

----
# Problem 2 -  2 Sum In An Array
Given an array and a target number, find the indices of the two values from the array that sum up to the given target number.

Example One
```
{
    "numbers": [5, 3, 10, 45, 1],
    "target": 6
}
```
Output:
```
[0, 4]
```
Sum of the elements at index 0 and 4 is 6.

Example Two
```
{
"numbers": [4, 1, 5, 0, -1],
"target": 10
}
```
Output:
```
[-1, -1]
```
## Notes
- The function returns an array of size two where the two elements specify the input array indices whose values sum up to the given target number.
- In case when no answer exists, return an array of size two with both values equal to -1, i.e., [-1, -1].
- In case when multiple answers exist, you may return any of them.
- The order of the returned indices does not matter.
- A single index cannot be used twice.
## Constraints:
- 2 <= array size <= 105
- -105 <= array elements <= 105
- -105 <= target number <= 105
- Array can contain duplicate elements.
----
# Problem 3 - Merge K Sorted Linked Lists
Given k linked lists where each one is sorted in the ascending order, merge all of them into a single sorted linked list.

Example
```
{
"lists": [
        [1, 3, 5],
        [3, 4],
        [7]
    ]
}
```
Output:
```
[1, 3, 3, 4, 5, 7]
```
## Constraints:
- 0 <= k <= 104
- 0 <= length of any given linked list <= 103
- -109 <= node values <= 109
- Sum of the lengths of all given lists won't exceed 105.
------
# Problem 4 - Attend Meetings
Given a list of meeting intervals where each interval consists of a start and an end time, check if a person can attend all the given meetings such that only one meeting can be attended at a time.

Example One
```
{
    "intervals": [
        [1, 5],
        [5, 8],
        [10, 15]
    ]
}
```
Output:
```
1
```
As the above intervals are non-overlapping intervals, it means a person can attend all these meetings.

Example Two
```
{
    "intervals": [
        [1, 5],
        [4, 8]
    ]
}
```
Output:
```
0
```
Time 4 - 5 is overlapping in the first and second intervals.

## Notes
- A new meeting can start at the same time the previous one ended.
## Constraints:
- 1 <= number of intervals <= 105
- 0 <= start time < end time <= 109
-----
# Problem 5 - Top K Frequent Elements
Given an integer array and a number k, find the k most frequent elements in the array.

Example One
```
{
    "arr": [1, 2, 3, 2, 4, 3, 1],
    "k": 2
}
```
Output:
```
[3, 1]
```
Example Two
```
{
    "arr": [1, 2, 1, 2, 3, 1],
    "k": 1
}
```
Output:
```
[1]
```
## Notes
- If multiple answers exist, return any.
- The order of numbers in the output array does not matter.
## Constraints:
- 1 <= length of the given array <= 3 * 105
- 0 <= array element <= 3 * 105
- 1 <= k <= number of unique elements in the array
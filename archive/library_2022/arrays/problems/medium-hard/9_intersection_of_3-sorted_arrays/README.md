# Intersection Of Three Sorted Arrays
Given three arrays sorted in the ascending order, return their intersection sorted array in the ascending order.

Example One
```
{
    "arr1": [2, 5, 10],
    "arr2": [2, 3, 4, 10],
    "arr3": [2, 4, 10]
}
```
Output:
```
[2, 10]
```
----
Example Two
```
{
    "arr1": [1, 2, 3],
    "arr2": [],
    "arr3": [2, 2]
}
```
Output:
```
[-1]
```
----
Example Three
```
{
    "arr1": [1, 2, 2, 2, 9],
    "arr2": [1, 1, 2, 2],
    "arr3": [1, 1, 1, 2, 2, 2]
}
```
Output:
```
[1, 2, 2]
```
## Notes
If the intersection is empty, return an array with one element -1.
## Constraints:
- 0 <= length of each given array <= 105
- 0 <= any value in a given array <= 2 * 106
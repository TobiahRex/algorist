# Kth Largest In A Stream
Given an initial list along with another list of numbers to be appended with the initial list and an integer k, return an array consisting of the k-th largest element after adding each element from the first list to the second list.

Example
```
{
"k": 2,
"initial_stream": [4, 6],
"append_stream": [5, 2, 20]
}
```
Output:
```
[5, 5, 6]
```
| Append | Stream            | Sorted Stream      | 2nd largest |
|--------|-------------------|--------------------|-------------|
| 5      | [4, 6, 5]         | [4, 5, 6]          | 5           |
| 2      | [4, 6, 5, 2]      | [2, 4, 5, 6]       | 5           |
| 20     | [4, 6, 5, 2, 20]  | [2, 4, 5, 6, 20]   | 6           |

##  Notes
The stream can contain duplicates.
## Constraints:
- 1 <= length of both lists <= 105
- 1 <= k <= length of initial list + 1
- 0 <= any value in the list <= 109
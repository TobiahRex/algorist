/**
 * 700. Search in a Binary Search Tree
 *
 * Given the root node of a binary search tree (BST) and a value.
 * You need to find the node in the BST that the node's value equals the given value.
 * Return the subtree rooted with that node. If such node doesn't exist, you should return NULL.
*/


(() => {
  console.time('answer');
  const answers = [
    {
      x: {
        root: {
          data: 4,
          left: {
            data: 2,
            left: {
              data: 1,
              left: null,
              right: null,
            },
            right: {
              data: 3,
              left: null,
              right: null,
            },
          },
          right: {
            data: 7,
            left: null,
            right: null,
          }
        },
        target: 2,
      },
    }
  ].map(getAnswer);
  console.timeEnd('answer');
  console.log('answers: ', answers.join('\n'));
})();

/**
 * @function findBSTValue
 * Given a target num, locate it in a BST. If the current node value is less than the target, move left.
 * If the current node value is greater than the target, move right.
 * Else return with current node as they are equal.
 * @param
 * @return
 */
function findBSTValue({ x: { root, target } }) {
  let p = root;
  while (p) {
    if (p.data < target) p = p.right;
    if (p.data > target) p = p.left;
    if (p.data === target) break;
  }

  return p ? p : null;
}

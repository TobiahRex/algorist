/**
 * 897. Increasing Order Search Tree
 * Given a binary search tree, rearrange the tree in in-order
 * so that the leftmost node in the tree
 * is now the root of the tree
 * and every node, has no left child and only 1 right child.
*/


(() => {
  console.time('answer');
  const answers = [
    { root: [5, 3, 6, 2, 4, null, 8, 1, null, null, null, 7, 9]},
    { root: [1, null, 2, null, 3, null, 4, null, 5, null, 6, null, 7, null, 8, null, 9] },
  ].map(getAnswer);
  console.timeEnd('answer');
  console.log('answers: ', answers.join('\n'));
})();

function getAnswer({ root }) {
  // TODO
  return -1;
}

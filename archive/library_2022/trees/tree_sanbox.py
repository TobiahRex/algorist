from binary_tree import BST

def is_bst(root):
    if not root:
        return True
    stack = []
    prev = None
    _max = float('-inf')
    _min = float('inf')
    while root or stack:
        if root:
            stack.append(root)
            root = root.left
        else:
            root = stack[-1]
            if root.right is None or root.right is prev:
                node = stack.pop()
                fail_cdxns = [
                    node.left and node.value < node.left.value,
                    node.right and node.value > node.right.value,
                ]
                is_parent = node.left or node.right
                if is_parent:
                    if node.left:
                        _min = min(_min, node.value, node.left.value)
                        fail_cdxns.append(node.value < _min)
                    if node.right:
                        _max = max(_max, node.value, node.right.value)
                        fail_cdxns.append(node.value > _max)
                if any(fail_cdxns):
                    return False
                prev = root
                root = None
            else:
                root = root.right
    return True


def valid_bst(root):
    """Use In-Order Traversal with a "prev" pointer, verifying that every node
    to the right of the pointer is larger than the previous node value.

    Args:
        root (TreeNode): A BST root node

    Returns:
        bool: If the tree is valid or not
    """
    if not root:
        return True
    prev = None
    stack = []
    while True:
        if root is not None:
            stack.append(root)
            root = root.left
        elif stack:
            root = stack.pop()
            if prev and root.value < prev.value:
                return False
            prev = root
            root = root.right
        else:
            break
    return True


def height_of_binary_tree(root):
    """Use Pre-Order traversal (only because it's easiest to write), and as we append
    to the stack, we save the current depth. As we pop from the stack, we'll have
    the depth for that node. We'll add to that count if we're not a leaf.

    Args:
        root (TreeNode): Root of a BST

    Returns:
        int: Max Depth of a tree
    """
    max_depth = 0
    if not root:
        return max_depth
    stack = [(root, 1)]
    while stack:
        node, depth = stack.pop()
        if node.left is None and node.right is None:
            max_depth = max(max_depth, depth)
            continue
        [stack.append((n, depth + 1))
         for n in [node.right, node.left]
         if n]
    return max_depth


def check_if_symmetric(root):
    def in_order(root):
        results = []
        if not root:
            return results
        stack = [root]
        while stack:
            node = stack.pop()
            results.append(node.value)
            [stack.append(n) for n in [node.right, node.left] if n]
        return results

    left_io = in_order(root.left)
    right_io = in_order(root.right)
    i, j = 0, len(right_io) - 1
    while i < len(left_io) and j > -1:
        if left_io[i] != right_io[j]:
            return False
        i += 1
        j -= 1
    symmetric = i == len(left_io) and j == -1
    return symmetric


def find_single_value_trees(root, node=None, count={'value': 0}):
    if not root:
        return 0
    if node is None:
        node = root
    if node.left is None and node.right is None:
        count['value'] += 1
        return count.get('value')
    checks = []
    if node.left:
        checks.append(node.value == node.left.value)
        checks.append(find_single_value_trees(root, node.left, count))
    if node.right:
        checks.append(node.value == node.right.value)
        checks.append(find_single_value_trees(root, node.right, count))
    if len(checks) == 4:
        checks.append(node.left.value == node.right.value)
    if checks and all(checks):
        count['value'] += 1
        return count.get('value')
    if node is root:
        return count.get('value')
    return 0


def ITERATIVE_find_single_value_trees(root):
    if not root:
        return 0
    count = {'total': 0}
    stack = []
    results = []
    prev = None
    while root or stack:
        if root:
            stack.append(root)
            root = root.left
        else:
            root = stack[-1]
            if root.right is None or root.right is prev:
                root = stack.pop()
                results = do_work(root, results, count)
                prev = root
                root = None
            else:
                root = root.right
    return count.get('total')


def do_work(root, results, count):
    if root.right is None and root.left is None:
        count['total'] += 1
        results.append((root, True))
    else:
        children_finished, children_results = check_children(root, results)
        if children_finished:
            if all(children_results):
                count['total'] += 1
                return replace_children(root, results, True)
            else:
                return replace_children(root, results, False)
    return results


def check_children(root, results):
    root_children = [rc for rc in [root.right, root.left] if rc]
    children_results, found_children = [], []
    for child, result in results:
        if child in root_children:
            children_results += [result, root.value == child.value]
            found_children.append(child)
    return (
        len(root_children) == len(found_children),
        children_results)


def replace_children(root, results, new_result):
    root_children = [rc for rc in [root.right, root.left] if rc]
    new_results = [result for result in results if result[0]
                   not in root_children]
    new_results.append((root, new_result))
    return new_results


def REFERENCE_countUniValueSubtrees(root):
    """I did not write this solution

    Args:
        root (_type_): _description_

    Returns:
        _type_: _description_
    """
    res = []
    s = [root]
    head = root
    while s:
        node = s[-1]
        # If it's (leaf node) or (traversaled left node) or (traversaled right node)
        if (not node.left and not node.right) or (node.left == head) or (node.right == head):
            # If it's leaf node
            if not node.left and not node.right:
                res.append(node)
            # If left node is NULL and right node is "univalue subtree" and node.value is equal to right node value
            elif all([
                not node.left,
                node.right in res,
                node.val == node.right.val
            ]):
                res.append(node)
            # The same concept is used on right node
            elif all([
                not node.right,
                node.left in res,
                node.val == node.left.val
            ]):
                res.append(node)
            # The nodes in the middle path need to compare its left and right node value to root.value to decide whether it is univalue subtree.
            elif all([
                node.left and node.right,
                node.left in res,
                node.right in res,
                node.val == node.right.val,
                node.val == node.right.val
            ]):
                res.append(node)
                head = s.pop()
        else:
            if node.left:
                s.append(node.left)
            if node.right:
                s.append(node.right)
        return len(res)


if __name__ == '__main__':
    bst = BST.build([
        5,
        5, 5,
        5, 5, 4, 5], sorted=True)
    bst.root.level_order_traversal()
    print('Univalue: ', ITERATIVE_find_single_value_trees(bst.root))

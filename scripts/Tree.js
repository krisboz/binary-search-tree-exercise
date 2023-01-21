class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }
  //this.buildTree(sortedArray);

  sortArray(array) {
    return [...new Set(array)].sort((a, b) => a - b);
  }

  //Removed to another function not to call the sortArray on every call
  buildTree(array) {
    const sortedArray = this.sortArray(array);
    return this.returnTree(sortedArray);
  }

  returnTree(array) {
    if (array.length === 0) return null;
    const mid = Math.floor(array.length / 2);

    let newNode = new Node(array[mid]);

    newNode.left = this.buildTree(array.slice(0, mid));
    newNode.right = this.buildTree(array.slice(mid + 1));

    return newNode;
  }

  insert(data) {
    const newNode = new Node(data);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(newNode, this.root);
    }
  }

  insertNode(node, root) {
    if (node.data > root.data) {
      if (root.right === null) {
        root.right = node;
      } else {
        this.insertNode(node, root.right);
      }
    } else if (node.data < root.data) {
      if (root.left === null) {
        root.left = node;
      } else {
        this.insertNode(node, root.left);
      }
    }
  }

  delete(data) {
    this.root = this.deleteNode(data, this.root);
  }

  deleteNode(data, node) {
    if (node === null) return null;
    else if (data > node.data) {
      //Data to be deleted is bigger than the root data
      node.right = this.deleteNode(data, node.right);
      return node;
    } else if (data < node.data) {
      //Data to be deleted is smaller than the root data
      node.left = this.deleteNode(data, node.left);
      return node;
    } else {
      //Input is the same as the root value which means we want to delete this one
      //If it's a leaf
      if (node.right === null && node.left === null) {
        node = null;
        return node;
      }
      //If it has one child
      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }
      //if it has two children
      const aux = this.findMinNode(node.right);
      node.data = aux.data;
      node.right = this.deleteNode(aux.data, node.right);
      return node;
    }
  }

  //  finds the minimum node in tree
  // searching starts from given node
  findMinNode(node) {
    // if left of a node is null
    // then it must be minimum node
    if (node.left === null) return node;
    else return this.findMinNode(node.left);
  }

  find(data, root) {
    if (root === null) {
      return null;
    }
    if (data === root.data) {
      return root;
    } else if (data > root.data) {
      return this.find(data, root.right);
    } else if (data < root.data) {
      return this.find(data, root.left);
    }
  }

  levelOrder(callback) {
    //Would probably be better to use another data
    //structure as the queue
    let result = [];
    let queue = [this.root];
    while (queue.length > 0) {
      //Remove the first element from the queue
      const node = queue.shift();
      result.push(node);
      //check if node has left or right children
      //add them to the end of the queue

      if (node.left !== null) {
        queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
      }
    }
    if (callback) {
      result.forEach((element) => {
        return callback(element);
      });
    } else {
      console.log(result.map((el) => el.data));
    }
  }

  inorder(node, result = []) {
    //Result should be
    //1,3,4,5,7,8,9,23,67,6345
    //From smallest to biggest

    if (node == null) return;

    if (node) {
      this.inorder(node.left, result);
      result.push(node);
      this.inorder(node.right, result);
    }
    return result;
  }

  preorder(node, result = []) {
    //result should be
    //8, 4, 3, 1, 7, 5, 67, 23, 9, 6345

    if (node === null) return;

    if (node) {
      result.push(node);
      this.preorder(node.left, result);
      this.preorder(node.right, result);
    }
    return result;
  }

  postorder(node, result = []) {
    //result should be

    //1,3,5,7,4,9,23,6345,67,8
    if (node === null) return;

    if (node) {
      this.postorder(node.left, result);
      this.postorder(node.right, result);
      result.push(node);
    }
    return result;
  }

  height(node = this.root) {
    if (node === null) return -1;

    let lefth = this.height(node.left);
    let righth = this.height(node.right);

    if (lefth > righth) {
      return lefth + 1;
    } else {
      return righth + 1;
    }
  }

  depth(node, root = this.root, depth = 0) {
    if (root === null) return -1;

    if (node === root.data) {
      return depth;
    }
    if (node < root.data) {
      return this.depth(node, root.left, (depth += 1));
    } else if (node > root.data) {
      return this.depth(node, root.right, (depth += 1));
    }
  }

  isBalanced(root = this.root) {
    let left = this.height(root.left);
    let right = this.height(root.right);

    //Compare the height of the two branches
    if (Math.abs(left - right) <= 1) {
      return true;
    } else return false;
  }

  rebalance(root = this.root) {
    //Data mapped from the inorder array for this.buildTree
    let inorder = this.inorder(root).map((el) => el.data);
    console.log(inorder);
    this.root = this.buildTree(inorder);
  }
}

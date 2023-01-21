requirejs.config({
  paths: {
    app: "../index",
  },
});

// Start the main app logic.
requirejs(["Node", "Tree"], function () {
  let exampleArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345];

  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  const testFunc = (node) => {
    console.log(node.data);
  };

  const binarySearchTree = new Tree(exampleArray);
  console.log(binarySearchTree.root);
  //console.log(binarySearchTree.find(1, binarySearchTree.root));

  prettyPrint(binarySearchTree.root);
  //InOrder works but just console.logs
  binarySearchTree.insert(500);
  binarySearchTree.insert(900);
  binarySearchTree.insert(1300);
  binarySearchTree.insert(1200);
  prettyPrint(binarySearchTree.root);

  console.log(binarySearchTree.isBalanced());
  binarySearchTree.rebalance();
  console.log(binarySearchTree.isBalanced());

  prettyPrint(binarySearchTree.root);
});

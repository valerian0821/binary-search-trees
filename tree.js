class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    if (array.length === 0) {
      return null;
    }
    if (array.length === 1) {
      const rootNode = new Node(array[0]);
      return rootNode;
    } else {
      const middle = Math.ceil(array.length / 2);
      const rootNode = new Node(array[middle - 1]);
      const leftArr = array.slice(0, middle - 1);
      const rightArr = array.slice(middle);
      if (leftArr.length > 0) {
        const leftChild = this.buildTree(leftArr);
        rootNode.left = leftChild;
      }
      if (rightArr.length > 0) {
        const rightChild = this.buildTree(rightArr);
        rootNode.right = rightChild;
      }
      return rootNode;
    }   
  }

  insert(value) {
    if (!Number.isFinite(value)) {
      return;
    }
    if (this.root === null) {
      this.root = new Node(value);
    }
    let currentNode = this.root;
    let parentNode;
    let directionWent;
    while (currentNode) {
      if (value === currentNode.data) {
        return;
      }
      parentNode = currentNode; 
      if (value < currentNode.data) {
        currentNode = currentNode.left;
        directionWent = "left";
      } else {
        currentNode = currentNode.right;
        directionWent = "right";
      }
    }
    let newNode = new Node(value);
    if (directionWent === "left") {
      parentNode.left = newNode;
    } else {
      parentNode.right = newNode;
    }
  }

  deleteItem(value) {
    if (!Number.isFinite(value) || this.root === null) {
      return;
    }
    let currentNode = this.root;
    let parentNode;
    let directionWent;
    while (currentNode) {
      if (value === currentNode.data) {

        //Delete leaf node
        if (!currentNode.left && !currentNode.right) {
          if (currentNode === this.root) {
            this.root = null;
          } else {
            if (directionWent === "left") {
              parentNode.left = null;
            } else {
              parentNode.right = null;
            }
          }
          return;
        }

        //Delete node with two children
        else if (currentNode.left && currentNode.right) {
          let successorParent = currentNode;
          let successor = currentNode.right;
          while (successor.left) {
            successorParent = successor;
            successor = successor.left;
          }
          currentNode.data = successor.data;
          if (successorParent.left === successor) {
            successorParent.left = successor.right;
          } else {
            successorParent.right = successor.right;
          }
          return;
        }

        //Delete node with one children
        else {
          const childNode = currentNode.left || currentNode.right;
          if (directionWent === "left") {
            parentNode.left = childNode;
          } else {
            parentNode.right = childNode;
          }
          return;
        }
      }

      //Traverse down to next node
      parentNode = currentNode; 
      if (value < currentNode.data) {
        currentNode = currentNode.left;
        directionWent = "left";
      } else {
        currentNode = currentNode.right;
        directionWent = "right";
      }
    }
  }

  find(value) {
    if (!Number.isFinite(value) || this.root === null) {
      return null;
    }
    let currentNode = this.root;
    while (currentNode) {
      if (value === currentNode.data) {
        return currentNode;
      } else if (value < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return null;
  }

  levelOrderIter(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback is required.");
    }
    if (this.root === null) {
      return;
    }
    const queue = [this.root];
    while (queue.length > 0) {
      const currentNode = queue.shift();
      callback(currentNode);
      if (currentNode.left) {
        queue.push(currentNode.left);
      }
      if (currentNode.right) {
        queue.push(currentNode.right);
      }
    }
  }

  levelOrderRec(callback, queue) {
    if (!queue) {
      if (typeof callback !== "function") {
        throw new Error("A callback is required.");
      }
      if (this.root === null) {
        return;
      }
      queue = [this.root];
    }
    if (queue.length === 0) {
      return;
    }
    const currentNode = queue.shift();
    callback(currentNode);
    if (currentNode.left) {
      queue.push(currentNode.left);
      }
    if (currentNode.right) {
      queue.push(currentNode.right);
    }
    this.levelOrderRec(callback, queue);
  }

  inOrder(callback, currentNode = this.root) {
    if (typeof callback !== "function") {
      throw new Error("The callback must be a function.");
    }
    if (currentNode === null) {
      return;
    }
    this.inOrder(callback, currentNode.left);
    callback(currentNode);
    this.inOrder(callback, currentNode.right);
  }

  preOrder(callback, currentNode = this.root) {
    if (typeof callback !== "function") {
      throw new Error("The callback must be a function.");
    }
    if (currentNode === null) {
      return;
    }
    callback(currentNode);
    this.preOrder(callback, currentNode.left);
    this.preOrder(callback, currentNode.right);
  }

  postOrder(callback, currentNode = this.root) {
    if (typeof callback !== "function") {
      throw new Error("The callback must be a function.");
    }
    if (currentNode === null) {
      return;
    }
    this.postOrder(callback, currentNode.left);
    this.postOrder(callback, currentNode.right);
    callback(currentNode);
  }

  height(value) {
    let node = this.find(value);
    if (node === null) {
      return -1;
    }
    const queue = [node];
    let height = 0;
    let levelSize = 1;
    while (queue.length > 0) {
      const currentNode = queue.shift();
      levelSize--;
      if (currentNode.left) {
        queue.push(currentNode.left);
      }
      if (currentNode.right) {
        queue.push(currentNode.right);
      }
      if (levelSize === 0) {
        levelSize = queue.length;
        if (queue.length > 0) {
          height++;
        }
      }
    }
    return height;
  }

  depth(value) {
    if (!Number.isFinite(value) || this.root === null) {
      return null;
    }
    const queue = [this.root];
    let depth = 0;
    let levelSize = 1;
    while (queue.length > 0) {
      const currentNode = queue.shift();
      if (value === currentNode.data) {
        return depth;
      }
      levelSize--;
      if (currentNode.left) {
        queue.push(currentNode.left);
      }
      if (currentNode.right) {
        queue.push(currentNode.right);
      }
      if (levelSize === 0) {
        levelSize = queue.length;
        if (queue.length > 0) {
          depth++;
        }
      }
    }
    return null;
  }

  isBalancedRough(currentNode = this.root) {
    if (this.root === null) {
      return true;
    }
    if (currentNode === null) {
      return true;
    }
    const leftSubBalance = this.isBalanced(currentNode.left);
    const rightSubBalance = this.isBalanced(currentNode.right);
    let leftSubHeight;
    let rightSubHeight;
    if (currentNode.left === null) {
      leftSubHeight = -1;
    } else {
      leftSubHeight = this.height(currentNode.left.data)
    }
    if (currentNode.right === null) {
      rightSubHeight = -1;
    } else {
      rightSubHeight = this.height(currentNode.right.data)
    }
    const balance = Math.abs(leftSubHeight - rightSubHeight) <= 1;
    return (leftSubBalance && rightSubBalance && balance);
  }

  isBalanced() {
    const check = (currentNode) => {
      if (currentNode === null) {
        return { balanced: true, height: -1 };
      } 

      const leftSubTree = check(currentNode.left);
      const rightSubTree = check(currentNode.right);

      const balanced =
        leftSubTree.balanced &&
        rightSubTree.balanced &&
        Math.abs(leftSubTree.height - rightSubTree.height) <= 1;

      const height = 1 + Math.max(leftSubTree.height, rightSubTree.height);

      return { balanced, height };
    }
    return check(this.root).balanced;
  }

  rebalance() {
    const newArr = [];
    const convertTreetoArr = (node) => {
      newArr.push(node.data);
    }
    this.levelOrderIter(convertTreetoArr);
    this.root = this.buildTree(sortAndUniqueFinite(newArr));
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const sortAndUniqueFinite = (arr) => {
  // Filter finite numbers, remove duplicates, then sort numerically
  return [...new Set(arr.filter(Number.isFinite))].sort((a, b) => a - b);
}

const createRandomArrLessThan100 = () => {
  const randomArray = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100));
  return randomArray;
}

const createRandomArrBiggerThan100 = () => {
  const randomArray = Array.from({ length: 5 }, () => Math.floor(Math.random() * 100) + 101);
  return randomArray;
}

const runTestScript = () => {
  const arr = createRandomArrLessThan100();
  let tree = new Tree(sortAndUniqueFinite(arr));
  console.log(`Balanced: ${tree.isBalanced()}`);
  prettyPrint(tree.root);

  const levelOrderArr = [];
  tree.levelOrderIter(node => {
    levelOrderArr.push(node.data);
  });
  console.log(`LevelOrder: ${levelOrderArr}`);

  const inOrderArr = [];
  tree.inOrder(node => {
    inOrderArr.push(node.data);
  });
  console.log(`InOrder: ${inOrderArr}`);

  const preOrderArr = [];
  tree.preOrder(node => {
    preOrderArr.push(node.data);
  });
  console.log(`PreOrder: ${preOrderArr}`);

  const postOrderArr = [];
  tree.postOrder(node => {
    postOrderArr.push(node.data);
  });
  console.log(`PostOrder: ${postOrderArr}`);

  const insertArr = createRandomArrBiggerThan100();
  for (let i = 0; i < insertArr.length; i++) {
    tree.insert(insertArr[i]);
  }
  console.log(`Balanced: ${tree.isBalanced()}`);
  prettyPrint(tree.root);
  tree.rebalance();
  console.log("Tree has been rebelanced.");
  console.log(`Balanced: ${tree.isBalanced()}`);
  prettyPrint(tree.root);

  levelOrderArr.length = 0;
  tree.levelOrderIter(node => {
    levelOrderArr.push(node.data);
  });
  console.log(`LevelOrder: ${levelOrderArr}`);

  inOrderArr.length = 0;
  tree.inOrder(node => {
    inOrderArr.push(node.data);
  });
  console.log(`InOrder: ${inOrderArr}`);

  preOrderArr.length = 0;
  tree.preOrder(node => {
    preOrderArr.push(node.data);
  });
  console.log(`PreOrder: ${preOrderArr}`);

  postOrderArr.length = 0;
  tree.postOrder(node => {
    postOrderArr.push(node.data);
  });
  console.log(`PostOrder: ${postOrderArr}`);
}

runTestScript();

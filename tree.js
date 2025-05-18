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
    let currentNode = this.root;
    let parentNode;
    let direction;
    while (currentNode) {
      if (value === currentNode.data) {
        return;
      }
      parentNode = currentNode; 
      if (value < currentNode.data) {
        direction = "left";
        currentNode = currentNode.left;
      } else {
        direction = "right";
        currentNode = currentNode.right;
      }
    }
    let newNode = new Node(value);
    if (direction === "left") {
      parentNode.left = newNode;
    } else {
      parentNode.right = newNode;
    }
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

// const cleanArr = array.sort((a, b) => a - b).filter((value, index, self) => self.indexOf(value) === index);
let tree = new Tree([1, 2, 3, 4, 5, 6, 7]);
prettyPrint(tree.root);
console.dir(tree, { depth: null, colors: true });
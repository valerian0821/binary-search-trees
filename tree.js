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
console.log(tree.find("daksjda"));

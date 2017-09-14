var {Node} = require('./Node');

function BST() {
  this.root = null;
  this.insert = insert;
  this.getMin = getMin;
  this.getMax = getMax;
  this.find = find;
}

function insert(data) {
  var n = new Node(data, null, null);

  if (this.root == null) {
    this.root = n;
  } else {
    var current = this.root;
    var parent;
    while (true) {
      parent = current;
      if (data < current.data) {
        current = current.left;
        if (current == null) {
          parent.left = n;
          break;
        }
      } else {
        current = current.right;
        if (current == null) {
          parent.right = n;
          break;
        }
      }
    }
  }
}

function getMin() {
  var current = this.root;
  while (!(current.left == null)) {
    current = current.left;
  }
  return current.data;
}

function getMax() {
  var current = this.root;
  while (!(current.right == null)) {
    current = current.right;
  }
  return current.data;
}

function find(data) {
  var current = this.root;
  while (current.data != data) {
    if (data < current.data) {
      current = current.left;
    } else {
      current = current.right;
    }
    if (current == null) {
      return null;
    }
  }
  return current;
}

module.exports.BST = BST;

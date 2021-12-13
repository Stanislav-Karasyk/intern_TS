// =============Tsak 1
interface INode {
  valueFn: () => number ;
}
class NodeRoot {
    value: INode | null;
    right: NodeRoot | null;
    left: NodeRoot | null;

    constructor() {
      this.value = null;
      this.left = null;
      this.right = null;
    }
  
    insert(value: INode, node?: NodeRoot): void {
      node = node || this;
  
      if (node.value === null) {
        node.value = value;
      }
  
      if (value.valueFn() > node.value.valueFn()) {
        if (node.right === null) {
          node.right = new NodeRoot();
        }
  
        return this.insert(value, node.right);
      }
  
      if (value.valueFn() < node.value.valueFn()) {
        if (node.left === null) {
          node.left = new NodeRoot();
        }
  
        return  this.insert(value, node.left);
      }
    }
  
    search(value: INode, node?: NodeRoot): NodeRoot {
      node = node || this;
  
      if (value.valueFn() === node.value.valueFn()) {
        return node;
      }
  
      if (value.valueFn() > node.value.valueFn()) {
        if (node.right === null) {
          return null;
        }

        this.search(value, node.right);
      }
  
      if (value.valueFn() < node.value.valueFn()) {
        if (node.left === null) {
          return null;
        }
  
        this.search(value, node.left);
      }
    }
  
    searchMinValue(node: NodeRoot): NodeRoot {
      node = node || this;
  
      if (node.left === null) {
        return node;
      }
  
      return this.searchMinValue(node.left);
    }
  
    delete(value: INode, node?: NodeRoot): NodeRoot {
      node = node || this;
  
      if (node === null) {
        return null;
      } else if (value.valueFn() < node.value.valueFn()) {
        node.left = this.delete(value, node.left);
  
        return node;
      } else if (value.valueFn() > node.value.valueFn()) {
        node.right = this.delete(value, node.right);
  
        return node;
      } else {
        if (node.left === null && node.right === null) {
          node = null;
  
          return node;
        }
  
        if (node.left === null) {
          node = node.right;
  
          return node;
        } else if (node.right === null) {
          node = node.left;
  
          return node;
        }
  
        let newNode: NodeRoot = this.searchMinValue(node.right);
        node.value = newNode.value;
        node.right = this.delete(newNode.value, node.right);
  
        return node;
      }
    }
  }

interface Array<T> {
    mySortBubble<T>(callback: Function): T[];
}

Array.prototype.mySortBubble = function <T>(callback: Function): T[] {
  for (let i: number = 0; i < this.length; i++) {
    for (let j: number = 0; j < this.length; j++) {
      if (callback(this[j], this[j + 1])) {
        let temp: any = this[j];
        this[j] = this[j + 1];
        this[j + 1] = temp;
      }
    }
  }
  return this;
};

interface Array<T> {
    mySortSelection<T>(callback: Function): T[];
}

Array.prototype.mySortSelection = function <T>(callback: Function): T[] {
  for (let i: number = 0; i < this.length; i++) {
    let minIndex: number = i;

    for (let j: number = i; j < this.length; j++) {
      if (callback(this[j], this[minIndex])) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      let temp: any = this[i];
      this[i] = this[minIndex];
      this[minIndex] = temp;
    }
  }

  return this;
};

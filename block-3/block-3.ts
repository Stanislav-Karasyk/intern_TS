// =============Tsak 1
interface INode {
  value: number | null;
  left: INode | null;
  right: INode | null;

  insert(value: number, node?: INode): void;
  search(value: number, node?: INode): INode;
  searchMinValue(node: INode): INode;
  delete(value: number, node?: INode): INode;
}

class NodeRoot implements INode {
    value: number | null;
    right: INode | null;
    left: INode | null;

    constructor() {
      this.value = null;
      this.left = null;
      this.right = null;
    }
  
    insert(value: number, node?: INode) {
      node = node || this;
  
      if (node.value === null) {
        node.value = value;
      }
  
      if (value > node.value) {
        if (node.right === null) {
          node.right = new NodeRoot();
        }
  
        return this.insert(value, node.right);
      }
  
      if (value < node.value) {
        if (node.left === null) {
          node.left = new NodeRoot();
        }
  
        return  this.insert(value, node.left);
      }
    }
  
    search(value: number, node?: INode) {
      node = node || this;
  
      if (value === node.value) {
        return node;
      }
  
      if (value > node.value) {
        if (node.right === null) {
          return null;
        }

        this.search(value, node.right);
      }
  
      if (value < node.value) {
        if (node.left === null) {
          return null;
        }
  
        this.search(value, node.left);
      }
    }
  
    searchMinValue(node: INode) {
      node = node || this;
  
      if (node.left === null) {
        return node;
      }
  
      return this.searchMinValue(node.left);
    }
  
    delete(value: number, node?: INode) {
      node = node || this;
  
      if (node === null) {
        return null;
      } else if (value < node.value) {
        node.left = this.delete(value, node.left);
  
        return node;
      } else if (value > node.value) {
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
  
        let newNode: INode = this.searchMinValue(node.right);
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

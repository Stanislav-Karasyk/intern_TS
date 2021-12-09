interface IBindRes {
  [key: symbol]: Function;
}

type bindedFunction = <A>(...args: A[]) => IBindRes;

interface Function {
  myBind<T, U>(context: T, ...args: U[]): bindedFunction;
}

Function.prototype.myBind = function <T, U>(context: T, ...args: U[]): bindedFunction {
  const fn: Function = this;
  
  return function <A>(...args2: A[]): IBindRes {
    const id: symbol = Symbol();
  
    context[id] = fn;
  
    const res: IBindRes = context[id](...args, ...args2);
  
    delete context[id];
  
    return res;
  };
};

interface ICallRes {
    [key: symbol]: Function;
  }
  
  type calledFunction = <A>(...args: A[]) => ICallRes;
  
  interface Function {
    myCall<T, U>(context: T, ...args: U[]): calledFunction;
  }
  
Function.prototype.myCall = function <T, U>(context: T, ...args: U[]): calledFunction {
    const fn: Function = this;
    
    return (function <A>(...args2: A[]): calledFunction {
      const id: symbol = Symbol();
    
      context[id] = fn;
    
      const res: calledFunction = context[id](...args, ...args2);
    
      delete context[id];
    
      return res;
    })();
  };

const testArr = [1, 2, 3, 4, 5];

interface Array<T> {
  myForEach(callback: Function): void;
}

Array.prototype.myForEach = function (callback: Function): void {
    let arr: any[] = this;
  
    for (let index: number = 0; index < arr.length; index++) {
      callback(arr[index], index, arr);
    }
  };

interface Array<T> {
  myMap<T>(callback: Function): T[];
}
Array.prototype.myMap = function <T>(callback: Function): T[] {
  let arr: any[] = this;
  let resArr: any[] = [];
  
  for (let index: number = 0; index < arr.length; index++) {
    resArr.push(callback(arr[index], index, arr));
  }
  return resArr;
  };
  
interface Array<T> {
  myFilter<T>(callback: Function): T[];
}

Array.prototype.myFilter = function <T>(callback: Function): T[] {
  let arr: any[] = this;
  let resArr: any[] = [];

  for (let index: number = 0; index < arr.length; index++) {
    if (callback(arr[index], index, arr)) {
      resArr.push(arr[index]);
    }

    // return resArr;
  }

  return resArr;
};

interface Array<T> {
  myReduce<T>(callback: Function, initialValue?: T): T;
}

Array.prototype.myReduce = function <T>(callback: Function, initialValue?: T): T {
  let arr: any[] = this;
  let accumulator: any = initialValue ?? arr[0];

  let previousValue: any = accumulator === initialValue ? arr[0] : arr[1];

  for (let index: number = 0; index < arr.length; index++) {
    accumulator = callback(accumulator, previousValue, index, arr);

    previousValue = arr[index + 1];
  }

  return accumulator;
};

// =================== use iterator
interface INext {
  [key: number]: number
}

interface IIterableObj {
  firstNum: number,
  secondNum: number,
  nextNum: number,
  numIterations: number,

  [Symbol.iterator](): IIterableObj;

  next(): INext;
}

let iterableObj: IIterableObj = {
  firstNum: 0,
  secondNum: 1,
  nextNum: 0,
  numIterations: 10,

  [Symbol.iterator]() {
    return this;
  },

  next() {
    this.numIterations--;

    if (this.numIterations >= 0) {
      this.nextNum = this.firstNum + this.secondNum;
      this.firstNum = this.secondNum;
      this.secondNum = this.nextNum;

      return { value: this.firstNum, done: false };
    }

    return { done: true };
  },
};

// =================== use generator
interface IIterableObj2 {
  firstNum: number,
  secondNum: number,
  nextNum: number,
  numIterations: number,

  [Symbol.iterator](): Generator;
}

let iterableObj2: IIterableObj2 = {
  firstNum: 0,
  secondNum: 1,
  nextNum: 0,
  numIterations: 10,

  *[Symbol.iterator]() {
    for (let i: number = 0; i < this.numIterations; i++) {
      yield this.nextNum;

      this.nextNum = this.firstNum + this.secondNum;
      this.firstNum = this.secondNum;
      this.secondNum = this.nextNum;
    }
  },
};

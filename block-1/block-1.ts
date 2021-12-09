// ============Task 1
function isAnagram(word1: string, word2: string): boolean {
    if (word1.length !== word2.length) {
      return false;
    }
  
    for (let i: number = 0; i < word1.length; i++) {
      let letter1: string = word1[i];
      let counter1: number = 0;
      let counter2: number = 0;
  
      for (let j: number = 0; j < word1.length; j++) {
        let letter2: string = word1[j];
  
        if (letter1 === letter2) {
          counter1++;
        }
  
        letter2 = word2[j];
  
        if (letter1 === letter2) {
          counter2++;
        }
      }
  
      if (counter1 !== counter2) {
        return false;
      }
    }
  
    return true;
  }

  // =============Tsak 3
  interface IRes {
      [key: number]: number
  }

  function counterDigits(number: number): IRes {
    const numAsStr: string = number.toString();
    const res: IRes = {};
  
    for (let i: number = 0; i < numAsStr.length; i++) {
      res[numAsStr[i]] = 0;
    }
  
    for (let j: number = 0; j < numAsStr.length; j++) {
      res[numAsStr[j]]++;
    }
  
    return res;
  }
  
  // =============Tsak 4
  function uniqueWordCount(sentence: string): number {
    const sentenceAsArr: string[] = sentence.split(" ");
    let counter: number = 0;
  
    for (let i: number = 0; i < sentenceAsArr.length; i++) {
      if (checking(sentenceAsArr[i], sentenceAsArr)) {
        counter++;
      }
    }
  
    function checking(item: string, arrOfItems: string[]): boolean {
      let counter2: number = 0;
      for (let i: number = 0; i < arrOfItems.length; i++) {
        if (item === arrOfItems[i]) {
          if (++counter2 > 1) {
            return false;
          }
        }
      }
  
      return true;
    }
  
    return counter;
  }
  
  // =============Tsak 5
  interface IRes {
    [key: string]: number
}

  function counterWordsInSentence(sentence: string): IRes {
    const sentenceAsArr: string[] = sentence.toLowerCase().split(" ");
    let res: IRes = {};
  
    for (let i: number = 0; i < sentenceAsArr.length; i++) {
      res[sentenceAsArr[i]] = 0;
    }
  
    for (let j: number = 0; j < sentenceAsArr.length; j++) {
      res[sentenceAsArr[j]]++;
    }
  
    return res;
  }

  // =============Tsak 6
function fibonacci(num: number): number[] {
    const result: number[] = [0, 1];
  
    for (let i: number = 0; i < num; i++) {
      let sum: number = result[i] + result[i + 1];
      result.push(sum);
    }
  
    return result.slice(0, -2);
  }
  
  // =============Tsak 7
  class Rectangle {
    sideA: number;
    sideB: number;

  constructor(sideA: number, sideB: number) {
    this.sideA = sideA;
    this.sideB = sideB;
  }

  perimeter(): number {
    return (this.sideA + this.sideB) * 2;
  }

  area(): number {
    return this.sideA * this.sideB;
  }
}
class Triangle {
  sideA: number;
  sideB: number; 
  sideC: number;

  constructor(sideA: number, sideB: number, sideC: number) {
    this.sideA = sideA;
    this.sideB = sideB;
    this.sideC = sideC;
  }

  perimeter(): number {
    return this.sideA + this.sideB + this.sideC;
  }

  area(): number {
    const semiPerimeter: number = this.perimeter() / 2;

    return Math.sqrt(
      semiPerimeter *
          ((semiPerimeter - this.sideA) *
              (semiPerimeter - this.sideB) *
              (semiPerimeter - this.sideC)),
  );
  }
}
class Circle {
  radius: number;

  constructor(radius: number) {
    this.radius = radius;
  }

  perimeter(): number {
    return 2 * this.radius * Math.PI;
  }

  area(): number {
    return Math.PI * this.radius ** 2;
  }
}

  // =============Tsak 8
  function getFactorial(num: number): number {
    let result: number = 1;
  
    for (let i: number = 1; i <= num; i++) {
      result *= i;
    }
  
    return result;
  }
  
  // =============Tsak 9
  function getSumNumOfArr(arr: number[], callback: Function): number {
    let sum: number = 0;
  
    for (let i: number = 0; i < arr.length; i++) {
      let num: number = arr[i];
  
      if (callback(num)) {
        sum += arr[i];
      }
    }
  
    return sum;
  }

  // =============Tsak 10
  function counterItemsOfArr(arr: number[], callback: Function, isPrime: boolean): number {
    isPrime = isPrime || false;
    let counter: number = 0;
  
    for (let i: number = 0; i < arr.length; i++) {
      isPrime = true;
      let num: number = arr[i];
  
      if (isPrime) {
        for (let j: number = 2; j < num; j++) {
          if (num % j === 0) {
            isPrime = false;
            break;
          }
        }
      }
  
      if (callback(num, isPrime)) {
        counter++;
      }
    }
  
    return counter;
  }

  // =============Tsak 11
function decimalToBinary(num: number): number[] {
    let binaryArr: number[] = [];
  
    for (let i: number = num; num >= 1; i++) {
      binaryArr.unshift(Math.floor(num % 2));
      num /= 2;
    }
  
    return binaryArr;
  }
  
  function binaryToDecimal(binary: string): number {
    const binaryAsArr: string[] = binary.split("").reverse();
    let res: number = 0;
  
    for (let i: number = 0; i < binaryAsArr.length; i++) {
      res += Number(binaryAsArr[i]) * 2 ** i;
    }
    return res;
  }

  // =============Tsak 12
  function getSumNumOfMatrix(matrix: number[][], callback: Function): number {
    let sum: number = 0;
  
    for (let i: number = 0; i < matrix.length; i++) {
      for (let j: number = 0; j < matrix[i].length; j++) {
        let num: number = matrix[i][j];
  
        if (callback(num)) {
          sum += num;
        }
      }
    }
  
    return sum;
  }

  function counterNumOfMatrix(matrix: number[][], callback: Function, isPrime: boolean): number {
    isPrime = isPrime || false;
    let counter: number = 0;
  
    for (let i: number = 0; i < matrix.length; i++) {
      for (let j: number = 0; j < matrix[i].length; j++) {
        isPrime = true;
        let num: number = matrix[i][j];
  
        if (isPrime) {
          for (let j: number = 2; j < num; j++) {
            if (num % j === 0) {
              isPrime = false;
              break;
            }
          }
        }
  
        if (callback(num, isPrime)) {
          counter++;
        }
      }
    }
  
    return counter;
  }

  // =============Tsak 13
  function getSumNumMinToMax(min: number, max: number, callback: Function): number {
    let sum: number = 0;
  
    for (let i: number = min; i <= max; i++) {
      if (callback(i)) {
        sum += i;
      }
    }
  
    return sum;
  }
  
  // =============Tsak 14
  function getMeanOfArr(arr: number[], callback: Function): number {
    let counter: number = 0;
    let sum: number = 0;
  
    for (let i: number = 0; i < arr.length; i++) {
      let num: number = arr[i];
  
      if (callback(num)) {
        sum += num;
        counter++;
      }
    }
    return sum / counter;
  }

  function getMeanOfMatrix(matrix: number[][], callback: Function): number {
    let counter: number = 0;
    let sum: number = 0;
  
    for (let i: number = 0; i < matrix.length; i++) {
      for (let j: number = 0; j < matrix[i].length; j++) {
        let num: number = matrix[i][j];
  
        if (callback(num)) {
          sum += num;
          counter++;
        }
      }
    }
  
    return sum / counter;
  }
  
  // =============Tsak 15
  function getTransposeMatrix(matrix: number[][]): number[][] {
    const matrixTransp: number[][] = [];
  
    for (let i: number = 0; i < matrix.length; i++) {
      matrixTransp.push([]);
    }
  
    for (let i: number = 0; i < matrix.length; i++) {
      for (let j: number = 0; j < matrix[i].length; j++) {
        matrixTransp[j].push(matrix[i][j]);
      }
    }
  
    return matrixTransp;
  }

  // =============Tsak 16
  function getSumTwoMatrix(matrix1: number[][], matrix2:number[][]): number[][] {
    let resultMatrix: number[][] = [];
  
    for (let i: number = 0; i < matrix1.length; i++) {
      resultMatrix.push([]);
  
      for (let j: number = 0; j < matrix1[i].length; j++) {
        resultMatrix[i][j] = matrix1[i][j] + matrix2[i][j];
      }
    }
  
    return resultMatrix;
  }

  // =============Tsak 17
  function deleteLineWithZero(matrix: number[][]): number[][] {
    let resultMatrix: number[][] = [];
  
    for (let i: number = 0; i < matrix.length; i++) {
      if (!matrix[i].includes(0)) {
        resultMatrix.push(matrix[i]);
      }
    }
  
    return resultMatrix;
  }

  function deleteСolumnWithZero(matrix: number[][]): number[][] {
    for (let i: number = 0; i < matrix.length; i++) {
      for (let j: number = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] === 0) {
          let item: number = j;
          for (let i: number = 0; i < matrix.length; i++) {
            matrix[i].splice(item, 1);
          }
        }
      }
    }
    return matrix;
  }




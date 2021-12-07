// ============Task 1 
function isAnagram(word1: string, word2: string, index1?: number, counter1?: number, counter2?: number, index2?: number): boolean {
    index1 = index1 || 0;
    index2 = index2 || 0;
  
    if (word1.length !== word2.length) {
      return false;
    }
  
    if (index1 < word1.length) {
      let letter1: string = word1[index1];
      counter1 = counter1 || 0;
      counter2 = counter2 || 0;
  
      if (index2 < word1.length) {
        let letter2: string = word1[index2];
  
        if (letter1 === letter2) {
          counter1++;
        }
  
        letter2 = word2[index2];
  
        if (letter1 === letter2) {
          counter2++;
        }
  
        return isAnagram(word1, word2, index1, counter1, counter2, ++index2);
      }
  
      if (counter1 !== counter2) {
        return false;
      }
  
      return isAnagram(word1, word2, ++index1, counter1, counter2);
    }
  
    return true;
  }

// =============Tsak 3
interface ICounterDigitsRes {
  [key: string]: number;
}
function counterDigits(number: number, res?: ICounterDigitsRes, index1?: number, index2?: number): ICounterDigitsRes {
  const numAsArr: string = number.toString();
  res = res || {};
  index1 = index1 || 0;
  index2 = index2 || 0;

  if (index1 < numAsArr.length) {
    res[numAsArr[index1]] = 0;

    return counterDigits(number, res, ++index1);
  }

  if (index2 < numAsArr.length) {
    res[numAsArr[index2]]++;

    return counterDigits(number, res, index1, ++index2);
  }

  return res;
}

// =============Tsak 4
function uniqueWordCount(sentence: string, uniqueWords?: string[], index1?: number, index2?: number, counter?: number): number {
  const sentenceAsArr: string[] = sentence.split(" ");
  uniqueWords = uniqueWords || [];
  index1 = index1 || 0;
  index2 = index2 || 0;
  counter = counter || 0;

  if (index1 < sentenceAsArr.length) {
    const word: string = sentenceAsArr[index1];

    if (index2 < sentenceAsArr.length) {
      if (word === sentenceAsArr[index2]) {
        counter++;
      }

      return uniqueWordCount(sentence, uniqueWords, index1, ++index2, counter);
    }

    if (counter === 1) {
      uniqueWords.push(word);
    }
    return uniqueWordCount(sentence, uniqueWords, ++index1);
  }

  return uniqueWords.length;
}

// ============Task 5
interface ICounterWordsInSentenceRes {
  [key: string]: number;
}

function counterWordsInSentence(sentence: string, res?: ICounterWordsInSentenceRes, index1?: number, index2?: number): ICounterWordsInSentenceRes {
  res = res || {};
  index1 = index1 || 0;
  index2 = index2 || 0;

  const sentenceAsArr: string[] = sentence.toLowerCase().split(" ");

  if (index1 < sentenceAsArr.length) {
    res[sentenceAsArr[index1]] = 0;

    return counterWordsInSentence(sentence, res, ++index1);
  }

  if (index2 < sentenceAsArr.length) {
    res[sentenceAsArr[index2]]++;

    return counterWordsInSentence(sentence, res, index1, ++index2);
  }

  return res;
}

// ============Task 6
function fibonacci(num: number, resArr?: number[], index?: number): number[] {
  index = index || 0;
  resArr = resArr || [0, 1];

  if (index < num) {
    let sum: number = resArr[index] + resArr[index + 1];
    resArr.push(sum);

    return fibonacci(num, resArr, ++index);
  }

  return resArr.slice(0, -2);
}

// ============Task 8
function getFactorial(num: number): number {
  let res: number = 1;

  if (num <= 1) {
    return res;
  }

  return (res = num * getFactorial(num - 1));
}

// =============Tsak 9
function getSumNumOfArr(arr: number[], callback: Function, index: number): number {
  index = index || 0;
  let sum: number = 0;
  let num: number = arr[index];

  if (callback(num)) {
    sum = arr[index];
  }

  if (++index < arr.length) {
    sum += getSumNumOfArr(arr, callback, index);
  }

  return sum;
}

// =============Tsak 10
function counterItemsOfArr(arr: number[], callback: Function, isPrime: boolean, index1: number): number {
  isPrime = isPrime || false;
  index1 = index1 || 0;
  let counter: number = 0;

  if (index1 < arr.length) {
    isPrime = true;
    let num: number = arr[index1];

    if (isPrime) {
      (function isPrimeNum(index2?: number): boolean {
        index2 = index2 || 2;

        if (index2 < num) {
          if (num % index2 === 0) {
            isPrime = false;
            return;
          }
          isPrimeNum(++index2);
        }
      })();
    }

    if (callback(num, isPrime)) {
      counter++;
    }

    return counter + counterItemsOfArr(arr, callback, isPrime, ++index1);
  }

  return counter;
}

// =============Tsak 11
function decimalToBinary(num: number): number {
  if (num === 0) {
    return 0;
  } else {
    return (num % 2) + 10 * decimalToBinary(Math.floor(num / 2));
  }
}

function binaryToDecimal(binary: string, index?: number): number {
  index = index || 0;
  const binaryAsArr: string[] = binary.split("").reverse();
  let res: number = 0;

  if (binaryAsArr[index]) {
    res += Number(binaryAsArr[index]) * 2 ** index;
  }

  if (++index < binary.length) {
    res += binaryToDecimal(binary, index);
  }

  return res;
}

// =============Tsak 12
function getSumNumOfMatrix(matrix: number[][], callback: Function, index1?: number, index2?: number): number {
  index1 = index1 || 0;
  index2 = index2 || 0;
  let sum: number = 0;

  if (index1 < matrix.length) {
    if (index2 < matrix[index1].length) {
      let num: number = matrix[index1][index2];

      if (callback(num)) {
        sum += num;
      }

      return (sum += getSumNumOfMatrix(matrix, callback, index1, ++index2));
    }

    return (sum += getSumNumOfMatrix(matrix, callback, ++index1));
  }

  return sum;
}

function counterNumOfMatrix(matrix: number[][], callback: Function, isPrime: boolean, index1?: number, index2?: number): number {
  isPrime = isPrime || false;
  index1 = index1 || 0;
  index2 = index2 || 0;
  let counter: number = 0;

  if (index1 < matrix.length) {
    if (index2 < matrix[index1].length) {
      isPrime = true;
      let num: number = matrix[index1][index2];

      if (isPrime) {
        (function isPrimeNum(index3?: number): boolean {
          index3 = index3 || 2;

          if (index3 < num) {
            if (num % index3 === 0) {
              isPrime = false;
              return;
            }
            isPrimeNum(++index3);
          }
        })();
      }

      if (callback(num, isPrime)) {
        counter++;
      }

      return (
        counter +
        counterNumOfMatrix(matrix, callback, isPrime, index1, ++index2)
      );
    }

    return counter + counterNumOfMatrix(matrix, callback, isPrime, ++index1);
  }
  return counter;
}

// =============Tsak 13
function getSumNumMinToMax(min: number, max: number, callback: Function, index: number): number {
  index = index || min;
  let sum: number = 0;

  if (index <= max) {
    if (callback(index)) {
      sum += index;
    }

    return sum + getSumNumMinToMax(min, max, callback, ++index);
  }

  return sum;
}

// =============Tsak 14
function getMeanOfArr(arr: number[], callback: Function, index: number, sum: number, counter: number): number {
  index = index || 0;
  sum = sum || 0;
  counter = counter || 0;
  let num: number = arr[index];

  if (callback(num)) {
    sum += num;
    counter++;
  }

  if (++index < arr.length) {
    return getMeanOfArr(arr, callback, index, sum, counter);
  }

  return sum / counter;
}

function getMeanOfMatrix(matrix: number[][], callback: Function, sum: number, counter: number, index1?: number, index2?: number): number {
  index1 = index1 || 0;
  index2 = index2 || 0;
  sum = sum || 0;
  counter = counter || 0;

  if (index1 < matrix.length) {
    if (index2 < matrix[index1].length) {
      let num: number = matrix[index1][index2];

      if (callback(num)) {
        sum += num;
        counter++;
      }

      return getMeanOfMatrix(matrix, callback, sum, counter, index1, ++index2);
    }

    return getMeanOfMatrix(matrix, callback, sum, counter, ++index1);
  }

  return sum / counter;
}

// =============Tsak 15
function getTransposeMatrix(matrix: number[][], matrixTransp: number[][], index1?: number, index2?: number, index3?: number): number[][] {
  index1 = index1 || 0;
  index2 = index2 || 0;
  index3 = index3 || 0;
  matrixTransp = matrixTransp || [];

  if (index1 < matrix.length) {
    matrixTransp.push([]);

    return getTransposeMatrix(matrix, matrixTransp, ++index1);
  }

  if (index2 < matrix.length && index1 === matrix.length) {
    if (index3 < matrix[index2].length) {
      matrixTransp[index3].push(matrix[index2][index3]);

      return getTransposeMatrix(matrix, matrixTransp, index1, index2, ++index3);
    }
    return getTransposeMatrix(matrix, matrixTransp, index1, ++index2);
  }

  return matrixTransp;
}

// =============Tsak 16
function getSumTwoMatrix(
  matrix1: number[][],
  matrix2: number[][],
  resultMatrix?: number[][],
  index1?: number,
  index2?: number,
  index3?: number
): number[][] {
  index1 = index1 || 0;
  index2 = index2 || 0;
  index3 = index3 || 0;
  resultMatrix = resultMatrix || [];

  if (index1 < matrix1.length) {
    resultMatrix.push([]);

    return getSumTwoMatrix(matrix1, matrix2, resultMatrix, ++index1);
  }

  if (index2 < matrix1.length) {
    if (index3 < matrix1[index2].length) {
      const tepm: number = matrix1[index2][index3] + matrix2[index2][index3];

      resultMatrix[index2].push(tepm);

      return getSumTwoMatrix(
        matrix1,
        matrix2,
        resultMatrix,
        index1,
        index2,
        ++index3
      );
    }
    return getSumTwoMatrix(matrix1, matrix2, resultMatrix, index1, ++index2);
  }

  return resultMatrix;
}

// =============Tsak 17
function deleteLineWithZero(matrix: number[][], resultMatrix: number[][], indexArr: number[], index1?: number, index2?: number): number[][] {
  index1 = index1 || 0;
  index2 = index2 || 0;
  resultMatrix = resultMatrix || matrix;
  indexArr = indexArr || [];

  if (index1 < matrix.length) {
    if (matrix[index1].includes(0)) {
      const index: number = index1;

      if (!indexArr.includes(index)) {
        indexArr.unshift(index);
      }
    }
    return deleteLineWithZero(matrix, resultMatrix, indexArr, ++index1);
  }

  if (index2 < indexArr.length) {
    resultMatrix.splice(indexArr[index2], 1);

    return deleteLineWithZero(matrix, resultMatrix, indexArr, index1, ++index2);
  }

  return resultMatrix;
}

function deleteСolumnWithZero(
  matrix: number[][],
  resultMatrix: number[][],
  indexArr: number[],
  index1?: number,
  index2?: number,
  index3?: number,
  index4?: number
): number[][] {
  index1 = index1 || 0;
  index2 = index2 || 0;
  index3 = index3 || 0;
  index4 = index4 || 0;
  resultMatrix = resultMatrix || matrix;
  indexArr = indexArr || [];

  if (index1 < matrix.length) {
    if (index2 < matrix[index1].length) {
      if (matrix[index2][index1] === 0) {
        const index: number = index1;

        if (!indexArr.includes(index)) {
          indexArr.unshift(index);
        }
      }
      return deleteСolumnWithZero(
        matrix,
        resultMatrix,
        indexArr,
        index1,
        ++index2
      );
    }
    return deleteСolumnWithZero(matrix, resultMatrix, indexArr, ++index1);
  }

  if (index3 < indexArr.length) {
    if (index4 < matrix.length) {
      resultMatrix[index4].splice(indexArr[index3], 1);

      return deleteСolumnWithZero(
        matrix,
        resultMatrix,
        indexArr,
        index1,
        index2,
        index3,
        ++index4
      );
    }
    return deleteСolumnWithZero(
      matrix,
      resultMatrix,
      indexArr,
      index1,
      index2,
      ++index3
    );
  }

  return resultMatrix;
}


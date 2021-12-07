// ============Task 1
type anagram = (
  word1: string, 
  word2: string, 
  index1?: number, 
  counter1?: number, 
  counter2?: number, 
  index2?: number
  ) => boolean;

interface IIsAnagram {
    [key: string]: boolean;
}
const isAnagramMemo: anagram = ((): anagram => {
    let memo: IIsAnagram = {};
  
    return (word1, word2, index1, counter1, counter2, index2) => {
      index1 = index1 || 0;
      index2 = index2 || 0;
      counter1 = counter1 || 0;
      counter2 = counter2 || 0;
      let resMemo: boolean = memo[word2];
      let res: boolean = false;
  
      if (resMemo === undefined) {
        if (word1.length !== word2.length) {
          memo[word2] = res;
  
          return res;
        }
  
        if (index1 < word1.length) {
          let letter1: string = word1[index1];
  
          if (index2 < word1.length) {
            let letter2: string = word1[index2];
  
            if (letter1 === letter2) {
              counter1++;
            }
  
            letter2 = word2[index2];
  
            if (letter1 === letter2) {
              counter2++;
            }
  
            return isAnagramMemo(
              word1,
              word2,
              index1,
              counter1,
              counter2,
              ++index2
            );
          }
  
          if (counter1 !== counter2) {
            res = false;
            memo[word2] = res;
  
            return res;
          }
  
          return isAnagramMemo(word1, word2, ++index1, counter1, counter2);
        }
  
        res = true;
        memo[word2] = res;
  
        return res;
      }
      return resMemo;
    };
  })();

// =============Tsak 3
interface ICounterDigitsRes {
    [key: number]: number;
}

type counterDigits = (
  number: number, 
  res?: ICounterDigitsRes, 
  index1?: number, 
  index2?: number
  ) => ICounterDigitsRes;

interface ICounterDigits {
    [key: string]: ICounterDigitsRes;
}

const counterDigitsMemo: counterDigits = ((): counterDigits => {
    let memo: ICounterDigits = {};
  
    return (number, res, index1, index2) => {
      const numAsArr: string = number.toString();
      res = res || {};
      index1 = index1 || 0;
      index2 = index2 || 0;
      let resMemo: ICounterDigitsRes = memo[numAsArr];
  
      if (resMemo === undefined) {
        if (index1 < numAsArr.length) {
          res[numAsArr[index1]] = 0;
  
          return counterDigitsMemo(number, res, ++index1);
        }
  
        if (index2 < numAsArr.length) {
          res[numAsArr[index2]]++;
  
          return counterDigitsMemo(number, res, index1, ++index2);
        }
        memo[numAsArr] = res;
        return res;
      }
      return resMemo;
    };
  })();

  // ============Task 4
  interface IUniqueWordCount {
    [key: string]: number;
}
  type uniqueWordCount = (
    sentence: string, 
    uniqueWords: string[], 
    index1?: number, 
    index2?: number, 
    counter?: number
  ) => number;

const uniqueWordCountMemo: uniqueWordCount = ((): uniqueWordCount => {
  let memo: IUniqueWordCount = {};

  return (sentence, uniqueWords, index1, index2, counter) => {
    const key: string = sentence.toLowerCase().trim();
    const sentenceAsArr: string[] = sentence.toLowerCase().split(" ");
    uniqueWords = uniqueWords || [];
    index1 = index1 || 0;
    index2 = index2 || 0;
    counter = counter || 0;

    let resMemo: number = memo[key];

    if (resMemo === undefined) {
      if (index1 < sentenceAsArr.length) {
        const word = sentenceAsArr[index1];

        if (index2 < sentenceAsArr.length) {
          if (word === sentenceAsArr[index2]) {
            counter++;
          }

          return uniqueWordCountMemo(
            sentence,
            uniqueWords,
            index1,
            ++index2,
            counter
          );
        }

        if (counter === 1) {
          uniqueWords.push(word);
        }
        return uniqueWordCountMemo(sentence, uniqueWords, ++index1);
      }

      resMemo = uniqueWords.length;
      memo[key] = resMemo;

      return uniqueWords.length;
    }

    return resMemo;
  };
})();

// ============Task 5
interface ICounterWordsInSentenceRes {
  [key: string]: number;
}

interface ICounterWordsInSentenceMemo {
  [key: string]: ICounterWordsInSentenceRes;
}

type counterWordsInSentence = (
  sentence: string,
  res?: ICounterWordsInSentenceRes,
  index1?: number,
  index2?: number,
) => ICounterWordsInSentenceRes;

const counterWordsInSentenceMemo: counterWordsInSentence = ((): counterWordsInSentence => {
  let memo: ICounterWordsInSentenceMemo = {};

  return (sentence, res, index1, index2) => {
      const key: string = sentence.toLowerCase().trim();
      let resMemo: ICounterWordsInSentenceRes = memo[key];

      if (resMemo === undefined) {
          res = res || {};
          index1 = index1 || 0;
          index2 = index2 || 0;

          const sentenceAsArr: string[] = sentence.toLowerCase().split(' ');

          if (index1 < sentenceAsArr.length) {
            res[sentenceAsArr[index1]] = 0;

              return counterWordsInSentenceMemo(sentence, res, ++index1);
          }

          if (index2 < sentenceAsArr.length) {
              const word: string = sentenceAsArr[index2];

              res[word]++;

              return counterWordsInSentenceMemo(sentence, res, index1, ++index2);
          }

          resMemo = res;
          memo[key] = resMemo;

          return resMemo;
      }
      return resMemo;
  };
})();

const _readline = require('readline');

const _reader = _readline.createInterface({
  input: process.stdin
});

const _inputLines = [];
let _curLine = 0;

_reader.on('line', line => {
  _inputLines.push(line);
});

process.stdin.on('end', solve);

function getResponse(nums) {
  const longestSubsequenceInPosition = [1];
  const previousIndexOfLongestSubsequence = [-1];
  
  for (let i = 1; i < nums.length; i++) {
      let maxPreviousSubsequence = 0;

      // если внутри следующего for, по предыдущим элементам,
      // не войдем в if ни один раз
      // значит предыдущего элемента нет
      // и надо проставить значение по умолчанию: -1
      previousIndexOfLongestSubsequence[i] = -1;
      
      for (let j = 0; j < i; j++) {
          if (nums[j] < nums[i] &&
              longestSubsequenceInPosition[j] > maxPreviousSubsequence) {
              maxPreviousSubsequence = longestSubsequenceInPosition[j];
              
              // если вошли в этот if
              // значит в позиции j нужный предыдущий элемент
              previousIndexOfLongestSubsequence[i] = j;
          }
      }
      
      longestSubsequenceInPosition.push(maxPreviousSubsequence + 1);
  }
  
  // для рассматриваемого примера [5, 1, 5, 3, 6, 4, 5, 2]
  // массив с максимальной подпоследовательностью в позиции
  // longestSubsequenceInPosition [1, 1, 2, 2, 3, 3, 4, 2]
  // индекс предыдущего элемента, для максимальной подпоследовательности
  // previousIndexOfLongestSubsequence [-1,-1,1, 1, 2, 3, 5, 1]
  
  const lengthOfLongestSubsequence =
    Math.max(...longestSubsequenceInPosition);
  
  // позиция окончания максимальной подпоследовательности
  const lastIndexOfLongestSubsequence =
    longestSubsequenceInPosition.indexOf(lengthOfLongestSubsequence);

  const longestSubsequence = [];
  let currentElementOfSubsequence = lastIndexOfLongestSubsequence;

  // идем по массиву previousIndexOfLongestSubsequence,
  // находя предыдущие элементы,
  // начиная с lastIndexOfLongestSubsequence,
  // когда достигнем -1 значения, то предыдущего элемента нет
  while (currentElementOfSubsequence !== -1) {
    longestSubsequence.push(currentElementOfSubsequence + 1);
      
    currentElementOfSubsequence =
      previousIndexOfLongestSubsequence[currentElementOfSubsequence];
  }

  return [longestSubsequence.length, longestSubsequence.reverse().join(' ')];
}

function solve() {
  const n = readInt();
  const sequence = readArray();
  
  process.stdout.write(`${getResponse(sequence).join('\n')}`);
}

function readInt() {
  const n = Number(_inputLines[_curLine]);
  _curLine++;
  return n;
}

function readArray() {
  const s = _inputLines[_curLine].trim().split(" ").map(el => Number(el));
  _curLine++;
  return s;
}
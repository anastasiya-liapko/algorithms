/*
  ОТЧЕТ https://contest.yandex.ru/contest/25597/run-report/97326628/
  
   Пусть n - длина входного массива с количеством выигранных партий.

  -- ПРИНЦИП РАБОТЫ --
  1. Проверяю, если сумма всех очков делится нацело на 2. Если нет, завершаю алгоритм и возвращаю 'False';
  2. Делю сумму всех очков на 2. Полученное число - сумма каждой из двух искомых частей массива.
  3. 

  -- ВРЕМЕННАЯ СЛОЖНОСТЬ --
  Сложность = O(tn * sn) + O(sn) + O(tn) + O(tn * sn) = O(sn) + O(tn) + O(tn * sn).
  1. Для создания матрицы dp понадобится цикл длиной tn и вложенный цикл длиной sn: tn * sn;
  2. Для заполнения первой строки матрицы понадобится цикл длиной sn;
  3. Для заполнения первого столбца матрицы понадобится цикл длиной tn;
  4. Для заполнения матрицы понадобится цикл длиной tn и вложенный цикл длиной sn: tn * sn.

  -- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
  Сложность = O(tn * sn).
  1. Понадобится доп. память для хранения матрицы dp: tn * sn.
*/

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

function isSplittable(points) {
  let pointsSum = 0;

  for (let i = 0; i < points.length; i++) {
    pointsSum += points[i];
  }

  if (pointsSum % 2 !== 0) {
    return false;
  }

  const halfSum = pointsSum / 2;

  const dp = new Array(points.length + 1).fill(null).map(() => new Array(halfSum + 1).fill(false));

  for (let i = 0; i <= points.length; i++) {
    dp[i][0] = true;
  }

  for (let i = 1; i <= points.length; i++) {
    for (let j = 1; j <= halfSum; j++) {
      if (points[i - 1] > j) {
        dp[i][j] = dp[i - 1][j];
      } else {
        dp[i][j] = dp[i - 1][j] || dp[i - 1][j - points[i - 1]];
      }
    }
  }

  // const dp = new Array(halfSum + 1).fill(false);
  // dp[0] = true;

  // for (let i = 0; i < points.length; i++) {
  //   for (let j = halfSum; j >= points[i]; j--) {
  //     dp[j] = dp[j] || dp[j - points[i]];
  //   }
  // }

  return dp[points.length][halfSum];
}

function solve() {
  const n = readInt();
  const points = readArray();
  
  process.stdout.write(`${isSplittable(points) ? 'True' : 'False'}`);
}

function readInt() {
  const n = Number(_inputLines[_curLine]);
  _curLine++;
  return n;
}

function readArray() {
  const arr = _inputLines[_curLine].trim().split(" ").map(el => Number(el));
  _curLine++;
  return arr;
}
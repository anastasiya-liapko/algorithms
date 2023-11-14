/*
  ОТЧЕТ https://contest.yandex.ru/contest/25597/run-report/97345476/
  
   Пусть n - длина входного массива с очками за выигранные партии,
         m - половина суммы всех очков выигранных партий.

  -- ПРИНЦИП РАБОТЫ --
  1. Проверяю, если сумма всех очков делится нацело на 2. Если нет, завершаю алгоритм и возвращаю 'False';
  2. Делю сумму всех очков на 2. Полученное число - сумма очков каждой из двух искомых частей массива;
  3. Создаю массив dp с длиной равной половине суммы всех очков - искомая сумма массива. Если есть хоть один подмассив с такой суммой, значит вторая половина будет иметь такую же сумму, нужно найти хотя бы один подмассив;
  4. Сумму 0 можно получить ничего не прибавляя, поэтому dp[0] = true. Это базовый случай;
  5. Заполняю остальные ячейки массива:
   - Если искомая сумма больше рассматриваемого элемента, записываю в текущую ячейку:
    - Либо значение текущей ячейки, вычисленное на предыдущем шаге. То есть, если такая сумма была возможна на предыдущих шагах;
    - Либо значение ячейки, которая является разностью текущей искомой суммы от текущего рассматриваемого элемента. То есть, если сумма без текущего элемента возможна, то и с текущим элементом будет возможна.
  6. Возвращаю значение последней ячейки массива, в ней будет хранится результат, возможно ли получить подмассив с искомой суммой.

  -- ВРЕМЕННАЯ СЛОЖНОСТЬ --
  Сложность = O(n) + O(m) + O(n * m).
  1. Для подсчтета суммы всех очков нужно пройти по всему массиву очков: n;
  2. Для создания массива dp нужен цикл равный половине суммы всех очков: m;
  3. Для заполнения массива dp нужно пройти по всем очкам и по всем суммам до m (в худшем случае m): n * m;

  -- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
  Сложность = O(m).
  1. Понадобится доп. память для хранения массива dp, который равен половине суммы всех очков: m.
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

  const dp = new Array(halfSum + 1).fill(false);
  dp[0] = true;

  for (let i = 0; i < points.length; i++) {
    for (let j = halfSum; j >= points[i]; j--) {
      dp[j] = dp[j] || dp[j - points[i]];
    }
  }

  return dp[halfSum];
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
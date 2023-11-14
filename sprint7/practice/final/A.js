/*
  ОТЧЕТ https://contest.yandex.ru/contest/25597/run-report/97326628/
  
   Пусть s - первая строка,
         t - вторая строка,
         sn - длина первой строки,
         tn - длина второй строки.

  -- ПРИНЦИП РАБОТЫ --
  1. Создаю матрицу dp для вычисления расстояния Левенштейна по алгоритму Вагнера — Фишера;
  2. Заполняю первую строку матрицы. Так как это первая строка, то трансформируется пустая строка в s, количество трансформаций равно длине подстроки s;
  3. Заполняю первый столбец матрицы. Так как это первый столбец, то трансформируется пустая строка в t, количество трансформаций равно длине подстроки t;
  4. Заполняю остальные ячейки матрицы с применением рекуррентной формулы:
    min {
      D(i,j-1)+1, 
      D(i-1,j)+1, 
      D(i-1,j-1) + m(s[i],t[j])
    },
    m(s[i],t[j]) = 0, если символы равны, m(s[i],t[j]) = 1, если символы не равны;
  5. Возвращаю значение нижней правой ячейки матрицы dp, она будет вычислена последней, в ней будет записано минимальное расстояние между строками;

  -- ВРЕМЕННАЯ СЛОЖНОСТЬ --
  Сложность = O(tn * sn) + O(sn) + O(tn) + O(tn * sn) = O(sn) + O(tn) + O(tn * sn).
  1. Для создания матрицы dp понадобится цикл длиной tn и вложенный цикл длиной sn: tn * sn;
  2. Для заполнения первой строки матрицы понадобится цикл длиной sn;
  3. Для заполнения первого столбца матрицы понадобится цикл длиной tn;
  4. Для заполнения матрицы понадобится цикл длиной tn и вложенный цикл длиной sn: tn * sn.

  -- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
  Сложность = O(tn * sn).
  1. Понадобится доп. память для хранения матрицы dp: tn * sn.

  --------------------------------
  Пользовалась материалом статьи https://habr.com/ru/articles/676858/
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

function getDistance(s, t) {
  const dp = new Array(t.length + 1).fill(null).map(() => new Array(s.length + 1).fill(null));

  for (let i = 0; i <= s.length; i++) {
    dp[0][i] = i;
  }

  for (let j = 0; j <= t.length; j++) {
    dp[j][0] = j;
  }

  for (let j = 1; j <= t.length; j++) {
    for (let i = 1; i <= s.length; i++) {
      const m = s[i - 1] === t[j - 1] ? 0 : 1;

      dp[j][i] = Math.min(
        dp[j][i - 1] + 1,
        dp[j - 1][i] + 1,
        dp[j - 1][i - 1] + m,
      );
    }
  }

  return dp[t.length][s.length];
}

function solve() {
  const s = readString();
  const t = readString();
  
  process.stdout.write(`${getDistance(s, t)}`);
}

function readString() {
  const s = _inputLines[_curLine].trim();
  _curLine++;
  return s;
}
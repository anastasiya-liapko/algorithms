/*
  ОТЧЕТ https://contest.yandex.ru/contest/26133/run-report/99089303/
  
   Пусть n - количество строк,
         m - длина одной строки после распаковки.

  -- ПРИНЦИП РАБОТЫ --
  1. Создаю 2 пременные для хранения текущего наибольшего общего префикса (prefix) и текущей рассматриваемой строки (current) (первоначально наибольшим общим префиксом является первая рассматриваемая распакованная строка).
  2. Прохожу по всем строкам:
   - Распаковываю очередную строку и нахожу наибольший общий префикс текущей распакованной строки и текущего наибольшего общего префикса.
  3. После прохода по всем строкам в переменной текущего наибольшего общего префикса (prefix) и будет записан ответ на задачу.

  -- ВРЕМЕННАЯ СЛОЖНОСТЬ --
  Сложность = O(n) * (O(m) + O(m)) = O(n * m).
  1. Проход по всем строкам O(n)
    - Распаковка строки O(m)
    - Сравнение строк для нахождения общего префикса O(m) в худшем случае

  -- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
  Сложность = O(m).
  1. Понадобится доп. память для хранения текущей рассматриваемой строки и текущего наибольшего общего префикса O(m + m).
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

function unpack(string) {
  const stack = [];
  let top = '';

  for (let i = 0; i < string.length; i++) {
    switch (string[i]) {
      case ']':
        top = stack.pop();
        let substring = '';

        while (top < '0' || top > '9') {
          substring = top + substring;
          top = stack.pop();
        }

        for (let i = 0; i < +top; i++) {
          stack.push(substring);
        }
      case '[':
        continue;
      default:
        stack.push(string[i]);
    }
  }

  return stack.join('');
}

function findTwoStringsPrefix(a, b) {
  let prefix = '';

  for (let i = 0; i < a.length && i < b.length; i++) {
    if (a[i] !== b[i]) {
      break;
    }

    prefix += a[i];
  }

  return prefix;
}

function findMultipleStringsPrefix(strings) {
  let prefix = unpack(strings[0]);
  let current = '';

  for (let i = 1; i < strings.length; i++) {
    current = unpack(strings[i]);
    prefix = findTwoStringsPrefix(prefix, current);
  }

  return prefix;
}

function solve() {
  const n = readInt();
  const strings = readStrings(n);
  
  process.stdout.write(`${findMultipleStringsPrefix(strings)}`);
}

function readInt() {
  const n = Number(_inputLines[_curLine]);
  _curLine++;
  return n;
}

function readString() {
  const s = _inputLines[_curLine].trim();
  _curLine++;
  return s;
}

function readStrings(rowsCount) {
  const arr = [];
  for (let i = 0; i !== rowsCount; i++) {
      arr.push(readString())
  }
  return arr;
}
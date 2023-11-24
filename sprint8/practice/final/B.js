/*
  ОТЧЕТ https://contest.yandex.ru/contest/26133/run-report/99089415/
  
   Пусть s - длина строки,
         n - количество слов в ловаре,
         m - длина слова в словаре.

  -- ПРИНЦИП РАБОТЫ --
  1. Создаю префиксное дерево из словарных слов.
  2. Создаю массив dp равный длине рассматриваемой строки - можно ли разбить строку на слова на текущем этапе или нет (дефолтные значения false).
  3. Прохожу по каждому символу строки:
    - Если предыдущее значение dp положительное, прохожу по префиксному дереву в поисках очередного слова, если найдено, записываю в dp true
    - Иначе перехожу к следующему символу строки
  4. В последней ячейке массива dp будет результат, возможно ли разбить строку на слова.

  -- ВРЕМЕННАЯ СЛОЖНОСТЬ --
  Сложность = O(n * m) + O(s) * O(s).
  1. Создание префиксного дерева O(n * m)
  2. Проход по строке O(s)
    - Проход по префиксному дереву O(s) в худшем случае

  -- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
  Сложность = O(n * m) + O(s).
  1. Доп. память для хранения префиксного дерева O(n * m)
  2. Доп. память для хранения массива dp O(s)
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

class Node {
  constructor(value) {
    this.value = value;
    this.isEndOfWord = false;
    this.children = {};
  }
}

class Trie {
  constructor(){
    this.root = new Node(null);
  }

  insert(word){
    let current = this.root;

    for (let char of word) {
      if (!current.children[char]) {
        current.children[char] = new Node(char);
      }

      current = current.children[char]  ;
    }

    current.isEndOfWord = true;
  }
}

function isSplittable(string, words) {
  const trie = new Trie();

  for (let word of words) {
    trie.insert(word);
  }

  const dp = new Array(string.length + 1).fill(false);
  dp[0] = true;

  for (let i = 0; i < string.length; i++) {
    let current = trie.root;

    if (dp[i]) {
      for (let j = i; j <= string.length; j++) {
        if (current.isEndOfWord) {
          dp[j] = true;
        }

        if (!current.children[string[j]]) {
          break;
        }

        current = current.children[string[j]];
      }
    }
  }

  return dp[string.length];
}

function solve() {
  const string = readString();
  const n = readInt();
  const words = readStrings(n);
  
  process.stdout.write(`${isSplittable(string, words) ? 'YES' : 'NO'}`);
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
/*
  ОТЧЕТ https://contest.yandex.ru/contest/24810/run-report/92273544/
  
  Пусть n - длина входного массива.

  -- ПРИНЦИП РАБОТЫ --
  Пирамидальная сортировка:
  1. В функцию пирамидальной сортировки передается сам массив и функция-компаратор.
  2. Создаем пустую кучу.
  3. Формируем невозрастающую кучу (max-heap):
    – Вставляем в кучу элементы массива
    – С помощью "просеивания вверх" восстанавливаем свойства кучи после каждой вставки
  4. Создаем пустой массив для записи элементов в отсортированном порядке.
  5. Заполняем массив, созданный на шаге 4:
    – Извлекаем из кучи элементы в порядке приоритета, удаляя их из кучи, и записываем в массив
    – С помощью "просеивания вниз" восстанавливаем свойства кучи после каждого удаления

  -- ВРЕМЕННАЯ СЛОЖНОСТЬ --
  Сложность = O(n * log(n)) + O(n * log(n)) = O(n * log(n)).
  1. Создание кучи занимает константное время O(1)
  2. При вставке мы на каждом уровне проводим только одно сравнение элемента – кнстантное значение. Куча имеет высоту log(n), значит вставка происходит за O(log(n)). Для вставки n элементов в худшем случае понадобится O(n * log(n)).
  3. Создание массива для записи результата занимает O(1).
  4. При удалении мы на каждом уровне дерева проводим не более двух сравнений элемента – константное значение. Куча имеет высоту log(n), значит удаление происходит за O(log(n)). Для удаления n элементов в худшем случае понадобится O(n * log(n))

  -- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
  Сложность = O(n) + O(n) = O(n).
  1. Нужно выделить доп. память для кучи (массив длиной n) – O(n)
  2. Нужно выделить доп. память для результирующего массива - O(n)
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

function createAdjacentsLists(matrix) {
	const graph = [];

  for (let i = 0; i < matrix.length; i++) {
    const from = i + 1;

    for (let j = 0; j < matrix[i].length; j++) {
      const to = from + j + 1;
      const direction = matrix[i][j];

      if (direction === 'R') {
        graph[from] ? graph[from].push(to) : graph[from] = [to]
      } else if (direction === 'B') {
        graph[to] ? graph[to].push(from) : graph[to] = [from]
      }
    }
  }

  return graph;
}

function mainDFS(vertexCount, edgesList) {
  const graph = createAdjacentsLists(edgesList);

  const color = new Array(vertexCount + 1).fill("white");

  function DFS(vertexStart) {
    const stack = [];
    stack.push(vertexStart);
    
    while (stack.length) {
      const v = stack.pop();
        
      if (color[v] === "white") {
        color[v] = "gray";
        stack.push(v);

        for (let i = 0; i < graph[v]?.length; i++) {
          if (color[graph[v][i]] === "white") {
            stack.push(graph[v][i]);
          } else if (color[graph[v][i]] === "gray") {
            return false;
          }
        }
      } else if (color[v] === "gray") {
        color[v] = "black";
      }
    }

    return true;
  }

  for (let i = 1; i <= color.length; i++) {
    if (color[i] === "white") {
      const res = DFS(i);
      if (res === false) {
        return 'NO';
      }
    }
  }

  return 'YES';
}

function solve() {
  const vertexCount = readInt();
  const matrix = readMatrix(vertexCount - 1);
  
  process.stdout.write(`${mainDFS(vertexCount, matrix)}`);
}

function readInt() {
  const n = Number(_inputLines[_curLine]);
  _curLine++;
  return n;
}

function readArray() {
  var arr = _inputLines[_curLine].trim().split("");
  _curLine++;
  return arr;
}

function readMatrix(rowsCount) {
  var arr = [];
  for (let i = 0; i !== rowsCount; i++) {
      arr.push(readArray())
  }
  return arr;
}
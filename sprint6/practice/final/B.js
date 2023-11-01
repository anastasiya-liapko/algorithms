/*
  ОТЧЕТ https://contest.yandex.ru/contest/25070/run-report/95564697/
  
  Пусть V - количество вершин,
        E - количество ребер.

  -- ПРИНЦИП РАБОТЫ --
  1. Создаю ориентированный граф в виде списков смежности:
    - Если от вершины A до вершины B тип дороги 'R', то ребро будет направлено от А к В;
    - Если от вершины A до вершины B тип дороги 'B', то ребро будет направлено от B к A;
  2. Запускаю нерекурсивный DFS обход на поиск циклов с использованием массива цветов:
    - Создаю массив цветов вершин (по дефолту 'white');
    - Запускаю цикл по всем вершинам:
      - Если вершина 'white' (то есть не посещенная), запускаю от нее DFS обход:
        - Создаю стек (LIFO), кладу в него текущую вершину;
        - Пока в стеке есть вершины:
          - Беру с него последнюю добавленную вершину;
          - Если она 'white' (не посещенная):
            - Помечаю ее цветом 'gray' (посещенная), и возвращаю в стек;
            - Прохожу по всем смежным с ней вершинам:
              - Если вершина 'white' (не посещенная), кладу ее в стэк;
              - Если вершина 'gray' (посещенная), значит в дереве есть цикл, прерываю DFS обход и возвращаю 'NO';
          - Если вершина 'gray' (посещенная), помечаю ее цветом 'black';
      - Если в результате DFS обхода циклов не нашлось, он не был прерван, возвращаю 'YES'.

  -- ВРЕМЕННАЯ СЛОЖНОСТЬ --
  Сложность = O(V + E) + O(V) + O(E) = O(2V + 2E) = O(V + E).
  1. Создание списков смежности занимает O(V + E): 
    - Обход всех вершин + обход всех ребер: O(V + E);
    - Проверка направления ребра занимает константное время;
  2. Проход по вершинам для запуска DFS обхода: O(V);
  3. Проход по смежным вершинам в DFS обходе: O(E);
  4. Добавление, извлечение из стека, проверка, смена цвета вершины происходит за константное время.

  -- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
  Сложность = O(V + E) + O(V) + O(V) = O(3V + E) = O(V + E).
  1. Список смежности занимает O(V + E);
  2. Массив цветов занимает O(V);
  3. Стек в худшем случае занимает O(V).
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

function mainDFS(vertexCount, graph) {
  const color = new Array(vertexCount + 1).fill("white");

  function DFS(vertexStart) {
    const stack = [vertexStart];
    
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
      if (DFS(i) === false) {
        return 'NO';
      }
    }
  }

  return 'YES';
}

function solve() {
  const vertexCount = readInt();
  const graph = createAdjacentsLists(vertexCount - 1);
  
  process.stdout.write(`${mainDFS(vertexCount, graph)}`);
}

function readInt() {
  const n = Number(_inputLines[_curLine]);
  _curLine++;
  return n;
}

function readArray() {
  const arr = _inputLines[_curLine].trim().split("");
  _curLine++;
  return arr;
}

function createAdjacentsLists(rowsCount) {
  const graph = [];

  for (let i = 0; i < rowsCount; i++) {
    const from = i + 1;
    const directions = readArray();

    for (let j = 0; j < directions.length; j++) {
      const to = from + j + 1;
      const direction = directions[j];

      if (direction === 'R') {
        graph[from] ? graph[from].push(to) : graph[from] = [to]
      } else if (direction === 'B') {
        graph[to] ? graph[to].push(from) : graph[to] = [from]
      }
    }
  }

  return graph;
}
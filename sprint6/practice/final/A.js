/*
  ОТЧЕТ https://contest.yandex.ru/contest/25070/run-report/95563837/
  
   Пусть V - количество вершин,
         E - количество ребер.

  -- ПРИНЦИП РАБОТЫ --
  1. Создаю неориентированный граф в виде списков смежности;
  2. Если указанное количество вершин больше, чем получилось в графе, значит граф не связный, возвращаю 'Oops! I did it again';
  3. Иначе запускаю алгоритм Прима для вычисления веса максимального остовного дерева:
    - Создаю переменную для хранения промежуточного результата - итогового веса максимального остовного дерева;
    - Создаю хеш-таблицу для хранения вершин еще не добавленных в остов (по дефолту все вершины графа);
    - Создаю невозрастающую кучу для хранения ребер, исходящих из остовного дерева (по дефолту пустая);
    - Обрабатываю первую вершину:
      - Удаляю ее из хеш-таблицы (вершина теперь обработана);
      - Прохожу по смежным с ней вершинам:
        - Если смежная вершина еще не была обработана, добавляю ее ребро в кучу;
    - Пока есть необработанные вершины и есть ребра в остове:
      - Извлекаю из кучи ребро с наибольшим весом;
      - Если вершина, в которую входит ребро, еще не была обработана:
        - Добавляю вес ее ребра к итоговой сумме;
        - Удаляю ее из хеш-таблицы (вершина теперь обработана);
        - Прохожу по смежным с ней вершинам:
          - Если смежная вершина еще не была обработана, добавляю ее ребро в кучу;
    - Возвращаю итоговый вес максимального остовного дерева.

  -- ВРЕМЕННАЯ СЛОЖНОСТЬ --
  Сложность = O(V + E) + O(V) + O(E) * O(log(V)) + O(V) * O(log(V)) * O(E) * O(log(V)) = O(V + E) + O(E) * O(log(V)) + O(V) * O(E) * O(log(V))
  1. Создание списков смежности занимает O(V + E);
  2. Создание переменной для хранения промежуточного результата занимает константное время;
  3. Создание хеш-таблицы для хранения вершин еще не добавленных в остов занимает O(V) (нужно обойти все вершины и записать их в хеш-таблицу);
  4. Создание невозрастающей кучи занимает константное время, так как по дефолту она пустая, просто инициализируем;
  5. Обработка первой вершины - O(E) * O(log(V)):
    - Удаление вершины из хеш-таблицы - константное время;
    - Проход по смежным вершинам - O(E) в худшем случае, и добавление необработанных ребер в кучу - O(log(V)): O(E) * O(log(V));
  6. Обработка остальных вершин - O(V) * O(log(V)) * O(E) * O(log(V)):
    - Извлечение из кучи - O(log(V));
    - Добавление веса ребра к итоговой сумме - константное время;
    - Удаление вершины из хеш-таблицы - константное время;
    - Проход по смежным вершинам - O(E) в худшем случае, и добавление необработанных ребер в кучу - O(log(V)): O(E) * O(log(V)).

  -- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
  Сложность = O(V + E) + O(V + E) + O(E) = O(2V + 3E) = O(V + E).
  1. Список смежности занимает O(V + E);
  2. Переменная для хранения промежуточного результата занимает константное время;
  3. Хеш-таблица занимает O(V + E);
  4. Куча занимает O(E) - количество ребер. Одно ребро занимает константное значение.
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

class Edge {
  constructor(from, to, weight) {
    this.from = from,
    this.to = to,
    this.weight = weight
  }
}

class MaxHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  compare(a, b) {
    return a.weight - b.weight;
  }

  siftUp(index) {
    if (index === 1) {
      return;
    }
  
    const parentIndex = Math.floor(index / 2);
    if (this.compare(this.heap[parentIndex - 1], this.heap[index - 1]) < 0) {
      [this.heap[parentIndex - 1], this.heap[index - 1]] = [this.heap[index - 1], this.heap[parentIndex - 1]];
      this.siftUp(parentIndex);
    }
  }
  
  siftDown(index) {
    const left = 2 * index + 1;
    const right = 2 * index + 2;
  
    if (left >= this.heap.length) {
      return;
    }
  
    let indexLargest = left;
    if (right < this.heap.length && this.compare(this.heap[left], this.heap[right]) < 0) {
      indexLargest = right;
    }
  
    if (this.compare(this.heap[index], this.heap[indexLargest]) < 0) {
      [this.heap[index], this.heap[indexLargest]] = [this.heap[indexLargest], this.heap[index]];
      this.siftDown(indexLargest);
    }
  }
  
  push(from, to, weight) {
    const index = this.heap.length + 1;
    this.heap.push(new Edge(from, to, weight));
    this.siftUp(index);
  }
  
  pop() {
    const result = this.heap[0];
    this.heap[0] = this.heap[this.heap.length - 1];
    this.heap.pop();
    this.siftDown(0);
    
    return result;
  }
} 

function createAdjacentsLists(edges) {
	const map = new Map();
    
	for (let i = 0; i < edges.length; i++) {
    const edge = edges[i];
      
    if (map.has(edge[0])) {
        map.get(edge[0]).push({ to: edge[1], weight: edge[2] });
      } else {
        map.set(edge[0], [{ to: edge[1], weight: edge[2] }])
      }
      
      if (map.has(edge[1])) {
        map.get(edge[1]).push({ to: edge[0], weight: edge[2] });
      } else {
        map.set(edge[1], [{ to: edge[0], weight: edge[2] }])
      }
  }

  return map;
}

function primMST(graph) {
  let MSTCost = 0;

  const notAdded = new Map(graph); // Множество вершин, ещё не добавленных в остов.
  const edges = new MaxHeap(); // Множество ребер, исходящих из остовного дерева.

  function addVertex(v) {
    notAdded.delete(v);
    const crossingEdges = graph.get(v);
    for (let i = 0, len = crossingEdges?.length; i < len; i++) {
      if (notAdded.has(crossingEdges[i].to)) {
        edges.push(v, crossingEdges[i].to, crossingEdges[i].weight);
      }
    }
  }

  const FIRST_VERTEX = 1;
  addVertex(FIRST_VERTEX);

  while (notAdded.size && edges.size()) {
    const e = edges.pop();

    if (notAdded.has(e.to)) {
      MSTCost += e.weight;
      addVertex(e.to);
    }
  }

  return MSTCost;
}

function run(vertexCount, edgesList) {
  const graph = createAdjacentsLists(edgesList);

  if (vertexCount - graph.size > 1) {
    return "Oops! I did it again";
  }

  return primMST(graph);
}

function solve() {
  const [vertexCount, edgesCount] = readArray();
  const edgesList = readEdges(edgesCount);
  
  process.stdout.write(`${run(vertexCount, edgesList)}`);
}

function readArray() {
  const arr = _inputLines[_curLine].trim().split(" ").map(num => Number(num));
  _curLine++;
  return arr;
}

function readEdges(rowsCount) {
  const arr = [];
  for (let i = 0; i !== rowsCount; i++) {
      arr.push(readArray())
  }
  return arr;
}
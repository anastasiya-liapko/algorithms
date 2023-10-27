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

class Edge {
  constructor(from, to, weight) {
    this.from = from,
    this.to = to,
    this.weight = weight
  }
}

class MinHeap {
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
  const edges = new MinHeap(); // Массив рёбер, исходящих из остовного дерева.

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
  var arr = _inputLines[_curLine].trim().split(" ").map(num => Number(num));
  _curLine++;
  return arr;
}

function readEdges(rowsCount) {
  var arr = [];
  for (let i = 0; i !== rowsCount; i++) {
      arr.push(readArray())
  }
  return arr;
}
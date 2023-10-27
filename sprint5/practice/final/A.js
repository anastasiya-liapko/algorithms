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

function heapsort(array, compare) {
  function siftUp(heap, index) {
    if (index === 1) {
      return;
    }
  
    const parentIndex = Math.floor(index / 2);
    if (compare(heap[parentIndex - 1], heap[index - 1]) < 0) {
      [heap[parentIndex - 1], heap[index - 1]] = [heap[index - 1], heap[parentIndex - 1]];
      siftUp(heap, parentIndex);
    }
  }
  
  function siftDown(heap, index) {
    const left = 2 * index + 1;
    const right = 2 * index + 2;
  
    if (left >= heap.length) {
      return;
    }
  
    let indexLargest = left;
    if (right < heap.length && compare(heap[left], heap[right]) < 0) {
      indexLargest = right;
    }
  
    if (compare(heap[index], heap[indexLargest]) < 0) {
      [heap[index], heap[indexLargest]] = [heap[indexLargest], heap[index]];
      siftDown(heap, indexLargest);
    }
  }
  
  function heapAdd(heap, value) {
    const index = heap.length + 1;
    heap.push(value);
    siftUp(heap, index);
  }
  
  function popMax(heap) {
    const result = heap[0];
    heap[0] = heap[heap.length - 1];
    heap.pop();
    siftDown(heap, 0);
    
    return result;
  }

  const heap = [];
  for (let item of array) {
    heapAdd(heap, item);
  }

  const sortedArray = [];
  while (heap.length > 0) {
    const max = popMax(heap);
    sortedArray.push(max);
  }

  return sortedArray;
} 

function compare(a, b) {
  if (a[1] !== b[1]) {
    return a[1] - b[1];
  }

  if (a[2] !== b[2]) {
    return b[2] - a[2];
  }

  return b[0].localeCompare(a[0]);
}

function sort(participants) {
  return heapsort(participants, compare).map(p => p[0]);
}

function solve() {
  const rows = readInt();
  const participants = readMatrix(rows);
    
  process.stdout.write(`${sort(participants).join('\n')}`);
}

function readInt() {
  const n = Number(_inputLines[_curLine]);
  _curLine++;
  return n;
}

function readParticipant() {
  const arr = _inputLines[_curLine].trim().split(" ").map(el => isNaN(el) ? el : +el);
  _curLine++;
  return arr;
}

function readMatrix(rowsCount) {
  const arr = [];
  for (let i = 0; i !== rowsCount; i++) {
    arr.push(readParticipant())
  }
  return arr;
}
/*
    ОТЧЕТ https://contest.yandex.ru/contest/23815/run-report/89988944/
    
    Пусть n - длина входного массива.

    -- ПРИНЦИП РАБОТЫ --
    Быстрая сортировка in-place. Опорный элемент выбирается случайным образом. Сортировка неустойчивая.
    1. В функцию быстрой сортировки передается сам массив, функция-компаратор и 2 указателя (начало и конец отрезка массива включительно).
    2. Находим опорный элемент случайным образом.
    3. Проходим по массиву с левого указателя пока не встретим элемент больше либо равный опорному.
    4. Проходим по массиву с правого указателя пока не встретим элемент меньше либо равный опорному.
    5. Если такие элементы найдены, меняем их местами и смещаем указатели дальше.
    6. Повторяем пока указатели не встретятся.
    7. Место встречи указателей делит массив на 2 отрезка. 
    8. Для каждого отрезка, чья длина > 1, рекурсивно вызываем функцию быстрой сортировки.
    9. Алгоритм повторяется пока массив не будет разделен на отрезки длиной <= 1.

    -- ВРЕМЕННАЯ СЛОЖНОСТЬ --
    Сложность = O(log(n)).
    В худшем случае алгоритм быстрой сортировки выполняется за O(n^2). Такой кейс возможен, если массив уже отсортирован и опорным выбирается первый или поледний элемент. В данном случае опорный элемент выбирается случайным образом, поэтому массив в среднем делится на равные части, соответственно глубина рекурсии в среднем log(n).

    -- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
    Сложность = 1 * log(n) = O(log(n)).
    Пространственная сложность определяется глубиной рекурсии и количеством необходимой дополнительной памяти на каждом рекурсивном вызове:
    – Каждый рекурсивный вызов функции расходует константную дополнительную память O(1). Мы не используем доп. память для записи промежуточного результата, а изменяем исходный массив.
    – Глубина рекурсии равна количеству рекурсивных вызовов функции и равна временной сложности алгоритма – O(log(n)). 
    Итого: 1 * log(n) = O(log(n)).
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

function random(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
}

function partition(array, compare, left, right) {
    const pivot = array[random(left, right)];
        
    while (left <= right) {
        while (compare(array[left], pivot) > 0) { 
            left++;
        } 
        
        while (compare(array[right], pivot) < 0) {
            right--;
        }
        
        if (left <= right) {
            [array[left], array[right]] = [array[right], array[left]];
            left++;
            right--;
        }
    }
    
  return left;
}

function quicksort(array, compare, left = 0, right = array.length - 1) {
    const pivotIndex = partition(array, compare, left, right);

    if (left < pivotIndex - 1) {
        quicksort(array, compare, left, pivotIndex - 1);
    }

    if (right > pivotIndex) {
        quicksort(array, compare, pivotIndex, right);
    }
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
    quicksort(participants, compare);
    return participants.map(p => p[0]);
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

function readArray() {
    const arr = _inputLines[_curLine].trim().split(" ").map(el => isNaN(el) ? el : +el);
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
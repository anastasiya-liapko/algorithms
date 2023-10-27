/*
  https://contest.yandex.ru/contest/24414/run-report/90561470/
  
  Пусть n - длина входного массива.

  -- ПРИНЦИП РАБОТЫ --
  Хеш-таблица. 
  - Разрешение коллизий с помощью однонаправленного списка.
  - Вычисление номера корзины путем вычисления остатка от деления ключа на количество корзин.
  - Количество корзин – любое простое число (во избежание общих делителей у ключа и количества корзин).

  -- ВРЕМЕННАЯ СЛОЖНОСТЬ --
  Сложность = O(n).
  Всего n операций. Каждая операция выполняется за O(1) в среднем.
  - Поиск элемента:
    - В лучшем случае – O(1), если элемент первый в корзине. 
    - В худшем случае – за O(n), если элемент последний в корзине и все элементы записались в одну корзину (придется пройтись по всему однонаправленному списку).
  - Вставка элемента O(1) всегда. Всегда вставляем элемент на первое место в корзине.
  - Удаление:
    - В лучше случае – O(1), если элемент первый в корзине. 
    - В худшем случае – за O(n), если элемент последний в корзине и все элементы записались в одну корзину (придется пройтись по всему однонаправленному списку).
  
  -- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
  Сложность = n - 30011 = O(n).
  Размер хеш-таблицы константный - 30011. Доп. память используется, если элементов больше, чем размер хеш-таблицы.
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
  constructor(key, value, next) {
  	this.key = key;
    this.value = value;
    this.next = next;
  }
}

class SinglyLinkedList {
  constructor(v) {
    this.list = v;
    this.default = v;
  }

  find(key) {
    let prev = this.default;
  	let found = this.list;

    while (found?.key !== key && found?.next) {
      prev = found;
      found = found.next;
    }
    
    if (found?.key === key) {
    	return [prev, found];
    } else {
    	return [this.default, this.default]
    }
  }

  put(key, value) {
    const [prev, found] = this.find(key);
        
    if (found) {
      found.value = value;
    } else {
      const node = new Node(key, value, this.default);
      node.next = this.list;
      this.list = node;
    }

    return this;
  }

  get(key) {
    const [prev, found] = this.find(key);
        
    if (found) {
      return found.value;
    } else {
      return this.default;
    }
  }

  delete(key) {
    const [prev, found] = this.find(key);
        
    if (found) {
      const value = found.value;
        
      if (prev) {
        prev.next = found.next;
      } else {
        this.list = found.next;
      }
        
      return [this, value];
    } else {
      return [this, this.default];
    }
  }
}

class HashTable {
  static NOT_FOUND_MESSAGE = "None";

  constructor(n, v) {
    this.table = new Array(n).fill(v);
    this.size = n;
    this.default = v;
  }
  
  countHash(key) {
  	return Math.abs(key) % this.size;
  }

  put(key, value) {
    const hash = this.countHash(key);
    let list = this.table[hash];

    if (!list) {
      list = new SinglyLinkedList(this.default);
    }

    this.table[hash] = list.put(key, value);
  }

  get(key) {
    const hash = this.countHash(key);
    const list = this.table[hash];

    if (list) {
      const value = list.get(key);

      if (value !== this.default) {
        return value;
      }
    }

    return HashTable.NOT_FOUND_MESSAGE;
  }

  delete(key) {
    const hash = this.countHash(key);
    const list = this.table[hash];

    if (list) {
      const [newList, value] = list.delete(key);
      this.table[hash] = newList;

      if (value !== this.default) {
        return value;
      }
    }

    return HashTable.NOT_FOUND_MESSAGE;
  }
}

function getResponse(commands) {
  const SIZE = 30011; // любое простое число
  const DEFAULT = null;
  
  const hashTable = new HashTable(SIZE, DEFAULT);
  const result = [];
  
  for (let i = 0; i < commands.length; i++) {
    const [command, key, value] = commands[i].split(" ");
  
    const response = hashTable[command](key, value);
        
    if (response !== undefined) {
      result.push(response);
    }
  }
  
  return result;
}

function solve() {
  const rows = readInt();
  const commands = readCommands(rows);
  
  process.stdout.write(`${getResponse(commands).join('\n')}`);
}

function readInt() {
  const n = Number(_inputLines[_curLine]);
  _curLine++;
  return n;
}

function readString() {
  const s = _inputLines[_curLine];
  _curLine++;
  return s;
}

function readCommands(rowsCount) {
  const arr = [];
  for (let i = 0; i !== rowsCount; i++) {
      arr.push(readString())
  }
  return arr;
}
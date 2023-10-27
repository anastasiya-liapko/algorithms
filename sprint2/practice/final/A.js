/*
    ОТЧЕТ https://contest.yandex.ru/contest/22781/run-report/89588407/

    Пусть n - длина входного массива команд,
          k - длина дека.

    -- ПРИНЦИП РАБОТЫ --
    Реализация с использованием кольвого буфера deque. Имеем 2 указателя: head для добавления и удаления с начала буфера, tail - для добавления и удаления с конца буфера. 
    При инициализации head указывает на первую ячейку буфера, tail - на вторую ячейку буфера. Указатели никогда не пересекаются и всегда указывают на следующую свободную для добавления ячейку. 
    При добавлении записываем элемент в ту ячейку, на которую ссылается указатель и смещаем указатель на следущую ячейку. 
    При удалении - смещаем указатель на предыдущую ячейку и удаляем элемент из этой ячейки.

    -- ВРЕМЕННАЯ СЛОЖНОСТЬ --
    Сложность = O(n).
    Реализован 1 цикл длиной n для прохода по массиву команд. Любая операция добавления и удаления элемента занимает константное время O(1).

    -- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
    Доп. память = k.
    Сложность = n + Доп. память = n + k = O(n).
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

class Deque {
  constructor(n, v) {
    this.deque = new Array(n).fill(v);
    this.max_n = n;
    this.head = 0;
    this.tail = 1;
    this.length = 0;
  }

  is_empty() {
    return this.length === 0;
  }
  
  is_full() {
    return this.length === this.max_n;
  }
  
  push_back(x) {
    if (this.is_full()) {
      return "error";
    }
      
    this.deque[this.tail] = x;
    this.tail = (this.tail + 1) % this.max_n;
    this.length += 1;
  }
  
  push_front(x) {
    if (this.is_full()) {
      return "error";
    }
      
    this.deque[this.head] = x;
    this.head = (this.head - 1 + this.max_n) % this.max_n;
    this.length += 1;
  }

  pop_back() {
    if (this.is_empty()) {
      return "error";
    }
      
    this.tail = (this.tail - 1 + this.max_n) % this.max_n;
    const x = this.deque[this.tail];
    this.deque[this.tail] = null;
    this.length -= 1;
    
    return x;
  }
  
  pop_front() {
    if (this.is_empty()) {
      return "error";
    }
      
    this.head = (this.head + 1) % this.max_n;
    const x = this.deque[this.head];
    this.deque[this.head] = null;
    this.length -= 1;
    
    return x;
  }
}

function getResponse(commands, size) {
    const DEFAULT_DEQUE_VALUE = null;
    const deque = new Deque(size, DEFAULT_DEQUE_VALUE);
    const result = [];
    
    for (let i = 0; i < commands.length; i++) {
    	const command = commands[i].split(" ");
        
        const response = deque[command[0]](command[1]);
        
        if (response !== undefined) {
        	result.push(response);
        }
    }
    
    return result;
}

function solve() {
    const rows = readInt();
    const size = readInt();
    const commands = readCommands(rows);
    
    process.stdout.write(`${getResponse(commands, size).join('\n')}`);
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
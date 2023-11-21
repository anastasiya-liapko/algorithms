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

function insert(string, index, substring) {
  let length = string.length;
  let shift = substring.length;
  if (index > length) {
      return string;
  }
  string = string.padEnd(length + shift);
  if (length > 0) {
      for (let i = length - 1; i >= index; i--) {
          string = string.substring(0, i + shift) + string.charAt(i) + string.substring(i + shift + 1);
      }
  }
  for (let i = 0; i < shift; i++) {
      string = string.substring(0, index + i) + substring.charAt(i) + string.substring(index + i + 1);
  }

  return string;
} 


function getResponse(string, strings) {
  strings.sort((a, b) => b[1] - a[1]);
  for (let i = 0; i < strings.length; i++) {
    string = insert(string, strings[i][1], strings[i][0]);
  }

  return string;
}

function solve() {
  const string = readString();
  const n = readInt();
  const strings = readMatrix(n);
  
  process.stdout.write(`${getResponse(string, strings)}`);
}

function readInt() {
  const n = Number(_inputLines[_curLine]);
  _curLine++;
  return n;
}

function readString() {
  const s = _inputLines[_curLine].trim().split(" ");
  _curLine++;
  return s;
}

function readArray() {
  const s = _inputLines[_curLine].trim().split(" ");
  _curLine++;
  return s;
}

function readMatrix(rowsCount) {
  const arr = [];
  for (let i = 0; i !== rowsCount; i++) {
      arr.push(readArray())
  }
  return arr;
}
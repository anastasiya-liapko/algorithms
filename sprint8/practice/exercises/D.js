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

function longestCommonPrefix(strs) {
  let prefix = strs.reduce((acc, str) => str.length < acc.length ? str : acc);
  
  for (let str of strs) {
      while (str.slice(0, prefix.length) != prefix) {
          prefix = prefix.slice(0, -1);
      }
  }
  return prefix.length;
};

function solve() {
  const n = readInt();
  const strings = readMatrix(n);
  
  process.stdout.write(`${longestCommonPrefix(strings)}`);
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

function readMatrix(rowsCount) {
  const arr = [];
  for (let i = 0; i !== rowsCount; i++) {
      arr.push(readString())
  }
  return arr;
}
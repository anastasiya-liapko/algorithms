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

function getResponse(days, costs) {
  if (costs.length < 2) {
    return 0;
  }

  let sum = 0;

  for (let i = 1; i < costs.length; i++) {
    if (costs[i] > costs[i - 1]) {
      sum += costs[i] - costs[i - 1]
    }
  }

  return sum;
}

function solve() {
  const days = readInt();
  const costs = readArray();
  
  process.stdout.write(`${getResponse(days, costs)}`);
}

function readInt() {
  const n = Number(_inputLines[_curLine]);
  _curLine++;
  return n;
}

function readArray() {
  const s = _inputLines[_curLine].trim().split(" ").map(el => Number(el));
  _curLine++;
  return s;
}
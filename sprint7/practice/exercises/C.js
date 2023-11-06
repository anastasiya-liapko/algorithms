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

function getResponse(M, gold) {
  gold.sort((a, b) => b[0] - a[0]);

  let resWeight = 0;
  let resCost = 0;

  for (const [cost, weight] of gold) {
    if (M <= resWeight) break;

    const rest = M - resWeight;
    if (rest >= weight) {
      resWeight = resWeight + weight;
      resCost = resCost + (weight * cost);
    } else {
      resWeight = resWeight + rest;
      resCost = resCost + (rest * cost);
    }
  }

  return resCost;
}

function solve() {
  const M = readInt();
  const n = readInt();
  const gold = readMatrix(n);
  
  process.stdout.write(`${getResponse(M, gold)}`);
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

function readMatrix(rowsCount) {
  const arr = [];
  for (let i = 0; i !== rowsCount; i++) {
      arr.push(readArray())
  }
  return arr;
}
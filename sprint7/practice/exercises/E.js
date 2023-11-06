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

function getResponse(x, n, nominals) {
  const inf = Infinity;
  const F = new Array(x + 1);
  F[0] = 0;

  for (let i = 1; i <= x; i++) {
    F[i] = inf;
    for (let j = 0; j < n; j++) {
      if (i >= nominals[j] && F[i - nominals[j]] + 1 < F[i]) {
        F[i] = F[i - nominals[j]] + 1;
      }
    }
  }

  return F[x];
}

function solve() {
  const x = readInt();
  const n = readInt();
  const nominals = readArray();
  
  process.stdout.write(`${getResponse(x, n, nominals)}`);
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
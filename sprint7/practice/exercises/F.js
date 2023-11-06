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

function countJumps(n, k) {
  const M = 1000000007;
  const dp = new Array(n).fill(0);
  dp[0] = 1;

  for (let i = 1; i < n; i++) {
    for (let j = 1; j <= Math.min(k, i); j++) {
      dp[i] = (dp[i] + dp[i - j]) % M;
    }
  }

  return dp[n - 1];
}

function solve() {
  const [n, k] = readArray();
  
  process.stdout.write(`${countJumps(n, k)}`);
}

function readArray() {
  const s = _inputLines[_curLine].trim().split(" ").map(el => Number(el));
  _curLine++;
  return s;
}
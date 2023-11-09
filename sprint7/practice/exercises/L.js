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

function getResponse(n, m, weights) {
  const dp = (new Array(weights.length + 1)).fill().map(function(){ return new Array(m + 1).fill(0)});
  dp[0][0] = 1;
  let res = 0;

  for (let i = 1; i <= weights.length; i++) {
    for (let j = 0; j <= m; j++) {
        dp[i][j] = dp[i - 1][j];
        if (dp[i][j]) res = j

      if (weights[i] <= j && dp[i - 1][j - weights[i]]) {
          dp[i][j] = 1;
          res = j;
      }
    }
  }

  return res;
}

function solve() {
  const [n, m] = readArray();
  const weights = readArray();
  
  process.stdout.write(`${getResponse(n, m, weights)}`);
}

function readArray() {
  const s = _inputLines[_curLine].trim().split(" ").map(el => Number(el));
  _curLine++;
  return s;
}
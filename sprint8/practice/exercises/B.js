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

function lev01(a, b) {
  let la = a.length;
  let lb = b.length;
  let d = 0;
  switch (la - lb) {
    case 0: // mutation
      for (let i = 0; i < la; ++i) {
        if (a.charAt(i) != b.charAt(i) && ++d > 1) {
          return false;
        }
      }
      return true;
    case -1: // insertion
      for (let i = 0; i < la + d; ++i) {
        if (a.charAt(i - d) != b.charAt(i) && ++d > 1) {
          return false;
        }
      }
      return true;
    case +1: // deletion
      for (let i = 0; i < lb + d; ++i) {
        if (a.charAt(i) != b.charAt(i - d) && ++d > 1) {
          return false;
        }
      }
      return true;
  }
  return false;
}

function solve() {
  const s = readString();
  const t = readString();
  
  process.stdout.write(`${lev01(s, t) ? 'OK' : 'FAIL'}`);
}

function readString() {
  const s = _inputLines[_curLine].trim();
  _curLine++;
  return s;
}
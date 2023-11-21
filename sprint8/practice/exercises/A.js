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


function getResponse(sentence) {
  return sentence.reverse().join(' ');
}

function solve() {
  const sentence = readArray();
  
  process.stdout.write(`${getResponse(sentence)}`);
}

function readArray() {
  const s = _inputLines[_curLine].trim().split(" ");
  _curLine++;
  return s;
}
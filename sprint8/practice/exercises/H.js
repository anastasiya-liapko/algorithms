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

function getResponse(string, substring, replacer) {
  return string.split(substring).join(replacer);
}

function solve() {
  const string = readString();
  const substring = readString();
  const replacer = readString();
  
  process.stdout.write(`${getResponse(string, substring, replacer)}`);
}

function readString() {
  const s = _inputLines[_curLine].trim();
  _curLine++;
  return s;
}
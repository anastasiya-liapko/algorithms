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

function removeEvenIndexCharacters(s) {
  let new_string = "";

  for (var i = 0; i < s.length; i++) {
    if (s.charCodeAt(i) % 2 !== 0) {
      continue;
    }

    new_string += s[i];
  }

  return new_string;
}


function getResponse(s1, s2) {
  return removeEvenIndexCharacters(s1).localeCompare(removeEvenIndexCharacters(s2));
}

function solve() {
  const s1 = readString();
  const s2 = readString();
  
  process.stdout.write(`${getResponse(s1, s2)}`);
}

function readString() {
  const s = _inputLines[_curLine].trim();
  _curLine++;
  return s;
}
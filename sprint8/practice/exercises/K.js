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
  const s1New = removeEvenIndexCharacters(s2);
  const s2New = removeEvenIndexCharacters(s1);

  if (s1New === s2New) {
    return 0;
  } else {
    return s2New.localeCompare(s1New);
  }
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
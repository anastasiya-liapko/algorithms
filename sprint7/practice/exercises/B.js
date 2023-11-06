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

function compare(a, b) {
  if (a[1] !== b[1]) {
      return a[1] - b[1];
  }

  return a[0] - b[0];
}

function getResponse(lessons) {
  lessons.sort(compare);

  const schedule = [];
  let lastLessonEnd = 0;

  for (const lesson of lessons) {
    if (lesson[0] >= lastLessonEnd) {
      schedule.push(lesson.join(" "));
      lastLessonEnd = lesson[1];
    }
  }

  return [schedule.length, ...schedule];
}

function solve() {
  const count = readInt();
  const lessons = readMatrix(count);
  
  process.stdout.write(`${getResponse(lessons).join("\n")}`);
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
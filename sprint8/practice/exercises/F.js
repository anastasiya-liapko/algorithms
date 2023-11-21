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

function mostFrequentWord(words) { 
  // const words = 
  //     input.toLowerCase().match(/\b\w+\b/g); 
  const frequencyMap = new Map(); 
  for (const word of words) { 
      frequencyMap 
          .set(word, 
              (frequencyMap.get(word) || 0) + 1); 
  } 
  let mostFrequent = ""; 
  let maxFrequency = 0; 

  for (const [word, frequency] of frequencyMap)  
  { 
      if (frequency > maxFrequency) { 
        maxFrequency = frequency; 
        mostFrequent = word; 
      } else if (frequency === maxFrequency) {
        if (word < mostFrequent) {
          maxFrequency = frequency; 
          mostFrequent = word; 
        }
      }
  } 
  return mostFrequent; 
} 

function getResponse(strings) {
  return mostFrequentWord(strings);
}

function solve() {
  const n = readInt();
  const strings = readMatrix(n);
  
  process.stdout.write(`${getResponse(strings)}`);
}

function readInt() {
  const n = Number(_inputLines[_curLine]);
  _curLine++;
  return n;
}

function readString() {
  const s = _inputLines[_curLine].trim();
  _curLine++;
  return s;
}

function readMatrix(rowsCount) {
  const arr = [];
  for (let i = 0; i !== rowsCount; i++) {
      arr.push(readString())
  }
  return arr;
}
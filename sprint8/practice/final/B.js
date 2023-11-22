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

class Node {
  constructor(value) {
    this.value = value
    this.isEndOfWord = false // false by default, a green node means this flag is true
    this.children = {}
  }
}

class Trie {
  constructor(){
    this.root = new Node(null)
  }

  insert(word){
    let current = this.root;

    for (let character of word) {
      if (current.children[character] === undefined) {
        current.children[character] = new Node(character)
      }

      current = current.children[character]  
    }

    current.isEndOfWord = true
  }
 
  search(word){
    let current = this.root;

    for (let character of word) {
      if (current.children[character] === undefined) {
        return false
      }

      current = current.children[character]  
   }

   return current.isEndOfWord
 }
}

function getResponse(string, words) {
  const trie = new Trie();

  for (let word of words) {
    trie.insert(word);
  }

  let word = '';

  for (let i = 0; i < string.length; i++) {
    word += string[i];
    console.log(word);
    console.log(trie.search(word))
    if (trie.search(word)) {
      word = '';
    }
  }

  return !word ? 'YES' : 'NO';
}

function solve() {
  const string = readString();
  const n = readInt();
  const words = readStrings(n);
  
  process.stdout.write(`${getResponse(string, words)}`);
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

function readStrings(rowsCount) {
  const arr = [];
  for (let i = 0; i !== rowsCount; i++) {
      arr.push(readString())
  }
  return arr;
}
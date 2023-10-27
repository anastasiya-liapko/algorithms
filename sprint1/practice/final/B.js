/*
    ОТЧЕТ https://contest.yandex.ru/contest/22450/run-report/89568638/

    Пусть n - длина входного массива,
          k - длина вспомогательного массива для хранения количества одинаковых цифр. Она постоянна и равна 9.

    -- ПРИНЦИП РАБОТЫ --
    В алгоритме 2 цикла: 
        - один для прохода по выведенным в тренажере значениям и подсчета одинаковых цифр, 
        - второй для прохода по массиву с подсчитанным количеством одинаковых цифр и подсчета очков.

    -- ВРЕМЕННАЯ СЛОЖНОСТЬ --
    Проходим 1 раз по входному массиву длиной n и 1 раз по вспомогательному массиву длиной k.
    Сложность = n + k = O(n).

    -- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
    Доп. память = k.
    Сложность = n + Доп. память = n + k = O(n).
*/

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

function getPoints(k, symbols) {
    const MAX_NUMBER = 9;
    const NUMBER_OF_PLAYERS = 2;
    const totalK = NUMBER_OF_PLAYERS * k;

    const entriesByNumbers = new Array(MAX_NUMBER).fill(0);
    
    for (let i = 0; i < symbols.length; i++) {
    	const symbol = symbols[i];
        
        if (symbol !== ".") {
        	entriesByNumbers[symbol - 1] += 1;
        }
    }
    
    const points = entriesByNumbers.reduce((accumulator, current) => {
    	if (current && current <= totalK) {
        	accumulator += 1
        }
        
        return accumulator;
    }, 0);
    
    return points;
}

function solve() {
	const ROWS = 4;
    const k = readInt();
    const symbols = readMatrix(ROWS);
    
    process.stdout.write(`${getPoints(k, symbols)}`);
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}

function readArray() {
    const arr = _inputLines[_curLine].trim().split("");
    _curLine++;
    return arr;
}

function readMatrix(rowsCount) {
    let arr = [];
    for (let i = 0; i !== rowsCount; i++) {
        arr = arr.concat(readArray())
    }
    return arr;
}
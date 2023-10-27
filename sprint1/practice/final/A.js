/*
    ОТЧЕТ https://contest.yandex.ru/contest/22450/run-report/89567960/

    Пусть n - длина входного массива.

    -- ПРИНЦИП РАБОТЫ --
    Использовала метод 2-ух указателей. С одной разницей - цикл заканчивается не при встрече указателей, а после полного прохождения входного массива.
    Получается, прошли весь входной массив дважды за один цикл.

    -- ВРЕМЕННАЯ СЛОЖНОСТЬ --
    Проходим по всему входному массиву длиной n 1 раз.
    Сложность = O(n)

    -- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
    Был использован дополнительный массив для хранения найденных растояний до пустых домов длиной n, 2 переменные для хранения растояния до ближайшего дома слева и справа, константа с дефолтным значением расстояния до ближайшего пустого участка.
    Доп. память = n + 3.
    Сложность = n + Доп. память = 2 * n + 3 = O(n). 
    (Пользовалась информацией из этой статьи https://dzen.ru/a/ZD5Y85AwdmeIlqAr?utm_referer=www.google.com)
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

function getDistances(houses) {
    const DEFAULT_DISTANCE = null;
    const distances = new Array(houses.length).fill(DEFAULT_DISTANCE);

    let leftDistance = null;
    let rightDistance = null;
    
    for (let left = 0; left < houses.length; left++) {
    	const right = houses.length - left - 1;
    
    	if (houses[left] === 0) {
        	leftDistance = 0;
        }
        
        
        if (houses[right] === 0) {
        	rightDistance = 0;
        }
        
        if (leftDistance !== null) {
        	if (distances[left] === null || leftDistance < distances[left]) {
        		distances[left] = leftDistance;
        	}
            
            leftDistance++;
        }
        
        if (rightDistance !== null) {
        	if (distances[right] === null || rightDistance < distances[right]) {
        		distances[right] = rightDistance;
        	}
            
            rightDistance++;
        }
    }
    
    return distances;
}

function solve() {
    const n = readInt();
    const houses = readArray();
    process.stdout.write(`${getDistances(houses).join(' ')}`);
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}

function readArray() {
    const arr = _inputLines[_curLine].trim().split(" ").map(num => Number(num));
    _curLine++;
    return arr;
}
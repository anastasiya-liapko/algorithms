/*
    ОТЧЕТ https://contest.yandex.ru/contest/22781/run-report/89625259/

    Пусть n - длина входного массива.

    -- ПРИНЦИП РАБОТЫ --
    Проходим по массиву входных данных:
    - если встречается число, записываем его на вершину стека (в качесве стека - массив stack),
    - если не число, вызываем функцию для вычисления арифметического выражения. Все функции предварительно записаны в объекте OPERATORS. Функция выбирается по типу оператора и вызывается с двумя параметрами. Параметры берутся с вершины стека. Результат вычисления записывается на вершину стека.

    -- ВРЕМЕННАЯ СЛОЖНОСТЬ --
    Сложность = O(n).
    Реализован 1 цикл длиной n для прохода по входному массиву.

    -- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
    Доп. память = (n + 1) / 2. - Для хранения в стеке операндов. В худшем случае нам придется занести в стек все операнды (если во входных данных сначала придут все операнды, а потом все операторы). Операндов всегда на один больше, чем операторов, поэтому количество операндов (n + 1) / 2.
    Сложность = n + Доп. память = n + ((n + 1) / 2) = (3n + 1) / 2 = O(n). - Коэффициэнты и константы в асимптотической оценке не учитываются, поэтому вид зависимости O(n).
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

function count(input) {
	const OPERATORS = {
    	"+": (b, a) => a + b,
        "-": (b, a) => a - b,
        "*": (b, a) => a * b,
        "/": (b, a) => Math.floor(a / b),
	}
	const stack = [];
    
    for (let i = 0; i < input.length; i++) {
    	if (isNaN(input[i])) {
        	const result = OPERATORS[input[i]](stack.pop(), stack.pop());
            stack.push(result);
        } else {
        	stack.push(+input[i]);
        }
    }
    
    return stack.pop();
}

function solve() {
    const input = readArray();
    process.stdout.write(`${count(input)}`);
}

function readArray() {
    const arr = _inputLines[_curLine].trim().split(" ");
    _curLine++;
    return arr;
}
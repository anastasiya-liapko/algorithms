/*
  ОТЧЕТ https://contest.yandex.ru/contest/24414/run-report/90565810/
  
  Пусть n - длина входного массива документов,
    N - количество слов в одном документе,
    m - длина входного массива поисковых запросов,
    M - количество слов в одном поисковом запросе.

  -- ПРИНЦИП РАБОТЫ --
  1. Строим 2 поисковых индекса:
    – Инвертированный индекс – таблица, где слову ставится в соответствие список документов, в которых оно встречается.
    – Прямой индекс - список документов, в котором каждому документу соответствует таблица, где слову из документа ставится в соответствие число его вхождений в документ.
  2. Проходим по поисковым запросам:
    – Итерируем только по уникальным словам из поискового запроса.
    – Пока инвертированный индекс возвращает документы, в которых встречается искомое слово, получаем из прямого индекса число вхождений искомого слова в документы и увеличиваем релевантность соответствующих документов.
  3. Форматируем результат поиска:
    – Сортируем по невозрастанию.
    – Берем первые 5 самых релевантных документов.
    – И возвращаем только индексы документов, без значения релевантности.

  -- ВРЕМЕННАЯ СЛОЖНОСТЬ --
  Сложность = O(n * N + m * M * n + m * n * log(n)).
  1. При построении поискового индекса нужно сделать O(n * N) итераций (вложенный цикл прохода по словам, умножаем):
    - Пройти по массиву документов – n.
    – Пройти по словам - N.
    - Добавление данных в инвертированный и поисковый индекс выполняется за константное время O(1) и во временной сложности не учитываются.
  2. При поиске документов нужно сделать O(m * M * n) итераций (вложенные циклы прохода по словам и документам, умножаем):
    - Пройти по входным запросам – m.
    – Пройти по словам (в худшем случае по всем словам (если есть дублирующиеся слова, итераций будет меньше)) - M.
    – Пройти по документам, в которых искомое слово встречается (в худшем случае пройти по всем документам) - n. 
  3. При форматировании результата нужно сделать O(m * n * log(n)) итераций (так же вложенный, умножаем):
    – Пройти по входным запросам – m.
    – Отсортировать результат по невозрастанию (в худшем случае слова будут найдены во всех документах) - n * log(n).
    – Выбор первых 5 релевантных документов, выбор только нормеров документов (без числа релевантности) и преобразование в строку выполнит 3 итерации по массиву из 5 элементов. Константное время во временной сложности не учитываем.

  -- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
  Сложность = O(n * N + n + m).
  1. При построении поискового индекса используется O(n * N) доп. памяти:
    – Хеш-таблица для хранения инвертированного индекса занимает в среднем O(n * N) доп. памяти. Есть 2 крайних случая:
      – Все слова в документах не уникальные и содержатся во всех документах. Потребуется N пар (key, value), где value будет размером n. Итого n * N.
      – Все слова в документах уникальные и содержаться только в одном из документов. Потребуется n * N пар (key, value), где value будет занимать константное значение памяти O(1). Итого n * N.
      – Итого (n * N + n * N) / 2 = n * N.
    – Прямой индекс занимает в среднем O(n * N) доп. памяти:
      – Для хранения списка документов потребуется n доп. памяти.
      – Для каждого документа из списка потребуется N доп. памяти для хранения хеш-таблицы (количество вхождений слова в документ). Он состоит из пар (key, value), где value занимает константное значение памяти O(1).
      – Итого n * N.
    – Итого 2 * n * N = n * N (константы в оценке не учитываем).
  2. При поиске документов используется O(n) доп. памяти:
    – Используется дополнительный ассоциативный массив для хранения и подсчета релевантности документов (в худшем случае слова будут найдены во всех документах) – n.
    – Ассоциативный массив хранит пары (key, value), где value будет занимать константное значение памяти O(1).
    – Итого n.
  3. При форматировании результата используется O(m) доп. памяти:
    – Используется массив, который хранит список релевантных документов для каждого поискового запроса (в худшем случае все документы подходят) - m;
    – Список релевантных документов всегда не больше 5.
    – Итого 5 * m = m (константы в оценке не учитываем).

  ------------------------------------

  – Пользовалась статьей из википедии о поисковых индексах https://ru.wikipedia.org/wiki/%D0%9F%D0%BE%D0%B8%D1%81%D0%BA%D0%BE%D0%B2%D1%8B%D0%B9_%D0%B8%D0%BD%D0%B4%D0%B5%D0%BA%D1%81
  – Статьей сравнивающей производительность итераторов https://web.archive.org/web/20170403221045/https://blogs.oracle.com/greimer/entry/best_way_to_code_a
  - И статьей сравнивающей производительнось object vs map https://www.zhenghao.io/posts/object-vs-map
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

function compare([docNum1, score1], [docNum2, score2]) {
	return score2 !== score1 ? score2 - score1 : docNum1 - docNum2;
}

function createSearchIndex(documents) {
  const invertedIndex = new Map();
  const straightIndexList = [];
    
  for (let i = 0, len = documents.length; i < len; i++) {
    const straightIndex = new Map();
      
    const words = documents[i].split(" ");
      
    for (let j = 0, len = words.length; j < len; j++) {
      const word = words[j];
        
      if (invertedIndex.has(word)) {
        invertedIndex.set(word, invertedIndex.get(word).add(i));
      } else {
        invertedIndex.set(word, new Set([i]));
      }
          
      if (straightIndex.has(word)) {
        straightIndex.set(word, straightIndex.get(word) + 1);
      } else {
        straightIndex.set(word, 1);
      }
    }
    
    straightIndexList.push(straightIndex);
  }
  
  return [invertedIndex, straightIndexList];
}

function getResponse(documents, requests) {
	const RELEVANT_LIMIT = 5;
	const [invertedIndex, straightIndexList] = createSearchIndex(documents);
  const result = [];
    
  for (let i = 0, len = requests.length; i < len; i++) {
    const relevant = {}; // объект произодительней map, когда ключи целые числа до 10^4 (https://www.zhenghao.io/posts/object-vs-map)
      
    const words = new Set(requests[i].split(" ")); // проходим только по уникальным словам из запроса
      
    for (let word of words) { // for .. of loop для прохода по коллекции set
      if (invertedIndex.has(word)) {
        for (let document of invertedIndex.get(word)) { // for .. of loop для прохода по коллекции set
          const wordEntries = straightIndexList[document].get(word);
          relevant[document] = (relevant[document] || 0) + wordEntries;
        }
      }
    }
      
    const mostRelevant = Object.entries(relevant)
      .sort(compare) // сортируем по невозрастанию
      .slice(0, RELEVANT_LIMIT) // берем первые RELEVANT_LIMIT элементов
      .map(([a, b]) => a = +a + 1) // берем только номер документа + 1 (для вывода счет документов начинается с 1)
      .join(" "); // преобразуем в строку
    
    result.push(mostRelevant);
  }
  
  return result;
}

function solve() {
  const documentsRows = readInt();
  const documents = readStrings(documentsRows);
  const requestsRows = readInt();
  const requests = readStrings(requestsRows);
  
  process.stdout.write(`${getResponse(documents, requests).join('\n')}`);
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
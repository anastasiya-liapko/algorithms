function merge_sort(arr, left, right) {
  const sorted = sort(arr.slice(left, right));

  let j = 0;
  for (let i = left; i < right; i++) {
    arr[i] = sorted[j];
    j++;
  }
}

function sort(arr) {
  if (arr.length == 1) { // базовый случай рекурсии
    return arr;
  }

  // запускаем сортировку рекурсивно на левой половине
  const left = sort(arr.slice(0, Math.floor(arr.length / 2)));

  // запускаем сортировку рекурсивно на правой половине
  const right = sort(arr.slice(Math.floor(arr.length / 2)));

  return merge([...left, ...right], 0, left.length, left.length + right.length);
}

function merge(arr, left, mid, right) {
	// заводим массив для результата сортировки
  const result = new Array(arr.length).fill(0);
  const leftArr = arr.slice(left, mid);
  const rightArr = arr.slice(mid, right);

  // сливаем результаты
  let l = 0, r = 0, k = 0;
  while (l < leftArr.length && r < rightArr.length) {
    // выбираем, из какого массива забрать минимальный элемент
    if (leftArr[l] <= rightArr[r]) {
      result[k] = leftArr[l];
      l++;
    } else {
      result[k] = rightArr[r];
      r++;
    }
    k++;
  }

  // Если один массив закончился раньше, чем второй, то
  // переносим оставшиеся элементы второго массива в результирующий
  while (l < leftArr.length) {
    result[k] = leftArr[l]; // перенеси оставшиеся элементы left в result
    l++;
    k++;
  }
  while (r < rightArr.length) {
    result[k] = rightArr[r]; // перенеси оставшиеся элементы right в result
    r++;
    k++;
  }

  return result;
}

function test() {
	var a = [1, 4, 9, 2, 10, 11];
	var b = merge(a, 0, 3, 6);
	var expected = [1, 2, 4, 9, 10, 11];

	var c = [1, 4, 2, 10, 1, 2];
	merge_sort(c, 0, 6)
	expected = [1, 1, 2, 2, 4, 10];
}
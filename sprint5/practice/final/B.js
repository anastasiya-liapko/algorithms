/*
  ОТЧЕТ https://contest.yandex.ru/contest/24810/run-report/92114274/
  
  Пусть n – количество нод в дереве.
  Тогда пусть h - высота дерева из n нод.
    – В лучшем случае h = log(n), если дерево сбалансированное
    – В худшем случае h = n, если дерево вырожденное

  -- ПРИНЦИП РАБОТЫ --
  1. Находим удаляемый узел с помощью рекурсивного обхода дерева.
  2. Если не нашли, возвращаем null.
  3. Если нашли:
    a. Если у удаляемого узла нет собственных детей, просто удаляем узел.
    b. Если у удаляемого узла 1 ребенок, вместо удаляемого узла записываем ребенка.
    c. Если у удаляемого узла 2 ребенка, в левом поддереве находим крайнего правого ребенка. Значение крайнего правого ребенка записываем в удаляемый узел, а крайнего правого ребенка удаляем.

  -- ВРЕМЕННАЯ СЛОЖНОСТЬ --
  Сложность = O(h).
  В худшем случае мы обойдем все дерево по высоте h от корня до листа, если встретится кейс 3с.

  -- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
  Сложность = O(1) * O(h) = O(h).
  1. Доп. память на каждом шаге рекурсии не используется – O(1).
  2. Количество рекурсивных вызовов равно высоте дерева – O(h).
*/

// class Node {
//   constructor(value, left = null, right = null) {
//     this.value = value;
//     this.left = left;
//     this.right = right;
//   }
// }

function findMaxNode(node) {
  if (node.right === null) {
    return node;
  } else {
    return findMaxNode(node.right);
  }     
}
  
function remove(node, key) {
  if (node === null) { // удаляемый узел не найден
    return null;
  } else if (key < node.value) { // удаляемый узел в левом поддереве
    node.left = remove(node.left, key);
    return node;
  } else if (key > node.value) { // удаляемый узел в правом поддереве
    node.right = remove(node.right, key);
    return node;
  } else { // удаляемый узел найден
    if (node.left === null && node.right === null) { // у удаляемого узла нет детей
      node = null;
      return node;
    } else if (node.left === null) { // у удаляемого узла есть только левый ребенок
      node = node.right;
      return node;
    } else if (node.right === null) { // у удаляемого узла есть только правый ребенок
      node = node.left;
      return node;
    } else { // у удаляемого узла есть и левый, и правый ребенок
      const tmp = findMaxNode(node.left);
      node.value = tmp.value; // заменяем удаляемый узел крайним правым узлом левого ребенка
  
      node.left = remove(node.left, tmp.value); // удаляем крайний правый узел левого ребенка
      return node;
    }
  }
}
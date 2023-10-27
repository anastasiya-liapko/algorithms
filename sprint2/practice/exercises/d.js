/*
Comment it before submitting
class Node {  
  constructor(value = null, next = null) {  
    this.value = value;  
    this.next = next;  
  }  
}
*/

function get_idx_by_value(node, value) {
  let idx = 0;
  while (node) {
    if (node.value === value) {
      return idx;
    }
    node = node.next;
    idx++;
  }

  return -1;
}

function solution(node, elem) {
  // Your code
  const found = get_idx_by_value(node, elem);
  return found;
}

function test() {
  var node3 = new Node("node3");
  var node2 = new Node("node2", node3);
  var node1 = new Node("node1", node2);
  var node0 = new Node("node0", node1);
  var idx = solution(node0, "node2");
  // result is idx === 2
}
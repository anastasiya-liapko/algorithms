/*
Comment it before submitting
class Node {  
  constructor(value = null, next = null) {  
    this.value = value;  
    this.next = next;  
  }  
}
*/

function get_node_by_index(node, idx) {
  while (idx) {
    node = node.next;
    idx -= 1;
  }
  return node;
}

function solution(node, idx) {
  // Your code
  if (idx === 0) {
    return node.next;
  }
  const previous_node = get_node_by_index(node, idx - 1);
  const next_node = get_node_by_index(node, idx);
  previous_node.next = next_node.next;
  return node;
}

function test() {
  var node3 = new Node("node3");
  var node2 = new Node("node2", node3);
  var node1 = new Node("node1", node2);
  var node0 = new Node("node0", node1);
  var newHead = solution(node0, 1);
  // result is node0 -> node2 -> node3
}
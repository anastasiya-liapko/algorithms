if (process.env.REMOTE_JUDGE !== 'true') {
    class CNode {
        constructor(value) {
            this.value = value;
            this.left = null;
            this.right = null;
        }
    }
}

let max = 0;

function iterate(node) {
    if (!node) {
        return;
    }

    max = node.value > max ? node.value : max;

    iterate(node.left);
    iterate(node.right);
}

function solution(root) {
    iterate(root);
    return max;
}

function test() {
    var node1 = new CNode(1);
    var node2 = new CNode(-5);
    var node3 = new CNode(3);
    node3.left = node1;
    node3.right = node2;
    var node4 = new CNode(2);
    node4.left = node3;
    console.assert(solution(node4) === 3);
}
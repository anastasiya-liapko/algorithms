if (process.env.REMOTE_JUDGE !== 'true') {
    class CNode {
        constructor(value) {
            this.value = value;
            this.left = null;
            this.right = null;
        }
    }
}

function iterate(node) {
    if (node == null) {
        return 0;
    }
        
    return Math.max(iterate(node.left), iterate(node.right)) + 1;
}

function res(root) {
    if(root == null) {
        return true;
    }

    const left = iterate(root.left);
    const right = iterate(root.right);

    if ((Math.abs(left - right) <= 1) && res(root.left) === true && res(root.right) === true) {
        return true;
    }

    return false;
}

function solution(root) {
    return res(root);
}

function test() {
    var node1 = new CNode(1);
    var node2 = new CNode(-5);
    var node3 = new CNode(3);
    node3.left = node1;
    node3.right = node2;
    var node4 = new CNode(10);
    var node5 = new CNode(2);
    node5.left = node3;
    node5.right = node4;
    console.log(solution(node5));
}
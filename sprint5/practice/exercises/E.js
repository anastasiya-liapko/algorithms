if (process.env.REMOTE_JUDGE !== 'true') {
    class CNode {
        constructor(value, left = null, right = null) {
            this.value = value;
            this.left = left;
            this.right = right;
        }
    }
}

function solution(root) {
    const helper = (node, min, max) => {
        if (!node) return true
        if (node.value <= min || node.value >= max) return false
        return helper(node.left, min, node.value) && helper(node.right, node.value, max)
    }
    return helper(root, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)
}

function test() {
    var node1 = new CNode(1, null, null);
    var node2 = new CNode(4, null, null);
    var node3 = new CNode(3, node1, node2);
    var node4 = new CNode(8, null, null);
    var node5 = new CNode(5, node3, node4);
    console.assert(solution(node5));
    node4.value = 5;
    console.assert(!solution(node5));
}
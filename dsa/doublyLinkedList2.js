class Node {
    constructor(value) {
        this.val = value;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
    }

    arrayToDoublyLinkedList(arr) {
        if (arr.length === 0) {
            this.head = null;
            return;
        }

        let head = new Node(arr[0]);
        let current = head;
        for (let i = 1; i < arr.length; i++) {
            let node = new Node(arr[i]);
            current.next = node;
            node.prev = current;
            current = node;
        }
        this.head = head;
    }

    addAt(pos, val) {
        if (pos < 0 || pos > this.size()) {
            console.error("Invalid position");
            return null;
        }

        let newNode = new Node(val);

        if (pos === 0) {
            newNode.next = this.head;
            if (this.head !== null) {
                this.head.prev = newNode;
            }
            this.head = newNode;
        } else {
            let current = this.head;
            for (let i = 0; i < pos; i++) {
                current = current.next;
            }

            newNode.next = current.next;
            newNode.prev = current;
            if (current.next !== null) {
                current.next.prev = newNode;
            }
            current.next = newNode;
        }
    }
    deleteAt(pos) {
        if (pos < 0 || pos >= this.size()) {
            console.error("Invalid position");
            return null;
        }
        if (pos === 1) {
            this.head = this.head.next;
            if (this.head !== null) {
                this.head.prev = null;
            }
        }
        else {
            let current = this.head;
            for (let i = 1; i < pos - 1; i++) {
                current = current.next;
            }
            current.next = current.next.next;
            if (current.next !== null) {
                current.next.prev = current;
            }
        }
    }
    reverse() {
        const arr = [];
        let current = this.head;
        while (current !== null) {
            arr.push(current.val);
            current = current.next;
        }
        this.head = null;
        for (let i = arr.length - 1; i >= 0; i--) {
            const newNode = new Node(arr[i]);
            if (this.head === null) {
                this.head = newNode
            } else {
                let current = this.head;
                while (current.next !== null) {
                    current = current.next;
                }
                current.next = newNode
            }
        }

    }
    size() {
        let count = 0;
        let curr = this.head;
        while (curr) {
            curr = curr.next;
            count++;
        }
        return count;
    }

    print() {
        let current = this.head;
        while (current) {
            console.log(current.val);
            current = current.next;
        }
    }
}

const doublyLinkedList = new DoublyLinkedList();
doublyLinkedList.arrayToDoublyLinkedList([2, 4, 5]);
doublyLinkedList.addAt(2, 6);
doublyLinkedList.addAt(0, 1);
doublyLinkedList.print();
doublyLinkedList.deleteAt(2);
console.log("-----")
// doublyLinkedList.addAt(5, 7); // Adding at the end
doublyLinkedList.print();
console.log("=------prev-----=")
doublyLinkedList.reverse()
doublyLinkedList.print();

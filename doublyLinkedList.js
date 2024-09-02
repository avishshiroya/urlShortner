class Node {
    constructor(data) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
    }

    addFirst(data) {
        let newNode = new Node(data);
        newNode.next = this.head;
        if (this.head) {
            this.head.prev = newNode;
        }
        this.head = newNode;
    }

    addLast(data) {
        let newNode = new Node(data);
        if (!this.head) {
            this.head = newNode
            return;
        }
        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        newNode.prev = current;
        current.next = newNode;
    }
    size() {
        let count = 0;
        let current = this.head;
        while (current) {
            count++;
            current = current.next;
        }
        return count;
    }
    addAt(index, data) {
        let newNode = new Node(data);
        if (index < 0 || index > this.size()) {
            throw new Error("Index out of bounds");
        }
        if (index === 0) {
            this.next = this.head;
            if (this.head === null) {
                this.head.prev = newNode;
            }
            this.head = newNode;
        }
        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        newNode.prev = current;
        newNode.next = current.next;
        if (current.next) {
            current.next.prev = newNode;
        }
        current.next = newNode;
    }
    removeFirst() {
        if (!this.head) {
            return;
        }
        this.head = this.head.next;
        if (this.head) {
            this.head.prev = null;
        }
    }

    removeLast() {
        if (!this.head) {
            return;
        }
        if (!this.head.next) {
            return;
            this.head = null;
        }
        let current = this.head;
        while (current.next.next) {
            current = current.next;
        }
        current.next = null;
    }

    removeAt(index) {
        if (index < 0 || index > this.size()) {
            throw new Error("Index out of bounds");
        }
        if (index === 0) {
            if (!this.head) {
                return;
            }
            this.head = this.head.next;
            if (this.head) {
                this.head.prev = null;
            }
        }
        let current = this.head;
        for (let i = 0; i < index - 1; i++) {
            current = current.next;
        }
        if (current.next) {
            current.next = current.next.next;
            if (current.next) {
                current.next.prev = current;
            }
        }
    }

    print() {
        let temp = this.head;
        while (temp) {
            console.log(temp.data);
            temp = temp.next;
        }
    }
}

const doublyLinkedList = new DoublyLinkedList();

doublyLinkedList.addFirst(5);
doublyLinkedList.addFirst(3);
doublyLinkedList.addFirst(8);
doublyLinkedList.addLast(6);
doublyLinkedList.addAt(2,2);

doublyLinkedList.removeFirst();
doublyLinkedList.removeLast();
doublyLinkedList.removeAt(1);

doublyLinkedList.print();
console.log("LinkedList Size == ", doublyLinkedList.size());
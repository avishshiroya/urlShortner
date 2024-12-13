class Node {
    constructor(value, next = null) {
        this.val = value;
        this.next = next;
    }
}
class LinkedList {
    constructor() {
        this.head = null;
    }
    arrayToLinkedList(arr) {
        let head = new Node(arr[0]);
        let current = head;
        for (let i = 1; i < arr.length; i++) {
            current.next = new Node(arr[i]);
            current = current.next;
        }
        this.head = head;
    }
    linkedListToArray() {
        let arr = [];
        let current = this.head;
        while (current) {
            arr.push(current.val);
            current = current.next;
        }
        console.log(arr)
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
    removelast() {
        if (!this.head) return null;
        if (!this.head.next) {
            return null
        }
        let current = this.head;
        while (current.next.next) {
            current = current.next
        }
        current.next = null
    }
    removeFirst() {
        if (!this.head) return null;
        this.head = this.head.next;
    }
    removeAt(pos) {
        if (pos < 0 || pos > this.size()) return null;
        if (pos === 0) {
            this.head = this.head.next;
        }
        let current = this.head;
        for (let i = 1; i < pos - 1; i++) {
            current = current.next
        }
        current.next = current.next.next
    }
    addAt(pos, x) {
        if (pos < 0 || pos > this.size()) return null;
        let newNode = new Node(x);
        if (pos === 0) {
            newNode.next = this.head;
            this.head = newNode
        }
        let current = this.head
        for (let i = 1; i < pos - 1; i++) {
            current = current.next
        }
        newNode.next = current.next
        current.next = newNode
    }
    addAtLast(x) {
        const newNode = new Node(x)
        let current = this.head
        if (!current) {
            this.head = newNode
        } else {
            while (current.next) {
                current = current.next
            }
            current.next = newNode
        }
    }
    segregate() {
        if (!this.head || !this.head.next) {
            return this.head;
        }
        let oddHead = null;
        let evenHead = null;
        let oddTail = null;
        let evenTail = null;
        let current = this.head;
        while (current) {
            let nextNode = current.next;
            current.next = null;

            if (current.data % 2 === 0) {
                if (!evenHead) {
                    evenHead = current;
                    evenTail = current;
                } else {
                    evenTail.next = current;
                    evenTail = current;
                }
            } else {
                if (!oddHead) {
                    oddHead = current;
                    oddTail = current;
                } else {
                    oddTail.next = current;
                    oddTail = current;
                }
            }
            current = nextNode;
        }
        if (!oddHead) {
            return evenHead;
        }
        if (!evenHead) {
            return oddHead;
        }
        oddTail.next = evenHead;

        return oddHead;
    }
    addAtFirst(x) {
        const newNode = new Node(x)
        if (!this.head) {
            this.head = newNode
        } else {
            newNode.next = this.head
            this.head = newNode
        }
    }
    searchKey(n, val) {
        let current = this.head
        for (let i = 0; i < n; i++) {
            if (current.val === val) {
                return true
            }
            current = current.next
        }
        return false
        // while (current) {
        //     if (current.val === val) {
        //         return true
        //     }
        //     current = current.next
        // }
        // return false
    }
    reverse() {
        let prev = null
        let curr = this.head;
        while (curr !== null) {
            let temp = curr.next;
            curr.next = prev
            prev = curr
            curr = temp
        }
        this.head = prev
    }
}
const linkedList = new LinkedList();
const arr = [1, 2, 3, 4, 5];
const head = linkedList.arrayToLinkedList(arr);
// const linkedlistarr = linkedList.linkedListToArray()
// const removeLast = linkedList.removelast()
// const removeFirst = linkedList.removeFirst()
// const linkedlistarr2 = linkedList.linkedListToArray()
// const addAtLast = linkedList.addAtLast(6)
// const linkedlistarr3 = linkedList.linkedListToArray()
// const addAtFirst = linkedList.addAtFirst(6)
// const linkedlistarr4 = linkedList.linkedListToArray()
// const removeAt = linkedList.removeAt(3)
// const linkedlistarr5 = linkedList.linkedListToArray()
// const addAt = linkedList.addAt(3, 4)
// const reverse = linkedList.reverse()
console.log(linkedList.segregate())
const linkedlistarr6 = linkedList.linkedListToArray()
// console.log(linkedList.searchKey(3, 6))
// class Node {
//     constructor(data) {
//         this.data = data;
//         this.prev = null;
//         this.next = null;
//     }
// }

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

// const doublyLinkedList = new DoublyLinkedList();

// doublyLinkedList.addFirst(5);
// doublyLinkedList.addFirst(3);
// doublyLinkedList.addFirst(8);
// doublyLinkedList.addLast(6);
// doublyLinkedList.addLast(16);
// doublyLinkedList.addLast(26);
// doublyLinkedList.addLast(36);
// doublyLinkedList.addAt(2, 2);

// doublyLinkedList.removeFirst();
// doublyLinkedList.removeLast();
// doublyLinkedList.removeAt(1);

// doublyLinkedList.print();
// console.log("LinkedList Size == ", doublyLinkedList.size());


class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class CircularLinkedList {
    constructor() {
        this.head = null;
        this.length = 0;
    }

    addFirst(data) {
        const newNode = new Node(data);
        let current = this.head
        if (!current) {
            this.head = newNode;
            newNode.next = this.head;
        } else {
            while (current.next != this.head) {
                current = current.next;
            }
            current.next = newNode;
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length++
    }
    print() {
        let current = this.head;
        let size = this.length
        while (size > 0) {
            console.log(current.data);
            current = current.next;
            size--
        }
    }

    addLast(data) {
        const newNode = new Node(data)
        let current = this.head;
        if (!current) {
            this.head = newNode;
            newNode.next = this.head;
        } else {
            while (current.next != this.head) {
                current = current.next;
            }
            current.next = newNode;
            newNode.next = this.head;
        }
        this.length++;
    }
    size() {
        return this.length;
    }
    addAt(index, data) {
        const newNode = new Node(data);
        if (index > this.length || index < 0) {
            return "Index Out Of Bound !!";
        }
        else if (index === 0) {
            let current = this.head;
            this.head = newNode;
            if (this.head === null) {
                newNode.next = this.head;
            }
            newNode.next = current;
        } else if (index === this.length) {
            let current = this.head;
            let currentIndex = 0;
            while (currentIndex < index - 1) {
                current = current.next;
                currentIndex++;
            }
            current.next = newNode;
            newNode.next = this.head;
        } else {
            let current = this.head;
            let currentIndex = 0;
            while (currentIndex < index - 1) {
                current = current.next;
                currentIndex++;
            }
            let temp = current.next;
            current.next = newNode;
            newNode.next = temp;
        }
        this.length++;
    }
    removeFirst() {
        let current = this.head;
        if (this.length <= 0) {
            return "List is empty!!";
        }
        this.head = current.next;
        current = null;
        this.length--;
    }
    removeLast() {
        let current = this.head;
        if (this.length <= 0) {
            return "List is empty!!";
        }
        if (this.length === 1) {
            this.head = null;
        } else {
            let count = 0;
            while (count < this.length - 1) {
                current = current.next;
                count++;
            }
            current.next = this.head;
        }
        this.length--;
    }
    removeAt(index) {
        if (index > this.length - 1 || index < 0) {
            return "Index Out Of Bound !!";
        }
        if (index === 0) {
            this.removeFirst();
        }
        else if (index === this.length - 1) {
            this.removeLast();
        } else {
            let current = this.head;
            let currentIndex = 0;
            let prev;
            while (currentIndex < index) {
                prev = current;
                current = current.next;
                currentIndex++;
            }
            // console.log(current);
            prev.next = current.next;
            // console.log(prev,prev.next);
            this.length--;
        }
    }
    search(index) {
        if (index < 0 || index > this.length - 1) {
            return "Index Out Of Bound !!";
        }
        let current = this.head;
        let count = 0;
        while (count < index) {
            current = current.next;
            count++;
        }
        return current.data;
    }
}

// const circularLinkedList = new CircularLinkedList();
// circularLinkedList.addFirst(4);
// circularLinkedList.addFirst(5);
// circularLinkedList.addFirst(7);
// circularLinkedList.addLast(25);
// circularLinkedList.addLast(35);
// circularLinkedList.addLast(45);
// circularLinkedList.addLast(55);
// circularLinkedList.addLast(65);
// circularLinkedList.addAt(1, 10);
// circularLinkedList.removeFirst();
// circularLinkedList.removeLast();
// circularLinkedList.removeAt(2);
// circularLinkedList.print();

// console.log("total Size ==== ", circularLinkedList.size());
// console.log("Search at 3 ==== ", circularLinkedList.search(3));


//************  slow & fast pointer  ***********

// var middleNode = function (head) {
//     let slow = head;
//     let fast = head;

//     while (fast && fast.next) {
//         slow = slow.next;
//         fast = fast.next.next;
//     }
//     return slow;
// };

// console.log(middleNode(doublyLinkedList.head));


const isHappyNumber = (n) => {
    var visit = new Set();

    var getNextNumber = function (n) {
        var output = 0;

        while (n > 0) {
            var digit = n % 10;
            output += digit * digit;
            n = Math.floor(n / 10);
        }

        return output;
    };

    while (!visit.has(n)) {
        visit.add(n);
        n = getNextNumber(n);
        if (n === 1) {
            return true;
        }
    }

    return false;
}

// console.log(isHappyNumber(39));

// fibonacci with memoization
const fib = (num, preveiousValue = {}) => {
    if (preveiousValue[num] != null) {
        return preveiousValue[num];
    }
    let result;
    if (num <= 2) {
        result = 1;
    } else {
        result = fib(num - 1, preveiousValue) + fib(num - 2, preveiousValue);
    }
    preveiousValue[num] = result;
    return result;
}

// console.log(fib(40));
// console.log(fib(500));
// console.log(fib(5000));
// console.log(fib(5000));
// console.log(fib(5000));
// console.log(fib(5000));
// console.log(fib(5000));
// console.log(fib(5000));
// console.log(fib(5000));
// console.log(fib(5000));
// console.log(fib(5000));
// console.log(fib(5000));
// console.log(fib(5000));
// console.log(fib(5000));
// console.log(fib(5000));
// console.log(fib(5000));

class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

function reorderList(head) {
    if (!head || !head.next || !head.next.next) return;

    let slow = head, fast = head
    while (fast && fast.next) {
        slow = slow.next
        fast = fast.next.next
    }
    let prev = null, curr = slow.next
    slow.next = null
    while (curr) {
        let next = curr.next
        curr.next = prev
        prev = curr
        curr = next
    }
    console.log(prev)
    let first = head, second = prev
    while (second) {
        let nextFirst = first.next
        let nextSecond = second.next
        first.next = second
        second.next = nextFirst
        first = nextFirst
        second = nextSecond
    }
}

// Helper function to create a linked list from an array
function createLinkedList(arr) {
    if (!arr.length) return null;
    let head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
}

// Helper function to convert a linked list to an array
function linkedListToArray(head) {
    const result = [];
    while (head) {
        result.push(head.val);
        head = head.next;
    }
    return result;
}

// Test cases
const test1 = createLinkedList([1, 2, 3, 4, 5]);
reorderList(test1);
console.log(linkedListToArray(test1)); // Expected Output: [1, 4, 2, 3]

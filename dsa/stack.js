class Stack {
    constructor() {
        this.items = []
        this.count = 0
    }

    push(element) {
        this.items[this.count] = element
        console.log(this.items);
        this.count++
        return this.count - 1
    }

    // Return and remove top element in stack
    // return undefined if stack is empty
    pop() {
        if (this.count === 0) {
            return undefined
        }
        const poppedItem = this.items[this.count - 1]
        this.items[this.count - 1] = undefined
        this.count--
        return poppedItem
    }
    //Peek use for the check top element
    peek() {
        if (this.count === 0) {
            return undefined
        }
        return this.items[this.count - 1]
    }
    //check if stack is Empty
    isEmpty() {
        return this.count === 0
    }
    // Check size of stack
    size() {
        return this.count
    }
    //Print elements in stack
    print() {
        let str=''
        for (let i = 0; i < this.count; i++) {
            str += this.items[i] + ' '
        }
        return str
    }

    //Clear stack
    clear(){
        this.items = []
        this.count = 0
        return this.items
    }
}

const stack = new Stack()

stack.push(100)
stack.push(500)
stack.push(1000)
stack.isEmpty()
stack.pop()
stack.peek()
stack.size()
stack.print()
stack.clear()
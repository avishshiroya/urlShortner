//binary search
const search = (array, value) => {
    try {
        let start = 0;
        let end = array.length - 1;
        console.log(end);
        while (start <= end) {
            console.log(start);
            let mid = Math.floor((start + end) / 2);
            console.log("mid", mid);
            if (array[mid] < value) {
                start = mid + 1;
            } else if (array[mid] > value) {
                end = start - 1;
            } else if (array[mid] === value) {
                return mid;
            }
        }
        console.log(end, start);
        return -1;
    } catch (error) {
        console.log(array);
    }
}
console.log(search([1, 2, 3, 4, 5, 6, 7, 8, 9], 9))

//bubble sort

const bubbleSort = (array) => {
    let isSwap;
    console.time("bubble Time");
    for (let i = array.length - 1; i > 0; i--) {
        isSwap = true;
        for (let j = 0; j < i; j++) {
            if (array[j] > array[j + 1]) {
                // let temp = array[j];
                // array[j] = array[j + 1];
                // array[j + 1] = temp;
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                isSwap = false;
            }
        }
        if (isSwap) break;
    }
    console.timeEnd("bubble Time");
    return array
}

//Selection sort
const selectionSort = (array) => {
    console.time("Selection Timer");
    for (let i = 0; i < array.length; i++) {
        let lowest = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[lowest]) {
                lowest = j;
            }
        }
        if (i !== lowest) [array[lowest], array[i]] = [array[i], array[lowest]];
    }
    console.timeEnd("Selection Timer");
    return array;
}

//intertion array
const intertionSort = (array) => {
    console.time("Insertion Array");
    for (let i = 0; i < array.length; i++) {
        let currentValue = array[i];
        let j;
        for (j = i - 1; j > 0 && array[j] > currentValue; j--) {
            array[j + 1] = array[j];
        }
        array[j + 1] = currentValue
    }
    console.timeEnd("Insertion Array");
    return array;
}

console.log("Bubble sort :-- ", [1, 2, 3, 4, 6, 5, 7, 8, 9].sort((a, b) => a - b));
console.log("Bubble function sort :-- ", bubbleSort([1, 2, 3, 4, 6, 5, 7, 8, 9]));
console.log("Selection function sort :-- ", selectionSort([1, 2, 3, 4, 6, 5, 7, 8, 9]));
console.log("Insertion function sort :-- ", intertionSort([1, 2, 3, 4, 6, 5, 7, 8, 9]));

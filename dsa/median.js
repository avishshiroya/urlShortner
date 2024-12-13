var findMedianSortedArrays = function (nums1, nums2) {
    // Merge the two arrays and sort them
    const newArray = nums1.concat(nums2).sort((a, b) => a - b);

    // Calculate the middle index
    const mid = Math.floor(newArray.length / 2);

    // Return the median
    if (newArray.length % 2 === 0) {
        return (newArray[mid - 1] + newArray[mid]) / 2;
    } else {
        return newArray[mid];
    }
};

// console.log(findMedianSortedArrays([2, 4, 3,5], [2, 3, 4]));

//second largest number of array 

const secondLarge = (arr) => {
    const newArr = Array.from(new Set(arr));
    if (newArr.length >= 2) {
        return newArr.sort((a, b) => b - a)[1];
    } else {
        return -1
    }
}

// console.log(secondLarge([1, 45, 75, 87, 95, 75, 1]));


// Rotate the array with K Element

const reverse = (arr, to, from) => {
    while (to < from) {
        let temp = arr[to];
        arr[to++] = arr[from];
        arr[from--] = temp;
    }
}
const rotateArrayByK = (arr, k) => {
    if (arr.length > k) {
        k = k % arr.length;
    } else {
        return arr
    }

    reverse(arr, 0, arr.length - 1);
    // console.log(arr);
    reverse(arr, 0, k - 1);
    // console.log(arr);
    reverse(arr, k, arr.length - 1);
    // console.log(arr);
    return arr;
}
// console.log(rotateArrayByK([1, 2, 3, 4, 5, 6, 7], 6));

// Remove Duplicates from Sorted Array
// Given an integer array nums sorted in non-decreasing order, remove
// the duplicates in-place such that each unique element appears
// only once.The relative order of the elements should be kept
// the same.Then return the number of unique elements in nums.

// Input: [1,1,2]               ----->>>>>  Output: 2, [1,2,_]
// Input: [0,0,1,1,1,2,2,3,3,4] ----->>>>>  Output: 5, [0,1,2,3,4,_,_,_,_,_]


const getUnique = (arr) => {
    if (arr.length === 0) return 0;
    let count = 0;
    for (let i = 1; i < arr.length; i++) {
        if (arr[count] !== arr[i]) {
            count++;
            arr[count] = arr[i];
        }
    }
    return { count: count + 1, arr };
}

// console.log(getUnique([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]));


// for (let i = 0; i < 9; i++) {
//     let row = "";
//     for (let j = 1; j <= 9 - i; j++) {
//         row += " ";
//     }
//     for (let p = 1; p <= i; p++) {
//         row += "*" + " ";
//     }
//     console.log(row);
// }
// output:-
//         * 
//        * * 
//       * * * 
//      * * * * 
//     * * * * * 
//    * * * * * * 
//   * * * * * * * 
//  * * * * * * * * 

//========        chnage this line: -
// for (let i = 9; i > 0 ; i--) {


// * * * * * * * * * 
//  * * * * * * * * 
//   * * * * * * * 
//    * * * * * * 
//     * * * * * 
//      * * * * 
//       * * * 
//        * * 
//         * 




// var moveZeroes = function (nums) {
//     let i = 0;
//     for (let j = 0; j < nums.length; j++) {
//         if (nums[j] !== 0) {
//             let temp = nums[i];
//             nums[i++] = nums[j]
//             nums[j] = temp
//         }
//     }
//     return nums
// };

// console.log(moveZeroes([0, 0, 1]));



const pattern2 = (rows, variable) => {
    let pattern = "";
    let start = variable
    // let start = variable.charCodeAt(0)
    for (let i = 1; i <= rows; i++) {
        for (let j = 1; j <= i; j++) {
            pattern += start + " ";
            // pattern += String.fromCharCode(start) + " ";
            start++
        }
        console.log(pattern);
        pattern = ""
    }
}
// pattern2(5, 4);

// 4 
// 5 6 
// 7 8 9 
// 10 11 12 13 
// 14 15 16 17 18 


//after open commented code and comment above line
// pattern2(5, "A");
// A 
// B C 
// D E F 
// G H I J 
// K L M N O 

// let count = 1
// for (let i = 0; i <= 3; i++) {
//     let row = "";
//     for (let j = 0; j < 9 - i; j++) {
//         row += " "
//     }
//     for (let k = 0; k < i; k++) {
//         row += count++ + " ";
//     }
//     console.log(row);
// }
//     1
//    2 3
//   4 5 6 


// for (let i = 1; i <= 5; i++) {
//     let row = "";
//     for (let j = 1; j <= 5; j++) {
//         if (i === 1 || i === 5) row += "*"
//         else if (j === 1 || j === 5) row += "*"
//         else row += " "
//     }
//     console.log(row);
// }
// *****
// *   *
// *   *
// *   *
// *****

// for (let i = 0; i < 5; i++) {
//     let row = "";
//     for (let j = 0; j < 5 - i; j++) {
//         row += " "
//     }
//     for (let k = 0; k < i + 1; k++) {
//         row += "*"
//     }
//     console.log(row);
// }

//      *
//     **
//    ***
//   ****
//  *****

//when swap the for loops;

// *     
// **    
// ***   
// ****  
// ***** 

// for (let i = 0; i < 10; i++) {
//     let row = "";
//     for (let j = 0; j < i + 1; j++) {
//         if (j === 0 || j === i || i === 9) {
//             row += "*"
//         } else {
//             row += " "
//         }
//     }
//     console.log(row);
// }

// *
// **
// * *
// *  *
// *   *
// *    *
// *     *
// *      *
// *       *
// **********

// if (10 % 2 === 0) {
//     const mid = 10 / 2;
//     for (let i = 0; i < mid; i++) {
//         console.log("*".repeat(i + 1));
//     }
//     for (let j = mid; j > 0; j--) {
//         console.log("*".repeat(j - 1));
//     }
// }

// *
// **
// ***
// ****
// *****
// ****
// ***
// **
// *

// const longestPalindrome = (s) => {
//     let n = s.length;
//     console.log(n);
//     if (n <= 1) { return s };
//     let ans = [];
//     for (let i = 0; i < n; i++) {
//         for (let j = i + 1; j <= n; j++) {
//             let substr = s.slice(i, j);
//             if (substr.length > 1) {
//                 if (substr === substr.split("").reverse().join("")) {
//                     ans.push(substr);
//                 }
//             }
//         }
//     }
//     // console.log("ans ", ans);
//     // console.log(ans.sort((a, b) => b.length - a.length));
//     return (ans[0]?.length >= 1 ? ans[0] : s[0]);
// }
// console.log(longestPalindrome("babad")); // ["a", "b
// console.log(longestPalindrome("racecar")); // ["r", "a
// console.log(longestPalindrome("abcddcba")); // ["a", "
// console.log(longestPalindrome("ac")); // ["a"]
// console.log(longestPalindrome("")); // []


// const checkPalindrom = (s, i, j) => {
//     while (i < j) {
//         if (s[i++] != s[j--]) return false;
//     }
//     return true;
// }
// var countSubstrings = function (s) {
//     let n = s.length;
//     let ans = 0;
//     for (let i = 0; i < n; i++) {
//         for (let j = i; j < n; j++) {
//             if (checkPalindrom(s, i, j)) ans++
//         }
//     }
//     return ans;
// };

var countSubstrings = function (S) {
    let len = S.length, ans = 0
    for (let i = 0; i < len; i++) {
        let j = i - 1, k = i
        while (k < len - 1 && S[k] === S[k + 1]) k++
        ans += (k - j) * (k - j + 1) / 2, i = k++
        while (j >= 0 && k < len && S[k] === S[j]) j--, k++, ans++
    }
    return ans
};
// console.log(countSubstrings("babad"));
// console.log(countSubstrings("racecar"));
// console.log(countSubstrings("abcddcba"));
// console.log(countSubstrings("ac"));
// console.log(countSubstrings("ayeaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaah"));


const zigzagConversion = (string, numRows) => {
    if (numRows === 1 || string.length <= numRows) return string;
    let rows = new Array(numRows).fill().map(k => []);
    let i = 0
    let down = true;
    for (let letter of string) {
        rows[i].push(letter);
        if (i === numRows - 1) down = false
        if (i === 0) down = true

        i += down ? 1 : -1;
    }
    return rows.flat(numRows).join("");
}

// console.log(zigzagConversion("PAYPALISHIRING", 3));



const reverseNumber = (x) => {
    let isNegative = x < 0 ? true : false;
    let number = Math.abs(x)
    let reversed = 0;
    while (number > 0) {
        reversed = reversed * 10 + (number % 10);
        number = Math.floor(number / 10);
    }
    reversed = isNegative ? -reversed : reversed
    if (reversed > Math.pow(2, 32) - 1 || reversed < Math.pow(-2, 32)) {
        return 0;
    }
    return isNegative ? -reversed : reversed;

}
// console.log(reverseNumber(1534236469))


//kadanes algo

const getMaxSumSubArray = (arr) => {
    let max = arr[0];
    let sum = arr[0];
    for (let i = 1; i < arr.length; i++) {
        sum = Math.max(arr[i], sum + arr[i]);
        sum = sum + arr[i];
        // console.log(sum);
        max = Math.max(sum, max)
        // console.log(max);
    }
    return max;
}

// console.log(getMaxSumSubArray([-2, -1]));


//get the particular range number of array
const rangeNum = (start, end) => {
    if (end < start) return [];
    // console.log(start, end);
    const numbers = rangeNum(start, end - 1);
    // console.log(numbers);
    numbers.push(end);
    return numbers;
};

// console.log(rangeNum(20, 30));

const reverseString = (str) => {
    if (str == "") {
        return "";
    } else {
        console.log(str);
        console.log("substr==", str.substr(1));
        console.log("charAt == ", str.charAt(0));
        return reverseString(str.substr(1)) + str.charAt(0)
    }
}

// console.log(reverseString("hello"));


var isValid = function (s) {
    if (s.length < 2) return false;
    const stack = [];
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(' || s[i] === '{' || s[i] === '[') {
            stack.push(s[i]);
        } else if (s[i] === ')' || s[i] === '}' || s[i] === ']') {
            if (!stack[0]) {
                return false
            }
            const top = stack.pop();
            const char = s[i]
            stack.includes
            if (char === ')' && top !== '(' || char === ']' && top !== '[' || char === '}' && top !== '{') {
                return false;
            }
        }
    }
    return true;
};


// console.log(isValid("(dfasdfdsf[dadsf{adsfadsf[sadfasdf(dsfasdf)]}])"));

// On a 2D plane, we place n stones at some integer coordinate points. Each coordinate point may have at most one stone. A stone can be removed if it shares either the same row or the same column as another stone that has not been removed. Given an array stones of length n where stones[i] = [xi, yi] represents the location of the ith stone, return the largest possible number of stones that can be removed.

// const removeStones = (arr, ans) => {
//     let length = 0;
//     for (let i = arr.length - 1; i >= 0; i--) {
//         for (let j = i - 1; j >= 0; j--) {
//             if (arr[i][0] === arr[j][0] || arr[i][1] === arr[j][1]) {
//                 delete arr[i];
//                 length += 1;
//                 break;
//             }
//         }
//     }
//     return [length, length == ans];
// }
const removeStones = (arr, ans) => {
    let length = 0;
    const n = arr.length;
    const visited = new Array(n).fill(false);

    const dfs = (i) => {
        visited[i] = true;
        for (let j = 0; j < n; j++) {
            if (!visited[j] && (arr[i][0] === arr[j][0] || arr[i][1] === arr[j][1])) {
                length += 1;
                dfs(j);
            }
        }
    };

    for (let i = 0; i < n; i++) {
        if (!visited[i]) {
            dfs(i);
        }
    }


    return [length, length == ans];
}
// console.log(removeStones([[0, 1], [1, 0], [1, 1]], 2)); // 2
// console.log(removeStones([[3, 2], [3, 1], [4, 4], [1, 1], [0, 2], [4, 0]], 4)); // 4
// console.log(removeStones([[0, 0], [0, 1], [1, 0], [1, 2], [2, 1], [2, 2]], 5)); // 5
// console.log(removeStones([[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]], 3)); // 3
// console.log(removeStones([[0, 0]], 0)); // 0
// console.log(removeStones([[0, 0], [0, 1], [1, 0], [1, 2], [2, 1], [2, 2]], 5)); // 5
// console.log(removeStones([[0, 0], [1, 0], [1, 1], [2, 1], [2, 2], [3, 2]], 5)); // 5

const kidsWithCandies = (candies, extraCandies) => {
    let max = Math.max(...candies);
    const res = []
    for (let i = 0; i < candies.length; i++) {
        res.push((candies[i] + extraCandies) >= max ? true : false);
    }
    console.log(res);
    return res;
}

// kidsWithCandies([2, 3, 5, 1, 3], 3)
// kidsWithCandies([4, 2, 1, 1, 2], 1)
// kidsWithCandies([12, 1, 12], 10)




// sliding window 


//find the maximim numbers with sliding window
// ex:- [1,3,-1,-3,5,3,6,7]   k=3

const slidingWindowMaxi = (arr, k) => {
    let length = arr.length;
    const result = [];
    for (let i = 0; i <= length - k; i++) {
        let max = arr[i]
        for (let j = 1; j < k; j++) {
            if (arr[i + j] > max) {
                max = arr[i + j]
            }
        }
        result.push(max)
    }
    return result;
}

// console.log(slidingWindowMaxi([1,3,-1,-3,5,3,6,7] ,3));


// ---------------------- DepthFirstValues Binary Tree ---------------------

class Node {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

const a = new Node('a');
const b = new Node('b');
const c = new Node('c');
const d = new Node('d');
const e = new Node('e');
const f = new Node('f');
const g = new Node('g');

a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.right = f;
d.left = g;

//1st way 

// const depthFirstValues = (root) => {

//     if (root === null) return [];
//     let res = []

//     const stack = [root];
//     while (stack.length > 0) {
//         let node = stack.pop();
//         res.push(node.val);
//         if (node.right) {
//             stack.push(node.right);
//         }
//         if (node.left) {
//             stack.push(node.left);
//         }
//     }
//     return res
// }


//2nd way using recursion

const depthFirstValues = (root) => {
    if (root === null) return [];

    const leftNode = depthFirstValues(root.left)
    const rightNode = depthFirstValues(root.right)

    return [root.val, ...leftNode, ...rightNode]
}

// console.log(depthFirstValues(a));



// ---------------------- BrethFirstValues Binary Tree ---------------------

const brethFirstValues = (root) => {
    if (root === null) return [];
    const res = [];
    const stack = [root]
    while (stack.length > 0) {
        const current = stack.shift();
        res.push(current.val);
        if (current.left !== null) stack.push(current.left);
        if (current.right !== null) stack.push(current.right);
    }

    return res;
}

// console.log(brethFirstValues(a));


var chalkReplacer = function (chalk, initialChalkPieces) {
    let totalChalkNeeded = chalk.reduce((sum, studentChalkUse) => sum + studentChalkUse, 0);
    console.log(totalChalkNeeded);
    let remainingChalk = initialChalkPieces % totalChalkNeeded;
    console.log(remainingChalk);
    for (let studentIndex = 0; studentIndex < chalk.length; studentIndex++) {
        console.log("remainingChalk == ", remainingChalk);
        if (remainingChalk < chalk[studentIndex]) {
            return studentIndex;
        }
        remainingChalk -= chalk[studentIndex];
    }

    return 0;
};
// console.log(chalkReplacer([5,1,5,6],21))


function isVowel(ch) {
    return ch === 'a' || ch === 'e' || ch === 'i' || ch === 'o'
        || ch === 'u' || ch === 'A' || ch === 'E' || ch === 'I' || ch === 'O'
        || ch === 'U';
}
var reverseVowels = function (s) {
    let stringArr = s.split("");
    let i = 0;
    let j = stringArr.length - 1;
    while (i < j) {
        if (isVowel(stringArr[i])) {
            if (isVowel(stringArr[j])) {
                let temp = stringArr[i];
                stringArr[i] = stringArr[j];
                stringArr[j] = temp;
                i++;
                j--;
            } else {
                j--;
            }
        }
        else {
            i++;
        }
    }
    return stringArr.join("");
};

// console.log(reverseVowels("leetcode"));


const reverseWords = (string) => {
    let s = string.split(" ");
    const res = "";
    console.log(s[0], s.length - 1);
    for (let i = s.length - 1; i >= 0; i--) {
        if (s[i] !== "") {
            res.push(s[i]);
        }
    }
    return res.join(" ")

}

// console.log(reverseWords("the sky       is blue"));


//====== = = ========= = = =====   1945. Sum of Digits of String After Convert


// const sumOfString = (string, k) => {
//     let ans = string.split("").reduce((sum, value) => sum + (value.charCodeAt(0) - 96), '');
//     while (k > 0) {
//         ans = ans.toString().split('').reduce((sum, num) => sum + Number(num), 0);
//         k--;
//     }
//     return ans;
// }

const sumOfString = (string, k) => {
    let numStr = "";
    for (let char of string) {
        numStr += (char.charCodeAt(0) - 96).toString();
    }
    while (k > 0) {
        let sum = 0;
        for (let num of numStr) {
            sum += parseInt(num);
        }
        numStr = sum.toString();
        k--;
    }
    return numStr
}


// console.log("1=========", sumOfString("zbax", 2));
// console.log("2=========", sumOfString("hvmhoasabaymnmsd", 1));
// console.log("3=========", sumOfString("dbvmfhnttvr", 2));
// console.log("4=========", sumOfString("ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
//     1));
// console.log("5=========", sumOfString("sssssswwsssssrrrrrrrrrttttttttttttttttttttttttttttttttttttttttttttttrrrrrrrrrrrrrrrrrrssssssssssssss",
//     10));
// console.log("6=========", sumOfString("abcdefghijklmnopqrstuvwxyz",
//     5));
// console.log("7=========", sumOfString("aucnewitainwctuancgacguagrycbfhsdbffhbfnvfhsrtsyfhyshfytufhsutgfghshejfhsjeghfjsehg",
//     2));
// console.log("8=========", sumOfString("asdfghlqwertyuiopzxcvbnmazqsxwdcefvrgbthnmyujkukl",
//     2));
// console.log("9=========", sumOfString("ijsbiushfjhsbfhaxvgrgvrjbxhrgghgujdjdkjaaqiuiwueubcbcnzkozizoiwowekdkdjkddjdji",
//     2));

// const mergeOverlappingIntervals = (arr) => {
//     const res = [];
//     for (let i = 0; i < arr.length; i++) {
//         // console.log(res);
//         if (!res[0]) {
//             res.push(arr[i]);
//         } else {
//             const check = res.map((data, index) => {
//                 // console.log(data);
//                 if (data[1] >= arr[i][0] && data[0] <= arr[i][0]) { return index } else { return -1; }
//             })
//             // console.log(check[0]);
//             if (check[0] !== -1) {
//                 if (res[check[0]][1] < arr[i][1]) {
//                     res[check[0]][1] = arr[i][1];
//                 }
//             } else {
//                 res.push(arr[i]);
//             }
//         }
//     }
//     return res;
// };
const mergeOverlappingIntervals = (arr) => {
    if (arr.length <= 1) return arr;

    arr.sort((a, b) => a[0] - b[0]);

    const res = [arr[0]];

    for (let i = 1; i < arr.length; i++) {
        const lastInterval = res[res.length - 1];

        if (lastInterval[1] >= arr[i][0]) {
            lastInterval[1] = Math.max(lastInterval[1], arr[i][1]);
        } else {
            res.push(arr[i]);
        }
    }

    return res;
};
// console.log(mergeOverlappingIntervals([[1, 3], [2, 6], [8, 10], [8, 9], [9, 11], [15, 18], [2, 4], [16, 17]]));
const robotSim = (commands, obstacles) => {
    let x = 0, y = 0;
    let direction = 0; // 0=N, 1=E, 2=S, 3=W
    let maxDistance = 0;
    const directions = [
        [0, 1],   // North
        [1, 0],   // East
        [0, -1],  // South
        [-1, 0]   // West
    ];

    // Convert obstacles to a set of strings for quick lookup
    const obstacleSet = new Set(obstacles.map(ob => ob.toString()));

    for (let command of commands) {
        if (command === -1) {
            // Turn right
            direction = (direction + 1) % 4;
        } else if (command === -2) {
            // Turn left
            direction = (direction + 3) % 4;
        } else {
            // Move forward in the current direction
            const [dx, dy] = directions[direction];
            for (let step = 0; step < command; step++) {
                const newX = x + dx;
                const newY = y + dy;
                if (!obstacleSet.has(`${newX},${newY}`)) {
                    x = newX;
                    y = newY;
                    maxDistance = Math.max(maxDistance, x * x + y * y);
                }
            }
        }
    }

    return maxDistance;
};



// console.log(robotSim( [4,-1,4,-2,4], [[2,4]]));


const secondLargest = (arr) => {
    let largest = arr[0];
    let sslargest = -1;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > largest) {
            sslargest = largest;
            largest = arr[i];
        } else if (a[i] < largest && a[i] > sslargest) {
            sslargest = a[i];
        }
    }
    return sslargest;
}

// console.log(secondLargest([1, 45, 75, 87, 95, 75, 1]));

// const findMissingObs = (arr, mean, n) => {
//     let sum = 0;
//     const ans = [];
//     if (mean > arr.length || mean < 1 || mean > 6) {
//         return []
//     }
//     for (let i = 0; i < arr.length; i++) {
//         sum += arr[i];
//     }
//     const missingSum = (mean * (n + arr.length)) - sum;
//     if (missingSum > 0 && missingSum <= 6) {
//         return [missingSum];
//     }
//     else {
//         const average = missingSum / n;
//         const remiander = missingSum % n;
//         for (let i = 0; i < n; i++) {
//             ans[i] = average
//             if (remiander > 0) {
//                 ans[i]++; remiander--;
//             }
//         }
//     }
//     return ans;
// }


const findMissingObs = (arr, mean, n) => {
    let sum = arr.reduce((acc, num) => acc + num, 0);
    const totalLen = n + arr.length;
    const missingSum = mean * totalLen - sum;


    if (missingSum < n || missingSum > 6 * n) {
        return [];
    }


    const ans = new Array(n).fill(Math.floor(missingSum / n));
    let remainder = missingSum % n;


    for (let i = 0; i < remainder; i++) {
        ans[i]++;
    }

    return ans;
}

// console.log(findMissingObs([3, 2, 4, 3], 4, 2));
// console.log(findMissingObs([1, 5, 6], 3, 4));


const memoiFib = (num, memo = {}) => {
    if (memo[num]) return memo[num];
    if (num <= 2) return 1;
    const result = memoiFib(num - 1, memo) + memoiFib(num - 2, memo);
    memo[num] = result;
    return result;
}

// console.log(memoiFib(40));


var isPalindrome = function (x) {
    const s = x.toString();
    let j = s.length - 1;
    let i = 0
    while (i < j) {
        if (s[i++] != s[j--]) return false;
    }
    return true;

};

// console.log(isPalindrome(-121));
var minExtraChar = function (s, dictionary) {
    const ss = new Set(dictionary);
    const n = s.length;
    const f = new Array(n + 1).fill(0);
    for (let i = 1; i <= n; ++i) {
        f[i] = f[i - 1] + 1;
        for (let j = 0; j < i; ++j) {
            if (ss.has(s.substring(j, i))) {
                f[i] = Math.min(f[i], f[j]);
            }
        }
    }
    return f[n];
}

// console.log(minExtraChar("kevlplxozaizdhxoimmraiakbak",["yv","bmab","hv","bnsll","mra","jjqf","g","aiyzi","ip","pfctr","flr","ybbcl","biu","ke","lpl","iak","pirua","ilhqd","zdhx","fux","xaw","pdfvt","xf","t","wq","r","cgmud","aokas","xv","jf","cyys","wcaz","rvegf","ysg","xo","uwb","lw","okgk","vbmi","v","mvo","fxyx","ad","e"]));

const arrayRankTransform = (arr) => {
    const sorted = [...arr];
    sorted.sort((a, b) => a - b);
    let map = new Map();
    let rank = 1;
    for (let val of sorted) {
        if (!map.has(val)) {
            map.set(val, rank++);
        }
    }
    for (let val of arr) {
        arr[arr.indexOf(val)] = map.get(val);
    }
    return arr
}

// console.log(arrayRankTransform([-1000000000, -1000000000, -1000000000, 1000000000, 1000000000, 1000000000]));

const coinChange = (coins, amount) => {
    const arr = coins.slice().sort((a, b) => b - a);
    let totalCoins = 0;
    console.log(arr);
    let i = 0;
    while (amount > 0) {
        if (amount > arr[i]) {
            amount = amount - arr[i];
            // console.log(amount);
            totalCoins++;
        } else {
            i++;
        }
    }
    return totalCoins;
}
// console.log(coinChange([1, 2, 5], 11));

const minSubArray = (nums, p) => {
    let sums = nums.reduce((acc, value) => (acc + value) % p, 0);
    if (sums == 0) return 0;
    const map = new Map();
    map.set(0, -1);
    let prefix_sum = 0;
    let ans = nums.length;
    for (let i = 0; i < nums.length; i++) {
        prefix_sum += (prefix_sum + nums[i]) % p;
        let check = (prefix_sum - sums + p) % p;
        if (map.has(check) != map.has(map.size)) {
            ans = Math.min(ans, 1 - map[check])
        }
        map[prefix_sum] = i
    }
    if (ans == nums.length) return -1;
    return ans;
}

// console.log(minSubArray([1, 2, 3, 4], 6));

//Minimum String Length After Removing Substrings
var minLength = function (s) {
    let temp = s;
    while (temp.includes("AB") || temp.includes("CD")) {
        if (temp.includes("AB")) {
            temp = temp.replaceAll("AB", "");
        } else if (temp.includes("CD")) {
            temp = temp.replaceAll("CD", "")
        }
    }
    // console.log(temp);
    return temp.length;
}

// console.log(minLength("ACBBD"));


// binary tree has run in three order:-

// -> pre (root-left-right) , In(left-root-right) ans post(left-right-root)



// tree data structure - non linear DS

// binary tree :- maximum 2 nodes
// binary search tree :- left node is smaller than root and right node is greater than root
// AVL tree :- balance factor is 1 or -1
// B tree :- minimum 2 and maximum 3 child
// degree of node means :- how many child node of the parent node
// treminal nodes means :- who not have any child node

// heap :- max or min heap
// graph :- adjacency matrix or adjacency list
// tree traversal :- pre, in, post, level order
// graph traversal :- bfs, dfs



// 238. Product of Array Except Self

const productExceptSelf = function (nums) {
    const front = [];
    const back = Array(nums.length).fill(1);
    const result = Array(nums.length);

    for (let i = 0; i < nums.length; i++) {
        if (i === 0) {
            front[i] = nums[i];
        } else {
            front[i] = front[i - 1] * nums[i];
        }
    }

    for (let i = nums.length - 1; i >= 0; i--) {
        if (i === nums.length - 1) {
            back[i] = nums[i];
        } else {
            back[i] = back[i + 1] * nums[i];
        }
    }


    for (let i = 0; i < nums.length; i++) {
        const frontProduct = i > 0 ? front[i - 1] : 1;
        const backProduct = i < nums.length - 1 ? back[i + 1] : 1;
        result[i] = frontProduct * backProduct;
    }

    return result;
};

// console.log(productExceptSelf([1, 2, 3, 4]));


// increasing triplet

const increasingTriplet = function (nums) {
    let first = Infinity;
    let second = Infinity;
    for (let num of nums) {
        if (first >= num) {
            first = num;
            continue;
        }
        if (second >= num) {
            second = num;
            continue;
        }
        return true;
    }
    return false;
}

// console.log(increasingTriplet([[1,2,3,4,5]]));

const maxGoodNumber = (nums) => {
    for (let i = 0; i < nums.length; i++) {
        nums[i] = nums[i].toString(2)
    }
    console.log(nums);
    nums.sort((a, b) => {
        if (a + b > b + a) return -1
        else return 1
    })
    nums = nums.join("")
    return parseInt(nums, 2)
}
// console.log(maxGoodNumber([1, 2, 3]))

var smallestChair = function (times, targetFriend) {
    const [targetArrival] = times[targetFriend];
    const arrivalQueue = times;
    const leavingQueue = [...times];
    arrivalQueue.sort((a, b) => a[0] - b[0]);
    leavingQueue.sort((a, b) => (a[1] - b[1]) || (a[0] - b[0]));
    const chairsByLeaveTime = new Map();
    let chairsCount = 0;
    let arriving = 0, leaving = 0;

    while (arriving < arrivalQueue.length) {
        let chairIdx;
        const arrival = arrivalQueue[arriving][0];
        const leave = leavingQueue[leaving][1];
        if (arrival < leave) {
            chairIdx = chairsCount++;
        } else {
            let freeChairIdx = leaving;
            chairIdx = chairsByLeaveTime.get(leavingQueue[freeChairIdx++][0]);
            while (arrival >= leavingQueue[freeChairIdx][1]) {
                const nextChair = chairsByLeaveTime.get(leavingQueue[freeChairIdx][0]);
                if (chairIdx > nextChair) {
                    [leavingQueue[leaving], leavingQueue[freeChairIdx]] = [leavingQueue[freeChairIdx], leavingQueue[leaving]];
                    chairIdx = nextChair;
                }
                ++freeChairIdx;
            }
            ++leaving;
        }
        if (targetArrival === arrival) {
            return chairIdx;
        }
        chairsByLeaveTime.set(arrival, chairIdx);
        arriving++;
    }
};

// console.log(smallestChair([[1, 4], [2, 3], [4, 6]], 1));

const compress = function (chars) {
    let i = 0, length = 0;
    while (i < chars.length) {
        let curChar = chars[i];
        chars[length++] = curChar

        let count = 0;
        while (i < n && curChar == chars[i]) {
            count++;
            i++;
        }
        if (count > 1) {
            chars[length++] = String(count).split()
            for (let c of count) {
                chars[length++] = c
            }
        }
    }
    return length
}
// console.log(compress(["a", "b", "b", "b", "c"]))


//Heap :- 
// Tree Based Partially ordered DS
// Two Types :- Max and Min Heap
// Any Node's Key <= Parent's Key and >= Child's Key

//Heap Operations :- 
//standard :- Push , Peek , Poll
//optional :- isEmpty , size , merge


const maxKelements = function (nums, k) {
    const pq = new MaxPriorityQueue({ compare: (a, b) => b - a })
    for (const num of nums) {
        pq.enqueue(num)
    }
    let score = 0
    while (k) {
        const ele = pq.dequeue()
        score += ele
        pq.enqueue(Math.ceil(ele / 3))
        k--
    }
    return score
}
var longestDiverseString = function (a, b, c) {
    let array = [["a", a], ["b", b], ["c", c]];

    array.sort((a, b) => b[1] - a[1]);

    let string = "";

    while (array[0][1] > 0) {
        if (string.length >= 2 && string[string.length - 1] === array[0][0] && string[string.length - 2] === array[0][0]) {
            let is_added = false;
            for (let i = 1; i < array.length; i++) {
                if (array[i][1] !== 0) {
                    string += array[i][0];
                    array[i][1]--;
                    is_added = true;
                    break;
                }
            }
            if (!is_added) {
                return string;
            }
        } else {
            string += array[0][0];
            array[0][1]--;
        }

        array.sort((a, b) => b[1] - a[1]);
    }

    return string;
};

// console.log(longestDiverseString(1, 1, 7));  // Example usage

const maximumSwap = function (num) {
    const numStr = num.toString().split('');
    let turningPoint = null;
    for (let i = 0; i < numStr.length - 1; i++) {
        if (numStr[i] < numStr[i + 1]) {
            turningPoint = i;
            break;
        }
    }
    if (turningPoint === null) return num;
    let maxIndexToTheRight = turningPoint + 1;
    for (let i = turningPoint + 2; i < numStr.length; i++) {
        if (numStr[i] > numStr[maxIndexToTheRight]) {
            maxIndexToTheRight = i
        }
    }

    for (let i = 0; i <= turningPoint; i++) {
        if (numStr[i] < numStr[maxIndexToTheRight]) {
            [numStr[i], numStr[maxIndexToTheRight]] = [numStr[maxIndexToTheRight], numStr[i]]
            break;
        }
    }
    return Number(numStr.join(''))
}

// console.log(maximumSwap(98368));

const maxUniqueSplit = (s) => {
    let visited = new Set();
    let max = 0;
    let sLen = s.length;

    function dfs(startIndex, currentCount) {
        if (startIndex >= sLen) {
            max = Math.max(max, currentCount);
            return;
        }
        for (let endIndex = startIndex + 1; endIndex <= sLen; endIndex++) {
            let substring = s.slice(startIndex, endIndex);
            if (!visited.has(substring)) {
                visited.add(substring);
                dfs(endIndex, currentCount + 1);
                visited.delete(substring);
            }
        }
    }
    dfs(0, 0);
    return max;
}

// console.log(maxUniqueSplit("ababccc"))
// Kth Largest Sum in a Binary Tree
var kthLargestSum = function (root, k) {
    if (!root) return -1;
    let res = []
    let q = [root]

    while (q.length > 0) {
        let n = q.length;
        let sum = 0;
        for (let i = 0; i < n; i++) {
            let node = q.shift();
            sum += node.val;
            if (node.left) q.push(node.left);
            if (node.right) q.push(node.right);

        }
        res.push(sum);
    }
    if (k > res.length) return -1;
    return res.sort((a, b) => b - a)[k - 1];
}

var removeSubfolders = function (folder) {
    let sortedFolder = folder.sort();
    console.log(sortedFolder);
    let res = [sortedFolder[0]];
    let last = sortedFolder[0]
    for (let i = 1; i < sortedFolder.length; i++) {
        if (sortedFolder[i].startsWith(last + '/')) {
            continue;
        } else {
            res.push(last = sortedFolder[i]);
        }
    }
    console.log(res)
};

// removeSubfolders(["/a","/a/b","/c/d","/c/d/e","/c/f"])

var kthSmallest = (arr, k) => {
    arr.sort((a, b) => a - b);
    console.log(arr[k - 1]);
}
// kthSmallest([7,10,4,3,20,15],3)

var alternateSort = function (arr) {
    let res = [];
    arr.sort((a, b) => a - b);
    let right = arr.length - 1;
    let left = 0
    while (left <= right) {
        if (left == right) {
            res.push(arr[left++])
        } else {
            res.push(arr[right--])
            res.push(arr[left++])
        }
    }
    return res
}
// console.log(alternateSort([1, 6, 9, 4, 3, 7, 8, 2]))

function maximumSumSubarray(K, Arr, N) {
    let max = 0;
    let sum = 0;
    for (let i = 0; i < K; i++) {
        sum += Arr[i];
    }
    console.log(sum);
    max = sum;

    for (let i = 1; i <= N - K; i++) {
        let prevElement = Arr[i - 1]
        let nextElement = Arr[i + K - 1]
        sum = sum - prevElement + nextElement
        max = Math.max(sum, max)
    }
    return max
}
//   console.log(maximumSumSubarray(2,[100, 200, 300, 400],4));

var longestSquareStreak = (num) => {
    let numSet = new Set(num);
    let maxLength = 0

    for (let n of numSet) {
        let length = 0;
        let current = n;
        while (numSet.has(current)) {
            length++;
            if (current > 100000) break;
            current = current * current;
        }
        if (length > 1) {
            maxLength = Math.max(maxLength, length)
        }
    }
    return maxLength > 1 ? maxLength : -1;
}
// console.log(longestSquareStreak([2,3,5,6,7]))

var printFirstNegativeInteger = (arr, k) => {
    let queue = [];
    for (let i = 0; i <= arr.length - k; i++) {  // Corrected loop condition
        let isNegative = false;
        for (let j = 0; j < k; j++) {
            if (arr[i + j] <= 0) {
                queue.push(arr[i + j]);
                isNegative = true;
                break;
            }
        }
        if (!isNegative) {
            queue.push(0);
        }
    }
    return queue;
}
// console.log(printFirstNegativeInteger([-8,3,2,-6,10],2))
var removeDuplicate = (arr) => {
    let uniq = [];
    for (let a of arr) {
        if (uniq.includes(a)) {
            continue;
        } else {
            uniq.push(a)
        }
    }
    return uniq
}
// console.log(removeDuplicate([2, 2, 3, 3, 7, 5] ))

var canSortArray = function (nums) {
    let arr = [...nums];
    let arrLen = arr.length
    let isSwap;
    for (let i = 0; i < arrLen - 1; i--) {
        isSwap = false;
        for (let j = 0; j < arrLen - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
                isSwap = true;
            } else {
                return false;
            }
        }
        if (!isSwap) {
            break;
        }
    }
    return true
}
// console.log(canSortArray([8,4,2,30,15]))


const maximumBeauty = (items, queries) => {
    // Sort items by descending price
    items.sort((a, b) => a[0] - b[0]);

    // Sort queries and keep track of original indexes for results
    let sortedQueries = queries.map((price, index) => [price, index]).sort((a, b) => a[0] - b[0]);

    let ans = Array(queries.length).fill(0);
    let maxBeauty = 0;
    let itemIndex = 0;

    for (let [price, queryIndex] of sortedQueries) {
        while (itemIndex < items.length && items[itemIndex][0] <= price) {
            maxBeauty = Math.max(maxBeauty, items[itemIndex][1]);
            itemIndex++;
        }
        ans[queryIndex] = maxBeauty;
    }

    return ans;
};

// Example usage
// console.log(maximumBeauty([[1,2],[3,2],[2,4],[5,6],[3,5]], [1,2,3,4,5,6]));


var countUnguarded = function (m, n, guards, walls) {
    // genrate array of the m * n
    let grid = Array(m).fill(0).map(() => Array(n).fill(0))

    // guard =1
    for (let [x, y] of guards) {
        grid[x][y] = 1;
    }
    // wall = 2
    for (let [x, y] of walls) {
        grid[x][y] = 2;
    }
    // console.log(grid)

    const checkRow = (x, y) => {
        // console.log(x,y)
        for (let i = y + 1; i < n; i++) {
            // console.log("row check === ",x,y,grid[i][x])
            if (grid[x][i] === 1 || grid[x][i] === 2) {
                break;
            } else {
                grid[x][i] = 3
            }
        }
        for (let i = y - 1; i >= 0; i--) {
            if (i == -1) break;
            if (grid[x][i] === 1 || grid[x][i] === 2) {
                break;
            }
            else {
                grid[x][i] = 3
            }
        }
    }
    const checkCol = (x, y) => {
        for (let i = x + 1; i < m; i++) {
            if (grid[i][y] === 1 || grid[i][y] === 2) {
                break;
            } else {
                grid[i][y] = 3
            }
        }
        for (let i = x - 1; i >= 0; i--) {
            if (i == -1) break;
            if (grid[i][y] === 1 || grid[i][y] === 2) {
                break;
            }
            else {
                grid[i][y] = 3
            }
        }
    }

    for (let [x, y] of guards) {
        //check row
        console.log(grid[x][y])
        checkRow(x, y)
        //check column
        checkCol(x, y)
    }
    // console.log(grid)
    let unguardedCount = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 0) {
                unguardedCount++;
            }
        }
    }

    // Log the final grid and return the count of unguarded cells
    // console.log(grid);
    return unguardedCount;
};
// console.log(countUnguarded(m = 4, n = 6, guards = [[0, 0], [1, 1], [2, 3]], walls = [[0, 1], [2, 2], [1, 4]]))


var maxEqualRowsAfterFlips = function (matrix) {
    const count = new Map();

    for (const row of matrix) {
        const key = row.map(n => row[0] ? 1 - n : n).join(',');
        count.set(key, (count.get(key) || 0) + 1);
    }

    return Math.max(...count.values());
};

// remove duplicates-2
var removeDuplicates = function (nums) {
    // let index = 1; 
    // let count = 1; 

    // for (let i = 1; i < nums.length; i++) {
    //     if (nums[i] === nums[i - 1]) {
    //         count++;
    //     } else {
    //         count = 1;
    //     }

    //     if (count <= 2) {
    //         nums[index] = nums[i];
    //         index++;
    //     }
    // }
    // return nums.slice(0, index);
    let index = 0;
    for (let i = 0; i < nums.length; i++) {
        let count = 0;
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[j] != nums[i]) { index++; break };
            if (nums[i] == nums[j] && count == 1) {
                nums[j] = "_";
            }
            if (nums[i] == nums[j]) {
                count++;
                // index++;
            }
        }
    }
    nums = nums.filter(n => n != "_");
    return index
};

// console.log(removeDuplicates([0, 0, 1, 1, 1, 1, 2, 3, 3]))
var slidingPuzzle = function (board) {
    if (board[0].join("") == "123" && board[1].join("") == "450") {
        return 0;
    }
    let queue = [[board, 0]];
    let visited = new Set();
    visited.add(board.map(row => row.join("")).join(""));
    let directions = [[0, 1], [0, -1], [1,
        0], [-1, 0]];
    while (queue.length) {
        let [board, step] = queue.shift();
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == 4) {
                    let x = i;
                    let y = j;
                    for (let k = 0; k < directions.length; k++) {
                        let nx = x + directions[k][0];
                        let ny = y + directions[k][1];
                        if (nx >= 0 && nx < 2 && ny >= 0 && ny <
                            3 && board[nx][ny] == 0) {
                            let newBoard = board.map(row => row.slice());
                            newBoard[x][y] = 0;
                            newBoard[nx][ny] = 4;
                            let newBoardStr = newBoard.map(row => row.join("")).join("");
                            if (!visited.has(newBoardStr)) {
                                queue.push([newBoard, step + 1]);
                                visited.add(newBoardStr);
                            }
                        }
                    }
                }
            }
        }
        return step + 1;
    }
}
// console.log(slidingPuzzle([[4,1,2],[5,0,3]]))

var findChampion = function (n, edges) {
    const isUndefeted = new Array(n).fill(true);

    for (let [winner, loser] of edges) {
        isUndefeted[loser] = false
    }
    let champion = -1;
    let stronger = 0;
    for (let i = 0; i < n; i++) {
        if (isUndefeted[i]) {
            champion = i;
            stronger++;
        }
    }
    return stronger === 1 ? champion : -1;
};

// console.log(findChampion(n = 3, edges = [[0,1],[1,2]]))

var shortestDistanceAfterQueries = function (n, queries) {
    const cityRoads = Array.from({ length: n }, () => []);
    for (let i = 0; i < n - 1; i++) {
        cityRoads[i].push(i + 1)
    }
    const res = [];
    const calculateRoad = () => {
        const visited = new Array(n).fill(false);
        const queue = [[0, 0]];
        visited[0] = true;
        while (queue.length) {
            const [current, distance] = queue.shift();
            if (current == n - 1) return distance
            for (const next of cityRoads[current]) {
                if (!visited[next]) {
                    visited[next] = true;
                    queue.push([next, distance + 1]);
                }
            }
        }
        return -1
    }
    for (const [idx, val] of queries) {
        cityRoads[idx].push(val)
        res.push(calculateRoad())
    }
    return res;
};

// console.log(shortestDistanceAfterQueries(5, [[0, 2], [0, 4]]))

var minimumObstacles = function (grid) {
    const rows = grid.length;
    const cols = grid[0].length;


    const visitedArr = Array.from({ length: rows }, () => Array(cols).fill(false));
    visitedArr[0][0] = true;


    const queue = [[0, 0, 0]]; // [current obstacles, x, y]

    const directions = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
    ];

    while (queue.length > 0) {
        const [currentObstacles, x, y] = queue.shift();


        if (x === rows - 1 && y === cols - 1) {
            return currentObstacles;
        }

        for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;

            // Skip invalid, out-of-bounds, or already visited cells
            if (nx < 0 || ny < 0 || nx >= rows || ny >= cols || visitedArr[nx][ny]) {
                continue;
            }

            visitedArr[nx][ny] = true;


            if (grid[nx][ny] === 1) {
                queue.push([currentObstacles + 1, nx, ny]); // Add obstacle
            } else {
                queue.unshift([currentObstacles, nx, ny]); // Add free path
            }
        }
    }

    return -1;
};

// Example usage
// console.log(minimumObstacles([[0, 1, 1], [1, 1, 0], [1, 1, 0]])); // Output: 2

var isPrefixOfWord = function (sentence, searchWord) {
    let words = sentence.split(' ');
    let index = 0;
    for (let i = 0; i < words.length; i++) {
        if (words[i].startsWith(searchWord)) {
            index = i + 1;
            break;
        }
    }
    return index != 0 ? index : -1;
    // console.log()
};
// console.log(isPrefixOfWord("i am tired", "you")); // Output: true

var addSpaces = function (s, spaces) {
    let spaceString = "";
    for (let i = 0; i <= spaces.length; i++) {
        if (i == 0) {
            let substring = String(s).substring(0, spaces[i])
            spaceString += substring;
        } else {
            let substring = String(s).substring(spaces[i - 1], spaces[i])
            spaceString += " " + substring;
        }
    }
    return spaceString
};
// console.log(addSpaces("spacing", [0,1,2,3,4,5,6]))

const canMakeSubsequence = (str1, str2) => {
    let i = 0;
    let j = 0;
    while (i < str1.length && j < str2.length) {
        if (str1[i] === str2[j]) {
            j++;
            i++;
        }
        else {
            let newChar = String.fromCharCode(((str1[i].charCodeAt(0) - 97 + 1) % 26) + 97)
            if (newChar === str2[j]) {
                j++;
                i++;
            }
            else {
                i++
            }
        }
    }
    return str2.length == j ? true : false;
}
// console.log(canMakeSubsequence("eao", "ofa"))

const delteNode = (node) => { // delete the node with out knowing the head 
    node.val = node.next.val // add the next node value
    node.next = node.next.next // skip the next node
}

const reverseArray = (arr) => {
    let start = 0;
    let end = arr.length - 1;
    while (start < end) {
        let temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;
        start++;
        end--;
    }
    return arr;
}
// console.log(reverseArray([1, 2, 3, 4, 5, 6, 7]))

var kthFactor = (n, k) => {
    let factors = [];
    for (let i = 1; i <= n; i++) {
        if (n % i === 0) {
            factors.push(i);
        }
    }
    console.log(factors);
    return factors[k - 1] ? factors[k - 1] : -1
}
// console.log(kthFactor(12,3))

// function reverse(arr, start, end){
//     while(start < end){
//         [arr[start],arr[end]]=[arr[end],arr[start]];
//         start++;
//         end--;
//     }
// }
// function rotateArr(arr, d) {
//     // code here
//     let n = arr.length;
//     d%=n;

//     reverse(arr,0, d-1);

//     reverse(arr, d, n-1);

//     reverse(arr, 0, n-1);
// }
// console.log(rotateArray([1,2,3,4,5], 2))
var pickGifts = function (gifts, k) {
    while (k--) {
        gifts.sort((a, b) => b - a);
        let pile = gifts[0];
        gifts.shift();
        gifts.push(Math.floor(Math.sqrt(pile)));
    }
    return gifts.reduce((acc, curr) => acc + curr, 0);
};

// console.log(pickGifts([25,64,9,4,100],4))


// var findScore = function (nums) {
//     const isMarked = [];
//     let score = 0;
//     for (let i = 0; i < nums.length; i++) {
//         let min = Math.min(...nums);
//         let index = nums.indexOf(min);
//         if (nums[index] == true) break;
//         nums[index] = true;
//         score += min;
//         if (index !== 0) nums[index - 1] = true
//         if (index !== nums.length - 1) nums[index + 1] = true
//     }
//     return score
// };
var findScore = function(nums) {
    const marked = new Array(nums.length).fill(false);
    let score = 0;
    
    for (let i = 0; i < nums.length; i++) {
        // Find the minimum unmarked number and its index
        let minIndex = -1;
        let minValue = Infinity;
        
        for (let j = 0; j < nums.length; j++) {
            if (!marked[j] && nums[j] < minValue) {
                minValue = nums[j];
                minIndex = j;
            }
        }
        
        // If no unmarked number found, break
        if (minIndex === -1) break;
        
        // Mark the current number and adjacent numbers
        marked[minIndex] = true;
        score += minValue;
        
        if (minIndex > 0) marked[minIndex - 1] = true;
        if (minIndex < nums.length - 1) marked[minIndex + 1] = true;
    }
    
    return score;
};
console.log(findScore([2, 1, 3, 4, 5, 2]))
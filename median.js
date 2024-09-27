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

console.log(minExtraChar("kevlplxozaizdhxoimmraiakbak",["yv","bmab","hv","bnsll","mra","jjqf","g","aiyzi","ip","pfctr","flr","ybbcl","biu","ke","lpl","iak","pirua","ilhqd","zdhx","fux","xaw","pdfvt","xf","t","wq","r","cgmud","aokas","xv","jf","cyys","wcaz","rvegf","ysg","xo","uwb","lw","okgk","vbmi","v","mvo","fxyx","ad","e"]));
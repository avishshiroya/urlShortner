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

console.log(reverseString("hello"));
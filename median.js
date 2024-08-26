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

console.log(secondLarge([1, 45, 75, 87, 95, 75, 1]));

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

// console.log("Bubble sort :-- ", [1, 2, 3, 4, 6, 5, 7, 8, 9].sort((a, b) => a - b));
// console.log("Bubble function sort :-- ", bubbleSort([1, 2, 3, 4, 6, 5, 7, 8, 9]));
// console.log("Selection function sort :-- ", selectionSort([1, 2, 3, 4, 6, 5, 7, 8, 9]));
// console.log("Insertion function sort :-- ", intertionSort([1, 2, 3, 4, 6, 5, 7, 8, 9]));


const array = [{
    "items": [
        {
            "id": "8900315611368",
            "title": "Camp Stool",
            "imageUrl": "https://cdn.shopify.com/s/files/1/0696/3144/3176/files/campstool-1.jpg?v=1721040274",
            "sellingPrice": "78.00"
        },
        {
            "id": "8900315578600",
            "title": "The Field Report Vol. 2",
            "imageUrl": "https://cdn.shopify.com/s/files/1/0696/3144/3176/files/fieldreport_vol2_front_437c4459-042c-4b07-8018-f092a5eb83ac.jpg?v=1721040272",
            "sellingPrice": "400.00"
        },
        {
            "id": "8900315545832",
            "title": "Double Wall Mug",
            "imageUrl": "https://cdn.shopify.com/s/files/1/0696/3144/3176/files/mug.jpg?v=1721040270",
            "sellingPrice": "24.00"
        },
        {
            "id": "8900315513064",
            "title": "Mola Headlamp",
            "imageUrl": "https://cdn.shopify.com/s/files/1/0696/3144/3176/files/snowpeak_headlamp_458e50f4-a354-423e-ad48-a83c47878792.jpg?v=1721040268",
            "sellingPrice": "45.00"
        },
        {
            "id": "8900315152616",
            "title": "5 Panel Camp Cap",
            "imageUrl": "https://cdn.shopify.com/s/files/1/0696/3144/3176/files/5-panel-hat_4ee20a27-8d5a-490e-a2fc-1f9c3beb7bf5.jpg?v=1721040241",
            "sellingPrice": "48.00"
        },
        {
            "id": "8900314726632",
            "title": "Mud Scrub Soap",
            "imageUrl": "https://cdn.shopify.com/s/files/1/0696/3144/3176/files/soap.jpg?v=1721040213",
            "sellingPrice": "15.00"
        },
        {
            "id": "8900314661096",
            "title": "Pennsylvania Notebooks",
            "imageUrl": "https://cdn.shopify.com/s/files/1/0696/3144/3176/files/PA1_5b8b54ac-f422-4e1a-a275-a13a9735203f.jpg?v=1721040212",
            "sellingPrice": "10.00"
        },
        {
            "id": "8900314562792",
            "title": "The Scout Skincare Kit",
            "imageUrl": "https://cdn.shopify.com/s/files/1/0696/3144/3176/files/skin-care_c18143d5-6378-46aa-b0d7-526aee3bc776.jpg?v=1721040207",
            "sellingPrice": "36.00"
        }
    ],
    "mainTitle": "Deals of the Day",
    "collectionId": "421698601192",
    "productCount": "6",
    "switchStatus": "true"
}]
const array1 = [{
    "args": {
        "items": [
            {
                "title": "",
                "imageUrl": "",
                "basePrice": "",
                "description": "",
                "sellingPrice": ""
            }
        ],
        "imageFit": "contain",
        "mainTitle": "",
        "decoration": {
            "border": {
                "color": "#00000000",
                "width": 1
            }
        },
        "viewAllTitle": "View All",
        "scrollDirection": "horizontal",
        "viewportFraction": 0.6,
        "enlargeCenterPage": true,
        "viewAllDataTargetId": "",
        "viewAllDataTargetScreen": "/collectionScreen",
        "marginBetweenHorizontalSlide": 0
    },
    "type": "product_overflow_slider_widget"
}]
 array1[0].args = Array(array1[0].args).concat(array)
console.log(array1[0].args[1].items);
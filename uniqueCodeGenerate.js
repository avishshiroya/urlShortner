const crypto = require('crypto');

// function generateUniqueCode(length = 12) {
//     const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

//     const bytesNeeded = Math.ceil(length * 256 / charset.length);

//     let result = '';

//     while (result.length < length) {
//         const randomBytes = crypto.randomBytes(bytesNeeded);

//         for (let i = 0; i < bytesNeeded && result.length < length; i++) {
//             // Use modulo to map the byte to our charset
//             const randomIndex = randomBytes[i] % charset.length;
//             result += charset[randomIndex];
//         }
//     }

//     return result;
// }
// const generateUniqueCode = (length = 14) => 
//     Array.from(crypto.randomBytes(length))
//         .map(byte => 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789'[byte % 34])
//         .join('');
function generateUniqueCode(length = 14, string) {
    const allowedChars = string.replace(/[\s\-]+/, "").toUpperCase();

    const randomBytes = crypto.randomBytes(length);

    let result = '';

    for (let i = 0; i < length; i++) {
        const randomPosition = randomBytes[i] % allowedChars.length;
        result += allowedChars[randomPosition];
    }

    return result;
}

console.log(generateUniqueCode(4, "hare ram"))
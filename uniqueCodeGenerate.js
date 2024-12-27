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
function generateUniqueCode(length = 14) {
    // Define characters to use (excluding confusing ones like I, O)
    const allowedChars = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789';
    
    // Generate random bytes equal to the length we want
    const randomBytes = crypto.randomBytes(length);
    
    // Create empty string to store our result
    let result = '';
    
    // Convert each random byte into a character from our allowed set
    for(let i = 0; i < length; i++) {
        // Get a random position in our allowedChars string (0 to 33)
        const randomPosition = randomBytes[i] % allowedChars.length;
        // Add the character at that position to our result
        result += allowedChars[randomPosition];
    }
    
    return result;
}

console.log(generateUniqueCode())
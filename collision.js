const crypto = require('crypto');

function runCollisionTest(numberOfCodes = 1000000) {
    // Store generated codes to check for duplicates
    const generatedCodes = new Set();
    const startTime = Date.now();

    for (let i = 0; i < numberOfCodes; i++) {
        const code = generateUniqueCode();
        generatedCodes.add(code);
    }

    const endTime = Date.now();
    
    return {
        codesGenerated: numberOfCodes,
        uniqueCodes: generatedCodes.size,
        duplicates: numberOfCodes - generatedCodes.size,
        timeInSeconds: (endTime - startTime) / 1000,
        collisionRate: ((numberOfCodes - generatedCodes.size) / numberOfCodes * 100).toFixed(6)
    };
}

// function generateUniqueCode(length = 14) {
//     const allowedChars = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789';
//     const randomBytes = crypto.randomBytes(length);
//     let result = '';
    
//     for(let i = 0; i < length; i++) {
//         const randomPosition = randomBytes[i] % allowedChars.length;
//         result += allowedChars[randomPosition];
//     }
    
//     return result;
// }
function generateUniqueCode(length = 14) {
    // const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charset = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789';
    // console.log(crypto.randomUUID());
    
    const bytesNeeded = Math.ceil(length * 256 / charset.length);
    // console.log(bytesNeeded);
    
    let result = '';
    
    while (result.length < length) {
        const randomBytes = crypto.randomBytes(bytesNeeded);
        
        for (let i = 0; i < bytesNeeded && result.length < length; i++) {
            // Use modulo to map the byte to our charset
            const randomIndex = randomBytes[i] % charset.length;
            result += charset[randomIndex];
        }
    }
    
    return result;
}
// console.log(generateUniqueCode())
// Run test and display results
const results = runCollisionTest(1000000);
console.log('Collision Test Results:');
console.log(`Total codes generated: ${results.codesGenerated.toLocaleString()}`);
console.log(`Unique codes: ${results.uniqueCodes.toLocaleString()}`);
console.log(`Duplicates found: ${results.duplicates.toLocaleString()}`);
console.log(`Collision rate: ${results.collisionRate}%`);
console.log(`Time taken: ${results.timeInSeconds.toFixed(2)} seconds`);

// Calculate theoretical collision probability
const charset = 34; // number of possible characters
const codeLength = 14; // length of each code
const possibleCombinations = Math.pow(charset, codeLength);
console.log(`\nTheoretical Statistics:`);
console.log(`Possible combinations: ${possibleCombinations.toExponential()}`);

// Collision Test Results:
// Total codes generated: 1,000,000
// Unique codes: 1,000,000
// Duplicates found: 0
// Collision rate: 0.000000%
// Time taken: 5.31 seconds

// Theoretical Statistics:
// Possible combinations: 2.758702310349225e+21
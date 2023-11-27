const Cryptr = require('cryptr');
const fs = require('fs');

// Read the secret key from the file
const secure = fs.readFileSync('secure.txt');
const cryptr = new Cryptr(String(secure));

// Function to encrypt a message
const encryptStr = (msg) => {
    try {
        const message = msg;
        const data = { text: message };
        const encryptedString = cryptr.encrypt(JSON.stringify(data));

        return encryptedString;
    } catch (error) {
        return null;
    }
};

// Function to decrypt an encrypted string
const decryptStr = (encryptedStr) => {
    try {
        return JSON.parse(cryptr.decrypt(String(encryptedStr)));
    } catch (error) {
        return null;
    }
};

// Example usage
const originalMessage = 'The Most Dangerous Security....';
const encryptedMessage = encryptStr(originalMessage);
const decryptedMessage = decryptStr(encryptedMessage);

// Output the results
console.log('Original Message:', originalMessage);
console.log('Encrypted Message:', encryptedMessage);
console.log('Decrypted Message:', decryptedMessage);

const crypto = require('crypto');

// Function to generate handshake data, typically a unique string or token
const generateHandshakeData = (transactionId) => {
    // Here we generate a unique string using transactionId and a timestamp
    const timestamp = Date.now();
    const hash = crypto.createHash('sha256').update(`${transactionId}${timestamp}`).digest('hex');
    return hash;
};

// Function to verify handshake data
const verifyHandshakeData = (handshakeData) => {
    // Extract the necessary fields from the handshakeData
    const { buyerConfirmed, goodsInGoodCondition } = handshakeData;

    // Check if both conditions are met
    if (!buyerConfirmed || !goodsInGoodCondition) {
        return false; // Verification failed
    }

    return true; // Verification passed
};


module.exports = {
    generateHandshakeData,
    verifyHandshakeData
};
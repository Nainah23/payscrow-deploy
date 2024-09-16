const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { verifyHandshakeData } = require('../utils/handshakeUtils'); // Import the verification function

const transactionSchema = new Schema({
    senderId: { type: String, required: true, index: true },
    recipientId: { type: String, required: true, index: true },
    amount: { type: Number, required: true },
    status: { type: String, default: 'pending' },
    handshakeData: { type: String },
    buyerConfirmed: { type: Boolean, default: false },
    goodsInGoodCondition: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now, index: true },
    updatedAt: { type: Date, default: Date.now, index: true }
}, {
    autoIndex: true // Ensure indexes are created when the application starts
});

transactionSchema.statics.createTransaction = async function(senderPhoneNumber, recipientPhoneNumber, amount) {
    try {
        const transaction = new this({
            senderId: senderPhoneNumber,
            recipientId: recipientPhoneNumber,
            amount
        });
        return await transaction.save();
    } catch (error) {
        throw new Error(`Error creating transaction: ${error.message}`);
    }
};

transactionSchema.statics.getTransactionById = async function(id) {
    try {
        return await this.findById(id);
    } catch (error) {
        throw new Error(`Error retrieving transaction by ID: ${error.message}`);
    }
};

transactionSchema.statics.verifyHandshake = async function(id, handshakeData) {
    try {
        const transaction = await this.findById(id);
        if (!transaction) {
            throw new Error('Transaction not found');
        }

        // Use the verifyHandshakeData function from handshakeUtils
        if (!verifyHandshakeData(handshakeData)) {
            return false; // Verification failed
        }

        // If verification passed, update the transaction
        transaction.buyerConfirmed = handshakeData.buyerConfirmed;
        transaction.goodsInGoodCondition = handshakeData.goodsInGoodCondition;
        await transaction.save();

        return true; // Verification passed
    } catch (error) {
        throw new Error(`Error verifying handshake: ${error.message}`);
    }
};

transactionSchema.statics.updateTransactionStatus = async function(id, status, escrowFeePercentage) {
    try {
        const transaction = await this.findById(id);
        if (!transaction) {
            throw new Error('Transaction not found');
        }
        transaction.status = status;
        transaction.updatedAt = Date.now();
        return await transaction.save();
    } catch (error) {
        throw new Error(`Error updating transaction status: ${error.message}`);
    }
};

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;

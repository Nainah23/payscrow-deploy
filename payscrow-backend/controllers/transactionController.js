const transactionModel = require('../models/transactionModel');
const { initiateMpesaPayment, releaseFunds } = require('../config/mpesa');
const { generateHandshakeData, verifyHandshakeData } = require('../utils/handshakeUtils');
require('dotenv').config({ path: 'var.env' });

const escrowFeePercentage = process.env.ESCROW_FEE_PERCENTAGE;

exports.createTransaction = async (req, res) => {
    try {
        const { senderPhoneNumber, recipientPhoneNumber, amount } = req.body;
        const transaction = await transactionModel.createTransaction(senderPhoneNumber, recipientPhoneNumber, amount);
        const handshakeData = generateHandshakeData(transaction.id);
        transaction.handshakeData = handshakeData;
        await transaction.save();

        const paymentResponse = await initiateMpesaPayment(senderPhoneNumber, amount, transaction.id);
        res.status(201).json({ transaction, paymentResponse, handshakeData });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getTransactionById = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await transactionModel.getTransactionById(id);
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.verifyTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const { handshakeData } = req.body;
        const isVerified = await transactionModel.verifyHandshake(id, handshakeData);
        if (!isVerified) {
            return res.status(400).send('Verification failed');
        }
        res.status(200).json({ message: 'Transaction verified' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.confirmReceipt = async (req, res) => {
    try {
        const { id } = req.params;
        const { buyerConfirmed, goodsInGoodCondition } = req.body;

        const transaction = await transactionModel.getTransactionById(id);
        if (!transaction) {
            return res.status(404).send('Transaction not found');
        }

        if (transaction.status !== 'confirmed') {
            return res.status(400).send('Transaction not in confirmed state');
        }

        if (buyerConfirmed && goodsInGoodCondition) {
            transaction.buyerConfirmed = true;
            transaction.goodsInGoodCondition = true;
            transaction.status = 'completed';
            const fee = (transaction.amount * escrowFeePercentage) / 100;
            transaction.amount -= fee;
            await transaction.save();

            // Logic to release funds to the recipient goes here
            try {
                const b2c = await releaseFunds(transaction.recipientId, transaction.amount, transaction.id);
                console.log(b2c);
                const updatedTransaction = await transactionModel.updateTransactionStatus(id, 'completed', escrowFeePercentage);
                console.log(updatedTransaction);
            } catch (error) {
                console.error('Error releasing funds:', error);
                return res.status(500).send('Failed to release funds');
            }

            res.status(200).json({ message: 'Transaction completed and funds released', transaction });
        } else {
            res.status(400).send('Buyer confirmation and goods condition required');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

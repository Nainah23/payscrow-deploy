const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/transactions', transactionController.createTransaction);
router.get('/transactions/:id', authMiddleware, transactionController.getTransactionById);
router.post('/transactions/:id/verify', authMiddleware, transactionController.verifyTransaction);
router.post('/transactions/:id/confirm', authMiddleware, transactionController.confirmReceipt);
module.exports = router;
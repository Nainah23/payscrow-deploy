import { useState } from 'react';
import { createTransaction } from '../api/transactionApi';
import PropTypes from 'prop-types';
import './TransactionForm.css';

const TransactionForm = ({ onTransactionCreated }) => {
    const [formData, setFormData] = useState({
        senderPhoneNumber: '',
        recipientPhoneNumber: '',
        amount: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTransaction = await createTransaction(formData);
        onTransactionCreated(newTransaction);
        setFormData({ senderPhoneNumber: '', recipientPhoneNumber: '', amount: '' });
    };

    return (
        <form onSubmit={handleSubmit} className="transaction-form">
            <input
                type="text"
                name="senderPhoneNumber"
                value={formData.senderPhoneNumber}
                onChange={handleChange}
                placeholder="Sender Phone Number"
                required
            />
            <input
                type="text"
                name="recipientPhoneNumber"
                value={formData.recipientPhoneNumber}
                onChange={handleChange}
                placeholder="Recipient Phone Number"
                required
            />
            <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Amount"
                required
            />
            <button type="submit">Create Transaction</button>
        </form>
    );
};
TransactionForm.propTypes = {
    onTransactionCreated: PropTypes.func.isRequired
};

export default TransactionForm;

import { useState } from 'react';
import { confirmReceipt } from '../api/transactionApi';
import PropTypes from 'prop-types';

const TransactionItem = ({ transaction, onConfirmReceipt }) => {
    const [buyerConfirmed, setBuyerConfirmed] = useState(false);
    const [goodsInGoodCondition, setGoodsInGoodCondition] = useState(false);

    const handleConfirm = async () => {
        const confirmationData = { buyerConfirmed, goodsInGoodCondition };
        const updatedTransaction = await confirmReceipt(transaction._id, confirmationData);
        onConfirmReceipt(updatedTransaction);
    };

    return (
        <div className="transaction-item">
            <p>Transaction ID: {transaction._id}</p>
            <p>Amount: {transaction.amount}</p>
            <p>Status: {transaction.status}</p>
            <label>
                <input
                    type="checkbox"
                    checked={buyerConfirmed}
                    onChange={() => setBuyerConfirmed(!buyerConfirmed)}
                />
                Goods Received
            </label>
            <label>
                <input
                    type="checkbox"
                    checked={goodsInGoodCondition}
                    onChange={() => setGoodsInGoodCondition(!goodsInGoodCondition)}
                />
                Goods in Good Condition
            </label>
            <button onClick={handleConfirm}>Confirm and Release Funds</button>
        </div>
    );
};
TransactionItem.propTypes = {
    transaction: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired
    }).isRequired,
    onConfirmReceipt: PropTypes.func.isRequired,
};

export default TransactionItem;

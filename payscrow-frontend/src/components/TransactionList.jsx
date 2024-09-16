import PropTypes from 'prop-types';
import TransactionItem from './TransactionItem';

const TransactionList = ({ transactions, onConfirmReceipt }) => {
    return (
        <div className="transaction-list">
            {transactions.map(transaction => (
                <TransactionItem
                    key={transaction._id}
                    transaction={transaction}
                    onConfirmReceipt={onConfirmReceipt}
                />
            ))}
        </div>
    );
};

TransactionList.propTypes = {
    transactions: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            // Add other transaction properties here if needed
        })
    ).isRequired,
    onConfirmReceipt: PropTypes.func.isRequired,
};

export default TransactionList;

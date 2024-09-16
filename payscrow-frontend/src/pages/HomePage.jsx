import { useState } from 'react';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import './HomePage.css';

const HomePage = () => {
    const [transactions, setTransactions] = useState([]);

    const handleTransactionCreated = (newTransaction) => {
        setTransactions([...transactions, newTransaction]);
    };

    const handleConfirmReceipt = (updatedTransaction) => {
        setTransactions(transactions.map(transaction => 
            transaction._id === updatedTransaction._id ? updatedTransaction : transaction
        ));
    };

    return (
        <div className="home-page">
            <h1>Payscrow Escrow Service</h1>
            <TransactionForm onTransactionCreated={handleTransactionCreated} />
            <TransactionList transactions={transactions} onConfirmReceipt={handleConfirmReceipt} />
        </div>
    );
};

export default HomePage;

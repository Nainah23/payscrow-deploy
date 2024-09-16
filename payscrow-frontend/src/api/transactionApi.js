import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const createTransaction = async (transactionData) => {
    const response = await axios.post(`${API_URL}/transactions`, transactionData);
    return response.data;
};

export const getTransactionById = async (id) => {
    const response = await axios.get(`${API_URL}/transactions/${id}`);
    return response.data;
};

export const confirmReceipt = async (id, confirmationData) => {
    const response = await axios.post(`${API_URL}/transactions/${id}/confirm`, confirmationData);
    return response.data;
};

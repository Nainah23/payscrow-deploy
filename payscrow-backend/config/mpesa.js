const axios = require('axios');
require('dotenv').config({ path: 'var.env' });


const { MPESA_CONSUMER_KEY, MPESA_CONSUMER_SECRET, MPESA_SHORTCODE, MPESA_CALLBACK_URL } = process.env;

const getMpesaToken = async () => {
    try {
        const auth = Buffer.from(`${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`).toString('base64');
        const response = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
            headers: { Authorization: `Basic ${auth}` }
        });
        return response.data.access_token;
    } catch (error) {
        console.error('Error generating Mpesa token:', error);
        throw new Error('Failed to generate Mpesa token');
    }
};

const initiateMpesaPayment = async (senderPhoneNumber, amount, transactionId) => {
    try {
        const token = await getMpesaToken();
        // const timestamp = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, -4);
        // const password = Buffer.from(`${MPESA_SHORTCODE}${MPESA_PASSKEY}${timestamp}`).toString('base64');

        const response = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
            BusinessShortCode: MPESA_SHORTCODE,
            Password: "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMTYwMjE2MTY1NjI3",
            Timestamp: "20160216165627",
            TransactionType: 'CustomerPayBillOnline',
            Amount: amount,
            PartyA: senderPhoneNumber,
            PartyB: MPESA_SHORTCODE,
            PhoneNumber: senderPhoneNumber,
            CallBackURL: MPESA_CALLBACK_URL,
            AccountReference: transactionId,
            TransactionDesc: `Payment for transaction ${transactionId}`
        }, { headers: { Authorization: `Bearer ${token}` } });

        return response.data;
    } catch (error) {
        console.error('Error initiating Mpesa payment:', error);
        throw new Error('Failed to initiate Mpesa payment');
    }
};
// Release Funds to customer. b2c
const releaseFunds = async (recipientPhoneNumber, amount, transactionId) => {
    try {
        const token = await getMpesaToken();
        const timestamp = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, -4);
        const password = Buffer.from(`${MPESA_SHORTCODE}${MPESA_PASSKEY}${timestamp}`).toString('base64');

        const response = await axios.post('https://sandbox.safaricom.co.ke/mpesa/b2c/v1/paymentrequest', {
            OriginatorConversationID: transactionId,
            InitiatorName: "testapi",
            SecurityCredential: "H+sCK25FQoCkCV8s5+G/Qw1ZizGGbH7GT2W0NsVV5QhGlFce4V0Sx/b6MFNPd9xlOgEozb6IjvpSpz6YcWrJVKa9an5vNxLGVRWLG5/InfUxTlsKjchmSKER196+RhIlgVEzMfsUyZZOpc/iNpqYmlFE8uD3jCJg8lNQfs1Tp785xk2vBdMzCmV3ysdg08pBpYhObmNGXuhe33T+e2WrNdjZpkWHYE/lMi7TPEHSIREHu+Ed4OS1YXLbe10LWsDM0ZrCWC5fSYbMc9Ul8HBOhUCwIR1mnbJ4T5m/qQHEZW1TJmbncaIVfoiFqH5/U8NK1J1WcQ/qAKhVNl/j9Ljcig==",
            CommandID: 'BusinessPayment',
            Amount: amount,
            PartyA: MPESA_SHORTCODE,
            PartyB: recipientPhoneNumber,
            Remarks: 'Payment for transaction',
            QueueTimeOutURL: MPESA_CALLBACK_URL,
            ResultURL: MPESA_CALLBACK_URL,
            Occasion: 'Payment'
        }, { headers: { Authorization: `Bearer ${token}` } });

        return response.data;
    } catch (error) {
        console.error('Error releasing funds:', error);
        throw new Error('Failed to release funds');
    }
};
module.exports = { getMpesaToken, initiateMpesaPayment, releaseFunds };

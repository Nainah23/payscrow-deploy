const mongoose = require('mongoose');
const axios = require('axios');
require('dotenv').config({ path: 'var.env' });

const { MONGODB_URI, API_PRIVKEY, PROJECT_ID } = process.env;

const updateIPWhitelist = async (ipAddress) => {
    const url = `https://cloud.mongodb.com/api/atlas/v1.0/groups/${PROJECT_ID}/accessList`;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_PRIVKEY}`
    };
    const data = {
        'cidrBlock': `${ipAddress}/32`,
        'comment': 'Updated via script'
    };

    try {
        const response = await axios.post(url, data, { headers });
        if (response.status === 201) {
            console.log('IP address updated successfully.');
        } else {
            console.error('Failed to update IP address:', response.data);
        }
    } catch (error) {
        console.error('Error updating IP address:', error.response ? error.response.data : error.message);
    }
};

const getCurrentIPAddress = async () => {
    try {
        const response = await axios.get('https://api.ipify.org?format=json');
        return response.data.ip;
    } catch (error) {
        console.error('Error getting current IP address:', error.message);
        throw error;
    }
};

const connectDB = async () => {
    try {
        const currentIPAddress = await getCurrentIPAddress();
        await updateIPWhitelist(currentIPAddress);

        await mongoose.connect(MONGODB_URI, {
            autoIndex: true, // Ensure indexes are created
        });

        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        // Return the mongoose connection instance
        return mongoose.connection;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;

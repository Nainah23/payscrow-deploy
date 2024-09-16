process.env.NODE_DEBUG = 'tls';
const express = require('express');
// This line imports the Express framework, which is used to create the server and handle routing
const axios = require('axios');
const bodyParser = require('body-parser');
// This line imports the body-parser middleware, which is used to parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const cors = require('cors');
const transactionRoutes = require('./routes/transactionRoutes');
// This line imports the transaction routes defined in the 'transactionRoutes.js' file, which will handle the transaction-related API endpoints.
const connectDB = require('./config/db');
require('dotenv').config({ path: 'var.env' });
// This line loads environment variables from a file named 'var.env' into process.env, allowing you to access these variables throughout your application.

const app = express();
// This line creates an Express application instance, which is used to set up the middleware and routes.

const PORT = process.env.PORT || 8080;
// This line defines the port number on which the server will listen for incoming requests. It first tries to read the PORT value from the environment variables and defaults to 3000 if not set.
app.use(cors({
    origin: '*'
  }));
app.use(bodyParser.json());
// This line sets up the body-parser middleware to parse JSON payloads in incoming requests.

app.use('/api', transactionRoutes);
// This line sets up the transaction routes under the '/api' path. Any request to '/api/...' will be handled by the routes defined in 'transactionRoutes.js'.

app.get('/', (req, res) => {
    res.send('<h1>Hello, the server is running!</h1>');
});


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(error => {
    console.error('Error connecting to MongoDB:', error);
});
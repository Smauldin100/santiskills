const express = require('express');  
const cors = require('cors');  
const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');  
require('dotenv').config(); // Load environment variables  

const app = express();  
app.use(cors());  
app.use(express.json());  

// Plaid Configuration  
// Use environment variables for sensitive keys in production!  
const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID || '68332af445aadd0023b5cd50'; // Replace with your client_id or use .env  
const PLAID_SECRET = process.env.PLAID_SECRET || 'ece8eda3d118cc6ffe883a74405407'; // Replace with your sandbox_secret or use .env  
const PLAID_ENV = PlaidEnvironments.sandbox; // Or PlaidEnvironments.development, PlaidEnvironments.production  

const config = new Configuration({  
  basePath: PLAID_ENV,  
  baseOptions: {  
    headers: {  
      'PLAID-CLIENT-ID': PLAID_CLIENT_ID,  
      'PLAID-SECRET': PLAID_SECRET,  
    },  
  },  
});  

const plaidClient = new PlaidApi(config);  

// Endpoint to create a link token  
app.post('/create_link_token', async (req, res) => {  
  try {  
    const response = await plaidClient.linkTokenCreate({  
      user: { client_user_id: req.body.client_user_id || 'unique_user_id' }, // Use a unique user ID from the frontend  
      client_name: 'Santiskills Dashboard',  
      products: ['auth', 'transactions'], // Specify the products you need  
      country_codes: ['US'], // Specify countries  
      language: 'en',  
      // Add redirect_uri in development/production for OAuth  
      // redirect_uri: process.env.PLAID_REDIRECT_URI,  
    });  
    res.json(response.data);  
  } catch (error) {  
    console.error('Error creating link token:', error.response ? error.response.data : error.message);  
    res.status(500).send('Failed to create link token');  
  }  
});  

const PORT = process.env.PORT || 8080; // Choose a port for the backend  

app.listen(PORT, () => {  
  console.log(`Plaid backend server listening on port ${PORT}`);  
}); 
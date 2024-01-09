const crypto = require('crypto');

function generateSignature(apiKey, apiSecret, timestamp, requestPath) {
  const message = timestamp + requestPath;
  const signature = crypto
    .createHmac('sha256', apiSecret)
    .update(message)
    .digest('hex');
  return `${apiKey}:${timestamp}:${signature}`;
}

const axios = require('axios');

const apiKey = 'your_api_key';
const apiSecret = 'your_api_secret';
const baseUrl = 'https://api.upstox.com/'; // Base URL for Upstox API

const timestamp = Date.now();
const requestPath = '/v1/user/profile'; // Example endpoint
const signature = generateSignature(apiKey, apiSecret, timestamp, requestPath);

const headers = {
  'x-api-key': signature,
  'Accept': 'application/json',
};

// Example GET request
axios.get(baseUrl + requestPath, { headers })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });


  // Example POST request
const data = { ... }; // Request body data
axios.post(baseUrl + requestPath, data, { headers })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });

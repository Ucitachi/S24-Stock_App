const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Replace these with your actual Upstox API key and redirect URI
const apiKey = 'd922ff62-5b44-484d-9635-6240665d3133';
const secretKey = '180zxpj9jz';
const redirectUri = 'http://localhost:3000/callback';

//Base URL
//https://api.upstox.com/v2

// Upstox Authorization Endpoint
const upstoxAuthorizationUrl = 'https://api.upstox.com/v2/login/authorization/dialog';
const url1 = "https://api.upstox.com/v2/login/authorization/token"

// Redirect user to Upstox authorization page
app.get('/', (req, res) => {
  const upstoxRedirectUrl = `${upstoxAuthorizationUrl}?client_id=d922ff62-5b44-484d-9635-6240665d3133&redirect_uri=${redirectUri}&response_type=code`;
  
  axios.get(upstoxRedirectUrl)
  .then((response) => {
    data = response;
    console.log("idu nanu");
  });
  res.redirect(upstoxRedirectUrl);
  res.end();
});

// Handle callback from Upstox
app.get('/callback', (req, res) => { 
  // Extract authorization code from the callback URL
  const authorizationCode = req.query.code;
  console.log(authorizationCode);

//   content = {'headers': {
//     'Content-Type' : 'application/x-www-form-urlencoded',
//     'Api-Version' : '2.0',
//     'accept': 'application/json',
//   },
// 'body' :{
//     'code' : authorizationCode,
//     'client_id':apiKey,
//     'client_secret' : secretKey,
//     'redirect_uri' : "https://api.upstox.com/v2/login/authorization/token",
//     'grant_type' : 'authorization_code'
//   } 
// };

const headers = {
  'Content-Type' : 'application/x-www-form-urlencoded',
  'Api-Version' : '2.0',
  'accept': 'application/json'
}

const body  = {
  'code' : authorizationCode,
  'client_id': apiKey,
  'client_secret' : secretKey,
  'redirect_uri' : "http://localhost:3000/callback",
  'grant_type' : 'authorization_code'
}

fetch(url1, {
  method: 'POST',
  headers: headers,
  body: JSON.stringify(body),
})
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

res.end();     
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`);
});
 
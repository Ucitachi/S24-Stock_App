const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Replace these with your actual Upstox API key and redirect URI
const authorizationEndpoint = 'https://api.upstox.com/index/dialog/authorize';
const apiKey = 'd922ff62-5b44-484d-9635-6240665d3133';
const redirectUri = 'https://localhost:3000/trading/auth';

const getAccessToken = async (authorizationCode) => {
  const tokenUrl = 'https://api.upstox.com/index/oauth/token';
  
  const tokenConfig = {
    method: 'post',
    url: tokenUrl,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: `code=${authorizationCode}&grant_type=authorization_code&redirect_uri=${redirectUri}&client_id=${apiKey}`,
  };

  try {
    const response = await axios(tokenConfig);
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error.response ? error.response.data : error.message);
    throw error;
  }
};

app.get('/start-auth', (req, res) => {
  const authorizeUrl = `${authorizationEndpoint}?response_type=code&client_id=${apiKey}&redirect_uri=${redirectUri}`;
  res.redirect(authorizeUrl);
});



app.get('/trading/auth', (req, res) => {
  console.log("success");
  // Handle the authorization callback here
  // Extract the authorization code from req.query and exchange it for an access token
  // You will need to implement this part based on Upstox API documentation
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

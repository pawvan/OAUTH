const express = require('express');
const bodyParser = require('body-parser');
const jwt= require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config()
const app =express()
const PORT = process.env.PORT ||3000;
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json())
let authorizationCodes ={};
app.get('/authorize',(req,res)=>{
const {
    client_id, redirect_uri, response_type, scope  
}=req.query;
if (!client_id || !redirect_uri || response_type !== 'code') {
    return res.status(400).json({ error: 'Invalid request' });
  }
const userAuthorized = true;
if(userAuthorized){
    const authorizationCode = Math.random().toString(36).substring(2);
    authorizationCodes[authorizationCode] = { client_id, redirect_uri }; 
    res.redirect(`${redirect_uri}?code=${authorizationCode}`);
}
else{
    res.status(403).json({ error: 'User denied access' });
}
});
app.post('/token',(req,res)=>{
    const { grant_type, code, redirect_uri, client_id, client_secret } = req.body;
  // Check grant type
  if (grant_type !== 'authorization_code') {
    return res.status(400).json({ error: 'Invalid grant type' });
  }
  const authCodeData = authorizationCodes[code];
  if (!authCodeData || authCodeData.client_id !== client_id || authCodeData.redirect_uri !== redirect_uri) {
    return res.status(400).json({ error: 'Invalid authorization code' });
  }
  if (client_id !== process.env.CLIENT_ID || client_secret !== process.env.CLIENT_SECRET) {
    return res.status(401).json({ error: 'Invalid client credentials' });
  }
  const accessToken = jwt.sign({ client_id, scope: 'user_read' }, process.env.JWT_SECRET, { expiresIn: '1h' });
  const refreshToken = jwt.sign({ client_id }, process.env.JWT_SECRET, { expiresIn: '7d' });

  res.json({ access_token: accessToken, refresh_token: refreshToken, token_type: 'bearer' });

})
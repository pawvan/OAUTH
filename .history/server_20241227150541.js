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
    
})
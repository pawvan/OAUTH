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

})
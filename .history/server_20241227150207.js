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

let 
const express = require('express');
const bodyParser = require('body-parser');
const jwt= require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config()
const app =express()
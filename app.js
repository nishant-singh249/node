const express = require('express');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
dotenv.config({path: './config.env'})
require('./conn')

app.use(express.json());
//const User = require('./userSchema')

//we link the router files to make our route easy
app.use(require('./auth'));
const PORT = process.env.PORT;



app.get('/about',(req,res)=>{
    res.send('Hello MernStack Devloper about page');
})

app.get('/contact',(req,res)=>{
    res.send('Hello MernStack Devloper contact page');
})

app.get('/signin',(req,res)=>{
    res.send('Hello MernStack Devloper signin page');
})

app.get('/signup',(req,res)=>{
    res.send('Hello MernStack Devloper signup page');
})

app.listen(PORT, () =>{
    console.log(`server is running port no ${PORT}`)
})

console.log('hello nishant')


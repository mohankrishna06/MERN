const express = require("express");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const vendorRoutes = require('./routes/vendorRoutes');
const bodyParser = require('body-parser');
const firmRoutes = require('./routes/FirmRoutes');
const productsRoutes= require('./routes/productsRoutes');
const path = require('path');
///const require=('cors');

const app= express() //store values from express to variable called app

const PORT= process.env.PORT || 4000;

dotenv.config();
///app.use(cors());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connected successfully"))
.catch((error)=>console.log(error))

app.use(bodyParser.json());
//create http 
app.use('/vendor',vendorRoutes);

app.use('/firm',firmRoutes);

app.use('/product',productsRoutes);

app.use('/uploads',express.static('uploads')); // standard , folder name in ()

app.listen(PORT,()=>{
    console.log(`Server is started roii MKRu at ${PORT} `);
});

app.use('/home',(req,res)=>{
    res.send("<H1> Server Running MKR </H1>")
})
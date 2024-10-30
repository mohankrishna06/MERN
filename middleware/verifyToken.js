const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const secretKey = process.env.WhatIsYourName

const verifyToken = async( req, res, next) => {
    //next allows only after receiving 

    const token = req.headers.token; // header lo token ni pass cheyyali 

    console.log("header token received: ",token);

    if(!token){
        return res.status(400).json({error: " Token is required"});
    }
    try {
        // decode gibberish
        const decoded = jwt.verify(token, secretKey);
                console.log("Mkruuu decoded is now:"," ",decoded);
        const vendor = await Vendor.findById(decoded.vendorId);
                console.log("vendor id searched is :"," ",vendor);

        if(!vendor){
                console.log("Entered loop !vendor")
            return res.status(404).json({error: "vendor not found"})
        }

        //save
        req.vendorId = vendor._id;
        console.log("The decoded is",req.vendorId);

        next ()

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Invalid token"});
    }
}

module.exports = verifyToken
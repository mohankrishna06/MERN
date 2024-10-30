const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const bcrypt= require('bcryptjs');
const dotenv= require('dotenv');

dotenv.config();

const secretKey = process.env.WhatIsYourName

const vendorRegister = async(req,res)=>{
         const {username,email,password} = req.body;

         // check chesi email ni token la change chesi save cheyyali
         // password ni hash chesi cheyyali 
         // so install packages jsonwebtoken bcryptjs

         try{
            const vendorEmail= await Vendor.findOne({email});
            if(vendorEmail){
                return res.status(400).json("Email already Taken");
            }
            const hashedPassword = await bcrypt.hash(password,10);
            
            const newVendor = new Vendor({
                username,
                email,
                password: hashedPassword
            });
            await newVendor.save()
        
                res.status(201).json({message: "vendor registered successfully"});
                console.log("Registered Vendor!!")            
        } catch(error){
            console.log(error);
              res.status(500).json({error:" Internal Server Error"})
         }
}

const vendorLogin = async(req,res)=>{
    const{email,password}=req.body;
    try{
        const vendor = await Vendor.findOne({email});
        if(!vendor || !(await bcrypt.compare(password,vendor.password))){
            return res.status(401).json({error:"Invalid username or password"})
        }

        // login ainappudu oka token generate cheddham , changed every time ,, helpful in security.
        const token = jwt.sign({vendorId: vendor._id},secretKey, {expiresIn:"1h"})

        res.status(200).json({success: " Login Sucessful",token})
        console.log(email, " this is the token", token);
    }
    catch(error){
        console.log(error);
        res.status(500).json({error: "Internal Server Error"});
    }
}


const getAllVendors= async(req,res)=>{
    try {
        const vendors = await Vendor.find().populate('firm'); // populate from firm table
        res.json({vendors});
    } catch (error) {
        console.log(error);
              res.status(500).json({error:" Internal Server Error"});
    }
}

const getVendorByID= async(req,res)=>{
    const vendorId= req.params.apple;      // url resource lo apple isthe apple , basic ga aithe id ani use 

    try {
        const vendor = await Vendor.findById(vendorId).populate('firm');
        if(!vendor){
            return res.status(400).json({error: " Vendor not found"});
        }
        res.status(200).json({vendor})
    } catch (error) {
        console.log(error);
              res.status(500).json({error:" Internal Server Error"});
    }
}
module.exports = {vendorRegister, vendorLogin, getAllVendors,getVendorByID};
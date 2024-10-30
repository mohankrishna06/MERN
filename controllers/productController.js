
const Product = require('../models/Product');
const multer = require('multer');
const path=require('path');
const Firm= require('../models/Firm');

const express = require('express');
const app = express();

const storage = multer.diskStorage({
    destination: function(req,res,cb){
       cb(null,'uploads/');
     }, // Directory where files will be saved
    filename: function(req, file, cb){
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  const upload = multer({storage: storage});
  ///


  const addProduct= async(req,res)=>{
    try {
        const {productName, price, catagory, bestseller, description} = req.body;
        const image = req.file? req.file.filename: undefined;

        const firmId= req.params.firmId;
        const firm= await Firm.findById(firmId);

        if(!firm){
            return res.status(404).json({error: "No firm found"});
        }

        const product = new Product({
            productName, price, catagory, bestseller, description, image, firm: firm._id
        })

        const savedProduct = await product.save();
        firm.product.push(savedProduct); // product is table name

        await firm.save();
        res.status(200).json(savedProduct);

    } catch (error) {
        console.error(error);
        res.status(500).json({error: " Internal Server error"});
    }
  }


  const getProductByFirm = async(req,res) => {
    try {
        const firmId= req.params.firmId;
        const firm= await Firm.findById(firmId);

        if(!firm){
            return res.status(404).json({error: " No Firm Found"})
        }


        const resname= firm.firmName;
        const products = await Product.find({firm: firmId});

        res.status(200).json({resname, products});

    } catch (error) {
         console.error(error);
        res.status(500).json({error: " Internal Server error"});
    }
  }

  const deleteProductById=async(req,res)=>{
    try {
        const productId= req.params.productId;
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if(!deletedProduct){
            return res.status(404).json({error: " No product found"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({error: " Internal Server error"});
    }
}

  module.exports = {addProduct: [upload.single('image'), addProduct],getProductByFirm,deleteProductById};
// already a vendor has a token , he might have a firm so to verify token of his we use middlewear

const Firm = require('../models/Firm');
const Vendor = require('../models/Vendor');
const multer = require('multer');
const path=require('path');
///const verifyToken= require('../middleware/verifyToken');
const express = require('express');
const app = express();

/// 
// Set storage engine for multer
const storage = multer.diskStorage({
  destination: function(req,res,cb){
     cb(null,'uploads/');
   }, // Directory where files will be saved
  filename: function(req, file, cb){
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
// Initialize upload with multer
const upload = multer({storage: storage});
///
console.log("Controller ki vacchesaam, request vacchindhi : ");
const addFirm = async(req, res) =>{
        try {
          console.log("Firm route hit");
            const {firmName, area, catagory, region, offer} = req.body;
            const image = req.file? req.file.filename: undefined;
            
            const vendor = await Vendor.findById(req.vendorId);

            if(!vendor){
                res.status(404).json({message:" Vendor not found"})
            }
            const firm = new Firm({
            firmName, 
            area, 
            catagory,
             region, 
             offer,
              image, 
              vendor: vendor._id
        })

        const savedFirm = await firm.save();
        vendor.firm.push(savedFirm);
        await vendor.save();

        return res.status(200).json({message:"Firm added successfully"});

        } catch (error) {
            console.log(error)
            res.status(500).json({message:"Error adding firm"})
        }
        

}

const deleteFirmById=async(req,res)=>{
  try {
      const firmId= req.params.firmId;
      const deletedFirm = await Firm.findByIdAndDelete(firmId);

      if(!deletedFirm){
          return res.status(404).json({error: " No product found"});
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({error: " Internal Server error"});
  }
}
/* image tho paati */
module.exports = {addFirm: [upload.single('image'),addFirm],deleteFirmById}
const mongoose = require('mongoose');

const firmSchema= new mongoose.Schema({
          firmName:{
            type: String,
            required: true,
            unique: true
          },
          area:{
            type: String,
            required: true,
          },
          catagory:{
            type: [
                    {
                    type: String,
                    enum : ['veg','non-veg'],
                    }
                ]
            },
          region:{
                type:[
                    {
                    type: String,
                    enum : ['South-Indian','North- Indian','Chinese'],
                    }
                 ]
            },
          offer: {
                type: String,
            },
          image:{
                type: String
            },
            
            // relation with another model
            vendor:[
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref:'Vendor' // table ref
                }
            ],

            product: [{
              type: mongoose.Schema.Types.ObjectId,
              ref:'Product'
          }]


});

const Firm = mongoose.model('Firm',firmSchema);
module.exports = Firm
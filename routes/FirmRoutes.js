const express = require('express');
const firmController = require('../controllers/firmController');
const verifyToken= require('../middleware/verifyToken');


const router = express.Router()

// test
router.post('/test', (req, res) => {
    console.log("Route reached");
    res.send("Test route reached");
  });
  
router.post('/add-firm', verifyToken, firmController.addFirm);
console.log("Done");

router.get('/uploads/:imageName',(req,res)=>{
  const imageName= req.params.imageName;
  res.headersSent('Content-Type','image/jpeg');
  res.sendFile(path.join(__dirname,'..','uploads',imageName));
})

router.delete('/:firmId',firmController.deleteFirmById);



module.exports = router;

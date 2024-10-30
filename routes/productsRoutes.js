const express = require('express');
const productControler = require('../controllers/productController');


const router = express.Router();


router.post('/add-product/:firmId',productControler.addProduct);
router.get('/:firmId/products',productControler.getProductByFirm);

router.get('/uploads/:imageName',(req,res)=>{
    const imageName= req.params.imageName;
    res.headersSent('Content-Type','image/jpeg');
    res.sendFile(path.join(__dirname,'..','uploads',imageName));
})

router.delete('/:productId',productControler.deleteProductById);

module.exports = router;
const vendorcontroller = require('./vendorcontroller');
const express = require('express');
const verifytoken = require('./verifytoken');
const firmcontroller = require('./firmcontroller');
const productcontroller = require('./productcontroller');

const router = express.Router();

router.post('/register',vendorcontroller.vendorregister);   
router.post('/login',vendorcontroller.vendorlogin);
router.get('/list',vendorcontroller.totallist);
router.post('/add-firm',verifytoken,firmcontroller.firmregister);
router.post('/add-products/:firmid',productcontroller.productsregister);
router.get('/:firmid/products',productcontroller.totalproducts);
router.delete('/products/delete/:firmid/:proid',productcontroller.deleteproduct)
router.get('/uploads/:imagename',(req,res)=>{
    const imagename = req.params.imagename;
    res.header('Content-Type','image/jpeg');
    res.sendFile(path.join(__dirname,'..','uploads',imagename));
});

module.exports = router;

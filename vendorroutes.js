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

module.exports = router;

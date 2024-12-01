const mongoose = require('mongoose');
const productschema = mongoose.Schema({
    productname:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    category:{
        type:[{
            type:String,
            enum:["veg","non-veg"]
        }]
    },
    image:{
        type:String
    },
    bestseller:{
        type:String
    },
    description:{
        type:String
    },
    firm:[{
        type:Object,
        href:"firm"
    }]
});

const product = mongoose.model("product",productschema);

module.exports = product;
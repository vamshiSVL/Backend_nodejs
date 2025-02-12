const mongoose = require('mongoose');
const productschema = mongoose.Schema({
    productname:{
        type:String,
<<<<<<< HEAD
        // required:true
    },
    price:{
        type:String,
        // required:true
=======
        required:true
    },
    price:{
        type:String,
        required:true
>>>>>>> cf826f07129cd27efd8af246f233c85d23c650bc
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
<<<<<<< HEAD
=======
    bestseller:{
        type:String
    },
>>>>>>> cf826f07129cd27efd8af246f233c85d23c650bc
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
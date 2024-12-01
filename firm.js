const mongoose = require('mongoose');

const firmschema = new mongoose.Schema({
    firname:{
        type:String,
        required:true
    },
    area:{
        type:String,
        required:true
    },
    category:{
        type:[{
            type:String,
            enum:["veg","non-veg"]
        }]
    },
    region:{
        type:[{
            type:String,
            enum:["south-indian","north-indian","chinese","bakery"]
        }]
    },
    offer:{
        type:String
    },
    image:{
        type:String
    },
    Vendor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"vendor"
    },
    products:[{
        type:Object,
        href:"product"
    }]
})


const firm = mongoose.model('firm',firmschema);
module.exports = firm;
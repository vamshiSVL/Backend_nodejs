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
<<<<<<< HEAD
            enum:["south-indian","north-indian"]
=======
            enum:["south-indian","north-indian","chinese","bakery"]
>>>>>>> cf826f07129cd27efd8af246f233c85d23c650bc
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
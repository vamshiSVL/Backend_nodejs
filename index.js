const express = require('express');
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const vendorroutes = require('./vendorroutes');

const app = express();
const port = 4000;

dotEnv.config();

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MONGODB connected successfully"))
.catch((error)=>console.log(error))

app.use(express.json());
app.use('/vendor', vendorroutes);

app.listen(port,()=>{
    console.log(`server starts at ${port}`);
});

app.use('/home',(req,res)=>{
    res.send("<h1>welcome");
});


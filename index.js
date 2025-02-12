const express = require('express');
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const vendorroutes = require('./vendorroutes');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

dotEnv.config();
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MONGODB connected successfully"))
.catch((error)=>console.log(error))

app.use(express.json({ limit: '10mb' })); // adjust the limit as needed
app.use(express.urlencoded({ limit: '10mb', extended: true })); // for form-data

app.use('/vendor', vendorroutes);
app.use('/uploads',express.static('uploads'));

app.listen(port,()=>{
    console.log(`server starts at ${port}`);
});

app.use('/',(req,res)=>{
    res.send("welcome");
});


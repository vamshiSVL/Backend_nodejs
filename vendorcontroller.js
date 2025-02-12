const vendor = require('./vendor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotEnv = require('dotenv');

dotEnv.config();
<<<<<<< HEAD
const secretkey = process.env.WhatIsYourName;   
=======
const secretkey = process.env.WhatIsYourName;
>>>>>>> cf826f07129cd27efd8af246f233c85d23c650bc

const vendorregister = async(req, res)=>{
    const {username, email, password} = req.body 
    try{
        const vendoremail = await vendor.findOne({email});
        if(vendoremail){
            return res.status(400).json("email already taken");
        }
        const hashedpassword = await bcrypt.hash(password,10);
        const newvendor = new vendor({
            username,
            email,
            password:hashedpassword
        });
        await newvendor.save();

        res.status(201).json({message: "vendor registered successfully",newvendor});
        console.log('registered');

    }catch(error){
        console.log(error);
        res.status(500).json({error: "internalserver error"});
    }
};

const vendorlogin = async(req,res)=>{
    const{email, password} = req.body;
    try{
        const vendoremail = await vendor.findOne({email});
        if(!vendoremail || !(await bcrypt.compare(password,vendoremail.password))){
            res.status(401).json({error: "invalid username or password"});
        }else{
            const token = jwt.sign({vendorid: vendoremail._id}, secretkey, {expiresIn: "1h"});
<<<<<<< HEAD
            console.log(vendoremail.firm)
            res.status(200).json({success: "login successfull",token,firms:vendoremail.firm});
=======
            res.status(200).json({success: "login successfull",token});
>>>>>>> cf826f07129cd27efd8af246f233c85d23c650bc
        }
    }catch(error){
        res.status(500).json(error);
        console.log(error);
    }
};

const totallist = async(req,res)=>{
    try{
        const tlist = await vendor.find();
        res.status(202).json(tlist);
        console.log(tlist);
    }catch(error){
        console.log({error:"error"});
    }
};

<<<<<<< HEAD
module.exports = { vendorregister ,vendorlogin, totallist };
=======
module.exports = { vendorregister ,vendorlogin, totallist};
>>>>>>> cf826f07129cd27efd8af246f233c85d23c650bc

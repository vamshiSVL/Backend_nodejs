const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const secretkey = process.env.WhatIsYourName;

const verifytoken = async (req, res, next) => {
    try {
        const token = req.headers.token;
        if (!token) {
            return res.status(401).json({ error: "Token is required" });
        }

        // Verify the token
        jwt.verify(token, secretkey, (err, decoded) => {
            if (err) {
                return res.status(404).json({ error: "Token not valid" });
            }

            // Log the decoded token to inspect its contents
            console.log("Decoded Token:", decoded);

            // Check if the id exists in the decoded token
            if (!decoded || !decoded.vendorid) {
                return res.status(401).json({ error: "Invalid token payload" });
            }

            // Set vendorId from decoded token
            req.vendorId = decoded.vendorid;

            console.log("Vendor ID from Token:", req.vendorId); // Check vendorId
            next();  // Proceed to the next middleware or route handler
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = verifytoken;

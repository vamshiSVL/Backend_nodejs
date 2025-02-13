const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productname: {
        type: String,
        required: true  // Ensure this is consistent
    },
    price: {
        type: String,
        required: true  // Ensure this is consistent
    },
    category: {
        type: [{
            type: String,
            enum: ["veg", "non-veg"]
        }]
    },
    image: {
        type: String
    },
    bestseller: {
        type: String
    },
    description: {
        type: String
    },
    firm: [{
        type: Object,
        href: "firm"
    }]
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

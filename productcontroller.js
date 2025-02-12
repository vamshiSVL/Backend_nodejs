const product = require('./product');
const firm = require('./firm');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { findById, findByIdAndDelete } = require('./vendor');

const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Set the upload directory
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      // Set the file name for the uploaded image
      cb(null, Date.now() + path.extname(file.originalname)); // adds timestamp to the file name
    }
  });
  
  // Initialize multer with the storage configuration
  const upload = multer({ storage: storage });

const productsregister = async(req, res) => {
    try {
        // Extract product details from the request body
        const { productname, price, category, description } = req.body;
        const image = req.file?req.file.filename:undefined;
        const firmid = req.params.firmid;  // Firm ID from the URL params

        console.log(firmid);
        const categoryArray = typeof category === 'string' ? category.split(',') : category;

        // Find the firm by its ID
        const Firm = await firm.findById(firmid);
        console.log("Firm:", Firm);

        if (!Firm) {
            return res.status(404).json({ error: "No firm found" });
        }

        // Create a new product
        const newproduct = new product({
            productname,
            price,
            category: categoryArray,
            image,
            description,
            firm: Firm.id  // Link the product to this firm
        });

        // Save the new product to the database
        const addedproduct = await newproduct.save();
        console.log("Added product:", addedproduct);

        // Add the new product's ID to the firm's products array (don't overwrite the array)
        Firm.products.push(addedproduct); // Push only the product's ID, not the entire product object

        // Save the updated firm document
        const addedfirmpro = await Firm.save();
        console.log("Firm updated with new product:", addedfirmpro);

        // Return success response
        res.status(201).json({ message: "Product registered successfully", addedfirmpro });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
};

const totalproducts = async (req, res) => {
    try {
        const proid = req.params.firmid;  // Firm ID from the URL params

        // Find the firm by its ID and populate the 'products' field
        const pro = await firm.findById(proid).populate('products');  // Use populate to get the full product details

        console.log("Firm with products:", pro);

        if (!pro) {
            return res.status(404).json({ error: "Firm not found" });
        }

        // Return the list of products associated with the firm
        res.status(200).json(pro);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
};

const deleteproduct = async (req, res) => {
    try {
        const { firmid, proid } = req.params; // Get IDs from URL params

        // Find and delete the product
        const prodel = await product.findByIdAndDelete(proid);
        if (!prodel) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Find the firm and remove the product ID from its array
        const Dfirm = await firm.findById(firmid);
        if (!Dfirm) {
            return res.status(404).json({ error: "Firm not found" });
        }

        // Remove the product ID from the firm's products array
        Dfirm.products = Dfirm.products.filter(item => item.toString() !== proid);
        await Dfirm.save(); // Save changes to the database

        res.status(200).json({ message: "Product successfully deleted" });

    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "Server error" });
    }
};



module.exports = {productsregister: [upload.single('image'), productsregister],totalproducts,deleteproduct};

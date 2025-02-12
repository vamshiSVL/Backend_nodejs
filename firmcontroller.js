const firm = require('./firm');
const vendor = require('./vendor');
const multer = require('multer');
<<<<<<< HEAD
const path = require('path');
const fs = require('fs');

// Ensure the uploads folder exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

// Initialize multer
const upload = multer({ storage });

// Register firm function
const firmregister = async (req, res) => {
    try {
        const { firname, area, category, region, offer } = req.body;
        const image = req.file ? req.file.filename : undefined;

        // Convert category and region to arrays if they are sent as strings
        const categoryArray = typeof category === 'string' ? category.split(',') : category;
        const regionArray = typeof region === 'string' ? region.split(',') : region;

        // Ensure vendor exists
        const Vendor = await vendor.findById(req.vendorId);
        if (!Vendor) {
            return res.status(404).json({ error: 'Vendor not found' });
        }

        // Create and save new firm
        const newFirm = new firm({
            firname,
            area,
            category: categoryArray,  // Ensuring it's stored as an array
            region: regionArray,  // Ensuring it's stored as an array
            offer,
            image,
            Vendor: Vendor.id,
        });

        const addedFirm = await newFirm.save();
        Vendor.firm.push(addedFirm);
        await Vendor.save();

        res.status(201).json({ message: "Firm registered successfully.", id: addedFirm._id });
    } catch (error) {
        console.error("Firm Registration Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Export the firmregister route with the upload middleware
module.exports = { firmregister: [upload.single('image'), firmregister] };
=======

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

const firmregister = async(req,res)=>{
    try{
        const {firname, area, category, region, offer} = req.body;
        const image = req.file?req.file.filename:undefined;

        const Vendor = await vendor.findById(req.vendorId);
        console.log(Vendor);
        const newfirm = new firm({
            firname, area, category, region, offer, image, Vendor:Vendor.id

        });
        const addedfirm = await newfirm.save();
        Vendor.firm.push(addedfirm);
        const updatedVendor = await Vendor.save();

        console.log('Updated Vendor:', updatedVendor);
        res.status(201).json({ message: "Firm registered successfully.",updatedVendor});   
        console.log(newfirm);
    }catch(error){
        console.log(error);
        res.status(500).json({error: "internalserver error"});
    }
}

module.exports = {firmregister:[upload.single('image'),firmregister]};
>>>>>>> cf826f07129cd27efd8af246f233c85d23c650bc

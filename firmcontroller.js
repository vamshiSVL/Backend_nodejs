const firm = require('./firm');
const vendor = require('./vendor');
const multer = require('multer');

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
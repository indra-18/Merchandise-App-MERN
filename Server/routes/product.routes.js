const router = require('express').Router();
require('dotenv').config();
const productController = require('../controllers/product.controller')
const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  });

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'frenzy',
      public_id: (req, file) => Date.now() + '-' + file.originalname,
    },
});
  

const upload = multer({ storage: storage });

router.get('/', productController.getAllProducts);
router.post('/',upload.single('image'), productController.add);
router.get('/:id', productController.getProductWithId);
router.put('/:id',upload.single('image'), productController.updateProduct);
router.delete('/:id', productController.deleteProduct)

module.exports = router
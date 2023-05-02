const router = require('express').Router();
require('dotenv').config();
const productController = require('../controllers/products.controller')
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

router.get('/');
router.post('/',upload.single('image'), productController.add);
router.get('/:id/');
router.put('/:id/');
// router.patch('/:id/')
router.delete('/id:/')

module.exports = router
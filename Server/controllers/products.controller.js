const ProductModel = require('../models/product.model');
const cloudinary = require('cloudinary').v2
// const multer = require('multer')



cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  });
var exports = module.exports = {};

exports.add = async (req, res) => {
    try{
        const imageUrl = await cloudinary.uploader
        .upload(req.file.path)

        const newProduct = new ProductModel({
            title: req.body.title,
            description: req.body.description,
            image: imageUrl.secure_url,
            price: req.body.price
        })
        await newProduct.save();
        res.status(200).send(newProduct)

    }
    catch(err) {
        res.status(500).send({error: err.message})
    }

}
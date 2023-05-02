const ProductModel = require('../models/product.model');
const cloudinary = require('cloudinary').v2
var exports = module.exports = {};


cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  });

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
        res.status(200).json({result: newProduct})

    }
    catch(err) {
        res.status(500).send({error: err.message})
    }
}

exports.getAllProducts = async (req, res) => {
    try {
        const allProducts = await ProductModel.find();
        res.status(200).json({result: allProducts})
    } catch (error) {
        res.status(500).send({error: err.message})
    }
}

exports.getProductWithId = async (req, res) => {
    try {
        const id = req.params.id
        const product = await ProductModel.findById(id)
        res.status(200).json({result: product})
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const imageUrl = await cloudinary.uploader
        .upload(req.file.path)
        const updatedProduct = {
            ...req.body,
            image: imageUrl.secure_url
        }
        await ProductModel.findByIdAndUpdate(id, updatedProduct);
        const returnProduct = await ProductModel.findById(id)
        res.status(200).json({result: returnProduct})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedProduct = await ProductModel.findByIdAndRemove(id);
        if (!deletedProduct) {
            return res.status(404).json({error: "Product not found"});
        }
        // const { image } = deletedProduct;
        // const publicId = image.split('/').slice(-2, -1)[0];
        // await cloudinary.uploader.destroy(publicId);
        res.status(200).json({result: 'Product Deleted'});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

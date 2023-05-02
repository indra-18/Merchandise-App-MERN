const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    }},{
        timestamps: true
    })

productSchema.method("toJSON", function() {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});
const ProductModel = mongoose.model('products', productSchema)
module.exports = ProductModel
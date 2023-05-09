const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  cart: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductModel'
    },
    quantity: { type: Number, default: 1 }
  }]
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;

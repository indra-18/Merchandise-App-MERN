const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs')

const UserSchema = new mongoose.Schema({
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


UserSchema.methods.comparePassword = function (password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, function(err, isMatch) {
      if (err) {
        return reject(err);
      }
      resolve(isMatch)
    })
  });
};



const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;

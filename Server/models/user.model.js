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

UserSchema.statics.comparePassword = function (password, hashedPassword, callback) {
  bcrypt.compare(password, hashedPassword, function(err, isMatch) {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch)
  })
}


const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;

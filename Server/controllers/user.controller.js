const UserModel = require('../models/user.model');
require('dotenv').config()
const passport = require('passport');
require('../config/passport')(passport);
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')


const userController = {};

userController.createUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const salt = await bcrypt.genSaltSync(8)
  const hashedPassword = await bcrypt.hashSync(password, salt)
  try {
    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      cart: [],
    });
    var token = jwt.sign(newUser.toJSON(), process.env.SECRET, {
      expiresIn: 604800
    });
    return res.status(201).json({ result: newUser, token: 'JWT' + token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

userController.login = async (req, res) => {
  try {
    const user = await UserModel.findOne({email: req.body.email});
    console.log(user)
    if (!user) {
      return res.status(401).json({error: 'User not found'})
    }
    else {
      const isMatch = await UserModel.comparePassword(req.body.password, user.password);
      console.log(isMatch)
      if (!isMatch) {
        res.status(401).json({error: 'Wrong Password'})
        console.log('wrong password')
      }
      if (isMatch) {
        var token = jwt.sign(user.toJSON(), process.env.SECRET, {
          expiresIn: 604800
        })
        console.log('jwt created')
        res.status(200).json({result: user, token: 'JWT' + token});
      }
    }
  } catch (error) {
    res.status(401).json({error: error.message})
  }
}



userController.getUserWithEmail = async (req, res) => {
  try {
    const { email } = req.body
    const user = await UserModel.find({email})
    return res.status(200).json({result: user})
  } catch (error) {
    res.status(500).json({error: error.message})
  }
} 

userController.getAllUsers = async (req, res) => {
  try {
    const usersList = await UserModel.find()
    return res.status(200).json({ result: usersList });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

userController.getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json({ result: user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

userController.updateUser = async (req, res) => {
  const { userId } = req.params;
  const { name, email, password } = req.body;

  if (!name && !email && !password) {
    return res.status(400).json({ error: 'At least one field is required to update' });
  }

  try {
    const user = await UserModel.findByIdAndUpdate(
      userId,
      {
        name: name || undefined,
        email: email || undefined,
        password: password || undefined,
      },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json({ result: user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

userController.addToCart = async (req, res) => {
  // const token = getToken(req.headers)
  // if (!token) {
  //   return res.status(403).json({error: 'unauthorized'})
  // }
  const { userId } = req.params;
  const { productId, quantity } = req.body;
  if (!productId || !quantity) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const productIndex = user.cart.findIndex((item) => item.product.toString() === productId.toString());
    if (productIndex >= 0) {
      // Product already exists in cart, update quantity
      user.cart[productIndex].quantity += quantity;
    } else {
      // Product not in cart, add it
      user.cart.push({ product: productId, quantity });
    }

    await user.save();
    return res.status(200).json({ result: user.cart });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

userController.removeFromCart = async (req, res) => {
    const token = getToken(req.headers)
    if (!token) {
      return res.status(403).json({error: 'unauthorized'})
    }
    const { userId } = req.params;
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ error: 'Missing product ID' });
    }
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const updatedCart = user.cart.filter(item => item.product.toString() !== productId);
      user.cart = updatedCart;
      await user.save();
      return res.status(200).json({ message: 'Product removed from cart', result: user.cart });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  
// const getToken = function (headers) {
//   console.log('Hi')
//   if (headers && headers.authorization) {
//     var parted = headers.authorization.split(' ');
//     if (parted.length === 2) {
//       return parted[1]
//     }else {
//       return null;
//     }
//   }
//   else {
//     return null
//   }
// }

  module.exports = userController
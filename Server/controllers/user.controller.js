const UserModel = require('../models/user.model');
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
    return res.status(201).json({ result: newUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

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
  
  module.exports = userController
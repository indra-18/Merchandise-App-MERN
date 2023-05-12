const router = require('express').Router();
const userController = require('../controllers/user.controller');
const passport = require('passport');
require('../config/passport')(passport)
const jwt = require('jsonwebtoken');

router.post('/users/signup', userController.createUser)
router.post('/users/login', userController.login)
router.get('/users', userController.getAllUsers)
router.get('/users/:userId', userController.getUserById)
router.patch('/users/:userId', userController.updateUser)

// router.post('/cart/:userId', passport.authenticate('jwt', { session: false}), userController.addToCart)
// router.delete('/cart/:userId', passport.authenticate('jwt', { session: false}), userController.removeFromCart)

router.post('/cart/:userId', userController.addToCart)
router.delete('/cart/:userId', userController.removeFromCart)
router.patch('/cart/:userId', userController.updateQuantity)


module.exports = router;
const router = require('express').Router();
const userController = require('../controllers/user.controller')

router.post('/users', userController.createUser)
router.get('/users', userController.getAllUsers)
router.get('/users/:userId', userController.getUserById)
router.put('/users/:userId', userController.updateUser)

router.post('/cart/:userId', userController.addToCart)
router.delete('/cart/:userId', userController.removeFromCart)

module.exports = router;
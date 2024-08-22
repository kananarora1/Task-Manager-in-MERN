const User = require('../Models/user');
const userController = require('../Controllers/userController');

const router = require('express').Router();

router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);

router.get('/currentUser', userController.getCurrentUser);

module.exports = router;
const express = require('express');
const userController = require('../controllers/userController');
const userAuth = require('../middleware/userAuth');

const router = express.Router();

router.post('/registration', userAuth.saveUser, userController.createUser);
router.post('/login', userController.loginUser);

module.exports = router;
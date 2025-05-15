const express = require('express');
const loginController = require('../controller/loginController');

const router = express.Router();

router.post('/signup', loginController.registerUser);
router.post('/login', loginController.loginCheck);

module.exports = router;
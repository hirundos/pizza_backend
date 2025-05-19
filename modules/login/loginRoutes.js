const express = require('express');
const loginController = require('./loginController');

const router = express.Router();

router.post('/signup', loginController.registerUser);
router.post('/login', loginController.loginCheck);
router.get('/logout', loginController.logout);

module.exports = router;
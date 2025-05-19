const express = require('express');
const menuController = require('./menuController');

const router = express.Router();

router.get('/menu', menuController.getMenus);

module.exports = router;
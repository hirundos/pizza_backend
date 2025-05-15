const express = require('express');
const menuController = require('../controller/menuController');

const router = express.Router();

router.get('/menu', menuController.getMenus);

module.exports = router;
const express = require('express');
const orderController = require('../controller/orderController');

const router = express.Router();

router.post('/myorder', orderController.myOrders);

module.exports = router;
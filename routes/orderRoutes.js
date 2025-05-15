const express = require('express');
const orderController = require('../controller/orderController');

const router = express.Router();

router.get('/myOrder', orderController.myOrders);

module.exports = router;
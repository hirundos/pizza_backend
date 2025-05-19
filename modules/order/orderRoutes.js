const express = require('express');
const orderController = require('./orderController');

const router = express.Router();

router.post('/myorder', orderController.myOrders);
router.post('/order', orderController.order);
router.get('/pizza',orderController.pizzas);

module.exports = router;
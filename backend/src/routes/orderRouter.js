const express = require('express');
const orderController = require('../controllers/orderController');

// Create Router
const router = express.Router();
router.route('/').post(orderController.createOrder);

module.exports = router;

const express = require('express');
const apiDocController = require('../controllers/apiDocController');

// Create Router
const router = express.Router();
router.route('/').get(apiDocController.getApiDoc);

module.exports = router;

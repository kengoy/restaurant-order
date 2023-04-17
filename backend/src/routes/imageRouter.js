const express = require('express');
const imageController = require('../controllers/imageController');

// Create Router
const router = express.Router();
router.route('/:id').get(imageController.getImage);

module.exports = router;

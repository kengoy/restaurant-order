const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../config/api.doc');

// Route Handler
exports.getApiDoc = (req, res) => {
  res.send(swaggerUi.generateHTML(swaggerDocument));
};

const path = require('path');

// Route Handler
exports.getImage = (req, res) => {
  res.sendFile(path.resolve(`data/images/${req.params.id}.jpg`));
};

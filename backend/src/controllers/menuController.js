const fs = require('fs');

// Read menu file first
const menu = JSON.parse(fs.readFileSync(`${__dirname}/../../data/menu.json`));

// Route Handler
exports.getMenu = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: {
      menu,
    },
  });
};

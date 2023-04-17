const fs = require('fs');

// Open connection to database(json file for simplicity) to store order information
const dbFilePath = `${__dirname}/../../db/orders.json`;
const orders = JSON.parse(fs.readFileSync(dbFilePath));

// Route Handler
exports.createOrder = (req, res) => {
  const order = req.body;
  const newId = orders.length === 0 ? 0 : orders[orders.length - 1].id + 1;
  const newOrder = Object.assign({ id: newId, time: req.requestTime }, order);

  orders.push(newOrder);

  fs.writeFile(dbFilePath, JSON.stringify(orders), (err) => {
    if (err) throw err;
    res.status(201).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        order: newOrder,
      },
    });
  });
};

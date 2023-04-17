const fs = require('fs');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const menuRouter = require('./routes/menuRouter');
const imageRouter = require('./routes/imageRouter');
const orderRouter = require('./routes/orderRouter');

const app = express();

// MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.requestTime);
  next();
});

// ROUTES
app.use('/api/v1/menu', menuRouter);
app.use('/api/v1/image', imageRouter);
app.use('/api/v1/order', orderRouter);

// START SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`API server listening on port ${port}...`);
});

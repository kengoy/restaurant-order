require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
  domain: process.env.DOMAIN || 'http://localhost:3000',
  logLevel: process.env.LOG_LEVEL || 'debug',
  api: {
    url:
      process.env.REACT_APP_API_URL ||
      'https://api.beta.dyp.gig.gigsternetwork.com/',
  },
};

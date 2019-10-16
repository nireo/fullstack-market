const mongoose = require('mongoose');
const config = require('./config');
// logger is not really needed now, but for later
const logger = require('./logger');

const connectToDatabase = () => {
  mongoose
    .connect(config.MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
      logger.info('[mongoose] Successfully connected database');
    })
    .catch(e => {
      logger.info(e);
    });
};

const getToken = req => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    // token with 'bearer ' cut out
    return authorization.substring(7);
  }
  return null;
};

module.exports = {
  connectToDatabase,
  getToken
};

const mongoose = require('mongoose');
const config = require('./config');
// logger is not really needed now, but for later
const logger = require('./logger');

const connectToDatabase = () => {
  mongoose
    .connect(config.MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
      logger.info('successfully connected to mongodb');
    })
    .catch(e => {
      logger.info(e);
    });
};

module.exports = {
  connectToDatabase
};

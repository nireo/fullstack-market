const logger = require('./logger');

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({
      error: 'malformation id'
    });
  }
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      error: error.message
    });
  }
  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'invalid token'
    });
  }
  res.status(500);
  next(error);
};

const unknownEndpoint = (req, res) => {
  res.status(401).send({ error: 'unknown endpoint' });
};

const requestLog = (req, res, next) => {
  logger.info(`[${req.method}] to: ${req.path} at: ${Date.now()}`);
  next();
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  requestLog
};

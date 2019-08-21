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
  next(error);
};

const unknownEndpoint = (req, res) => {
  res.status(401).send({ error: 'unknown endpoint' });
};

const requestLog = (req, res, next) => {
  //if (req.path === '/socket.io/') {
  //return null;
  //}
  logger.info('---');
  logger.info('Time: ', Date.now());
  logger.info('Method: ', req.method);
  logger.info('Body: ', req.body);
  logger.info('Path: ', req.path);
  logger.info('---');
  next();
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  requestLog
};

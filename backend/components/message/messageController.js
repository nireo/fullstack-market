const jwt = require('jsonwebtoken');
const messageModel = require('./messageModel');
const { getToken } = require('../../utils/helper');
const config = require('../../utils/config');

// doesn't need a create route, since messages are created inside other routes.
exports.getMessages = async (req, res, next) => {
  const token = getToken(req);
  try {
    const decodedToken = jwt.verify(token, config.SECRET);
    if (!token || !decodedToken) {
      return res.status(401).json({
        error: 'invalid token'
      });
    }

    await messageModel.find({ toUser: decodedToken.id }, (err, results) => {
      if (err) return res.status(500);

      return res.json(results);
    });
  } catch (e) {
    next(e);
  }
};

exports.deleteMessage = async (req, res, next) => {
  const token = getToken(req);
  try {
    const decodedToken = jwt.verify(token, config.SECRET);
    if (!token || !decodedToken) {
      return res.status(401).json({
        error: 'invalid token'
      });
    }
    const message = await messageModel.findById(req.params.id);
    if (message) {
      await messageModel.findByIdAndRemove(message._id);
      return res.status(204).end();
    } else {
      return res.status(404);
    }
  } catch (e) {
    next(e);
  }
};

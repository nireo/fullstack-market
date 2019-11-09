const jwt = require('jsonwebtoken');
const messageModel = require('./messageModel');
const { getToken } = require('../../utils/helper');
const config = require('../../utils/config');

exports.getMessages = async (req, res, next) => {
  const token = getToken(req);
  try {
    const decodedToken = jwt.verify(token, config.SECRET);
    if (!token || !decodedToken) {
      return res.status(401).json({
        error: 'invalid token'
      });
    }

    await messageModel.find(
      { toUser: decodedToken.id },
      (err,
      results => {
        if (err) return res.status(500);

        return res.json(results);
      })
    );
  } catch (e) {
    next(e);
  }
};

exports.newMessage = async (req, res, next) => {
  const token = getToken(req);
  const { content } = req.body;
  try {
    const decodedToken = jwt.verify(token, config.SECRET);
    if (!token || !decodedToken) {
      return res.status(401).json({
        error: 'invalid token'
      });
    }

    const newMessage = new messageModel({
      content,
      toUser: decodedToken.id,
      createdAt: new Date()
    });

    const saved = await newMessage.save();
    return res.json(Saved);
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
      if (message.toUser === decodedToken.id) {
        await messageModel.findByIdAndRemove(message._id);
        return res.status(204).end();
      }
    } else {
      return res.status(404);
    }
  } catch (e) {
    next(e);
  }
};

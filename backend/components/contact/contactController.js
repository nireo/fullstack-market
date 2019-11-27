const contactModel = require('./contactModel');
const config = require('../../utils/config');
const { getToken } = require('../../utils/helper');
const userModel = require('../user/userModel');

exports.createContactMessage = async (req, res, next) => {
  const { name, content } = req.body;
  try {
    const newContact = new contactModel({
      name,
      content
    });
    await newContact.save();
    return res.json({
      success: 'sent message'
    });
  } catch (e) {
    next(e);
  }
};

exports.getMessages = async (req, res, next) => {
  const token = getToken(req);
  try {
    const decodedToken = jwt.verify(token, config.SECRET);
    if (!token || !decodedToken) {
      return res.status(401).json({
        error: 'invalid token'
      });
    }

    const user = await userModel.findById(decodedToken.id);
    if (!user) {
      // user not found
      return res.status(404);
    }

    if (user.username === 'admin') {
      // get all messages
      const messages = await contactModel.find({});
      return res.json(messages);
    } else {
      return res.status(403);
    }
  } catch (e) {
    next(e);
  }
};

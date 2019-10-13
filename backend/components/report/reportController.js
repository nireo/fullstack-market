const jwt = require('jsonwebtoken');
const userModel = require('../user/userModel');
const config = require('../../utils/config');
const { getToken } = require('../../utils/helper');
const reportModel = require('./reportModel');

exports.createReport = async (req, res, next) => {
  const { content } = req.body;
  const token = getToken(req);
  try {
    const decodedToken = jwt.verify(token, config.SECRET);
    if (!token || !decodedToken) {
      return res.status(401).json({
        error: 'invalid token'
      });
    }
    const from = await userModel.findById(decodedToken.id);
    const to = await userModel.findById(request.params.id);
    const newReport = new reportModel({
      content,
      to: to._id,
      from: from._id
    });
    const saved = await newReport.save();
    return res.json(saved);
  } catch (e) {
    next(e);
  }
};

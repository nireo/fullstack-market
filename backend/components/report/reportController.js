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
    const to = await userModel.findById(req.params.id);
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

exports.getReports = async (req, res, next) => {
  const token = getToken(req);
  try {
    const decodedToken = jwt.verify(token, config.SECRET);
    if (!decodedToken || !token) {
      return res.status(401).json({
        error: 'invalid token'
      });
    }
    const user = await userModel.findById(decodedToken._id);
    // reports only for admins, since there is no need for others to see reports
    if (user.username === 'admin') {
      const reports = await reportModel.find();
      return res.json(reports);
    } else {
      return res.status(403).json({
        error: 'unauthorized'
      });
    }
  } catch (e) {
    next(e);
  }
};

exports.deleteReports = async (req, res, next) => {
  const token = getToken(req);
  try {
    const decodedToken = jwt.verify(token, config.SECRET);
    if (!decodedToken || !token) {
      return res.status(401).json({
        error: 'invalid token'
      });
    }
    const user = await userModel.findById(decodedToken._id);
    const report = await reportModel.findById(req.params.id);
    if (user.username === 'admin' || user._id === report.from) {
      await userModel.findByIdAndRemove(req.params.id);
      return res.status(204).end();
    } else {
      return res.status(403).json({
        error: 'invalid token'
      });
    }
  } catch (e) {
    next(e);
  }
};

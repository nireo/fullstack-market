const jwt = require('jsonwebtoken');
const reviewModel = require('./reviewModel');
const userModel = require('../user/userModel');
const config = require('../../utils/config');
const { getToken } = require('../../utils/helper');

exports.createReview = async (req, res, next) => {
  const { stars, title, description, recommended } = req.body;
  const token = getToken(req);
  try {
    const decodedToken = jwt.verify(token, config.SECRET);
    if (!token || !decodedToken) {
      return res.status(401).json({
        error: 'invalid token'
      });
    }

    const user = await userModel.findById(decodedToken.id);

    const newReview = new reviewModel({
      title,
      recommended,
      stars,
      description,
      postedBy: user.id
    });
    const saved = await newReview.save();
    user.reviewsPosted = user.reviewsPosted.concat(saved._id);
    await user.save();
    return res.json(saved);
  } catch (e) {
    next(e);
  }
};

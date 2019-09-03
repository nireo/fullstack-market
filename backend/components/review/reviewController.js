const jwt = require('jsonwebtoken');
const reviewModel = require('./reviewModel');
const userModel = require('../user/userModel');
const postModel = require('../post/postModel');
const mainModel = require('../mainPost/mainPostModel');
const config = require('../../utils/config');
const { getToken } = require('../../utils/helper');

exports.addReviewToMain = async (req, res, next) => {
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
    const mainPost = await mainModel.findById(req.params.id);
    const newReview = new reviewModel({
      title,
      recommended,
      stars,
      description,
      postedBy: user.id
    });
    const saved = await newReview.save();
    user.reviewsPosted = user.reviewsPosted.concat(saved._id);
    mainPost.reviews = mainPost.reviews.concat(saved._id);
    await user.save();
    await mainPost.save((err, post) => {
      if (err) return res.status(500);
      post
        .populate('reviews')
        .execPopulate()
        .then(populated => {
          return res.json(populated);
        });
    });
  } catch (e) {
    next(e);
  }
};

exports.removeReview = async (req, res, next) => {
  const token = getToken(req);
  try {
    const decodedToken = jwt.verify(token, config.SECRET);
    if (!token || !decodedToken) {
      return res.status(401).json({
        error: 'invalid token'
      });
    }
    const review = await reviewModel.findById(req.params.id);
    if (review.postedBy.toString() === decodedToken.id) {
      await reviewModel.findByIdAndRemove(review._id);
      return res.status(204).end();
    }
    return res.status(403).json({
      error: 'unauthorized'
    });
  } catch (e) {
    next(e);
  }
};

exports.addReviewToPost = async (req, res, next) => {
  const token = getToken(req);
  const { stars, title, description, recommended } = req.body;
  try {
    const decodedToken = jwt.verify(token, config.SECRET);
    if (!token || !decodedToken) {
      return res.status(401).json({
        error: 'invalid token'
      });
    }
    const post = await postModel.findById(req.params.id);
    const user = await userModel.findById(decodedToken.id);
    const newReview = new reviewModel({
      stars,
      title,
      description,
      recommended,
      postedBy: user._id
    });
    const savedReview = await newReview.save();
    post.reviews = post.reviews.concat(savedReview._id);
    user.reviewsPosted = user.reviewsPosted.concat(savedReview._id);
    await user.save();
    await post.save((err, postPopulate) => {
      if (err) return res.status(500);
      postPopulate
        .populate('reviews')
        .populate('postedBy')
        .execPopulate()
        .then(populated => {
          return res.json(populated);
        });
    });
  } catch (e) {
    next(e);
  }
};

exports.updateReview = async (req, res, next) => {
  const token = getToken(req);
  const { stars, recommended, title, description } = req.body;
  try {
    const decodedToken = jwt.verify(token, config.SECRET);
    if (!token || !decodedToken) {
      return res.status(401).json({
        error: 'invalid token'
      });
    }
    const review = await reviewModel.findById(req.params.id);
    const updatedReview = {
      stars: stars ? stars : review.stars,
      recommended: recommended ? recommended : review.recommended,
      title: title ? title : review.title,
      description: description ? description : review.description
    };
    if (review.postedBy.toString() === decodedToken.id) {
      const saved = await reviewModel.findByIdAndUpdate(
        review._id,
        updatedReview
      );
      return res.json(saved);
    }
  } catch (e) {
    next(e);
  }
};

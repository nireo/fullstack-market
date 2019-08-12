const jwt = require('jsonwebtoken');
const postModel = require('./postModel');
const { getToken } = require('../../utils/helper');
const config = require('../../utils/config');

exports.getAllPosts = async (req, res, next) => {
  try {
    await postModel
      .find({})
      .populate('postedBy')
      .exec((err, results) => {
        if (err) return res.status(500);

        return res.json(results);
      });
  } catch (e) {
    next(e);
  }
};

exports.createPost = async (req, res, next) => {
  const token = getToken(req);
  try {
    const decodedToken = jwt.verify(token, config.SECRET);
    if (!token || !decodedToken) {
      return res.status(401).json({
        error: 'invalid token'
      });
    }
    const { title, description, price } = req.body;
    const time = new Date();
    const newPost = new postModel({
      title,
      description,
      price,
      posted: time,
      postedBy: decodedToken.id
    });

    const savedPost = await newPost.save();
    return res.json(savedPost);
  } catch (e) {
    next(e);
  }
};

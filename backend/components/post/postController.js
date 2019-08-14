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
  const { title, description, price } = req.body;
  const token = getToken(req);
  try {
    const decodedToken = jwt.verify(token, config.SECRET);
    if (!token || !decodedToken) {
      return res.status(401).json({
        error: 'invalid token'
      });
    }
    const newPost = new postModel({
      title,
      description,
      price,
      posted: Date.now(),
      postedBy: decodedToken.id
    });

    const savedPost = await newPost.save();
    return res.json(savedPost);
  } catch (e) {
    next(e);
  }
};

exports.removePost = async (req, res, next) => {
  const token = getToken(req);
  try {
    const decodedToken = jwt.verify(token, config.SECRET);
    if (!token || !decodedToken) {
      return res.status(401).json({
        error: 'invalid token'
      });
    }
    const post = await postModel.findById(req.params.id);

    if (!post) {
      return res.status(400).end();
    }
    if (post.postedBy.toString() === decodedToken.id) {
      await postModel.findByIdAndRemove(post._id);
      return res.status(204).end();
    }
    return res.status(403).json({
      error: 'unauthorized'
    });
  } catch (e) {
    next(e);
  }
};

exports.updatePost = async (req, res, next) => {
  const { price, title, description } = req.body;
  const token = getToken(req);
  try {
    const decodedToken = jwt.verify(token, config.SECRET);
    if (!token || !decodedToken) {
      return res.status(401).json({
        error: 'invalid token'
      });
    }

    const post = await postModel.findById(req.params.id);
    const newPostObject = {
      price: price ? price : post.price,
      title: title ? title : post.title,
      description: description ? description : post.description
    };

    if (post.postedBy.toString() === decodedToken.id) {
      const saved = await postModel.findByIdAndUpdate(post._id, newPostObject);
      return res.json(saved);
    }
  } catch (e) {
    next(e);
  }
};

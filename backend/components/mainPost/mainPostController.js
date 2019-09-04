const jwt = require('jsonwebtoken');
const mainPostModel = require('./mainPostModel');
const { getToken } = require('../../utils/helper');
const config = require('../../utils/config');

exports.getAllPosts = async (req, res, next) => {
  try {
    await mainPostModel
      .find({})
      .populate('reviews')
      .exec((err, results) => {
        if (err) return res.status(500);

        return res.json(results);
      });
  } catch (e) {
    next(e);
  }
};

exports.createPost = async (req, res, next) => {
  const { title, description, price, content } = req.body;
  const token = getToken(req);
  try {
    const decodedToken = jwt.verify(token, config.SECRET);
    if (!decodedToken || !token) {
      return res.status(401).json({
        error: 'invalid token'
      });
    }
    if (decodedToken.username === 'admin') {
      const newMainPost = new mainPostModel({
        title,
        description,
        price,
        content
      });

      const saved = await newMainPost.save();
      return res.json(saved);
    }
    return res.status(403).json({
      error: 'unauthorized'
    });
  } catch (e) {
    next(e);
  }
};

exports.removePost = async (req, res, next) => {
  const token = getToken(req);
  try {
    const decodedToken = jwt.verify(token, config.SECRET);
    if (!decodedToken || !token) {
      return res.status(401).json({
        error: 'invalid token'
      });
    }

    if (decodedToken.username === 'admin') {
      await mainPostModel.findByIdAndRemove(req.params.id);
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
  const { price, description, title, content } = req.body;
  const token = getToken(req);
  try {
    const decodedToken = jwt.verify(token, config.SECRET);
    if (!decodedToken || !token) {
      return res.status(401).json({
        error: 'invalid token'
      });
    }

    const post = await mainPostModel.findById(req.params.id);
    const updatedPost = {
      price: price ? price : post.price,
      description: description ? description : post.description,
      title: title ? title : post.title,
      content: content ? content : post.content
    };

    if (decodedToken.username === 'admin') {
      const saved = await mainPostModel.findByIdAndUpdate(
        req.params.id,
        updatedPost
      );
      return res.json(saved);
    }
    return res.status(403).json({
      error: 'unauthorized'
    });
  } catch (e) {
    next(e);
  }
};

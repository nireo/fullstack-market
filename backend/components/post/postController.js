const jwt = require('jsonwebtoken');
const postModel = require('./postModel');
const userModel = require('../user/userModel');
const { getToken } = require('../../utils/helper');
const config = require('../../utils/config');

exports.getAllPosts = async (req, res, next) => {
  try {
    // convert string to number
    const page = +req.params.page;

    if (page === 1) {
      await postModel
        .find({})
        .populate('postedBy')
        .populate('reviews')
        .limit(3)
        .exec((err, results) => {
          if (err) return res.status(500);

          return res.json(results);
        });
    } else {
      await postModel
        .find({})
        .populate('postedBy')
        .populate('reviews')
        .skip(3 * page - 3)
        .limit(3 * page)
        .exec((err, results) => {
          if (err) return res.status(500);

          return res.json(results);
        });
    }
  } catch (e) {
    next(e);
  }
};

exports.getPostById = async (req, res, next) => {
  try {
    await postModel
      .findById(request.params.id)
      .populate('postedBy')
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
    if (!token || !decodedToken) {
      return res.status(401).json({
        error: 'invalid token'
      });
    }

    const user = await userModel.findById(decodedToken.id);
    const newPost = new postModel({
      title,
      description,
      price,
      posted: Date.now(),
      postedBy: decodedToken.id,
      content
    });

    const savedPost = await newPost.save();
    user.posts = user.posts.concat(savedPost._id);
    await user.save();
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
  const { price, title, description, content } = req.body;
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
      description: description ? description : post.description,
      content: content ? content : post.content
    };

    if (post.postedBy.toString() === decodedToken.id) {
      const saved = await postModel.findByIdAndUpdate(post._id, newPostObject);
      return res.json(saved);
    }
  } catch (e) {
    next(e);
  }
};

exports.getAmountOfPosts = async (req, res, next) => {
  try {
    const posts = await postModel.find({});
    const amountObjects = {
      amount: posts.length
    };
    return res.json(amountObjects);
  } catch (e) {
    next(e);
  }
};

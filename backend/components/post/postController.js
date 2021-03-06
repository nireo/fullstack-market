const jwt = require('jsonwebtoken');
const postModel = require('./postModel');
const userModel = require('../user/userModel');
const { getToken } = require('../../utils/helper');
const config = require('../../utils/config');

exports.searchForPosts = async (req, res, next) => {
  try {
    if (req.query.search) {
      const regex = new RegExp(escapeRegex(req.query.search), 'gi');

      await postModel.find({ title: regex }, (err, results) => {
        if (err) return res.status(500);

        return res.json(results);
      });
    } else {
      // if search is not included still send 15 of the most recent postings.
      await postModel
        .find({})
        .populate('postedBy')
        .populate('reviews')
        .limit(20)
        .exec((err, results) => {
          if (err) return res.status(500);

          return res.json(results);
        });
    }
  } catch (e) {
    next(e);
  }
};

exports.getAllPosts = async (req, res, next) => {
  try {
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
      .findById(req.params.id)
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

    if (!price || !title || !description || !content) {
      return res.status(400).json({
        error: 'invalid request body'
      });
    }

    const user = await userModel.findById(decodedToken.id);
    if (!user) {
      return res.status(404);
    }

    const formattedPrice = parseFloat(Math.round(price * 100) / 100).toFixed(2);
    // price.toFixed is there so that the user can get a accurate representation of the price
    const newPost = new postModel({
      title,
      description,
      price: formattedPrice,
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

    if (!price || !title || !description || !content) {
      return res.status(400).json({
        error: 'invalid request body'
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
    await postModel.countDocuments().exec((err, count) => {
      if (err) return res.status(500);

      return res.json({ count });
    });
    // const number = await postModel.countDocuments();
    // console.log(number);
  } catch (e) {
    next(e);
  }
};

const escapeRegex = text => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

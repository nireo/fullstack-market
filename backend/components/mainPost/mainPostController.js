const mainPostModel = require('./mainPostModel');

exports.getAllPosts = async (req, res, next) => {
  try {
    await mainPostModel.find({}).exec((err, results) => {
      if (err) return res.status(500);

      return res.json(results);
    });
  } catch (e) {
    next(e);
  }
};

exports.createPost = async (req, res, next) => {};

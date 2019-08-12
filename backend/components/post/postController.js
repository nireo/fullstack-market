const postModel = require('./postModel');

exports.getAllPosts = async (req, res, next) => {
  try {
    await postModel.find({}).exec((err, results) => {
      if (err) return res.status(500);

      return res.json(results);
    });
  } catch (e) {
    next(e);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const { title, description, price } = req.body;
    const time = new Date();
    const newPost = new postModel({
      title,
      description,
      price,
      posted: time
    });

    const savedPost = await newPost.save();
    return res.json(savedPost);
  } catch (e) {
    next(e);
  }
};

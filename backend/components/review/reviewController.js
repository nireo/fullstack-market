const reviewModel = require('./reviewModel');

exports.createReview = async (req, res, next) => {
  try {
    const { stars, title, description, recommended } = req.body;
    const newReview = new reviewModel({
      title,
      recommended,
      stars,
      description
    });

    const saved = await newReview.save();
    return res.json(saved);
  } catch (e) {
    next(e);
  }
};

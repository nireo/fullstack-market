const userModel = require('./userModel');

exports.getAllUsers = async (req, res, next) => {
  try {
    await userModel.find({}).exec((err, results) => {
      if (err) return res.status(500);

      return res.json(results);
    });
  } catch (e) {
    next(e);
  }
};

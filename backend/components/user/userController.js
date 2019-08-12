const userModel = require('./userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

exports.createUser = async (req, res, next) => {
  const { username, password, email } = req.body;
  try {
    const saltRounds = 10;
    await bcrypt.hash(password, saltRounds, async (err, passwordHash) => {
      if (err) return res.status(500);

      const newUser = new userModel({
        username,
        passwordHash,
        email
      });

      const saved = await newUser.save();
      return res.json(saved);
    });
  } catch (e) {
    next(e);
  }
};

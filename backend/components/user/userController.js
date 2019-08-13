const userModel = require('./userModel');
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

exports.deleteUser = async (req, res, next) => {
  const token = getToken(req);
  try {
    const decodedToken = jwt.verify(token, config.SECRET);
    if (!token || !decodedToken) {
      return res.status(401).json({
        error: 'invalid token'
      });
    }

    if (decodedToken.username === 'admin') {
      await userModel.findByIdAndRemove(req.params.id);
      return res.status(204).end();
    }
    return res.status(403).json({
      error: 'unauthorized'
    });
  } catch (e) {
    next(e);
  }
};

exports.updateUser = async (req, res, next) => {
  const { email, username } = req.body;
  const token = getToken(req);
  try {
    const decodedToken = jwt.verify(token, config.SECRET);
    if (!token || !decodedToken) {
      return res.status(401).json({
        error: 'invalid token'
      });
    }

    const user = await userModel.findById(req.params.id);
    const updatedUser = {
      email,
      username,
      passwordHash: user.passwordHash
    };
    if (
      decodedToken.id === req.params.id ||
      decodedToken.username === 'admin'
    ) {
      const saved = await userModel.findByIdAndUpdate(user._id, updatedUser);
      return res.json(saved);
    }
  } catch (e) {
    next(e);
  }
};

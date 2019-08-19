const userModel = require('./userModel');
const bcrypt = require('bcrypt');

exports.getAllUsers = async (req, res, next) => {
  try {
    await userModel
      .find({})
      .populate('reviewsPosted')
      .populate('posts')
      .exec((err, results) => {
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

    if (
      decodedToken.username === 'admin' ||
      decodedToken.id === req.params.id
    ) {
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
  const { email, username, bio } = req.body;
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
      email: email ? email : user.email,
      username: username ? username : user.username,
      bio: bio ? bio : user.bio
    };
    if (decodedToken.id === user.id || decodedToken.username === 'admin') {
      const saved = await userModel.findByIdAndUpdate(user._id, updatedUser);
      return res.json(saved);
    }
  } catch (e) {
    next(e);
  }
};

exports.buyMainItems = async (req, res, next) => {
  const token = getToken(req);
  const { postIds } = req.body;
  try {
    const decodedToken = jwt.verify(token, config.SECRET);
    if (!token || !decodedToken) {
      return res.status(401).json({
        error: 'invalid token'
      });
    }
    const user = await userModel.findById(decodedToken.id);
    postIds.forEach(p => {
      user.mainItemsBought.concat(p);
    });
    await user.save();
  } catch (e) {
    next(e);
  }
};

exports.buyCommunityItems = async (req, res, next) => {
  const token = getToken(req);
  const { postIds } = req.body;
  try {
    const decodedToken = jwt.verify(token, config.SECRET);
    if (!token || !decodedToken) {
      return res.status(401).json({
        error: 'invalid token'
      });
    }
    const user = await userModel.findById(decodedToken.id);
    postIds.forEach(p => {
      user.communityItemsBought.concat(p);
    });
    await user.save();
  } catch (e) {
    next(e);
  }
};

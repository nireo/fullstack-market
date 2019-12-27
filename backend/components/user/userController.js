const userModel = require('./userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getToken } = require('../../utils/helper');
const config = require('../../utils/config');
const postModel = require('../post/postModel');

exports.getAllUsers = async (req, res, next) => {
  try {
    if (req.query.search) {
      const regex = new RegExp(escapeRegex(req.query.search), 'gi');

      await userModel.find({ title: regex }, (err, results) => {
        if (err) return res.status(500);

        return res.json(results);
      });
    } else {
      await userModel
        .find({})
        .populate('reviewsPosted')
        .populate('posts')
        .exec((err, results) => {
          if (err) return res.status(500);

          return res.json(results);
        });
    }
  } catch (e) {
    next(e);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    await userModel
      .findById(request.params.id)
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
    if (!username || !password || !email) {
      return res.status(400).json({
        error: 'invalid token'
      });
    }

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

    if (!email || !username || !bio) {
      return res.status(400).json({
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
  const { postId } = req.body;
  try {
    const decodedToken = jwt.verify(token, config.SECRET);
    if (!token || !decodedToken) {
      return res.status(401).json({
        error: 'invalid token'
      });
    }

    if (!postId) {
      return res.status(400).json({
        error: 'invalid token'
      });
    }

    const user = await userModel.findById(decodedToken.id);
    user.mainItemsBought = user.mainItemsBought.concat(postId);
    await user.save((err, populateUser) => {
      if (err) return res.status(500);
      populateUser
        .populate('communityItemsBought')
        .populate('mainItemsBought')
        .populate('posts')
        .populate('reviewsPosted')
        .execPopulate()
        .then(populated => {
          return res.json(populated);
        });
    });
  } catch (e) {
    next(e);
  }
};

exports.buyCommunityItems = async (req, res, next) => {
  const token = getToken(req);
  const { ids } = req.body;
  try {
    const decodedToken = jwt.verify(token, config.SECRET);
    if (!token || !decodedToken) {
      return res.status(401).json({
        error: 'invalid token'
      });
    }

    if (!ids) {
      return res.status(400).json({
        error: 'invalid request body'
      });
    }

    const user = await userModel.findById(decodedToken.id);
    if (ids.length === 1) {
      user.communityItemsBought = user.communityItemsBought.concat(ids[0]);
    } else {
      ids.forEach(id => {
        user.communityItemsBought = user.communityItemsBought.concat(id);
      });
    }
    await user.save((err, populateUser) => {
      if (err) return res.status(500);
      populateUser
        .populate('communityItemsBought')
        .populate('mainItemsBought')
        .populate('posts')
        .populate('reviewsPosted')
        .execPopulate()
        .then(populated => {
          return res.json(populated);
        });
    });
  } catch (e) {
    next(e);
  }
};

exports.addItemToWishlist = async (req, res, next) => {
  const token = getToken(req);
  const { postId } = req.body;
  try {
    const decodedToken = jwt.verify(token, config.SECRET);
    if (!token || !decodedToken) {
      return res.status(401).json({
        error: 'invalid token'
      });
    }

    if (!postId) {
      return res.status(400).json({
        error: 'invalid request body'
      });
    }

    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({
        error: `Post with id ${postId} has not been found.`
      });
    }

    const user = await userModel.findById(decodedToken.id);
    if (user) {
      if (!user.wishlist) {
        user.wishlist = [];
      }

      user.wishlist = [...user.wishlist, postId];
      const saved = await user.save();
      return res.json(saved);
    } else {
      return res.status(403).json({
        error: 'unauthorized'
      });
    }
  } catch (e) {
    next(e);
  }
};

exports.removeItemFromWishlist = async (req, res, next) => {
  const token = getToken(req);
  const { postId } = req.body;
  try {
    const decodedToken = jwt.verify(token, config.SECRET);
    if (!decodedToken || !token) {
      return res.status(401).json({
        error: 'invalid token'
      });
    }

    const user = await userModel.findById(decodedToken.id);
    if (user) {
      if (!user.wishlist) {
        user.wishlist = [];
      }

      user.wishlist = user.wishlist.filter(p => p !== postId);
      await user.save();
      return res.status(204).end();
    } else {
      return res.status(403).json({
        error: 'unauthorized'
      });
    }
  } catch (e) {
    next(e);
  }
};

exports.searchForUser = async (req, res, next) => {
  try {
    await userModel.find(
      {
        $text: { $search: request.params.term }
      },
      (err, results) => {
        if (err) return res.status(500);

        return res.json(results);
      }
    );
  } catch (e) {
    res.status(500);
    next();
  }
};

const escapeRegex = text => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

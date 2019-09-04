const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../utils/config');

const userModel = require('../user/userModel');

exports.loginHandler = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await userModel
      .findOne({ username })
      .populate('communityItemsBought')
      .populate('mainItemsBought');

    const checkPassword =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!(user && checkPassword)) {
      return res.status(401).json({
        error: 'invalid username or password'
      });
    }

    const userToken = {
      username: user.username,
      id: user._id
    };

    const token = jwt.sign(userToken, config.SECRET);
    return res.status(200).send({ token, user });
  } catch (e) {
    res.status(500);
    next(e);
  }
};

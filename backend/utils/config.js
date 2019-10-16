require('dotenv').config();

// let { MONGODB_URI } = process.env;
// let { PORT, SECRET } = process.env;

const { PORT, TEST_MONGODB_URI, MONGO_URI, SECRET } = require('../env');
let MONGODB_URI = MONGO_URI;

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = TEST_MONGODB_URI;
}

//if (process.env.NODE_ENV === 'test') {
//  MONGODB_URI = TEST_MONGODB_URI;
//}

module.exports = {
  PORT,
  MONGODB_URI,
  SECRET
};

require('dotenv').config();

let { MONGODB_URI } = process.env;
let { PORT, SECRET } = process.env;

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI;
}

module.exports = {
  PORT,
  MONGODB_URI,
  SECRET
};

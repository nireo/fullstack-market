const app = require('express')();
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
const { connectToDatabase } = require('./utils/helper');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compression());
app.use(helmet());
app.use(cors());

connectToDatabase();

module.exports = app;

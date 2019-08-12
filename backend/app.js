const app = require('express')();
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { connectToDatabase } = require('./utils/helper');
const middleware = require('./utils/middleware');
const userRoutes = require('./components/user/userRoutes');
const loginRoutes = require('./components/login/loginRoutes');

mongoose.set('useFindAndModify', false);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compression());
app.use(helmet());
app.use(cors());

connectToDatabase();
app.use(middleware.requestLog);

app.use('/api/user', userRoutes);
app.use('/api/login', loginRoutes);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;

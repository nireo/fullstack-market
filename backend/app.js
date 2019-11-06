const app = require('express')();
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const fs = require('fs');
const { connectToDatabase } = require('./utils/helper');
const middleware = require('./utils/middleware');
const userRoutes = require('./components/user/userRoutes');
const loginRoutes = require('./components/login/loginRoutes');
const postRoutes = require('./components/post/postRoutes');
const reviewRoutes = require('./components/review/reviewRoutes');
const mainController = require('./components/mainPost/mainPostRoutes');
const messageRouters = require('./components/message/messageRoutes');

mongoose.set('useFindAndModify', false);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// const logStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {
//  flags: 'a'
// });

app.use(compression());
app.use(helmet());
app.use(cors());
// app.use(morgan('combined', { stream: logStream }));

connectToDatabase();
app.use(middleware.requestLog);

app.use('/api/user', userRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/post', postRoutes);
app.use('/api/main', mainController);
app.use('/api/messages', messageRouters);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;

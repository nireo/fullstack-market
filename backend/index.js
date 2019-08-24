const app = require('./app');
const server = require('http').createServer(app);
const config = require('./utils/config');
const io = (module.exports.io = require('socket.io')(server));
const socketManager = require('./utils/socket-manager');
const logger = require('./utils/logger');

io.on('connection', socketManager);

server.listen(config.PORT, () => {
  logger.info(`[express] Server running on port ${config.PORT}`);
});

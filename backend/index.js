const app = require('./app');
const server = require('http').createServer(app);
const config = require('./utils/config');
const io = (module.exports.io = require('socket.io')(server));
const socketManager = require('./utils/socket-manager');
const logger = require('./utils/logger');
const {
  addUser,
  removeUser,
  getUser,
  getUsersInChat
} = require('./socket/users');

io.on('connection', socket => {
  socket.on('join', data => {
    addUser(socket.id, data.id, data.username);
    socket.emit('message', {
      username: 'Benelov Bot',
      id: '1',
      text: 'Welcome to the chat room.'
    });
    socket.broadcast.emit('chatData', { users: getUsersInChat });
  });

  socket.on('messageSent', message => {
    const user = getUser(socket.id);
    io.emit('message', { user: user, text: message });
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    if (user) {
      io.emit('message', {
        user: 'Benelov Bot',
        text: `${user.username} has left.`
      });

      io.emit('chatData', { users: getUsersInChat });
    }
  });
});

server.listen(config.PORT, () => {
  logger.info(`[express] Server running on port ${config.PORT}`);
});

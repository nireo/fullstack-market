const {
  addUser,
  removeUser,
  getUser,
  getUsersInChat
} = require('../socket/users');
const io = require('../index');

module.exports = socket => {
  socket.on('join', data => {
    addUser(socket.id, data.id, data.username);
    socket.emit('message', {
      username: 'admin',
      id: '1',
      text: 'Welcome to the chat. Keep the conversation civil'
    });
    socket.broadcast.emit('chatData', { users: getUsersInChat() });
  });
  socket.on('messageSent', message => {
    const user = getUser(socket.id);
    io.emit('message', { user: user, text: message });
  });
  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    if (user) {
      io.emit('message', {
        user: { username: 'admin', id: '1' },
        text: `${user.username} has left the chat.`
      });
    }
    io.emit('chatData', { users: getUsersInChat() });
  });
};

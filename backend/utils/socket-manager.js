const io = require('../index').io;

module.exports = socket => {
  console.log(`Socket ID: ${socket.id}`);
  socket.on('message', message => {
    console.log(`${message}`);
  });
};

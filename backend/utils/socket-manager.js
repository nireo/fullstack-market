let amountOfUsers = 0;
module.exports = socket => {
  socket.on('message', data => {
    socket.broadcast.emit('sent message', data);
  });

  ++amountOfUsers;
  console.log(amountOfUsers);
  socket.broadcast.emit('user joined', amountOfUsers);

  socket.on('typing', data => {
    socket.broadcast.emit('typing', `${data} is typing`);
  });

  socket.on('stopped typing', () => {
    socket.broadcast.emit('stopped typing');
  });

  socket.on('disconnect', () => {
    --amountOfUsers;
    socket.broadcast.emit(`user left`, amountOfUsers);
  });
};

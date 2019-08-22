module.exports = socket => {
  socket.on('message', data => {
    socket.broadcast.emit('sent message', data);
  });

  socket.on('typing', data => {
    socket.broadcast.emit('typing', `${data} is typing`);
  });

  socket.on('stopped typing', () => {
    socket.broadcast.emit('stopped typing');
  });

  socket.on('disconnect', () => {
    console.log('user left');
  });
};

module.exports = socket => {
  console.log(`Socket ID: ${socket.id}`);
  socket.on('message', data => {
    socket.broadcast.emit('sent message', data);
  });

  socket.on('disconnect', () => {
    console.log('user left');
  });
};

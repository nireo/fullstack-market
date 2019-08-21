const http = require('http');
const app = require('./app');
const config = require('./utils/config');

const server = http.createServer(app);
const io = require('socket.io')(server);
io.on('connection', socket => {
  console.log('user has logged');
});

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});

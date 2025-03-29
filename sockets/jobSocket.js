const socketIO = require('socket.io');

const setupWebSocket = (server) => {
  const io = socketIO(server);

  io.on('connection', (socket) => {
    console.log('New WebSocket connection');
    socket.on('newJob', (data) => {
      io.emit('jobUpdate', data);
    });
  });
};

module.exports = setupWebSocket;

const { Server } = require('socket.io');
const clientIo = require('socket.io-client');
const http = require('http');
const { app } = require('../server');

let server, io, clientSocket;

beforeAll((done) => {
  server = http.createServer(app);
  io = new Server(server);
  server.listen(() => {
    const port = server.address().port;
    clientSocket = clientIo(`http://localhost:${port}`);
    clientSocket.on('connect', done);
  });
});

describe('📡 WebSocket Tests', () => {
  it('✅ Should receive real-time job update', (done) => {
    clientSocket.on('jobUpdate1', (data) => {
      expect(data.title).toBe('New Job Posted');
      done();
    });

    io.emit('jobUpdate1', { title: 'New Job Posted' });
  }, 10000);

  it('✅ Should handle multiple connections', (done) => {
    const anotherClient = clientIo(`http://localhost:${server.address().port}`);
    anotherClient.on('connect', () => {
      setTimeout(() => {
        anotherClient.on('jobUpdate2', (data) => {
          expect(data.title).toBe('Another Job');
          anotherClient.close();
          done();
        });
        io.emit('jobUpdate2', { title: 'Another Job' });
      }, 100);
    });
  }, 10000);
});

afterAll((done) => {
  io.close();
  server.close();
  clientSocket.close();
  done();
});

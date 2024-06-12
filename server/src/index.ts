import 'dotenv/config';
import express from 'express';
import { Server, Socket } from 'socket.io';
import { createServer } from 'node:http';

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket: Socket) => {
  console.log('connected!');
});

app.get('/', (req, res) => {
  res.send('<h3>Hello, world</h3>');
});

server.listen('5000', () => {
  console.log('Server running...');
});

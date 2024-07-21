// src/server.ts
import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: '*', // Adjust this to your client's origin
  },
});

interface Client {
  id: string;
}

const clients: Record<string, Client> = {};

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('register', (data) => {
    const { id } = data;
    clients[socket.id] = { id };
    console.log(`Client registered with id: ${id}`);
  });

  socket.on('message', (message) => {
    console.log('received: %s', message);

    const parsedMessage = JSON.parse(message);
    const { to, content } = parsedMessage;

    const recipientSocketId = Object.keys(clients).find(
      (key) => clients[key].id === to
    );

    if (recipientSocketId) {
      io.to(recipientSocketId).emit('message', JSON.stringify({ from: clients[socket.id].id, content }));
    }
  });

  socket.on('disconnect', () => {
    delete clients[socket.id];
    console.log('Client disconnected');
  });
});

app.get('/', (req, res) => {
  res.send('Socket.io server is running');
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});


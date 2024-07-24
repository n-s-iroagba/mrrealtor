
import { Server as HTTPServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

import handleChatSockets from './chatSocket';

const initializeSockets = (server: HTTPServer) => {
  const io = new SocketIOServer(server,{
    cors: {
      origin: '*', 
    },
  });

  handleChatSockets(io);

  io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};

export default initializeSockets;

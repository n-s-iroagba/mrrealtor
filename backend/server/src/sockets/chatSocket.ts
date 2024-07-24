// /sockets/chatSocket.ts
import { Server as SocketIOServer, Socket } from 'socket.io';
import { Realtor } from '../realtor/Realtor.Model';




const handleChatSockets = (io: SocketIOServer) => {
  io.on('connection', (socket: Socket) => {
    console.log('New client connected');

    socket.on('register', async (data) => {
      const { id } = data;
      try {
        const realtor = await Realtor.findByPk(id);
        if (realtor) {
          realtor.socketId = socket.id;
          await realtor.save();
          console.log(`Realtor registered with id: ${id}`);
        } else {
          console.log(`Realtor with id: ${id} not found`);
        }
      } catch (error) {
        console.error('Error registering realtor:', error);
      }
    });

    socket.on('message', async (message) => {
      console.log('received: %s', message);

      const parsedMessage = JSON.parse(message);
      const { to, content } = parsedMessage;

      try {
        const recipient = await Realtor.findByPk(to);
        if (recipient && recipient.socketId) {
          io.to(recipient.socketId).emit('message', JSON.stringify({ from: socket.id, content }));
        } else {
          console.log(`Recipient with id: ${to} not found or not connected`);
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    });

    socket.on('disconnect', async () => {
      try {
        const realtor = await Realtor.findOne({ where: { socketId: socket.id } });
        if (realtor) {
          realtor.socketId = null;
          await realtor.save();
          console.log(`Realtor with id: ${realtor.id} disconnected`);
        }
      } catch (error) {
        console.error('Error on disconnect:', error);
      }
    });
  });
};

export default handleChatSockets;

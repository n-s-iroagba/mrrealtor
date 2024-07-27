// /sockets/chatSocket.ts
import { Server as SocketIOServer, Socket } from 'socket.io';
import { Realtor } from '../realtor/Realtor.Model';
import { Message } from '../message/Message.Model';
import { Land } from '../land/Land.Model';
import Property from '../property/Property.Model';
import { customError } from '../utils/utils';
import { Chat } from '../chat/Chat.Model';




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

    socket.on('message', async (payload) => {
      console.log('received: %s', payload);

      const parsedMessage = JSON.parse(payload);
      const { reciepientId, message, senderId , propertyType,propertyId } = parsedMessage;

      try {
        const recipient = await Realtor.findByPk(reciepientId);
        if (recipient && recipient.socketId) {
            let chat = await Chat.findOne({
              where:{
                realtorId:senderId,
                clientId:reciepientId,
                propertyInQuestionId:propertyId,
                propertyType
              }
            })
            if(!chat){
            chat = await Chat.create({
            clientId: senderId,
            realtorId: reciepientId,
            propertyInQuestionId:propertyId,
            propertyType
           })
          }
        
           await Message.create({
            senderId,
            reciepientId,
            message,
            timeStamp: new Date(),
            chatId: chat.id,
          })

          const allChat = await Chat.findAll({
            where:{
              realtorId:senderId,
              clientId:reciepientId,
              propertyInQuestionId:propertyId,
              propertyType
            }
          })

          io.to(recipient.socketId).emit('message', JSON.stringify({ from: socket.id, message }));
          io.to(socket.id).emit('sentChat', allChat);
          io.to(recipient.socketId).emit('receiveChat', allChat);

        } else {
          console.log(`Recipient with id: ${reciepientId} not found or not connected`);
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

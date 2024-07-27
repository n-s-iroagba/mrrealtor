import { Op, fn, col, literal } from 'sequelize';
import { Chat } from '../chat/Chat.Model';
import { Message } from '../message/Message.Model';
import { Realtor } from '../realtor/Realtor.Model';
import { Property } from '../property/Property.Model';
import { Land } from '../land/Land.Model';

const fetchChatsGroupedByLGA = async (currentRealtorId: number) => {
  try {
    const chats = await Chat.findAll({
      where: { realtorId: currentRealtorId },
      include: [
        {
          model: Message,
          as: 'messages',
          attributes: [],
          where: { seen: false },
          required: false // Allow chats with no messages
        },
        {
          model: Realtor,
          as: 'client',
          attributes: ['firstName', 'lastName']
        },
        {
          model: Property,
          attributes: ['district'],
          required: false
        },
        {
          model: Land,
          attributes: ['district'],
          required: false
        }
      ],
  
      group: ['Chat.id', 'client.id', 'Property.district', 'Land.district']
    });

    // Format the result to group by LGA
    const groupedChats = chats.reduce((acc: any, chat: Chat) => {
      const district = chat.propertyInQuestion.district;
      if (!acc[district]) {
        acc[district] = [];
      }
      acc[district].push({
        clientName: `${chat.client.firstName} ${chat.client.lastName}`,
        unreadMessagesCount: chat.messages.filter(message => !message.seen),
        lastMessage:chat.messages[chat.messages.length - 1]
      });
      return acc;
    }, {});

    return groupedChats;
  } catch (error) {
    console.error('Error fetching chats:', error);
    throw error; // Consider rethrowing or handling the error more gracefully
  }
};

// /controllers/messageController.ts
import { Request, Response } from 'express';
import { Message } from '../models/Message.Model';
import { Op } from 'sequelize';


export const fetchMessages = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { senderId: id },
          { recepientId: id }
        ]
      }
    });

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};


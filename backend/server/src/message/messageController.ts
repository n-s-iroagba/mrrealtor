// /controllers/messageController.ts
import { Request, Response } from 'express';
import { getMessages } from './messageHelpers';

export const fetchMessages = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const messages = await getMessages(id);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};


import { Request, Response } from 'express';
import { Likes } from './Likes.Model';
import { Property } from '../property/Property.Model';


export const getLikesForProperty = async (req: Request, res: Response) => {
  try {
    const { postedById, propertyId } = req.query;

    if (!postedById || !propertyId) {
      return res.status(400).json({ message: 'Missing required parameters' });
    }

    const likes = await Likes.findAll({
      where: {
        postedById: Number(postedById),
        propertyId: Number(propertyId),
      },
      include: [
        {
          model: Property,
          as: 'property',
          attributes: ['id', 'name'], // Include relevant attributes of Property if needed
        },
      ],
    });

    return res.status(200).json(likes);
  } catch (error) {
    console.error('Error fetching likes:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getLikes = async (req: Request, res: Response) => {
    try {
  
      const userId = req.query.userId as string;
  
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }

      const likes = await Likes.findAll({
        where: {
          postedById: userId
        },
        order: [['timestamp', 'ASC']] 
      });
  
      return res.status(200).json(likes);
    } catch (err) {
      console.error('Error retrieving likes:', err);
      return res.status(500).json({ message: 'Error retrieving likes' });
    }
  };
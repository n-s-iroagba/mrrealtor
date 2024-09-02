import { Request, Response } from 'express';

import { LocalGovernmentArea } from '../models/LocalGovernmentArea.Model';
import { State } from '../models/State.Model';
import { District } from '../models/District.Model';

// Get all states
export const getStates = async (req: Request, res: Response): Promise<void> => {
  try {
    const states = await State.findAll();
    res.status(200).json(states);
  } catch (error) {
    console.error('Error fetching states:', error);
    res.status(500).json({ message: 'Failed to retrieve states.' });
  }
};


export const getLocalgovernmentAreas = async (req: Request, res: Response): Promise<void> => {
    try {
      const lgas = await LocalGovernmentArea.findAll();
      res.status(200).json(lgas);
    } catch (error) {
      console.error('Error fetching LGAs:', error);
      res.status(500).json({ message: 'Failed to retrieve local government areas.' });
    }
  };

  export const getDistricts = async (req: Request, res: Response): Promise<void> => {
    try {
      const districts = await District.findAll();
      res.status(200).json(districts);
    } catch (error) {
      console.error('Error fetching districts:', error);
      res.status(500).json({ message: 'Failed to retrieve districts.' });
    }
  };
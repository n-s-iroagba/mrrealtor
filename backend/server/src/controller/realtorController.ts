import { Request, Response } from 'express';
import { encryptPassword, generateEmailVerificationToken } from '../helpers/authHelper';
import { Realtor } from '../models/Realtor.Model';
import { sendVerificationEmail } from '../service/mailService';


export const createRealtor = async (req: Request, res: Response): Promise<void> => {
  try {
    let { lastName, firstName, email, password, country, verificationToken, isVerified, changePasswordToken, socketId, phoneNumber } = req.body;
    password = await encryptPassword(password);
    const newRealtor = await Realtor.create({ lastName, firstName, email, password, country, verificationToken, isVerified, changePasswordToken, socketId, phoneNumber });
    const token = generateEmailVerificationToken(newRealtor);
    newRealtor.verificationToken = token;
    await newRealtor.save();

    await sendVerificationEmail(newRealtor);
    res.status(201).json({ message: 'Realtor created successfully', newRealtor });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};




export const getAllRealtors = async (req: Request, res: Response): Promise<void> => {
  try {
    const realtors = await Realtor.findAll();
    res.status(200).json(realtors);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getRealtorById = async (req: Request, res: Response): Promise<void> => {
  try {
    const realtor = await Realtor.findByPk(req.params.id);
    if (!realtor) {
      res.status(404).json({ message: 'Realtor not found' });
      return;
    }
    res.status(200).json(realtor);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateRealtor = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { lastName, firstName, email, password, country, verificationToken, isVerified, changePasswordToken, socketId, phoneNumber } = req.body;

    const realtor = await Realtor.findByPk(id);
    if (!realtor) {
      res.status(404).json({ message: 'Realtor not found' });
      return;
    }

    await realtor.update({ lastName, firstName, email, password, country, verificationToken, isVerified, changePasswordToken, socketId, phoneNumber });
    res.status(200).json({ message: 'Realtor updated successfully', realtor });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};


export const deleteRealtor = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const realtor = await Realtor.findByPk(id);
    if (!realtor) {
      res.status(404).json({ message: 'Realtor not found' });
      return;
    }

    await realtor.destroy();
    res.status(200).json({ message: 'Realtor deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

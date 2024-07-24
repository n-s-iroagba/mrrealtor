

import { Request, Response } from 'express';
import { Admin } from './Admin.Model'; 
import { customError } from '../utils/utils';
import { encryptPassword, generateEmailVerificationToken } from '../auth/authHelper';
import { sendVerificationEmail } from '../mail/mailService';



export const createAdmin = async (req: Request, res: Response): Promise<Response> => {
    try {
      let { name, email, password } = req.body as {
        name: string,
        email: string,
        password: string
      };
      const existingAdmin = await Admin.findOne({ where: { email } });
  
      if (existingAdmin) {
        throw customError('Admin already exists', 409);
      }
  
      password = await encryptPassword(password);
      const admin = await Admin.create({ name, email, password });
      const verificationToken = generateEmailVerificationToken(admin);
      admin.verificationToken = verificationToken;
      await admin.save();
  
      await sendVerificationEmail(admin);
      return res.status(201).json(verificationToken);
    } catch (error: any) {
      console.error('error in createAdmin function', error)
      return res.status(error.status || 500).json(error);
    }
  }




export const updateAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    const admin = await Admin.findOne();
    if (!admin) {
        throw customError('Admin does not exist', 404);
    }
    await admin.update({ name, email, password });
    res.status(200).json({ message: 'Admin updated successfully', admin });
} catch (error:any) {
    console.error(error)
    res.status(error.status || 500).json({ error: (error as Error).message });
  }
};




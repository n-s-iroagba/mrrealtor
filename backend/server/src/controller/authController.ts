import { Request, Response } from 'express';

import bcrypt from 'bcrypt';

import { EMAIL_VERIFICATION_ERROR_ROUTE, EMAIL_VERIFICATION_ROUTE, ALREADY_VERIFIED_ROUTE, ADMIN_CLIENT_DASHBOARD_ROUTE, CLIENT_DASHBOARD_ROUTE, NEW_PASSWORD_URL } from '../constants';
import { generateEmailVerificationToken, createLoginJWT, decodeJWT, generateChangePasswordToken, createNewPasswordToken, encryptPassword } from '../helpers/authHelper';
import { Admin } from '../models/Admin.Model';
import { Realtor } from '../models/Realtor.Model';
import { sendVerificationEmail, sendPasswordResetEmail } from '../service/mailService';

import { customError } from '../utils/utils';
import { Role } from '../types/authTypes';






export const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  try {
    let user: Admin | Realtor | null = await Admin.findOne({ where: { email } });

    if (!user) {
      user = await Realtor.findOne({ where: { email } });
    }

    if (!user) {
      throw customError('user not found', 404);
    }

    if (!user.isVerified) {
      const token = generateEmailVerificationToken(user);
      user.verificationToken = token
      user.save()
      await sendVerificationEmail(user);
      return res.status(201).json(token);
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (passwordsMatch) {
      const loginToken = createLoginJWT(user)
      return res.status(200).json(loginToken)

    } else {
      throw customError('wrong password', 403);
    }
  } catch (error: any) {
    console.error('error in login function', error);
    return res.status(error.status || 500).json(error);
  }
}

export const verifyMail = async (req: Request, res: Response) => {
  const { token } = req.params;

  try {
    const decoded: any = decodeJWT(token);
    if (!decoded) {
      return res.status(401).redirect(EMAIL_VERIFICATION_ERROR_ROUTE);
    }
    const creationTimeMs = new Date(decoded.timeOfCreation).getTime();
    const currentTimeMs = Date.now();
    const expirationTimeMs = creationTimeMs + (10 * 60 * 1000); // Adding 10 minutes in milliseconds

    if (currentTimeMs >= expirationTimeMs) {
      return res.redirect(`${EMAIL_VERIFICATION_ROUTE}/?token=${token}`);
    }

    let user: Admin | Realtor | null = await Admin.findOne({ where: { verificationToken: token } });

    if (!user) {
      user = await Realtor.findOne({ where: { verificationToken: token } });

      if (!user) {
        throw customError('Illegal request, no such user', 404);
      }
    }
    if (user.isVerified) {
      return res.redirect(`${ALREADY_VERIFIED_ROUTE}/${user.email}`);
    }
    user.isVerified = true;
    await user.save();

    let redirectRoute = user instanceof Admin ? ADMIN_CLIENT_DASHBOARD_ROUTE : CLIENT_DASHBOARD_ROUTE;
    const jwToken = createLoginJWT(user);

    return res.redirect(`${redirectRoute}/?token=${jwToken}`);
  } catch (error: any) {
    console.error('Error verifying email:', error);
    return res.status(error.status || 500).json(error);
  }
}
{ }
export const resendVerificationToken = async (req: Request, res: Response) => {
  const { email } = req.params;
  console.log(email)

  try {
    let user: Admin | Realtor | null = await Admin.findOne({
      where: {
        email: email,
      }
    });

    if (!user) {
      user = await Realtor.findOne({
        where: {
          email: email
        }
      });;
      if (!user) {
        throw customError('illegal request no such user', 404)
      }
    }
    const newToken = generateEmailVerificationToken(user);
    user.verificationToken = newToken;
    user.save();
    await sendVerificationEmail(user);
    return res.status(200).json(newToken);
  } catch (error: any) {
    res.status(error.status || 500).json(error);
  }
}

export const requestPasswordReset = async (req: Request, res: Response): Promise<Response> => {
  const { email } = req.body;

  try {
    let user: Admin | Realtor | null = await Admin.findOne({ where: { email } });
    let role = 'admin';

    if (!user) {
      user = await Realtor.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      } else {
        role = 'Realtor';
      }
    }

    const resetToken = generateChangePasswordToken(user);
    user.changePasswordToken = resetToken;
    await user.save();

    await sendPasswordResetEmail(user);

    return res.status(200).send(resetToken);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
}

export const confirmMailForPasswordChange = async (req: Request, res: Response) => {
  const { token } = req.params;
  console.log(token)
  try {

    let user: Admin | Realtor | null = await Admin.findOne({ where: { changePasswordToken: token } });

    if (!user) {
      user = await Realtor.findOne({ where: { changePasswordToken: token } })
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
    }

    const newtoken = createNewPasswordToken(user.id, user.email)

    return res.redirect(`${NEW_PASSWORD_URL}/?token=${newtoken}`)

  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
}

export const changePassword = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params
  let { password } = req.body;

  try {
    let user: any = await Admin.findByPk(id)
    let role = Role.ADMIN
    if (!user) {

      user = await Realtor.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      } else {
        role = Role.REALTOR
      }
    }
    password = await encryptPassword(password)
    user.password = password
    if (!user.isVerified) {
      const token = generateEmailVerificationToken(user.id);

      user.verificationToken = token
      await user.save()
      await sendVerificationEmail(user);
      return res.status(201).json(token);
    }
    const loginToken = createLoginJWT(user)


    return res.status(200).json(loginToken)

  } catch (error: any) {
    console.error('Error changePassword :', error);
    return res.status(error.message || 500).json(error);
  }
}




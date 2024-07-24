import { Request,Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { Realtor } from '../realtor/Realtor.Model'
import { AuthToken, Role, TokenType } from './types'
import { Admin } from '../admin/Admin.Model'


const JWT_SECRET = 'ababanna'

export const encryptPassword = (password:string) => {
  return bcrypt.hash(password, 10)
}
export const decodeJWT = (token:string) => {
  return jwt.verify(token, JWT_SECRET);
}

export const createLoginJWT = (user:Realtor|Admin) => {
  const role = user instanceof Realtor? Role.REALTOR : Role.ADMIN
  const name = user instanceof Realtor? user.firstName:user.name;
  return jwt.sign({ id: user.
    id, email: user.email, username: name, role: role, verified:user.isVerified,type:TokenType.LOGIN_TYPE }, JWT_SECRET);
}

export const generateEmailVerificationToken = (user:Admin|Realtor) => {
  const role = user instanceof Admin? Role.ADMIN:Role.REALTOR;
  const token = jwt.sign({ role:role,email:user.email,type:TokenType.VERIFICATION_TYPE } as AuthToken, JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '1h',
  });
  return token;
};
export const generateChangePasswordToken = (user:Admin|Realtor) => {
  const role = user instanceof Admin? Role.ADMIN:Role.REALTOR;
  return jwt.sign({ id: user.id, role:role, type:TokenType.CHANGE_PASSWORD, timeOfCreation: new Date() }, JWT_SECRET);
}

export const createNewPasswordToken = (id:number, email: string) => {
  return jwt.sign({ id: id, email: email, }, JWT_SECRET);
}

export const isAdmin =(req:Request, res:Response, next: any) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }
  jwt.verify(token, JWT_SECRET, (err:any, decoded:any) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }
    const role = decoded?decoded.role:'';
    if (role === 'admin'){
      next();
    } else {
      return res.status(403).send({ auth: false, message: 'You are not authorized to access this resource.' });
    }
  });
};

export const isRealtor =(req:Request, res:Response, next:any) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }
  jwt.verify(token, JWT_SECRET, (err:any, decoded:any) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }
    const role = decoded.role;
    if (role === 'Realtor'){
      next();
    } else {
      return res.status(403).send({ auth: false, message: 'You are not authorized to access this resource.' });
    }
  });
};





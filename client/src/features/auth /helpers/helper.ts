
import { jwtDecode } from "jwt-decode";
import {LoginTokenType, VerificationTokenType} from '../../../../../common/authTypes'



export const getLoginDecodedToken = (): LoginTokenType | null => {
  const token = localStorage.getItem('cassockJwtToken');
  
  if (!token) {
      return null;
  }

  try {
      const decodedToken = jwtDecode<LoginTokenType>(token);
      return decodedToken;
  } catch (error) {
      console.error('Error decoding token:', error);
      return null;
  }
};


  export const getVerificationTokenData = (token:string): VerificationTokenType|null=>{
    const decoded: VerificationTokenType|null= jwtDecode(token)
    return decoded;
  }
    
  export const decodeChangePasswordToken = (token:string) => {
  
    const decoded:any = jwtDecode(token)
  return decoded
  };

export const logOut = (navigate:(path:string)=>void)=>{
    localStorage.removeItem('cassockJwtToken')
    localStorage.removeItem('cassockId')
   navigate('/')
  }
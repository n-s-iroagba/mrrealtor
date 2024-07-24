
import { jwtDecode } from "jwt-decode";
import { LoginToken, VerificationToken, ChangePasswordToken } from "../types/authTypes";
import { LoginTokenKey, userId } from "../../../constants/tokenKeys";



export const getLoginDecodedToken = (): LoginToken | null => {
  const token = localStorage.getItem(LoginTokenKey);
  
  if (!token) {
      return null;
  }

  try {
      const decodedToken = jwtDecode<LoginToken>(token);
      return decodedToken;
  } catch (error) {
      console.error('Error decoding token:', error);
      return null;
  }
};


  export const getVerificationTokenData = (token:string):VerificationToken|null=>{
    const decoded:VerificationToken|null= jwtDecode(token)
    return decoded;
  }
    
  export const decodeChangePasswordToken = (token:string) => {
  
    const decoded : ChangePasswordToken |null= jwtDecode(token)
  return decoded
  };

export const logOut = (navigate:(path:string)=>void)=>{
    localStorage.removeItem(LoginTokenKey)
    localStorage.removeItem(userId)
  

   navigate('/')
  }
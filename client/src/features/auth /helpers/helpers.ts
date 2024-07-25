
import { jwtDecode } from "jwt-decode";
import { LoginToken, VerificationToken, ChangePasswordToken,UserData, Role } from "../types/authTypes";
import { changePasswordTokenKey, LoginTokenKey, userId, verificationTokenKey } from "../../../constants/tokenKeys";
import { AxiosResponse } from "axios";
import { extractErrorCode } from "../../../common/utils/utils";
import { fillInAllFieldsErrorMessage, wrongSecretCodeErrorMessage } from "../../../constants/errorMessages";

export const decodeLoginToken = (): LoginToken | null => {
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


  export const decodeVerificationToken = ():VerificationToken|null=>{
    const token = localStorage.getItem(verificationTokenKey);
  
    if (!token) {
        return null;
    }
  
    try {
        const decodedToken = jwtDecode<VerificationToken>(token);
        return decodedToken;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
  };
    
  export const decodeChangePasswordToken = () => {
    const token = localStorage.getItem(changePasswordTokenKey);
  
    if (!token) {
        return null;
    }
  
    try {
        const decodedToken = jwtDecode<ChangePasswordToken>(token);
        return decodedToken;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
  }


 export const validateSecretCode = (data: UserData): boolean => {
    if ('secretCode' in data) {
      return data.secretCode === process.env.REACT_APP_ADMIN_SECRET_KEY;
    }
    return true;
  };


export function handleEmailVerification(response: AxiosResponse<string>,reloadOrNavigate:'reload'|'navigate', navigate:(path:string)=>void){
    localStorage.setItem(
        verificationTokenKey,
        response.data
    );
    reloadOrNavigate==='reload'?window.location.reload(): navigate('/verify-email')
}

export const handleValidation = (
    form: HTMLFormElement,
    passwordValidityMessage: string[],
    isMatchingPassword: boolean,
    secretCodeMatch: boolean = true,
  ): string|null => {
    if (form.checkValidity() === false || passwordValidityMessage.length || !isMatchingPassword || !secretCodeMatch) {
      if (!secretCodeMatch) {
        return wrongSecretCodeErrorMessage;                                                                                                            
      } else {
          return fillInAllFieldsErrorMessage;
      }
    }
    return null;
  };

export const getIdFromChangePasswordToken = () => {
    const decodedToken:ChangePasswordToken|null = decodeChangePasswordToken()
    return decodedToken?decodedToken.id:null;

}

export const removeTokens = ()=>{
    localStorage.removeItem(LoginTokenKey)
    localStorage.removeItem(userId)
}

export const handleLoginResponse = (response: AxiosResponse<string>, navigate: (path: string) => void) => {
    if (response.status === 200) {
      handleSuccessfulLogin(response.data,navigate);
    }
    else if (response.status === 201) {
      handleEmailVerification(response,'navigate',navigate);
    }
  };
export   const handleSuccessfulLogin = (token:string,navigate:(path:string)=>void) => {
    localStorage.setItem('cassockJwtToken', JSON.stringify(token));
    const role  = decodeLoginToken()?.role
    const destination = role === Role.REALTOR ? '/dashboard' : '/admin/dashboard';
    navigate(destination);
  };
  
export const handleLoginError = (error:any) => {
    console.error(error);
    const code = extractErrorCode(error.message);
    
    if (code === 403) {
      return('Invalid password.');
    } 
    if (code === 404) {
      return('You are not yet registered on our platform.');
    }
    return ('Our server is currently down. Please try again later.');
    }
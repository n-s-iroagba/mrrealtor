import React, {
  createContext,
  useState,
  ReactNode,
  FormEvent,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";

import { doPasswordsMatch } from "../utils/utils";
import { postChangePasswordData, postData } from "../../../common/utils/apiUtils";
import {
  AdminData,
  AuthContextType,
  RealtorData,
  LoginData,
  NewPasswordData
} from "../types/authTypes";

import { extractErrorCode } from "../../../common/utils/utils";

import { getIdFromChangePasswordToken, handleEmailVerification, handleLoginError, handleLoginResponse, handleSuccessfulLogin, handleValidation, validateSecretCode } from "../helpers/helpers";
import { loginUrl, newPasswordRoute } from "../../../constants/constants";
import { AxiosResponse } from "axios";
import { validatePassword } from "../util/util";
import { notAuthorisedErrorMessage } from "../../../constants/errorMessages";


export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {

  const [passwordValidityMessage, setPasswordValidityMessage] = useState<
    string[]
  >([]);
  const [passwordType, setPasswordType] = useState<string>("password");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [isMatchingPassword, setIsMatchingPassword] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [validated, setValidated] = useState<boolean>(false);
  const [adminData, setAdminData] = useState<AdminData>({
    name: "",
    password: "",
    confirmPassword: "",
    email: "",
    secretCode: "",
  });
  const [realtorData, setRealtorData] = useState<RealtorData>({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    email: "",
    phoneNumber: "",
    country: "",
  });
  const [newPasswordData, setNewPasswordData] = useState<NewPasswordData>({
    password: "",
    confirmPassword: "",
  });
  const [loginData, setLoginData] = useState<LoginData>({
    password: "",
    email: "",
  });

  const handleSubmit = async (
    data: AdminData | RealtorData,
    event: FormEvent<HTMLFormElement>,
    domain: string,
    navigate:(path:string)=>void
  ) => {
    event.preventDefault();
    setValidated(true)
    const form = event.currentTarget;

    const secretCodeMatch:boolean = validateSecretCode(data)
  
    const error:string|null = handleValidation(form,passwordValidityMessage,isMatchingPassword,secretCodeMatch);
    if(error){
      setErrorMessage(error)
      return;
    }

    setSubmitting(true);
    try {
      const response:AxiosResponse<string> = await postData(domain, data);
      if (response.status === 201) {
       handleEmailVerification(response,'navigate',navigate)
      }
      
    } catch (error: any) {
      console.error(error);
      const code:number|null = extractErrorCode(error.message);

      if (code === 409) {
      setErrorMessage('user with this email already exists')
      return ;
      }
      setErrorMessage('Our server is currently down. Please try again later.');
      
    } finally {
      setSubmitting(false);
    }
  };


  const handleChange = (
    data: AdminData | RealtorData | NewPasswordData,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setState: Dispatch<
      SetStateAction<AdminData | RealtorData | NewPasswordData>
    >
  ) => {
    e.preventDefault();
    setState({
      ...data,
      [e.target.name]: e.target.value,
    });
    if (
      e.target.name === 'password'
    ) {
     setPasswordValidityMessage( validatePassword(e.target.value));
    }
  };



  const handleConfirmPasswordsChange = (
    data: AdminData | RealtorData | NewPasswordData,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setState: Dispatch<
      SetStateAction<AdminData | RealtorData | NewPasswordData>
    >
  ) => {
    handleChange(data, e, setState);
    setIsMatchingPassword(doPasswordsMatch(data.password, e.target.value));
  };

  const showPassword = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  const handleSubmitForChangePassword = async (
    data: NewPasswordData,
    event: FormEvent<HTMLFormElement>,
    navigate:(path:string)=>void
  ) => {
    event.preventDefault();
    const form = event.currentTarget;
    setValidated(false);


    const error:string|null = handleValidation(form,passwordValidityMessage,isMatchingPassword);
    if(error){
      setErrorMessage(error)
      return;
    }


    const id: number|null = getIdFromChangePasswordToken()

    if (!id){
      setErrorMessage(notAuthorisedErrorMessage)
      return;
    }
    setSubmitting(true);
    try {
      const response:AxiosResponse<string> = await postChangePasswordData(
        `${newPasswordRoute}/${id}`,
        {password:data.password},        
      );
      if (response.status === 200) {
        handleSuccessfulLogin(response.data,navigate)
      }

    } catch (error: any) {
      console.error(error);
      alert("An error occurred, kindly try again later");
    } finally {
      setSubmitting(false);
    }
  };



const handleChangeForLogin =(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
  setLoginData((prevState) => ({
   ...prevState,
    [e.target.name]: e.target.value,
  }));
}
  
  const handleSubmitForLogin = async ( event: FormEvent<HTMLFormElement>,navigate:(path:string)=>void) =>{
    event.preventDefault();
    const form = event.currentTarget;
    setValidated(true);
    
    if (form.checkValidity() === false) {
      setErrorMessage('Please fill in all fields.');
      event.stopPropagation();
      return;
    }
    setSubmitting(true)
    try {
      const response = await postData(loginUrl, loginData);
      handleLoginResponse(response,navigate);
    } catch (error) {
      handleLoginError(error);
    } finally {
      setSubmitting(false);
    }
  };

  
  const authContextValue: AuthContextType = {
    setAdminData,
    adminData,
    submitting,
    handleSubmitForLogin,
    loginData,
    errorMessage,
    setErrorMessage,
    validated,
    setValidated,
    handleConfirmPasswordsChange,
    isMatchingPassword,
    showPassword,
    handleSubmit,
    handleChange,
    passwordType,
    passwordValidityMessage,
    setRealtorData,
    realtorData,
    newPasswordData,
    setNewPasswordData,
    handleSubmitForChangePassword,
    handleChangeForLogin,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
  


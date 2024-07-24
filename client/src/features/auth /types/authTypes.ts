export type LoginTokenType = {
  id:number
  role:Role

}

export type VerificationTokenType = {
id:number
role:Role

}
export enum Role  {
  ADMIN = 'admin',
  REALTOR = 'realtor'
}

export type ChangePasswordToken = {
  role:Role;
  id:number;
  email: string;
  password: string;
}

export interface AdminData {
    name: string;
    password: string;
    confirmPassword: string;
    email: string;
    secretCode: string;
  }

  export interface RealtorData {
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
    email: string;
    phoneNumber: string;
   
    country:string
  }
export interface NewPasswordData{
  password: string;
  confirmPassword: string;
}
export interface LoginData{
  password: string;
  email: string;
}

export type UserData =AdminData| RealtorData
export interface AuthContextType {
    adminData:AdminData
    newPasswordData:NewPasswordData,
    setNewPasswordData: React.Dispatch<React.SetStateAction<NewPasswordData>>,
    submitting: boolean;
    errorMessage: string;
    passwordType:string;
    passwordValidityMessage:string[]
    realtorData:RealtorData;
    setAdminData: React.Dispatch<React.SetStateAction<AdminData>>;
    setRealtorData: React.Dispatch<React.SetStateAction<RealtorData>>;
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
    validated: boolean;
    setValidated: React.Dispatch<React.SetStateAction<boolean>>;
    handleConfirmPasswordsChange: (
        data:AdminData,
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      setState: React.Dispatch<React.SetStateAction<RealtorData|AdminData|NewPasswordData>> 
    ) => void;
    showPassword: () => void;
    handleSubmit:(data:AdminData | RealtorData ,event: React.FormEvent<HTMLFormElement>,domain:string,navigate:(path:string)=>void)=>void;
    handleChange:(data:AdminData | RealtorData | NewPasswordData, event:  React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,setState: React.Dispatch<React.SetStateAction<RealtorData|AdminData|NewPasswordData>> )=>void
    handleSubmitForChangePassword:(data: NewPasswordData, event: React.FormEvent<HTMLFormElement>, navigate: (path: string) => void) =>void
    isMatchingPassword:boolean
    loginData:LoginData
    handleSubmitForLogin : (event:React.FormEvent<HTMLFormElement>,navigate:(path:string)=>void)=>void
    handleChangeForLogin :(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,navigate:(path:string)=>void)=>void
    handleEmailVerification:(response: any,shouldReload:boolean,navigate:(path:string)=>void)=>void
   
  }

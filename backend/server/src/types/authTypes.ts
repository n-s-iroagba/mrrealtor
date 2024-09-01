

export enum Role  {
    ADMIN = 'admin',
    REALTOR = 'realtor'
}

export type AuthToken = {
    role:Role;
    id:number;
    email: string;
    password: string;
    type:TokenType
}

export enum TokenType {
    LOGIN_TYPE = 'login',
    VERIFICATION_TYPE ='verification',
    CHANGE_PASSWORD = 'change_password'
}
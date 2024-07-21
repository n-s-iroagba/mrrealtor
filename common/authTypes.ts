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
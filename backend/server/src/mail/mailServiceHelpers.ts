import { COMPANY_NAME, COMPANY_SUPPORT_EMAIL } from "../constants";
import { Realtor } from "../realtor/Realtor.Model";


export const getWelcomingMailContent = (realtor: Realtor) => {
    return `
      <p>Dear ${realtor.firstName} ${realtor.lastName},</p>
  
      <p>We are excited to share an exclusive promotion from <strong>${COMPANY_NAME}</strong> with you!</p>
  
      <p>If you have any questions or need further information, please contact our support team at 
      <a href="mailto:${COMPANY_SUPPORT_EMAIL}">${COMPANY_SUPPORT_EMAIL}</a> or chat with us on any of our social media handles.</p>
  
      <p>We appreciate your continued trust and investment with <strong>${COMPANY_NAME}</strong>.</p>
  
      <p>Best regards,</p>
  
      <p>The Investment Team<br />
      ${COMPANY_NAME}</p>
    `;
}

export const getLikesEmailContent= (realtor: Realtor) => {
    return `
      <p>Dear ${realtor.firstName} ${realtor.lastName},</p>
  
      <p>We have some exciting news for you!</p>
  
      <p>Our promotion has been extended!<br />
 
  
  
      <p>If you have any questions or need further information, please contact our support team at <a href="mailto:${COMPANY_SUPPORT_EMAIL}">${COMPANY_SUPPORT_EMAIL}</a> or chat with us on any of our social media handles.</p>
  
      <p>We appreciate your continued trust and investment with <strong>${COMPANY_NAME}</strong>.</p>
  
      <p>Best regards,</p>
  
      <p>The Investment Team<br />
      ${COMPANY_NAME}</p>
    `;
}

export const getHowToListEmailContent = (
    realtor: Realtor,
    
) => {
    return `
      <p>Dear ${realtor.firstName} ${realtor.lastName},</p>
  
     us. We look forward to helping you achieve your investment goals.</p>
  
      <p>Best regards,</p>
  
      <p>The Investment Team<br />
      ${COMPANY_NAME}</p>
    `;
}





export const getVerificationEmailContent = (verificationUrl:string,TOKEN_EXPIRATION_TIME:string,COMPANY_NAME:string) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email Address</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
</head>
<body class="text-center">
  <h1 class="text-center">Welcome to ${COMPANY_NAME}!</h1>
  <p  class="text-center">Thank you for signing up. To complete your registration, please click the button below to verify your email address.</p>
  <p  class="text-center">
  <a href= ${verificationUrl}>
  <button style="background-color: #007bff; color: #fff; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
  Verify Your Email
</button>
</a>
  </p>
  <p>If the button doesn't work, you can copy and paste the following link into your browser:</p>
  <p>${verificationUrl}</p>
  <p>This verification link will expire in ${TOKEN_EXPIRATION_TIME} hours.</p>
  <p>Sincerely,</p>
  <p>${COMPANY_NAME} Team</p>
</body>
</html>`;
}

export  const getNewPasswordEmailContent = (newPasswordUrl:string,TOKEN_EXPIRATION_TIME:string,COMPANY_NAME:string) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Change your password</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
</head>
<body class="text-center">
  <h1 class="text-center">Welcome to ${COMPANY_NAME}!</h1>
  <p  class="text-center">Thank you made a request to change your password. Kindly click the link or buttion below to change your password.</p>
  <p  class="text-center">
    <a href="${newPasswordUrl}" class="btn btn-primary">Change Password
     <button style="background-color: #007bff; color: #fff; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
  Change Your Password
</button>
    </a>
  </p>
  <p>If the button doesn't work, you can copy and paste the following link into your browser:</p>
  <p>${newPasswordUrl}</p>
  <p>This verification link will expire in ${TOKEN_EXPIRATION_TIME} hours.</p>
  <p>Sincerely,</p>
  <p>${COMPANY_NAME} Team</p>
</body>
</html>`;

}
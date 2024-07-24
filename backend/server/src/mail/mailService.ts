import nodemailer from 'nodemailer';
import { Admin } from '../admin/Admin.Model';
import { SERVER_VERIFY_EMAIL_ROUTE, TOKEN_EXPIRATION_TIME, COMPANY_NAME, COMPANY_VERIFICATION_EMAIL, VERIFY_PASSWORD_RESET_TOKEN_URL, COMPANY_SUPPORT_EMAIL } from '../constants';
import { Realtor } from '../realtor/Realtor.Model';
import { getVerificationEmailContent, getNewPasswordEmailContent } from './mailServiceHelpers';



const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: 'questertech.co',
    pass: 'nbcd adsm krym lwyh',
  },
});

export const sendVerificationEmail = async (user: Realtor|Admin) => {
  const verificationToken = user.verificationToken
  const verificationUrl = `${SERVER_VERIFY_EMAIL_ROUTE}/${verificationToken}`;
  const emailHtmlContent = getVerificationEmailContent(verificationUrl, TOKEN_EXPIRATION_TIME, COMPANY_NAME);
  try {
    const emailBody = { html: emailHtmlContent };
    await transporter.sendMail({
      from: COMPANY_VERIFICATION_EMAIL,
      to: user.email,
      subject: `Verify your email address to complete registration at ${COMPANY_NAME}`,
      ...emailBody,
    });
  } catch (error:any) {
    console.error('Error sending verification email:', error);
  }
};


export const sendPasswordResetEmail = async (user:Realtor|Admin) => {
  const verificationToken = user.changePasswordToken;
  const verificationUrl = `${VERIFY_PASSWORD_RESET_TOKEN_URL}/${verificationToken}`;
  const emailHtmlContent = getNewPasswordEmailContent(verificationUrl, TOKEN_EXPIRATION_TIME, COMPANY_NAME);
  try {
    const emailBody = { html: emailHtmlContent };
    await transporter.sendMail({
      from: COMPANY_VERIFICATION_EMAIL,
      to: user.email,
      subject: `Change your ${COMPANY_NAME} account password`,
      ...emailBody,
    });
  } catch (error:any) {
    console.error('Error sending password reset email:', error.message);
  }
};


export const sendWelcomeMail = async (Realtor:Realtor) => {
  const emailHtmlContent = '';
  try {
    const emailBody = { html: emailHtmlContent };
    await transporter.sendMail({
      from: COMPANY_SUPPORT_EMAIL,
      to: Realtor.email,
      subject: `Promo`,
      ...emailBody,
    });
  } catch (error: any) {
    console.error('Error sending paused investment email:', error.message);
  }
};



export const sendHowToListPropertyMail = async (Realtor: Realtor) => {
  const emailHtmlContent = '';
  try {
    const emailBody = { html: emailHtmlContent };
    await transporter.sendMail({
      from: COMPANY_SUPPORT_EMAIL,
      to: Realtor.email,
      subject: `Promo extension`,
      ...emailBody,
    });
  } catch (error: any) {
    console.error('Error sending paused investment email:', error.message);
  }
}


export const sendNewListingEmail = async (Realtor: Realtor) => {
  const emailHtmlContent = ''
  try {
    const emailBody = { html: emailHtmlContent };
    await transporter.sendMail({
      from: COMPANY_SUPPORT_EMAIL,
      to: Realtor.email,
      subject: ` Deposit received`,
      ...emailBody,
    });
  } catch (error: any) {
    console.error('Error sending paused investment email:', error.message);
  }
};



export const sendLikeAlertMail =async (Realtor:Realtor) => {
  const emailHtmlContent = `Dear ${Realtor.firstName}  ${Realtor.lastName},\n\nIt looks like you have no investments or your investments have a zero balance Our Realtors are making profits daily, do not be left out.
   Please consider making a deposit.\n\nBest regards,\n
   Investment Team`
  try {
    const emailBody = { html: emailHtmlContent };
    await transporter.sendMail({
      from: COMPANY_SUPPORT_EMAIL,
      to: Realtor.email,
      subject: `Make your first deposit`,
      ...emailBody,
    });
  } catch (error: any) {
    console.error('Error sending paused investment email:', error.message);
  }
}





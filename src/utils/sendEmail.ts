import nodemailer from 'nodemailer';
import config from '../config';
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: config.NODE_ENV === 'production',
  auth: {
    user: config.email,
    pass: config.email_app_password,
  },
});
export const sendEmail = async (
  to: string,
  subject: string,
  emailTemplate: string,
) => {
  transporter.sendMail({
    from: '"SASKS" <yeasirarafat7279@gmail.com>',
    to,
    subject,
    html: emailTemplate,
  });
};

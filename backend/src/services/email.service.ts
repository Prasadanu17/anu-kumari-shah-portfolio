import nodemailer from 'nodemailer';
import { env } from '../config/env';
import { logger } from '../config/logger';

interface ContactEmailPayload {
  name: string;
  email: string;
  message: string;
}

const createTransporter = () => {
  if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: parseInt(env.SMTP_PORT || '587', 10),
    secure: false,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
  });
};

export const sendContactEmail = async (
  payload: ContactEmailPayload
): Promise<void> => {
  const transporter = createTransporter();

  if (!transporter) {
    logger.warn('SMTP not configured — skipping email send');
    return;
  }

  const { name, email, message } = payload;
  const to = env.CONTACT_EMAIL || env.SMTP_USER;

  await transporter.sendMail({
    from: `"Portfolio Contact" <${env.SMTP_USER}>`,
    to,
    replyTo: email,
    subject: `New contact from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
    html: `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <hr />
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
  });

  logger.success(`Contact email sent to ${to}`);
};
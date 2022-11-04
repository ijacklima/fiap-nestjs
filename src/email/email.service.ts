import { Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  async sendEmail(to: string, subject: string, msg: string, options: object) {
    const clientID = process.env.CLIENT_ID;
    const secretKey = process.env.SECRET_KEY;
    const refreshToken = process.env.REFRESH_TOKEN;
    const redirectURI = 'https://developers.google.com/oauthplayground';

    const oauth2Client = new OAuth2Client(clientID, secretKey, redirectURI);

    oauth2Client.setCredentials({ refresh_token: refreshToken });

    const accessToken = oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      logger: false,
      debug: false,
      auth: {
        type: 'OAuth2',
        user: 'ijackvas@gmail.com',
        clientId: clientID,
        clientSecret: secretKey,
        refreshToken: refreshToken,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: 'ijackvas@gmail.com',
      to: to,
      subject: subject,
      html: `
      Enviando e-mail com NodeJS + gmail + nestJS + OAuth2
      <h1>${msg}</h1>
      Somente especialistas.`,
    };

    try {
      const result = await transporter.sendMail(mailOptions);
      if (!result.reject) {
        return { message: 'Mensagem enviada com sucesso!' };
      } else {
        return { message: 'Erro ao enviar mensagem!' };
      }
    } catch (error) {
      return { message: error.message };
    }
  }
}

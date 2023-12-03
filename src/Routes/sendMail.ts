import nodemailer from 'nodemailer';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const sendMail_route = (app: express.Application) => {
  app.post('/sendMail', (req: Request, res: Response) => {
    const { firstName, lastName, email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'lugxstore222@gmail.com',
        pass: (process.env.GMAIL_PASSWORD) as string,
      },
    });

    const mailOptions = {
      from: 'lugxstore222@gmail.com',
      to: email,
      subject: subject as string,
      html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.5;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
            font-size:13px;
          }
          h1 {
            color: #333;
            text-align: center;
          }
          p {
            margin-bottom: 10px;
          }
          .signature {
            margin-top: 20px;
            font-style: italic;
            font-weight: bold;
            font-size :25px;
          }
          #msgSpan{
            font-weight: bold;
            font-size: 25px;
            font-family: sans-serif;
            font-style: italic;
            color : red;
          }
          #email{
            font-weight: bold;
            font-size: 25px;
            font-family: sans-serif;
            font-style: italic;
            color : blue;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>We Understand</h1>
          <p>Dear ${firstName},</p>
          <p>I apologize for any inconvenience caused by your recent ${subject}<br><span id="msgSpan">[${message}]</span></p>
          <p>We take your feedback seriously and are actively working on a solution.</p>
          <p>We appreciate your patience and will keep you updated on our progress. </p>
          <p>If you have any questions, please reach out to me directly at <span id='email'>[lugxstore222@gmail.com]</span></p>
          <p>Thank you for your understanding and continued support.</p>
          <p class="signature">Best regards,<br>lugxStore<br>Online gaming store</p>
          <p>Thank you Mr/ ${firstName} ${lastName}</p>
        </div>
      </body>
      </html>
        `
    };

    transporter.sendMail(mailOptions, function (error) {
      if (error) {
        console.log(error);
        res.json('Error occurred while sending the email.');
      } else {
        res.json('Email is sent successfully!');
      }
    });
  });
};

export default sendMail_route;
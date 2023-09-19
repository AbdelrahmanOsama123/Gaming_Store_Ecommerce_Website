import nodemailer from 'nodemailer';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const welcome_route = (app: express.Application) => {
  app.post('/welcomeMail', (req: Request, res: Response) => {
    try{
      const email = req.cookies.email;
      const firstname = req.body.firstname;
      const lastname = req.body.lastname;
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
      subject: "Thank you for registering to Lugx Store" as string,
      html: `<!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
          font-family: Arial, sans-serif;
          background-color: #f1f1f1;
          padding: 20px;
          height : 100%;
          background-color : red;
      }
      
      .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          height : 100%;
      }
      
      h1 {
          color: #333333;
          font-size: 24px;
          margin-bottom: 20px;
      }
      
      p {
          color: #666666;
          font-size: 16px;
          line-height: 1.5;
      }
        </style>
      </head>
      <body style="background-color: red;" >
        <div class="container">
          <h1>Welcome to Our Gaming Website!</h1>
          <h4>Lugx Gaming Store</h4>
          <p>Dear Client, ${firstname} ${lastname}</p>
          <p>Thank you for Registering to our Webiste. We are excited to share the latest updates and news with you.</p>
          <p>If you have any questions or need assistance, feel free to reach out to us.</p>
          <p>Best regards,</p>
          <p>The Lugx store Team</p>
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
  }
    catch(error){
      console.log('cannot send welcome email '+error);
    }
});
}

export default welcome_route;
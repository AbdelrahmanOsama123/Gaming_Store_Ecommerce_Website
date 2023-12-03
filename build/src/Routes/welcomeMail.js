"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer_1 = __importDefault(require("nodemailer"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var welcome_route = function (app) {
    app.post('/welcomeMail', function (req, res) {
        try {
            var email = req.cookies.email;
            var firstname = req.body.firstname;
            var lastname = req.body.lastname;
            var transporter = nodemailer_1.default.createTransport({
                service: 'gmail',
                auth: {
                    user: 'lugxstore222@gmail.com',
                    pass: (process.env.GMAIL_PASSWORD),
                },
            });
            var mailOptions = {
                from: 'lugxstore222@gmail.com',
                to: email,
                subject: "Thank you for registering to Lugx Store",
                html: "<!DOCTYPE html>\n      <html>\n      <head>\n        <style>\n          body {\n          font-family: Arial, sans-serif;\n          background-color: #f1f1f1;\n          padding: 20px;\n          height : 100%;\n          background-color : red;\n      }\n      \n      .container {\n          max-width: 600px;\n          margin: 0 auto;\n          background-color: #ffffff;\n          padding: 20px;\n          border-radius: 5px;\n          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);\n          height : 100%;\n      }\n      \n      h1 {\n          color: #333333;\n          font-size: 24px;\n          margin-bottom: 20px;\n      }\n      \n      p {\n          color: #666666;\n          font-size: 16px;\n          line-height: 1.5;\n      }\n        </style>\n      </head>\n      <body style=\"background-color: red;\" >\n        <div class=\"container\">\n          <h1>Welcome to Our Gaming Website!</h1>\n          <h4>Lugx Gaming Store</h4>\n          <p>Dear Client, ".concat(firstname, " ").concat(lastname, "</p>\n          <p>Thank you for Registering to our Webiste. We are excited to share the latest updates and news with you.</p>\n          <p>If you have any questions or need assistance, feel free to reach out to us.</p>\n          <p>Best regards,</p>\n          <p>The Lugx store Team</p>\n      </div>\n      </body>\n      </html>\n        ")
            };
            transporter.sendMail(mailOptions, function (error) {
                if (error) {
                    console.log(error);
                    res.json('Error occurred while sending the email.');
                }
                else {
                    res.json('Email is sent successfully!');
                }
            });
        }
        catch (error) {
            console.log('cannot send welcome email ' + error);
        }
    });
};
exports.default = welcome_route;

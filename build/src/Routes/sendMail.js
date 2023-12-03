"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer_1 = __importDefault(require("nodemailer"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var sendMail_route = function (app) {
    app.post('/sendMail', function (req, res) {
        var _a = req.body, firstName = _a.firstName, lastName = _a.lastName, email = _a.email, subject = _a.subject, message = _a.message;
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
            subject: subject,
            html: "\n      <!DOCTYPE html>\n      <html>\n      <head>\n        <style>\n          body {\n            font-family: Arial, sans-serif;\n            line-height: 1.5;\n          }\n          .container {\n            max-width: 600px;\n            margin: 0 auto;\n            padding: 20px;\n            background-color: #f5f5f5;\n            font-size:13px;\n          }\n          h1 {\n            color: #333;\n            text-align: center;\n          }\n          p {\n            margin-bottom: 10px;\n          }\n          .signature {\n            margin-top: 20px;\n            font-style: italic;\n            font-weight: bold;\n            font-size :25px;\n          }\n          #msgSpan{\n            font-weight: bold;\n            font-size: 25px;\n            font-family: sans-serif;\n            font-style: italic;\n            color : red;\n          }\n          #email{\n            font-weight: bold;\n            font-size: 25px;\n            font-family: sans-serif;\n            font-style: italic;\n            color : blue;\n          }\n        </style>\n      </head>\n      <body>\n        <div class=\"container\">\n          <h1>We Understand</h1>\n          <p>Dear ".concat(firstName, ",</p>\n          <p>I apologize for any inconvenience caused by your recent ").concat(subject, "<br><span id=\"msgSpan\">[").concat(message, "]</span></p>\n          <p>We take your feedback seriously and are actively working on a solution.</p>\n          <p>We appreciate your patience and will keep you updated on our progress. </p>\n          <p>If you have any questions, please reach out to me directly at <span id='email'>[lugxstore222@gmail.com]</span></p>\n          <p>Thank you for your understanding and continued support.</p>\n          <p class=\"signature\">Best regards,<br>lugxStore<br>Online gaming store</p>\n          <p>Thank you Mr/ ").concat(firstName, " ").concat(lastName, "</p>\n        </div>\n      </body>\n      </html>\n        ")
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
    });
};
exports.default = sendMail_route;

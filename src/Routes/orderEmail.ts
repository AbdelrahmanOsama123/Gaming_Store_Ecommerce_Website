import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const orderMail_route = (app: express.Application) => {
  app.post('/orderEmail', (req: Request, res: Response) => {
    const email = req.cookies.email;
    console.log(email);
    const {orderid,quantity,price,totalPrice,formattedDate} = req.body;

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
      subject: "Thank you for your order from lugx store - your shopping success!" as string,
      html: `
      <!-- THIS EMAIL WAS BUILT AND TESTED WITH LITMUS http://litmus.com -->
          <!-- IT WAS RELEASED UNDER THE MIT LICENSE https://opensource.org/licenses/MIT -->
          <!-- QUESTIONS? TWEET US @LITMUSAPP -->
          <!DOCTYPE html>
          <html>
            <head>
              <title></title>
              <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <style type="text/css">
                /* CLIENT-SPECIFIC STYLES */
                body,
                table,
                td,
                a {
                  -webkit-text-size-adjust: 100%;
                  -ms-text-size-adjust: 100%;
                }
                table,
                td {
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                }
                img {
                  -ms-interpolation-mode: bicubic;
                }
          
                /* RESET STYLES */
                img {
                  border: 0;
                  height: auto;
                  line-height: 100%;
                  outline: none;
                  text-decoration: none;
                }
                table {
                  border-collapse: collapse !important;
                }
                body {
                  height: 100% !important;
                  margin: 0 !important;
                  padding: 0 !important;
                  width: 100% !important;
                }
          
                /* iOS BLUE LINKS */
                a[x-apple-data-detectors] {
                  color: inherit !important;
                  text-decoration: none !important;
                  font-size: inherit !important;
                  font-family: inherit !important;
                  font-weight: inherit !important;
                  line-height: inherit !important;
                }
          
                /* MEDIA QUERIES */
                @media screen and (max-width: 480px) {
                  .mobile-hide {
                    display: none !important;
                  }
                  .mobile-center {
                    text-align: center !important;
                  }
                }
          
                /* ANDROID CENTER FIX */
                div[style*="margin: 16px 0;"] {
                  margin: 0 !important;
                }
              </style>
            </head>
            <body
              style="
                margin: 0 !important;
                padding: 0 !important;
                background-color: #eeeeee;
              "
              bgcolor="#eeeeee"
            >
              <!-- HIDDEN PREHEADER TEXT -->
              <div
                style="
                  display: none;
                  font-size: 1px;
                  color: #fefefe;
                  line-height: 1px;
                  font-family:
                    Open Sans,
                    Helvetica,
                    Arial,
                    sans-serif;
                  max-height: 0px;
                  max-width: 0px;
                  opacity: 0;
                  overflow: hidden;
                "
              >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus dolor
                aliquid omnis consequatur est deserunt, odio neque blanditiis aspernatur,
                mollitia ipsa distinctio, culpa fuga obcaecati!
              </div>
          
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="background-color:#eeeeee" bgcolor="#eeeeee">
                    <!--[if (gte mso 9)|(IE)]>
                  <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                  <tr>
                  <td align="center" valign="top" width="600">
                  <![endif]-->
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                      style="max-width: 600px"
                    >
                      <tr>
                        <td
                          align="center"
                          valign="top"
                          style="font-size: 0; padding: 35px"
                          bgcolor="#0071f8"
                        >
                          <!--[if (gte mso 9)|(IE)]>
                          <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                          <tr>
                          <td align="left" valign="top" width="300">
                          <![endif]-->
                          <div
                            style="
                              display: inline-block;
                              max-width: 50%;
                              min-width: 100px;
                              vertical-align: top;
                              width: 100%;
                            "
                          >
                            <table
                              align="left"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              width="100%"
                              style="max-width: 300px"
                            >
                              <tr>
                                <td
                                  align="left"
                                  valign="top"
                                  style="
                                    font-family:
                                      Open Sans,
                                      Helvetica,
                                      Arial,
                                      sans-serif;
                                    font-size: 36px;
                                    font-weight: 800;
                                    line-height: 48px;
                                  "
                                  class="mobile-center"
                                >
                                  <h1
                                    style="
                                      font-size: 36px;
                                      font-weight: 800;
                                      margin: 0;
                                      color: #ffffff;
                                      color: #fff;
                                      text-transform: uppercase;
                                      font-size: 24px;
                                      font-weight: 700;
                                      -webkit-transition: all 0.3s ease 0s;
                                      -moz-transition: all 0.3s ease 0s;
                                      -o-transition: all 0.3s ease 0s;
                                      transition: all 0.3s ease 0s;
                                    "
                                  >
                                    LUGX
                                    <em style="font-style: normal; color: #f33f3f"
                                      >STORE</em
                                    >
                                  </h1>
                                </td>
                              </tr>
                            </table>
                          </div>
                          <!--[if (gte mso 9)|(IE)]>
                          </td>
                          <td align="right" width="300">
                          <![endif]-->
                          <div
                            style="
                              display: inline-block;
                              max-width: 50%;
                              min-width: 100px;
                              vertical-align: top;
                              width: 100%;
                            "
                            class="mobile-hide"
                          >
                            <table
                              align="left"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              width="100%"
                              style="max-width: 300px"
                            >
                              <tr>
                                <td
                                  align="right"
                                  valign="top"
                                  style="
                                    font-family:
                                      Open Sans,
                                      Helvetica,
                                      Arial,
                                      sans-serif;
                                    font-size: 48px;
                                    font-weight: 400;
                                    line-height: 48px;
                                  "
                                >
                                  <table
                                    cellspacing="0"
                                    cellpadding="0"
                                    border="0"
                                    align="right"
                                  >
                                    <tr>
                                      <td
                                        style="
                                          font-family:
                                            Open Sans,
                                            Helvetica,
                                            Arial,
                                            sans-serif;
                                          font-size: 18px;
                                          font-weight: 400;
                                        "
                                      >
                                        <p
                                          style="
                                            font-size: 18px;
                                            font-weight: 400;
                                            margin: 0;
                                            color: #ffffff;
                                          "
                                        >
                                          <a
                                            href="http://litmus.com"
                                            target="_blank"
                                            style="color: #ffffff; text-decoration: none"
                                            >Shop &nbsp;</a
                                          >
                                        </p>
                                      </td>
                                      <td
                                        style="
                                          font-family:
                                            Open Sans,
                                            Helvetica,
                                            Arial,
                                            sans-serif;
                                          font-size: 18px;
                                          font-weight: 400;
                                          line-height: 24px;
                                        "
                                      >
                                        <a
                                          href="http://litmus.com"
                                          target="_blank"
                                          style="color: #ffffff; text-decoration: none"
                                          ><img
                                            src="http://drive.google.com/uc?export=view&id=1R8CMep3WlIC6vpXgI9etaJi8od0mAEir"
                                            width="35"
                                            height="35"
                                            style="display: block; border: 0px"
                                        /></a>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </div>
                          <!--[if (gte mso 9)|(IE)]>
                          </td>
                          </tr>
                          </table>
                          <![endif]-->
                        </td>
                      </tr>
                      <tr>
                        <td
                          align="center"
                          style="padding: 35px 35px 20px 35px; background-color: #ffffff"
                          bgcolor="#ffffff"
                        >
                          <!--[if (gte mso 9)|(IE)]>
                          <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                          <tr>
                          <td align="center" valign="top" width="600">
                          <![endif]-->
                          <table
                            align="center"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            style="max-width: 600px"
                          >
                            <tr>
                              <td
                                align="center"
                                style="
                                  font-family:
                                    Open Sans,
                                    Helvetica,
                                    Arial,
                                    sans-serif;
                                  font-size: 16px;
                                  font-weight: 400;
                                  line-height: 24px;
                                  padding-top: 25px;
                                "
                              >
                                <img
                                  src="http://drive.google.com/uc?export=view&id=1hPgwUDz3qX5FcTwnxKgQ-gHpMM77OxBR"
                                  
                                  width="125"
                                  height="120"
                                  style="display: block; border: 0px"
                                /><br />
                                <h2
                                  style="
                                    font-size: 30px;
                                    font-weight: 800;
                                    line-height: 36px;
                                    color: #333333;
                                    margin: 0;
                                  "
                                >
                                  Thank You For Your Order!
                                </h2>
                              </td>
                            </tr>
                            <tr>
                              <td
                                align="left"
                                style="
                                  font-family:
                                    Open Sans,
                                    Helvetica,
                                    Arial,
                                    sans-serif;
                                  font-size: 16px;
                                  font-weight: 400;
                                  line-height: 24px;
                                  padding-top: 10px;
                                "
                              >
                                <p
                                  style="
                                    font-size: 16px;
                                    font-weight: 400;
                                    line-height: 24px;
                                    color: #777777;
                                  "
                                >
                                  we can't wait to serve you again!
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td align="left" style="padding-top: 20px">
                                <table
                                  cellspacing="0"
                                  cellpadding="0"
                                  border="0"
                                  width="100%"
                                >
                                  <tr>
                                    <td
                                      width="75%"
                                      align="left"
                                      bgcolor="#eeeeee"
                                      style="
                                        font-family:
                                          Open Sans,
                                          Helvetica,
                                          Arial,
                                          sans-serif;
                                        font-size: 16px;
                                        font-weight: 800;
                                        line-height: 24px;
                                        padding: 10px;
                                      "
                                    >
                                      Order Confirmation #
                                    </td>
                                    <td
                                      width="25%"
                                      align="left"
                                      bgcolor="#eeeeee"
                                      style="
                                        font-family:
                                          Open Sans,
                                          Helvetica,
                                          Arial,
                                          sans-serif;
                                        font-size: 16px;
                                        font-weight: 800;
                                        line-height: 24px;
                                        padding: 10px;
                                      "
                                    >
                                      ${orderid}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      width="75%"
                                      align="left"
                                      style="
                                        font-family:
                                          Open Sans,
                                          Helvetica,
                                          Arial,
                                          sans-serif;
                                        font-size: 16px;
                                        font-weight: 400;
                                        line-height: 24px;
                                        padding: 15px 10px 5px 10px;
                                      "
                                    >
                                      Purchased Item (${quantity})
                                    </td>
                                    <td
                                      width="25%"
                                      align="left"
                                      style="
                                        font-family:
                                          Open Sans,
                                          Helvetica,
                                          Arial,
                                          sans-serif;
                                        font-size: 16px;
                                        font-weight: 400;
                                        line-height: 24px;
                                        padding: 15px 10px 5px 10px;
                                      "
                                    >
                                      $${price}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      width="75%"
                                      align="left"
                                      style="
                                        font-family:
                                          Open Sans,
                                          Helvetica,
                                          Arial,
                                          sans-serif;
                                        font-size: 16px;
                                        font-weight: 400;
                                        line-height: 24px;
                                        padding: 5px 10px;
                                      "
                                    >
                                      Shipping
                                    </td>
                                    <td
                                      width="25%"
                                      align="left"
                                      style="
                                        font-family:
                                          Open Sans,
                                          Helvetica,
                                          Arial,
                                          sans-serif;
                                        font-size: 16px;
                                        font-weight: 400;
                                        line-height: 24px;
                                        padding: 5px 10px;
                                      "
                                    >
                                      $20.00
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td align="left" style="padding-top: 20px">
                                <table
                                  cellspacing="0"
                                  cellpadding="0"
                                  border="0"
                                  width="100%"
                                >
                                  <tr>
                                    <td
                                      width="75%"
                                      align="left"
                                      style="
                                        font-family:
                                          Open Sans,
                                          Helvetica,
                                          Arial,
                                          sans-serif;
                                        font-size: 16px;
                                        font-weight: 800;
                                        line-height: 24px;
                                        padding: 10px;
                                        border-top: 3px solid #eeeeee;
                                        border-bottom: 3px solid #eeeeee;
                                      "
                                    >
                                      TOTAL
                                    </td>
                                    <td
                                      width="25%"
                                      align="left"
                                      style="
                                        font-family:
                                          Open Sans,
                                          Helvetica,
                                          Arial,
                                          sans-serif;
                                        font-size: 16px;
                                        font-weight: 800;
                                        line-height: 24px;
                                        padding: 10px;
                                        border-top: 3px solid #eeeeee;
                                        border-bottom: 3px solid #eeeeee;
                                      "
                                    >
                                      $${totalPrice}
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                          <!--[if (gte mso 9)|(IE)]>
                          </td>
                          </tr>
                          </table>
                          <![endif]-->
                        </td>
                      </tr>
                      <tr>
                        <td
                          align="center"
                          height="100%"
                          valign="top"
                          width="100%"
                          style="padding: 0 35px 35px 35px; background-color: #ffffff"
                          bgcolor="#ffffff"
                        >
                          <!--[if (gte mso 9)|(IE)]>
                          <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                          <tr>
                          <td align="center" valign="top" width="600">
                          <![endif]-->
                          <table
                            align="center"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            style="max-width: 660px"
                          >
                            <tr>
                              <td align="center" valign="top" style="font-size: 0">
                                <!--[if (gte mso 9)|(IE)]>
                                      <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                                      <tr>
                                      <td align="left" valign="top" width="300">
                                      <![endif]-->
                                <div
                                  style="
                                    display: inline-block;
                                    max-width: 50%;
                                    min-width: 240px;
                                    vertical-align: top;
                                    width: 100%;
                                  "
                                >
                                  <table
                                    align="left"
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    width="100%"
                                    style="max-width: 300px"
                                  >
                                    <tr>
                                      <td
                                        align="left"
                                        valign="top"
                                        style="
                                          font-family:
                                            Open Sans,
                                            Helvetica,
                                            Arial,
                                            sans-serif;
                                          font-size: 16px;
                                          font-weight: 400;
                                          line-height: 24px;
                                        "
                                      >
                                        <p style="font-weight: 800">Delivery Address</p>
                                        <p>
                                          675 Massachusetts Avenue<br />11th Floor<br />Cambridge,
                                          MA 02139
                                        </p>
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                                <!--[if (gte mso 9)|(IE)]>
                                      </td>
                                      <td align="left" valign="top" width="300">
                                      <![endif]-->
                                <div
                                  style="
                                    display: inline-block;
                                    max-width: 50%;
                                    min-width: 240px;
                                    vertical-align: top;
                                    width: 100%;
                                  "
                                >
                                  <table
                                    align="left"
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    width="100%"
                                    style="max-width: 300px"
                                  >
                                    <tr>
                                      <td
                                        align="left"
                                        valign="top"
                                        style="
                                          font-family:
                                            Open Sans,
                                            Helvetica,
                                            Arial,
                                            sans-serif;
                                          font-size: 16px;
                                          font-weight: 400;
                                          line-height: 24px;
                                        "
                                      >
                                        <p style="font-weight: 800">
                                          Estimated Delivery Date
                                        </p>
                                        <p>${formattedDate}</p>
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                                <!--[if (gte mso 9)|(IE)]>
                                      </td>
                                      </tr>
                                      </table>
                                      <![endif]-->
                              </td>
                            </tr>
                          </table>
                          <!--[if (gte mso 9)|(IE)]>
                          </td>
                          </tr>
                          </table>
                          <![endif]-->
                        </td>
                      </tr>
                      <tr>
                        <td
                          align="center"
                          style="padding: 35px; background-color: #0071f8"
                          bgcolor="#0071f8"
                        >
                          <!--[if (gte mso 9)|(IE)]>
                          <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                          <tr>
                          <td align="center" valign="top" width="600">
                          <![endif]-->
                          <table
                            align="center"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            style="max-width: 600px"
                          >
                            <tr>
                              <td
                                align="center"
                                style="
                                  font-family:
                                    Open Sans,
                                    Helvetica,
                                    Arial,
                                    sans-serif;
                                  font-size: 16px;
                                  font-weight: 400;
                                  line-height: 24px;
                                  padding-top: 25px;
                                "
                              >
                                <h2
                                  style="
                                    font-size: 24px;
                                    font-weight: 800;
                                    line-height: 30px;
                                    color: #ffffff;
                                    margin: 0;
                                  "
                                >
                                  Get 25% off your next order.
                                </h2>
                              </td>
                            </tr>
                            <tr>
                              <td align="center" style="padding: 25px 0 15px 0">
                                <table border="0" cellspacing="0" cellpadding="0">
                                  <tr>
                                    <td
                                      align="center"
                                      style="border-radius: 5px"
                                      bgcolor="#66b3b7"
                                    >
                                      <a
                                        href="http://localhost:8000/main/home"
                                        target="_blank"
                                        style="
                                          font-size: 18px;
                                          font-family:
                                            Open Sans,
                                            Helvetica,
                                            Arial,
                                            sans-serif;
                                          color: #ffffff;
                                          text-decoration: none;
                                          border-radius: 5px;
                                          background-color: #f33f3f;
                                          padding: 15px 30px;
                                          border: 1px solid #f33f3f;
                                          display: block;
                                        "
                                        >Awesome</a
                                      >
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                          <!--[if (gte mso 9)|(IE)]>
                          </td>
                          </tr>
                          </table>
                          <![endif]-->
                        </td>
                      </tr>
                      <tr>
                        <td
                          align="center"
                          style="padding: 35px; background-color: #ffffff"
                          bgcolor="#ffffff"
                        >
                          <!--[if (gte mso 9)|(IE)]>
                          <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                          <tr>
                          <td align="center" valign="top" width="600">
                          <![endif]-->
                          <table
                            align="center"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            style="max-width: 600px"
                          >
                            <tr>
                              <td align="center">
                                <img
                                  src="http://drive.google.com/uc?export=view&id=1j7P3WBY3ykqi8RkhPctkAGQ5Xdxyw0Q5"
                                  width="150"
                                  height="150"
                                  style="display: block; border: 0px"
                                />
                              </td>
                            </tr>
                            <tr>
                              <td
                                align="center"
                                style="
                                  font-family:
                                    Open Sans,
                                    Helvetica,
                                    Arial,
                                    sans-serif;
                                  font-size: 14px;
                                  font-weight: 400;
                                  line-height: 24px;
                                  padding: 5px 0 10px 0;
                                "
                              >
                                <p
                                  style="
                                    font-size: 14px;
                                    font-weight: 800;
                                    line-height: 18px;
                                    color: #333333;
                                  "
                                >
                                  675 Massachusetts Avenue<br />
                                  Cambridge, MA 02139
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td
                                align="left"
                                style="
                                  font-family:
                                    Open Sans,
                                    Helvetica,
                                    Arial,
                                    sans-serif;
                                  font-size: 14px;
                                  font-weight: 400;
                                  line-height: 24px;
                                "
                              >
                                <p
                                  style="
                                    font-size: 14px;
                                    font-weight: 400;
                                    line-height: 20px;
                                    color: #777777;
                                  "
                                >
                                  If you didn't create an account using this email
                                  address, please ignore this email or
                                  <a
                                    style="color: #777777"
                                    >unsusbscribe</a
                                  >.
                                </p>
                              </td>
                            </tr>
                          </table>
                          <!--[if (gte mso 9)|(IE)]>
                          </td>
                          </tr>
                          </table>
                          <![endif]-->
                        </td>
                      </tr>
                    </table>
                    <!--[if (gte mso 9)|(IE)]>
                  </td>
                  </tr>
                  </table>
                  <![endif]-->
                  </td>
                </tr>
              </table>
              <!-- LITMUS ATTRIBUTION -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td bgcolor="#ffffff" align="center">
                    <!--[if (gte mso 9)|(IE)]>
          <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
          <tr>
          <td align="center" valign="top" width="600">
          <![endif]-->
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                      style="max-width: 600px"
                    >
                      <tr>
                        <td
                          bgcolor="#ffffff"
                          align="center"
                          style="
                            padding: 30px 30px 30px 30px;
                            color: #666666;
                            font-family: Helvetica, Arial, sans-serif;
                            font-size: 14px;
                            font-weight: 400;
                            line-height: 18px;
                          "
                        ></td>
                      </tr>
                    </table>
                    <!--[if (gte mso 9)|(IE)]>
          </td>
          </tr>
          </table>
          <![endif]-->
                  </td>
                </tr>
              </table>
              <!-- END LITMUS ATTRIBUTION -->
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

export default orderMail_route;
const nodemailer = require("nodemailer");
var config = require("config");
require("dotenv").config();

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.userid,
    pass: process.env.password,
  },
});

let sendmail = (toid, sub, text, html) => {
  return transporter.sendMail({
    from: "noreply@psmsurat.com",
    to: toid,
    subject: sub,
    text: text,
    html: html || null,
  });
};

module.exports = { sendmail };

const nodemailer = require('nodemailer');

const { variablesConfig: { NO_REPLY_EMAIL, NO_REPLY_EMAIL_PASSWORD } } = require('../config');
const {GMAIL} = require("../config/constants");
const {link} = require("joi");
const {ACTIVATE_TOKEN_URL} = require("../config/variables");

const transporter = nodemailer.createTransport({
    service: GMAIL,
    auth: {
        user: NO_REPLY_EMAIL,
        pass: NO_REPLY_EMAIL_PASSWORD
    }
});

const sendMail = (userMail, text, subject) => transporter.sendMail({
    from: '"OStudio" <g@example.com>',
    to: userMail,
    subject: subject,
    text: text
});

const sendMailForUs = (name, email, phone, text) => transporter.sendMail({
    from: email,
    to: NO_REPLY_EMAIL,
    subject: `Привіт, мене звати - ${name}`,
    html: `<p>Мій телефон: ${phone}.</p>` +
        `<p>${text}</p>`
});

const sendMailForResetPassword = (email, name, link) => transporter.sendMail({
    from: '"OStudio" <g@example.com>',
    to: email,
    subject: `Вітаємо, ${name}`,
    html: `<p>Для того щоб відновити пароль, перейдіть по посиланню нижче.</p>` +
        `<link>${link}</link>`
});

const emailForRegistration = (email, name, token) => transporter.sendMail({
    from: '"OStudio" <g@example.com>',
    to: email,
    subject: `Вітаємо, ${name}`,
    html: `<p>Для того щоб підтвердити пошту, перейдіть по посиланню нижче.</p>` +
        `<link>${ACTIVATE_TOKEN_URL}${token}</link>`
});

module.exports = {
    sendMail,
    sendMailForUs,
    sendMailForResetPassword,
    emailForRegistration
};

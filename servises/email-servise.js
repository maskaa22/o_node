const nodemailer = require('nodemailer');

const { variablesConfig: { NO_REPLY_EMAIL, NO_REPLY_EMAIL_PASSWORD } } = require('../config');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sokolavanila22@gmail.com',
        pass: 'ghbdsaxasizbhhfx'
    }
});

const sendMail = (userMail, text, subject) => transporter.sendMail({
    from: '"OStudio" <g@example.com>',
    to: userMail,
    subject: subject,
    html: text
});

module.exports = {
    sendMail
};

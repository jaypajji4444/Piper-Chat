const nodemailer = require('nodemailer');

const sendEmail = async options => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: process.env.FROM_EMAIL,
        pass: process.env.FROM_PASSWORD
        }
    })  
    console.log(options.email)
    const message = {
        from: process.env.FROM_EMAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
    };
    const info = await transporter.sendMail(message);
    console.log('Message sent: %s', info.messageId);
};

module.exports = sendEmail;
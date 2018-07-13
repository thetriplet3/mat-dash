var nodemailer = require('nodemailer');

function Controller() {
    this.sendMail = (subject, body, to) => {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'noyek.mail@gmail.com',
                pass: 'noy3k.mail_svc'
            }
        });

        var mailOptions = {
            from: 'noyek.mail@gmail.com',
            to: to,
            subject: subject,
            html: body
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}

module.exports = new Controller();
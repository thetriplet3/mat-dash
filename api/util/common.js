var nodemailer = require('nodemailer');

function Controller() {
    this.sendMail = (subject, body, to) => {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'batcave.mail.service@gmail.com',
                pass: 'b@tcaV3__'
            }
        });

        var mailOptions = {
            from: 'batcave.mail.service',
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
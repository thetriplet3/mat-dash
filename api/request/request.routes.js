var express = require('express');
var router = express.Router();

var RequestController = require('./request.controller');

var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

router.use(bodyParser.json());

router.get('/', (req, res) => {
    RequestController.getAll().then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(data.status).send(JSON.stringify(data.Requests));
    })
})

router.get('/:id', (req, res) => {
    RequestController.get(req.params.id).then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(data.status).send(data.Request);
    })
})

router.post('/', (req, res) => {
    RequestController.insert(req.body).then((data) => {

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'batcave.mail.service@gmail.com',
                pass: 'b@tcaV3__'
            }
        });

        var subject = data.message.user.name + ' has requested access to ' + data.message.application.name + ' application';
        var body = 'Hello ' + data.message.manager.name + ', <br/><h3>Request Details</h3><br/>' +
            'Request ID: ' + data.message.requestId + '<br/>' +
            'Application: ' + data.message.application.name + '<br/>' +
            'Employee: ' + data.message.user.name + '<br/>' +
            'Application Role: ' + data.message.applicationRole + '<br/>' +
            'Access Type: ' + data.message.accessType + '<br/>' +
            'Reason: ' + data.message.reason + '<br/>' +
            'Request Date: ' + data.message.requestDate + '<br/>' +
            'Expire Date: ' + data.message.expireDate + '<br/><br/>' +
            'Please <a href="localhost:3000">log in</a> to the application to proceed with the request'

        var mailOptions = {
            from: 'batcave.mail.service',
            to: 'bruised.wayne.is.batman@gmail.com',
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


        res.status(data.status).send(data);
    }).catch((err) => {
        res.status(err.status).send(err.message);
    })
})

router.put('/:id', (req, res) => {
    RequestController.update(req.body).then((data) => {
        res.status(data.status).send(data.message);
    })
})

router.delete('/:id', (req, res) => {
    RequestController.delete(req.params.id).then((data) => {
        res.status(data.status).send(data.message);
    })
})

module.exports = router;
var express = require('express');
var router = express.Router();

var RequestController = require('./request.controller');

var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var Util = require('../util/common');

router.use(bodyParser.json());

router.get('/all/:filter', (req, res) => {
    console.log(req.body);
    RequestController.getAll(req.params.filter).then((data) => {
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

        var subject = data.message.user.name + ' has requested access to ' + data.message.application.name + ' application';
        var body = 'Hello ' + data.message.manager.name + ', <br/><h3>Request Details</h3><br/>' +
            'Request ID: ' + data.message.requestId + '<br/>' +
            'Application: ' + data.message.application.name + '<br/>' +
            'Employee: ' + data.message.user.name + '<br/>' +
            'Application Role: ' + data.message.applicationRole + '<br/>' +
            'Access Type: ' + data.message.accessType + '<br/>' +
            'Reason: ' + data.message.reason + '<br/>' +
            'Request Date: ' + data.message.requestDate + '<br/>' +
            'Expire Date: ' + data.message.expireDate + '<br/>' +
            'Please <a href="https://mat-dash.herokuapp.com/">log in</a> to the application to proceed with the request'

        Util.sendMail(subject, body, data.message.manager.email)

        res.status(data.status).send(data);
    }).catch((err) => {
        res.status(err.status).send(err.message);
    })
})

router.put('/:id', (req, res) => {
    console.log(req.body);
    RequestController.update(req.body).then((data) => {

        RequestController.get(req.params.id).then((updatedData) => {
            var subject = 'Status of the access request  AR-' + updatedData.message.requestId + ' changed to ' + updatedData.message.state;
            var body = 'Hello ' + updatedData.message.user.name + ', <br/><h3>Request Details</h3><br/>' +
                'Request ID: ' + updatedData.message.requestId + '<br/>' +
                'Application: ' + updatedData.message.application.name + '<br/>' +
                'Manager: ' + updatedData.message.manager.name + '<br/>' +
                'Application Role: ' + updatedData.message.applicationRole + '<br/>' +
                'Access Type: ' + updatedData.message.accessType + '<br/>' +
                'Reason: ' + updatedData.message.reason + '<br/>' +
                'Request Date: ' + updatedData.message.requestDate + '<br/>' +
                'Expire Date: ' + updatedData.message.expireDate + '<br/>' +
                'Status: <strong>' + updatedData.message.state + '</strong><br/>' +
                'Please <a href="https://mat-dash.herokuapp.com/">log in</a> to the application to see the details';

            if(updatedData.message.state == "COMPLETED") {
                body = body + "<br/>" +
                "<h3>Login credentials for application " + updatedData.message.application.name + "</h3>" +
                "username : " + updatedData.message.user.userId + updatedData.message.requestId + "<br/>" +
                "password : " + updatedData.message.user.userId + updatedData.message.requestId + updatedData.message.application.applicationId
            }
            
            Util.sendMail(subject, body, updatedData.message.user.email)

            if (updatedData.message.state == "APPROVED") {
                var subject = updatedData.message.user.name + ' has requested access to ' + updatedData.message.application.name + ' application';
                var body = 'Hello IT Support, <br/><h3>Request Details</h3><br/>' +
                    'Request ID: ' + updatedData.message.requestId + '<br/>' +
                    'Application: ' + updatedData.message.application.name + '<br/>' +
                    'Employee: ' + updatedData.message.user.name + '<br/>' +
                    'Application Role: ' + updatedData.message.applicationRole + '<br/>' +
                    'Access Type: ' + updatedData.message.accessType + '<br/>' +
                    'Reason: ' + updatedData.message.reason + '<br/>' +
                    'Request Date: ' + updatedData.message.requestDate + '<br/>' +
                    'Expire Date: ' + updatedData.message.expireDate + '<br/>' +
                    'Please <a href="https://mat-dash.herokuapp.com/">log in</a> to the application to proceed with the request'
    
                Util.sendMail(subject, body, 'bat.it.dep@gmail.com')
            }
        })

        

        res.status(data.status).send(data.message);
    })
})

router.delete('/:id', (req, res) => {
    RequestController.delete(req.params.id).then((data) => {
        res.status(data.status).send(data.message);
    })
})

module.exports = router;
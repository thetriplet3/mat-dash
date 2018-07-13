var express = require('express');
var router = express.Router();

var RequestController = require('./request.controller');

var bodyParser = require('body-parser');
router.use(bodyParser.json());

router.get('/', (req,res)=> {
    RequestController.getAll().then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(data.status).send(JSON.stringify(data.Requests));
    })
})

router.get('/:id', (req,res)=> {
    RequestController.get(req.params.id).then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(data.status).send(data.Request);
    })
})

router.post('/', (req,res) => {
    RequestController.insert(req.body).then((data) => {

        res.status(data.status).send(data.message);
    }).catch((err) => {
        res.status(err.status).send(err.message);
    })
})

router.put('/:id', (req,res) => {
    RequestController.update(req.body).then((data) => {
        res.status(data.status).send(data.message);
    })
})

router.delete('/:id', (req,res) => {
    RequestController.delete(req.params.id).then((data) => {
        res.status(data.status).send(data.message);
    })
})

module.exports = router;
var express = require('express');
var router = express();
var requestRoutes = require('./request/request.routes');
//var applicationRoutes = require('./application/application.routes');

router.use('/request',requestRoutes);
//router.use('/application', applicationRoutes);

module.exports = router;
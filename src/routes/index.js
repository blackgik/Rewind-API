var express = require('express');

var userRouter = require('../routers/Users');
var movieRouter = require('../routers/Movies');

var route = express();

route.use('/', movieRouter);
route.use('/users', userRouter);

module.exports = route;
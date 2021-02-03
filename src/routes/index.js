var express = require('express');

var userRouter = require('../routers/Users');
var movieRouter = require('../routers/Movies');
var ThirdPartyRouter = require('../routers/thirdParty');


var route = express();

route.use('/movies', movieRouter);
route.use('/users', userRouter);
route.use('/auth', ThirdPartyRouter);

// Add documentation
//route.use('*', docs);

module.exports = route;
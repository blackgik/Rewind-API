var express = require('express');

var userRouter = require('../routers/Users');
var movieRouter = require('../routers/Movies');
var ThirdPartyRouter = require('../routers/thirdParty');
var CategoryRouter = require('../routers/Category');
var DocsRouter = require('../routers/Docs');

var route = express();

route.use('/movies', movieRouter);
route.use('/users', userRouter);
route.use('/auth', ThirdPartyRouter);
route.use('/category', CategoryRouter);
route.use('*', DocsRouter);

// Add documentation
//route.use('*', docs);

module.exports = route;
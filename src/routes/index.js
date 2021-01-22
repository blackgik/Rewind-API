var express = require('express');

var userRouter = require('../routers/Users');
var movieRouter = require('../routers/Movies');

var app = express();

app.use('/', movieRouter);
app.use('/users', userRouter);

module.exports = app;
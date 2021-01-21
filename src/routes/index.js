var express = require('express');

var userRouter = require('../routers/Users');
var movieRouter = require('../routers/Movies');

var app = express();

app.use('/', movieRouter);
app.use('/', userRouter);

module.exports = app;
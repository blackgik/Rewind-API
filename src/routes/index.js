var userRouter = require('../routers/Users');
var movieRouter = require('../routers/Movies');
var ThirdPartyRouter = require('../routers/thirdParty');
var CategoryRouter = require('../routers/Category');
var DocsRouter = require('../routers/Docs');

module.exports.routes = (app) => {
    app.use('/movies', movieRouter);
    app.use('/users', userRouter);
    app.use('/auth', ThirdPartyRouter);
    app.use('/category', CategoryRouter);
    app.use('*', DocsRouter);
};
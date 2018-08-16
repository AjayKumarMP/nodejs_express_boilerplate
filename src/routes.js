var router = require('express').Router();
var routes = router.route('/');
var userControllerRouter = require('./app/controllers/api/v1/userController');
var accountController = require('./app/controllers/api/v1/accountController');
const { login, logout, verifyAUth }  = require('./app/controllers/api/v1/authenticationController');

    router.use('/userController', userControllerRouter);
    router.use('/accountController',verifyAUth, accountController);
    router.post('/login', login);
    router.get('/logout', logout);
    module.exports = router;

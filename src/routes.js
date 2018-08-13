var router = require('express').Router();
var routes = router.route('/');
var userControllerRouter = require('./app/controllers/api/v1/userController');
var accountController = require('./app/controllers/api/v1/accountController');

    router.use('/userController', userControllerRouter);
    router.use('/accountController', accountController);

    module.exports = router;

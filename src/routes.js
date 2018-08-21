var router = require('express').Router();
var routes = router.route('/');
var userControllerRouter = require('./app/controllers/api/v1/userController');
var accountController = require('./app/controllers/api/v1/accountController');
const AuthenticationController = require('./app/controllers/api/v1/authenticationController');

console.log(AuthenticationController.name);
AuthenticationController.name = "ajay";
console.log(AuthenticationController.name);

router.use('/userController',  userControllerRouter);
router.use('/accountController', AuthenticationController.verifyAUth, accountController);
router.post('/login', AuthenticationController.login);
router.get('/logout', AuthenticationController.logout);

module.exports = router;

const jwt = require('jsonwebtoken');
const User = require('../../../models/user');
const config = require('../../../../../config/env');
const { setResponse, response_200, response_401, response_500, response_404 } = require('../../../lib/apiResponseFormat');

class AuthenticationController {

    constructor() {}

    // function which verify the credentials and issues an token in the response
    async login(req, res, next) {
        try {
            var user = { id: 1, name: "user", email: "user@gmail.com", password: "password" };
            // var user = await User.findOne({ where: { email: req.body.email } });
            if (!user) {
                setResponse(res, response_404("No User Found, Please check the credentials"));
            }
            if (req.body.password !== user.password) {
                setResponse(res, response_401("UnAuthorised Access"));
            }
            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 60000
            });
            setResponse(res, response_200({ auth: true, token }));
        } catch (error) {
            console.log("Error in logging in the USer", err.message);
            setResponse(res, response_500("Error in logging in the USer", err.message));
        }
    }

    async logout(req, res, next) {
        setResponse(res, response_200({ auth: false, token: null }));
    }

    async verifyAUth(req, res, next) {
        var token = req.headers['x-access-token'];
        if (!token) {
            setResponse(res, response_401({ auth: false, message: 'No token provided.' }));
        }
        try {
            var decoded = await jwt.verify(token, config.secret);
            var user = { id: 10, name: "user", email: "user@gmail.com", password: "password" };
            // var user = await User.findById(decoded.id);
            if (!user) {
                setResponse(resp, response_401("UnAUthorised Access"));
            }
            console.log(decoded);
            req.userId = user.id;
            next();
        } catch (error) {
            console.log("Error in logging in the USer", error.message);
            setResponse(res, response_500("Error in verifying AUTH the USer", error.message));
        }

    }
}

module.exports = new AuthenticationController();

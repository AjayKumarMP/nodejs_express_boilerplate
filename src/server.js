var cors = require('cors');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer')
var swaggerUi = require('swagger-ui-express')

var config = require('../config/env');
var apiRouter = require('./routes');
var logger = require('./app/lib/logger');
var swaagerDoc = require('./swagger.json');
var { sequelize } = require('./app/config/db');
const sheduler = require('./app/jobs/scheduler');


async function logRequest(request, response, next) {
    logger.info('###### REQUEST #######');
    logger.info(`END POINT : ${request.url}`);
    logger.info('Query : ', request.query);
    logger.info('Post : ', request.body);
    logger.info('Params : ', request.params);
    logger.info('###### END OF REQUEST #######');
    await next();
}

async function logResponse(request, response, next) {
    const start = Date.now();
    await next();
    logger.info('###### RESPONSE #######');
    logger.info('Body : ', response.body);
    const end = Date.now() - start;
    logger.info(`Response time : ${end} ms`);
    logger.info('###### END OF RESPONSE #######');
}



// apply the required middlewares for the application
var applyMiddleWares = (app) => {
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(logRequest);
    app.use(logResponse);
    app.use('/opex', apiRouter)
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaagerDoc));
};


//create a mail for 
var transport = nodemailer.createTransport({ // [1]
    service: "Gmail",
    auth: {
        user: "username",
        pass: "password"
    }
});
if (process.env.NODE_ENV === 'production') { // [2]
    process.on('uncaughtException', function (er) {
        //   console.error("Inside mailer", transport) // [3]
        transport.sendMail({
            from: 'ajaykumarmp145@gmail.com',
            to: 'ajaykumarmp145@gmail.com',
            subject: "HI",
            text: "Hello" // [4]
        }, function (er) {
            if (er) console.error()
            // uncomment this if you want shutdown system after exception occured
            // process.start();// [5]
        })
    })
}

module.exports = applyMiddleWares;
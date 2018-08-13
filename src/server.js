var cors = require('cors');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer')
var swaggerUi = require('swagger-ui-express')
var session = require('express-session')
var cookieParser = require('cookie-parser');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var passport = require('passport'),
    localStartegy = require('passport-local')

var config = require('../config/env');
var apiRouter = require('./routes');
var logger = require('./app/lib/logger');
var swaagerDoc = require('./swagger.json');
var { sequelize } = require('./app/config/db');


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

// store to save the session related data
var sessionStore = new SequelizeStore({
    db: sequelize
});

var applyAuth = () => {
console.log("Inside auth function");
    // configure passport and check for the user existance
    passport.use(new localStartegy({ userNameField: 'email' }, (email, password, done) => {
        // var dbUser = sequelize.find({ where: { email: email } });
        dbUser = { email: "user@gmail.com", password: "password" };
        if (!dbUser) {
            return done(null, false, { message: 'Invalid credentials.\n' });
          }
          if (password != dbUser.password) {
            return done(null, false, { message: 'Invalid credentials.\n' });
          }
        if (email === dbUser.email && password === dbUser.password) {
            return done(null, dbUser);
        }
    }));

    // tell passport how to serialize the user
    passport.serializeUser((user, done) => {
        console.log('Inside serializeUser callback. User id is save to the session file store here')
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        console.log('Inside deserializeUser callback')
        console.log(`The user id passport saved in the session file store is: ${id}`)
        const user = users[0].id === id ? users[0] : false;
        done(null, user);
    });
}


// apply the required middlewares for the application
var applyMiddleWares = (app) => {
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(session({
        name: "OpEx",
        secret: config.secret,
        rolling: true,
        saveUninitialized: false,
        store: sessionStore,
        resave: false,
        cookie: {
            // uncomment this to serve over https only
            // httpOnly: true,
            maxAge: 100000
        }
    }));
    applyAuth();
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(logRequest);
    app.use(logResponse);
    app.use('/opex', Aunthenticated, apiRouter)
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaagerDoc));
};

function Aunthenticated(req, res, next){
    console.log(req);
    if(req.isAuthenticated()){
        return next();
    }else{
        res.status(401).send("You are UnAuthorised to access this URL");
    }
}

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
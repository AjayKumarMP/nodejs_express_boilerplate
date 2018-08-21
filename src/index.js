// "use strict";
var express= require('express');

var applyMiddleWares = require('./server');
var config = require('../config/env');

var app =express();
/* 
    *to initialize the angular project
*/
// app.use(express.static(__dirname+"/public"));
// app.use('/smilestalent',express.static(__dirname+"/public/index.html"));

// Start server
if (!module.parent) {
    app.listen(config.port, config.host, () => {
        console.log(`Opex service API server listening on ${config.host} : ${config.port}, in ${config.env}`);
    });
}

// apply middlewares
applyMiddleWares(app);

app.use('/smilesTalent',express.static(__dirname+'/public/index.html'));
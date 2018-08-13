var Sequelize = require("sequelize");

var sequelize = new Sequelize('express', 'root', 'root', {
    dialect: 'mysql',
    port: 3306
});

sequelize
    .authenticate()
    .then((success) => { 
        console.log("conntected  to databse");
    }, (err) => {
        console.log("error in conntecting  to databse",err);
    });

    sequelize
    .sync({force:false})
    .then((success) => { 
        console.log("syncing is done");
    }, (err) => {
        console.log("error databse syncing",err);
    });

    module.exports.sequelize = sequelize;
    module.exports.Sequelize = Sequelize;
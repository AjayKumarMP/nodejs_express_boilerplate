var db = require('../config/db');

var User = db.sequelize.define('USER',{
    id:{
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: db.Sequelize.STRING,
        allowNull:false
    },
    email: {
        type: db.Sequelize.STRING,
        allowNull:false,
        validate:{
            isEmail: true,
        }
    }
},{
    freezeTableName: true,
    tableName: "user_table",
    paranoid: true,
});



module.exports = User;
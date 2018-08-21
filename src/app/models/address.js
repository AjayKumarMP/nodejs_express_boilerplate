var db = require('../config/db');
const User = require('./user');
var Address = db.sequelize.define('ADRESS',{
    id:{
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    adress: {
        type: db.Sequelize.STRING,
        allowNull:false
    }
},{
    freezeTableName: true,
    tableName: "address_table",
    paranoid: true,
});

User.hasMany(Address);


module.exports = User;
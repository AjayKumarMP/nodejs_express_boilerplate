var User = require('../models/user');

var createUser = async (user)=>{
    var newUser = await User.create({
        name:user.name,
        email: user.email
    });
    return newUser;
}



module.exports = createUser;
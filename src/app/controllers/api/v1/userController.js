var userControllerRouter = require('express').Router();

var User = require('../../../models/user');
var Address = require('../../../models/address');
var logger = require('../../../lib/logger');
var userService = require('../../../services/userService');
const handleWorkBook = require('../../../services/workBook');

var WorkBook = new handleWorkBook();
userControllerRouter.post("/createUser", async (req, res)=>{
    try {
        console.log("Inside userControllerRouter");
        var user =await userService(req.body);
    } catch (error) {
        console.log('fdfds');
        logger.error("Expection occured in UserController: createUser",error);
        res.send(error);
    }

    res.status(200).json(user);
});

userControllerRouter.post('/getWorkBook', WorkBook.readData)



module.exports = userControllerRouter;
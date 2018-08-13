module.exports = {
    login: async (req,res)=>{
        req.session.user = req.body;
    },

    logout: async (req,res)=>{
        req.session.destroy((err)=>{
            if(err){
                console.log("error in destroying the session");
                res.status(500).send("error in destroying the session");
            }else {
                console.log("User Session has been destrpyed successfully");
                res.status(200).send("User session destroyed successfully");
            }
        });
    }
}
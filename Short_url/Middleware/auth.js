const {getUser} = require('../service/auth');

async function restrictToLoggedInUserOnly(req,res,next){
    // console.log(req.cookies);
    const userUid = req.cookies?.uid;

    if(!userUid){
        return res.redirect("/login");
    }

    const user = getUser(userUid);
    if(userUid && !user){
        return res.redirect("/login");
    }

    req.user = user;
    next();
}

module.exports = {restrictToLoggedInUserOnly}
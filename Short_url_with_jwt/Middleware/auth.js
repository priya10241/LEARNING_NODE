const {getUser} = require('../service/auth');

async function restrictToLoggedInUserOnly(req,res,next){
    //using cookies
    // const userUid = req.cookies?.uid;
    // if(!userUid){
    //     return res.redirect("/login");
    // }
    // const user = getUser(userUid);
    // if(userUid && !user){
    //     return res.redirect("/login");
    // }
    // req.user = user;
    // next();



    //using header
    const userUid = req.headers["authorization"]; // this userUid is like "Bearer 1kcsdfsfydh6375dvfy74";
    const token = userUid.split('Bearer ')[1];
    const user = getUser(token);
    if(!user){
        return res.redirect("/login");
    }
    req.user = user;
    next();

}

module.exports = {restrictToLoggedInUserOnly}
const {getUserByToken} = require('../services/authentication');

function checkForAuthentication(cookieName){
    return (req,res,next)=>{
        if(!req.cookies){
            return next();
        }
        if(!req.cookies[cookieName]){
            return next();
        }
        const token = req.cookies[cookieName];
        try{
            const userPayload = getUserByToken(token);
            req.user = userPayload;
        }
        catch(err){
        }
        return next();
    }
}

module.exports = {checkForAuthentication};
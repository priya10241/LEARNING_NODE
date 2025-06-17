const {getUser} = require('../service/auth');

function checkForAuthentication(req,res,next){
    // console.log("request is : ");
    // console.log(req);
    if(!req.cookies || !req.cookies.token){
        return next();
    }
    else{
        const token = req.cookies.token;
        const user = getUser(token);
        req.user = user;
        return next();
    }
}


function restrictTo(roles){
    return function (req,res,next){
        if(!req.user){
            return res.redirect("/login");
        }
        else if(!roles.includes(req.user.role)){
            return res.end("Unauthorize");
        }
        else{
            return next();
        }
    }
}


// async function restrictToLoggedInUserOnly(req,res,next){
//     //using cookies
//     // const userUid = req.cookies?.uid;
//     // if(!userUid){
//     //     return res.redirect("/login");
//     // }
//     // const user = getUser(userUid);
//     // if(userUid && !user){
//     //     return res.redirect("/login");
//     // }
//     // req.user = user;
//     // next();



//     //using header
//     const userUid = req.headers["authorization"]; // this userUid is like "Bearer 1kcsdfsfydh6375dvfy74";
//     const token = userUid.split('Bearer ')[1];
//     const user = getUser(token);
//     if(!user){
//         return res.redirect("/login");
//     }
//     req.user = user;
//     next();

// }

module.exports = {checkForAuthentication, restrictTo}
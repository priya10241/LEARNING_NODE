const User = require('../models/user');
function handleGetUserSignIn(req,res){
    return res.render('signin');
}

function handleGetUserSignUp(res, res){
    return res.render('signup');
}

async function handleUserSignUp(req, res) {
    const {fullName, email, password} = req.body;
    await User.create({fullName, email, password});
    res.redirect("/");
}

async function handleUserSignIn(req, res) {
    const {email, password} = req.body;
    try{
        const user = await User.matchPassword(email, password);
        // console.log(user);
        res.redirect("/");
    }
    catch(error){
        console.log(error);
        res.render("signin", {message : error});
    }

}
module.exports = {handleGetUserSignIn, handleGetUserSignUp, handleUserSignUp, handleUserSignIn};
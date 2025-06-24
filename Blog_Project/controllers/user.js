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
    return res.redirect("/");
}

async function handleUserSignIn(req, res) {
    const {email, password} = req.body;
    try{
        const token = await User.matchPassword(email, password);
        res.cookie('token', token);
        return res.redirect("/");
    }
    catch(error){
        return res.render("signin", {message : error});
    }
}

async function handleUserLogout(req, res){
    res.clearCookie('token');
    return res.redirect("/");
}
module.exports = {handleGetUserSignIn, handleGetUserSignUp, handleUserSignUp, handleUserSignIn, handleUserLogout};
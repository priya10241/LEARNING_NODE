const User = require('../models/Users');
const {v4 : uuidv4} = require('uuid');
const {setUser} = require('../service/auth');


async function handleUserSignUp(req,res){
    const {name, email, password} = req.body;
    try {
        await User.create({
        name : name,
        email : email,
        password : password
        })
        res.redirect("/");
    }
    catch(err){
        res.render("signup", {error : "Email Already exists!"})
    }

}

async function handleUserLogin(req,res){
    const {email, password}  = req.body;

    const user = await  User.findOne({email, password});
    if(!user){
        res.render("login", {error : "Invalid Email or password!"})
    }
    else{
        const sessionId = uuidv4();
        setUser(sessionId, user);
        res.cookie('uid', sessionId);
        res.redirect("/");
    }
}

module.exports = {handleUserSignUp, handleUserLogin};
const User = require('../models/Users');
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
        const token = setUser(user);

        //using cookies to pass token
        // res.cookie('uid', token);
        // res.redirect("/");

        //using headers to pass token 
        return res.json({token});
    }
}

module.exports = {handleUserSignUp, handleUserLogin};
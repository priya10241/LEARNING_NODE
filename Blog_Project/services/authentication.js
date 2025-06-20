const JWT = require('jsonwebtoken');
require('dotenv').config();
const SecretKey = process.env.SECRETKEY;


function createToken(user){
    const payload = {
        _id : user._id,
        email : user.email,
        fullName : user.fullName,
        profileImageURL : user.profileImageURL,
        role : user.role
    }
    const token =  JWT.sign(payload , SecretKey);

    return token;
}

function getUserByToken(token){
    const user = JWT.verify(token, SecretKey);
    // console.log("User in getUserByToken, ", user);
    return user;
}

module.exports = {createToken, getUserByToken};



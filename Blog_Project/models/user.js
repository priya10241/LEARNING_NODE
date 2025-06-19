const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    fullName : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true, 
    },
    salt : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true,
    },
    profileImageURL : {
        type : String,
        default : '/public/images/default.png',
    },
    role : {
        type : String,
        enum : ["NORMAL" , "ADMIN"],
        default : "NORMAL"
    }
});

const User = model('user', userSchema);

module.exports = User;
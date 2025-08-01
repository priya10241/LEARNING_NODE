const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password :{
        type : String,
        required : true
    }
}, {timestamp : true});

const User = mongoose.model('user', UserSchema);

module.exports = User;
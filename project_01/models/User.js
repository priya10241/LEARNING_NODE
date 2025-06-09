const mongoose = require('mongoose');

//create schema
const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    jobTittle : {
        type : String
    },
    gender : {
        type : String
    }
},{timestamps : true})

//create model 
const User = mongoose.model("user", userSchema);

module.exports = User;
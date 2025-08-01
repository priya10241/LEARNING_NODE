const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
    shortId : {
        type : String, 
        required : true,
        unique : true,
    },
    redirectUrl : {
        type : String,
        required : true,
    },
    visitHistory : [ { timestamp : {type : Number }}],
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users'
    }
} , {timestamps : true});

const URL = mongoose.model('url', UrlSchema);

module.exports = URL;
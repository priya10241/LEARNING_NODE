const {Schema, model} = require('mongoose');
const {createHmac, randomBytes} = require('node:crypto');
const {createToken} = require('../services/authentication');
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
    },
    password : {
        type : String,
        required : true,
    },
    profileImageURL : {
        type : String,
        default : '/images/default.jpg',
    },
    role : {
        type : String,
        enum : ["NORMAL" , "ADMIN"],
        default : "NORMAL"
    }
}, {timestamps:true});

userSchema.pre('save', function(next){
    const user = this;
    if(!user.isModified("password")) return;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256', salt)
    .update(user.password)
    .digest("hex");

    this.salt = salt;
    this.password = hashedPassword;

    next();
})

userSchema.static('matchPassword', async function(email, password){
    const user = await this.findOne({email});
    if(!user) throw new Error("User not Found");
    const hashedPassword = user.password;
    const salt = user.salt;
    const userGivenPassword = createHmac('sha256', salt)
    .update(password)
    .digest("hex");

    if(hashedPassword != userGivenPassword) throw new Error("Incorrect Password!");

    const token = createToken(user);
    return token;
    
});

const User = model('user', userSchema);


module.exports = User;
const User = require('../models/User');

async function handleGetAllUsers(req, res){
    const dbUsers = await User.find({});
    return res.json(dbUsers);
}

async function getUserWithId(req, res){
    const userId = req.params.id;
    const user = await User.findById(userId);
    return res.json(user);
}

async function updateUserById(req, res){
    const body = req.body;
    const result = await User.findByIdAndUpdate(req.params.id , {lastName : body.lastName});
    res.status(201).json({message : " Changed Successfully"});
}

async function deleteUserById(req, res){
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.status(201).json({message : "deleted successfully"})
}

async function createNewUser(req, res){
    const body = req.body;
        if(!body || !body.firstName || !body.lastName || !body.email || !body.jobTittle || !body.gender){
            return res.status(400).json({message : "All fields are required"});
        }
        else{
            const result = await User.create({
                firstName : body.firstName,
                lastName : body.lastName,
                email : body.email,
                jobTittle : body.jobTittle,
                gender : body.gender 
            });
            // console.log("User added: ", result);
            return res.status(201).json({message : "success", id : _id});
        }
}
module.exports = { handleGetAllUsers , getUserWithId, updateUserById, deleteUserById, createNewUser}
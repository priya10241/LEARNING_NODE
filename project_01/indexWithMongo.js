const express = require('express');
const app = express();
const PORT = 8000;

//MIDDLEWARE - PLUGIN
app.use(express.urlencoded({extended: false}));


//DATABASE CONNECTION START
// Including mongoose
const mongoose = require('mongoose');


//connection
mongoose
.connect("mongodb://127.0.0.1:27017/first_database")
.then(()=> console.log("MongoDB Connected"))
.catch((err)=>console.log("error in mongoDB Connection", err));


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
//DATABASE CONNECTION END


//INSERT VALUES IN DATABASE START
app.post('/api/users',async (req,res)=>{
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
        console.log("User added: ", result);
        return res.status(201).json({message : "success"});
    }
})
//INSERT VALUES IN DATABASE END


// GET VALUES FROM DATABASE START
app.get('/users', async (req, res)=>{
    const dbUsers = await User.find({});
    const html = 
        `<ul> ${dbUsers.map((user)=>`<li>${user.firstName}</li>`).join("")}</ul>`;
    res.send(html);
});

app.get('/api/users', async (req, res)=>{
    const dbUsers = await User.find({});
    res.json(dbUsers);
});


app.get('/api/users/:id', async (req,res)=>{
    const userId = req.params.id;
    const user = await User.findById(userId);
    res.json(user);
});
//GET VALUES FROM DATABASE END

//UPDATE VALUES IN DATABASE
app.patch('/api/users/:id', async (req,res)=>{
    const body = req.body;
    const result = await User.findByIdAndUpdate(req.params.id , {lastName : body.lastName});
    res.status(201).json({message : " Changed Successfully"});
})

//DELETE VALUES IN DATABASE
app.delete('/api/users/:id', async (req,res)=>{
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.status(201).json({message : "deleted successfully"})
});

//RUN SERVER
app.listen(PORT , ()=>console.log("Server Started!"));
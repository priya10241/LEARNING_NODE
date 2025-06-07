
const express = require('express');
const app = express();
const fs = require('fs');
const users = require('./MOCK_DATA.json');

const PORT = 8000;


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
})

//create model 
const User = mongoose.model("user", userSchema);



//DATABASE CONNECTION END

//MIDDLEWARE - PLUGIN
app.use(express.urlencoded({extended: false}));


// DECLARING CUSTOM MIDDLEWARE
app.use((req,res,next)=>{
    /* // to send response to client
    return res.json("Hello from middleware");
    */

   // to call next function or next middleware
    next();
})

//ROUTES
app.get('/users', (req, res)=>{
    const html = 
        `<ul> ${users.map((user)=>`<li>${user.first_name}</li>`).join("")}</ul>`;
    res.send(html);
});

//REST API
app.get('/api/users', (req, res)=>{
    // setting custom header
    // res.setHeader('X-myHeader', "abcdefghu");
    res.json(users);
});

app.get('/api/users/:id', (req,res)=>{
    const id = Number(req.params.id);
    const user = users.find((user)=> user.id===id);
    res.json(user);
});

//POST
app.post('/api/users', (req,res)=>{
    const data = req.body;
    console.log("Data : ", data , " id: " , (users.length+1));
    users.push({id : (users.length + 1),...data});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err,data)=>{
        return res.status(201).json({ status : "success", id : users.length});
    });
});


//PATCH
app.patch('/api/users/:id', (req, res)=>{
    const id = Number(req.params.id);
    const updates = req.body;
    const updatedUser = {id : id , ...updates};
    const finalUsers = users.map((user) => {
        if(user.id == id){
            return updatedUser;
        }
        else{
            return user;
        }
    });
    console.log(updatedUser);
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(finalUsers) , (err)=>{
        return res.json({status : "success", updatesUser : updatedUser});
    })
});


//DELETE
app.delete('/api/users/:id',(req,res)=>{
    const userId = req.params.id;
    const newusers = users.filter((user)=>user.id!=userId);
    // console.log("User deleted");
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(newusers),(err)=>{
        return res.json({status : "success", "deletedUserId" : userId});
    })
});

app.listen(PORT , ()=>console.log("Server Started!"));




const express = require('express');
const app = express();
const fs = require('fs');
// const users = require('./MOCK_DATA.json');

const PORT = 8000;

//FILE PART START 


// //MIDDLEWARE - PLUGIN
app.use(express.urlencoded({extended: false}));


// // DECLARING CUSTOM MIDDLEWARE
// app.use((req,res,next)=>{
//     /* // to send response to client
//     return res.json("Hello from middleware");
//     */

//    // to call next function or next middleware
//     next();
// })

// //ROUTES
// app.get('/users', (req, res)=>{
//     const html = 
//         `<ul> ${users.map((user)=>`<li>${user.first_name}</li>`).join("")}</ul>`;
//     res.send(html);
// });

// //REST API
// app.get('/api/users', (req, res)=>{
//     // setting custom header
//     // res.setHeader('X-myHeader', "abcdefghu");
//     res.json(users);
// });

// app.get('/api/users/:id', (req,res)=>{
//     const id = Number(req.params.id);
//     const user = users.find((user)=> user.id===id);
//     res.json(user);
// });

// //POST
// app.post('/api/users', (req,res)=>{
//     const data = req.body;
//     console.log("Data : ", data , " id: " , (users.length+1));
//     users.push({id : (users.length + 1),...data});
//     fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err,data)=>{
//         return res.status(201).json({ status : "success", id : users.length});
//     });
// });


// //PATCH
// app.patch('/api/users/:id', (req, res)=>{
//     const id = Number(req.params.id);
//     const updates = req.body;
//     const updatedUser = {id : id , ...updates};
//     const finalUsers = users.map((user) => {
//         if(user.id == id){
//             return updatedUser;
//         }
//         else{
//             return user;
//         }
//     });
//     console.log(updatedUser);
//     fs.writeFile('./MOCK_DATA.json', JSON.stringify(finalUsers) , (err)=>{
//         return res.json({status : "success", updatesUser : updatedUser});
//     })
// });


// //DELETE
// app.delete('/api/users/:id',(req,res)=>{
//     const userId = req.params.id;
//     const newusers = users.filter((user)=>user.id!=userId);
//     // console.log("User deleted");
//     fs.writeFile('./MOCK_DATA.json',JSON.stringify(newusers),(err)=>{
//         return res.json({status : "success", "deletedUserId" : userId});
//     })
// });

//FILE PART END


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


const express = require('express');
const app = express();

const users = require('./MOCK_DATA.json');

const PORT = 8000

//MIDDLEWARE - PLUGIN
app.use(express.urlencoded({extended: false}));

//ROUTES
app.get('/users', (req, res)=>{
    const html = 
        `<ul> ${users.map((user)=>`<li>${user.first_name}</li>`).join("")}</ul>`;
    res.send(html);
});

//REST API
app.get('/api/users', (req, res)=>{
     res.json(users);
});

app.get('/api/users/:id', (req,res)=>{
    const id = Number(req.params.id);
    const user = users.find((user)=> user.id===id);
    res.json(user);
});


app.post('/api/users', (req,res)=>{
    const data = req.body;
    users.push({id : users.length + 1,...data});
    const fs = require('fs');
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err,data)=>{
        console.log("Error: " , err);
    });
    fs.close();
});

app.listen(PORT , ()=>console.log("Server Started!"));

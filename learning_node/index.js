
// const http  = require('http');


// const myServer = http.createServer((req, res)=>{
//     console.log("New request recieved");
//     res.end('Hello from server');
// }); // callback present inside is to process incoming request

// // we require a port number in order to run the server

// myServer.listen(8000, ()=> console.log("Server Started"));            // listen(postNumber)
// // if everything goes right, then the callback passed in listen() get executed




//URL : UNIFORM RESOURCE LOCATOR

// const http  = require('http');
// const fs = require('fs'); 
// const url = require('url');


// const myServer = http.createServer((req, res)=>{
//     console.log("New request recieved");
//     const log = `${Date.now()} : ${req.url} New request recieved \n`;
//     const myUrl = url.parse(req.url);
//     console.log(myUrl);
//     fs.appendFile("log.txt", log , (err, data)=>{
//         switch(req.url){
//             case "/" : res.end("Home Page");
//             break;
//             case "/about" : res.end("About Page");
//             break;
//             default : res.end("404 Page Not Found");
//         }
//     });
    
// }); 

// myServer.listen(8000, ()=> console.log("Server Started"));     






//STARTING EXPRESS
const express = require('express');

const app = express();

app.get("/", (req, res)=>{                  // to handle get method for home page
    res.send(`Hello from Home page : ${req.query.name}`);
})

app.get("/about", (req, res)=>{
    res.send(`Hello from About page : ${req.query.name}`);
})


app.listen(8000, ()=>console.log("Server Started!"));
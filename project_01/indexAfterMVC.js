const express = require('express');
const app = express();
const PORT = 8000;
const userRouter = require('./routes/user');
const {connectMongoDB} = require('./dbConnection');
//MIDDLEWARE - PLUGIN
app.use(express.urlencoded({extended: false}));


//DATABASE CONNECTION
connectMongoDB("mongodb://127.0.0.1:27017/first_database").then(()=> console.log("MongoDb Connected"));

//ROUTES
app.use('/api/users', userRouter);

//RUN SERVER
app.listen(PORT , ()=>console.log("Server Started!"));
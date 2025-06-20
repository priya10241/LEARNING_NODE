const express = require("express");
const path = require("path");
const app = express();
const PORT = 8000;
const userRoute = require('./routes/user');
const mongoose = require('mongoose');

//views
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middleware
app.use(express.urlencoded({extended : false}));


app.get('/', (req, res)=>{
    res.render("home");
})

//routes
app.use('/user', userRoute);

//db connection
mongoose.connect('mongodb://127.0.0.1:27017/blogify').then(()=> console.log("DB Connected"));

app.listen(PORT, ()=> console.log("Server started successfully"));
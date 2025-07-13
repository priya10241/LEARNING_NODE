const express = require("express");
const path = require("path");
const app = express();
const PORT = 8000;
const userRoute = require('./routes/user');
const mongoose = require('mongoose');
const {checkForAuthentication} = require('./middlewares/authentication');
const cookieParser = require('cookie-parser');
const blogRoute = require('./routes/blog');
const staticRoute = require('./routes/staticRouter');

//views
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middleware
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser());
app.use(checkForAuthentication("token"));
app.use(express.static(path.resolve('./public')));


//routes
app.use('/', staticRoute);
app.use('/user', userRoute);
app.use("/blog", blogRoute);


//db connection
mongoose.connect('mongodb://127.0.0.1:27017/blogify').then(()=> console.log("DB Connected"));

//connect server
app.listen(PORT, ()=> console.log("Server started successfully"));





//not able to find blog with blog id
const express = require("express");
const path = require("path");
const app = express();
const userRoute = require('./routes/user');
const mongoose = require('mongoose');
const {checkForAuthentication} = require('./middlewares/authentication');
const cookieParser = require('cookie-parser');
const blogRoute = require('./routes/blog');
const staticRoute = require('./routes/staticRouter');
require('dotenv').config();

//port
const PORT = process.env.PORT || 8000;

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
mongoose.connect(process.env.MONGO_URL).then(()=> console.log("DB Connected"));

app.listen(PORT, ()=> console.log(`Server started successfully at PORT : ${PORT}`));









//not able to find blog with blog id
const express = require('express');
const urlRouter = require('./routes/url');
const {connectMongoDB} = require('./connect');
const app = express();
const PORT = 8000;
const URL = require('./models/Url');


app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/url',urlRouter);

//setting view engine
app.set("view engine", "ejs");

connectMongoDB("mongodb://127.0.0.1:27017/short_url_db").then(()=>console.log("Database connected successfully"));


app.listen(PORT, ()=> console.log(`Server started successfully at PORT : ${PORT}`));
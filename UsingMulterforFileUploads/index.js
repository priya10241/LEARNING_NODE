const express = require('express');
const multer = require('multer');
const path = require('path');
const staticRouter = require('./routes/staticRouter')
const app = express();

app.use(express.urlencoded({extended : false}));
app.use(express.json());

//routes
app.use('/', staticRouter);

//setting view engine
app.set("view engine", "ejs");

//telling that my views are stored in this folder
app.set("views", path.resolve('./views'));



const PORT = 8001;
app.listen(PORT , ()=>console.log(`Server started successfully at PORT : ${PORT}`));
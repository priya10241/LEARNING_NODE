const express = require('express');
const urlRouter = require('./routes/url');
const {connectMongoDB} = require('./connect');
const app = express();
const PORT = 8000;
const path = require('path');
const staticRoute = require('./routes/StaticRouter');
const userRoute = require('./routes/user')
const cookieParser = require('cookie-parser');
const {checkForAuthentication, restrictTo} = require('./Middleware/auth');
const { handleAllUrls } = require('./controllers/url');

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser())
app.use(checkForAuthentication);

//routes
app.use('/', staticRoute);
app.use('/user', userRoute);
app.use('/url',restrictTo(["NORMAL", "ADMIN"]),urlRouter);
app.use('/admin/url', restrictTo(["ADMIN"]), handleAllUrls);

//setting view engine
app.set("view engine", "ejs");

//telling that my views are stored in this folder
app.set("views", path.resolve('./views'));


connectMongoDB("mongodb://127.0.0.1:27017/short_url_db").then(()=>console.log("Database connected successfully"));


app.listen(PORT, ()=> console.log(`Server started successfully at PORT : ${PORT}`));
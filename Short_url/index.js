const express = require('express');
const urlRouter = require('./routes/url');
const {connectMongoDB} = require('./connect');
const app = express();
const PORT = 8000;
app.use(express.urlencoded({extended: false}));
app.use('/url',urlRouter);

app.use(express.json());
connectMongoDB("mongodb://127.0.0.1:27017/short_url_db").then(()=>console.log("Database connected successfully"));


app.listen(PORT, ()=> console.log(`Server started successfully at PORT : ${PORT}`));
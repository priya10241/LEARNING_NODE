const express = require('express');
const URL = require('../models/Url');
const router = express.Router();

router.get('/', async (req,res)=>{
    const result = await URL.find({});
    return res.render('home', {"allUrls" : result});
})

router.get("/signup", (req,res)=>{
    res.render("signup");
})

router.get("/login", (req,res)=>{
    res.render("login")
})
module.exports = router;
const express = require('express');
const URL = require('../models/Url');
const router = express.Router();

router.get('/', async (req,res)=>{
    const result = await URL.find({});
    return res.render('home', {"allUrls" : result});
})
module.exports = router;
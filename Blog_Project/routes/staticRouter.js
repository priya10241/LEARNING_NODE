const {Router} = require('express');
const Blog = require('../models/blog');
const staticRouter = Router();

staticRouter.get('/', async(req, res)=>{
    if(req.user){
        const allBlogs = await Blog.find({});
        return res.render("home", {"user" : req.user, "allBlogs" : allBlogs});
    }
    else{
        return res.render("home");
    }
})

module.exports = staticRouter;



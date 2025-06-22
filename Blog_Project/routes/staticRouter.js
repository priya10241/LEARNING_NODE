const {Router} = require('express');
const Blog = require('../models/blog');
const staticRouter = Router();

staticRouter.get('/', async(req, res)=>{
    const allBlogs = await Blog.find({});
    return res.render("home", {"user" : req.user, "allBlogs" : allBlogs});
})

module.exports = staticRouter;
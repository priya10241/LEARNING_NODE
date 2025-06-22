const Blog = require('../models/blog');

async function handlegetAddBlog(req, res){
    return res.render("addBlog", {"user" : req.user});
}

async function handlePostAddBlog(req, res){
    const {title, content} = req.body;
    const result = await Blog.create({
        title: title,
        content : content, 
        createdBy : req.user._id,
        coverImageURL : `/uploads/${req.file.filename}`
    })
    return res.redirect(`/blog/${result._id}`);
}


async function handleGetBlogWithId(req, res){
    const blogId = req.params.id;
    const blogWithId = await Blog.findById(`${blogId}`);
    res.render("getBlog", {"blog" : blogWithId, "user" : req.user});
}


module.exports = {handlePostAddBlog, handlegetAddBlog, handleGetBlogWithId};
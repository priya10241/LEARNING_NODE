const Blog = require('../models/blog');
const Comment = require('../models/comment');

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
    const blogWithId = await Blog.findById(`${blogId}`).populate("createdBy");
    const allComments = await Comment.find({"blogId" : blogId}).populate("createdBy");
    res.render("getBlog", {"blog" : blogWithId, "user" : req.user, "allComments" : allComments});
}

async function handlePostComment(req, res){
    const blogId = req.params.blogId;
    const userId = req.user._id;
    await Comment.create({
        content : req.body.content, 
        createdBy : userId,
        blogId : blogId
    });
    return res.redirect(`/blog/${blogId}`);
}

async function handleDeleteComment(req, res){
    const commentId = req.params.commentId;
    const comment = await Comment.findById(commentId);
    const blogId = comment.blogId;
    await Comment.findByIdAndDelete(commentId);
    return res.redirect(`/blog/${blogId}`);
}

module.exports = {handlePostAddBlog, handlegetAddBlog, handleGetBlogWithId, handlePostComment, handleDeleteComment};
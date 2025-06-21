const express = require('express');
const {handlePostAddBlog, handlegetAddBlog, handleGetBlogWithId} = require('../controllers/blog');
const router = express.Router();
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, path.resolve('./public/uploads'))
    },
    filename : function(req, file, cb){
        const nameOfFile = `${Date.now()}-${req.user._id}.png`;
        // console.log(file);
        cb(null, nameOfFile)
    }
})

const upload = multer({storage : storage});

router.post('/addblog',upload.single("coverImageURL"), handlePostAddBlog);

router.get('/addblog', handlegetAddBlog);

router.get('/:id', handleGetBlogWithId);

module.exports = router;
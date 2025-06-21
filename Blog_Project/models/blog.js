const {model, Schema} = require('mongoose');

const blogSchema = new Schema({
    title : {
        type : String, 
        required : true
    },
    content : {
        type : String,
        required : true,
    },
    coverImageURL : {
        type : String
    },
    createdBy : {
        type : Schema.Types.ObjectId,
        ref : "user"
    }
});

const Blog = model('blog', blogSchema);

module.exports = Blog;
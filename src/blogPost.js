const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: String,
    content: String,
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment' // moet overeenkomen met de comment model name
    }]
});

const BlogPost = mongoose.model('blogPost', BlogPostSchema);
module.exports = BlogPost;
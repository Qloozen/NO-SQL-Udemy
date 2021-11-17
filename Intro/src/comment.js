const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema ({
    content: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user' //moet overeenkomen met de user model name
    }
});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;

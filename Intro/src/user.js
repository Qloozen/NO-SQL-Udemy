const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = require('./post');

const UserSchema = new Schema({ // Regels waaraan het model moet voldoen
    name: { //Uitgebreidere opties/configuratie van een property
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: 'Name must be longer than 2 characters'
        },
        required: [true, 'Name is required']
    },
    posts: [PostSchema],
    likes: Number,
    blogPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'blogPost' // moet overeenkomen met de blogPost model name
    }]
});

//Virtual property
UserSchema.virtual('postCount').get(function() {
    return this.posts.length; // this keyword werkt niet met fat arrowfuncties, dan wordt de context van dit bestand aangeroepen
});

//Middleware
UserSchema.pre('remove', function(next) {
    const BlogPost = mongoose.model('blogPost');
    BlogPost.remove({_id: {$in: this.blogPosts}}) // if _id is in joe's blogPosts id-array
        .then(() => next());
});

const User = mongoose.model('user', UserSchema); // Model Object, vergelijkbaar met een DBset van C#

module.exports = User; // De user model object exporteer je dan
const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
    let joe, blogPost, comment;

    beforeEach((done) => {
        joe = new User({name: 'Joe'});
        blogPost = new BlogPost({title: 'My BlogPost', content: 'this is the content'});
        comment = new Comment({content: 'This is a comment'});

        joe.blogPosts.push(blogPost); // automatisch maakt de ref naar blogpost
        blogPost.comments.push(comment);
        comment.user = joe;

        //combineren van meerder promises
        Promise.all([joe.save(), blogPost.save(), comment.save()])
            .then(() => done());
    });

    it('Saves a relation between a user and a blogpost', (done) => {
        User.findOne({name: 'Joe'})
            .populate('blogPosts') // zet de hele objecten erin ipv van de referentie (is alleen explicit loading)
            .then((user) => { 
                assert(user.blogPosts[0].title === 'My BlogPost');
                done()
            });
    });

    it('Saves a full relation tree', (done) => {
        User.findOne({name: 'Joe'})
            .populate({
                path: 'blogPosts',
                populate: {
                    path: 'comments',
                    model: 'comment',
                    populate: {
                        path: 'user',
                        model: 'user'
                    }
                }
            })
            .then((user) => {
                assert(user.name === 'Joe');
                assert(user.blogPosts[0].title === 'My BlogPost');
                assert(user.blogPosts[0].comments[0].content ==='This is a comment');
                assert(user.blogPosts[0].comments[0].user.name === 'Joe');
                done()
            });
    });
});
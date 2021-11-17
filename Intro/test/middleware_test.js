const assert = require('assert');
const mongoose = require('mongoose');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('', () => {
    let joe, blogPost

    beforeEach((done) => {
        joe = new User({name: 'Joe'});
        blogPost = new BlogPost({title: 'My BlogPost', content: 'this is the content'});

        joe.blogPosts.push(blogPost); // automatisch maakt de ref naar blogpost

        //combineren van meerder promises
        Promise.all([joe.save(), blogPost.save()])
            .then(() => done());
    });

    it('Users clean up dangling blogposts on remove', (done) => {
        joe.remove()
            .then(() => BlogPost.count())
            .then((count) => {
                assert(count === 0);
                done();
            });
    });
})
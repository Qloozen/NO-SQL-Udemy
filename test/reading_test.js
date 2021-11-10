const assert = require('assert');
const { describe } = require('mocha');
const User = require('../src/user');

describe('Reading users out of the database', () => {
    let joe;

    beforeEach(() => {
        joe = new User({name: 'Joe'});
        joe.save(done)
            .then(() => done())
    });

    it('find all user with a name of joe', () => {
        
    });
})
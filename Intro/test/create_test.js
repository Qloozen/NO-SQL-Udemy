const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
    it('saves a user', (done) => {
        const joe = new User({name: "Joe"}); // Model Instance maken
        joe.save()
            .then(() => {
                assert(!joe.isNew);
                done();
            });
    });
});
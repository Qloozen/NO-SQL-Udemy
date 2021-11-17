const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({name: 'Joe'});
        joe.save()
            .then(() => done());
    });

    it('model instance remove', (done) => {
        joe.remove() // Delete een model instance joe
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) => {
                assert(user === null);
                done()
            });
    });

    it('class method remove', (done) => {
        User.remove({name: 'Joe'}) //Delete alle joe's
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) => {
                assert(user === null);
                done()
            });
    });

    it('class method findAndRemove', (done) => {
        User.findOneAndRemove({name: 'Joe'}) //Delete eerste Joe
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) => {
                assert(user === null);
                done()
            });
    });

    it('class method findByIdAndRemove', (done) => {
        User.findByIdAndRemove(joe._id) //Delete een user by id
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) => {
                assert(user === null);
                done()
            });
    });

});
const mongoose = require('mongoose');

before(done => {
    mongoose.connect('mongodb://localhost/uber_test');
    mongoose.connection
        .once('open', () => done())
        .on('error', err => {
            console.warn('warning', err);
        });
});

beforeEach(done => {
    const {drivers} = mongoose.connection.collections;
    drivers.drop()
        .then(() => done())
        .catch(() => done());
});
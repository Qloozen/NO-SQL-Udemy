const mongoose = require('mongoose'); //Gebruik maken van code uit andere package

mongoose.Promise = global.Promise; // Wanneer mongoose een promise wil maken gebruikt ie de global.Promise libarary (ES6)


before((done) => {// Connectie in hook omdat bij het falen van de connectie de tests niet gaan runnen
    //Connectie opzetten naar mongodb
    mongoose.connect('mongodb://localhost/users_test'); //user_test = database, hoeft niet te bestaan
    mongoose.connection
        .once('open', () => { done(); })
        .on('error', (error) => {
            console.warn('Warning', error);
        });
});

//Collectie leegmaken voor elke testcase
beforeEach((done) => {
    //moet lowercase
    const {users, comments, blogposts} = mongoose.connection.collections;
    users.drop(() => {
        comments.drop(() => {
            blogposts.drop(() => {
                done();
            });
        });
    });
});
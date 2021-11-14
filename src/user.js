const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({ // Regels waaraan het model moet voldoen
    name: { //Uitgebreidere opties/configuratie van een property
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: 'Name must be longer than 2 characters'
        },
        required: [true, 'Name is required']
    },
    postCount: Number
})

const User = mongoose.model('user', UserSchema, 'users'); // Model Object, vergelijkbaar met een DBset van C#

module.exports = User; // De user model object exporteer je dan
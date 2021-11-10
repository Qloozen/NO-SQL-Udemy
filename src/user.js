const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({ // Regels waaraan het model moet voldoen
    name: String
})

const User = mongoose.model('user', UserSchema); // Model Object, vergelijkbaar met een DBset van C#

module.exports = User; // De user model object exporteer je dan
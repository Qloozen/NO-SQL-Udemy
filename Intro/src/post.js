// Not a model but a schema only
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: String
});


module.exports = PostSchema;
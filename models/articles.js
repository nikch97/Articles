const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const article = new Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        // ref: 'users'
    },

    date: String,

    text: String,
    pic: String
});

module.exports = mongoose.model('article', article);
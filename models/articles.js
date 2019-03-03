const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const article = new Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },

    date: Date,

    text: String,
    pic: String
});

module.exports = mongoose.model('article', article);
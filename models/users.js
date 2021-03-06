const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    name: {
        type: String,
        // required: true,
    },
    family: {
        type: String,
        // required: true,
    },
    mobile: {
        type: String,
        // required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        // required: true,
    },
    avatar: {
        type: String,
        // required: true,
    },
    role: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('user', user);
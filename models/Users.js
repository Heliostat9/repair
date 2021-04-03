const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userScheme = new Schema({
    name : String,
    surname: String,
    lastname: String,
    city: {
        type: Schema.Types.ObjectId,
        ref: 'City',
    },
    login: String,
    pass: String,
    status: Number,
});

module.exports = mongoose.model('User', userScheme);
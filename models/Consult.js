const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const consultScheme = new Schema({
    name: String,
    tel: String,
    email: String
});

module.exports = mongoose.model('Consult', consultScheme);
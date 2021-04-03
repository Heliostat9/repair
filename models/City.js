const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cityScheme = new Schema({
    name: String,
});

module.exports = mongoose.model('City', cityScheme);
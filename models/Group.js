const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupScheme = new Schema({
    name: String,
});

module.exports = mongoose.model('Group', groupScheme);
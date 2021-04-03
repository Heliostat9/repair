const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderScheme = new Schema({
    item: String,
    description: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    status: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
    }
});

module.exports = mongoose.model('Order', orderScheme);
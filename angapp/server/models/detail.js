const mongoose = require('mongoose');

var Detail = mongoose.model('Detail', {
    username: { type: String },
    email: { type: String},
    phone: { type: Number},
    password: { type: String}
});

module.exports = { Detail } ;
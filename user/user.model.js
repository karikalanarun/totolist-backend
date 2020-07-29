const mongoose = require('mongoose');

const User = mongoose.model('User', {
    first_name: String,
    second_name: String,
    email: { type: String, unique: true, index: true, },
    password: String,
});



module.exports = User
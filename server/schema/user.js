// User schema.
// - id: uuid
// - username: string
// - password: string (hashed)
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    hash: {
        type: String
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

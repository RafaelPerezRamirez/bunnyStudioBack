const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }
})

module.exports = mongoose.model('Users', UserSchema)
const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: Number,
        default: 0

    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }
})
module.exports = mongoose.model('Tasks', TaskSchema)
var mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    videoFile: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Movie', movieSchema);

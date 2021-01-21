var mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: false
    },
    url: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Movie', movieSchema);

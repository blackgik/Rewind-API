var mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    coverpics_url: {
        type: String,
        required: false
    },
    movie_url: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    release_date: {
        type: String,
        required: true
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    }
},
{
    timestamps: true
}
)

module.exports = mongoose.model('Movie', movieSchema);

var mongoose = require('mongoose');
var random = require('mongoose-simple-random');

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
    },
    description: {
        type: String,
        required: true
    },
    release_date: {
        type: String,
        required: true
    },
    cast: {
       type: String,
       required: true 
    },
    length: {
        type: String,
        required: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User',
    },
    category: {
        type: String,
        required: false
    }
},
{
    timestamps: true
}
)

movieSchema.index({ title: 'text'}).plugin(random);
const Movie =  mongoose.model('Movie', movieSchema);

module.exports = Movie
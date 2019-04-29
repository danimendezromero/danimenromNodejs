const mongoose = require('mongoose');

const mediaSchema = mongoose.Schema({
    titol: String,
    sinopsis: String,
    puntuacio: Number,
    tipus: String
})

module.exports = mongoose.model('Media', mediaSchema)

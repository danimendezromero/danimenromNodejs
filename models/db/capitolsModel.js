const mongoose = require('mongoose');

const capitolsSchema = mongoose.Schema({
    titol: String,
    numero: Number,
    temporada: Number,
    serieId: Number
})

module.exports = mongoose.model('Capitols', capitolsSchema)

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    mail: String,
    name: String,
    password: String,
    tipus: String,
    direccio: String,
    ncompte: Number,
})

module.exports = mongoose.model('User', userSchema)

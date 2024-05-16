// libroDiario.js
const mongoose = require('mongoose');

const libroDiarioSchema = new mongoose.Schema({
    cuenta_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cuenta'
    },
    fecha: Date,
    descripcion: String,
    debe: Number,
    haber: Number
});

module.exports = mongoose.model('LibroDiario', libroDiarioSchema);

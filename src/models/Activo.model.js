const mongoose = require('mongoose');

const ActivoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    costo: {
        type: Number,
        required: true
    },
    vidaUtil: {
        type: Number, // en años
        required: true
    },
    valorResidual: {
        type: Number,
        default: 0
    },
    fechaAdquisicion: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Activo', ActivoSchema);

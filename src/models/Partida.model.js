const mongoose = require('mongoose');

const PartidaSchema = new mongoose.Schema({
    fecha: {
        type: Date,
        default: Date.now
    },
    descripcion: {
        type: String,
        required: true
    },
    asientos: [
        {
            cuenta: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Cuenta',
                required: true
            },
            debe: {
                type: Number,
                default: 0
            },
            haber: {
                type: Number,
                default: 0
            }
        }
    ]
});

module.exports = mongoose.model('Partida', PartidaSchema);

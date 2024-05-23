const mongoose = require('mongoose');

const CuentaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        enum: ['Activo', 'Pasivo', 'Capital', 'Ingreso', 'Gasto'],
        required: true
    },
    saldo: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Cuenta', CuentaSchema);





const mongoose = require('mongoose');

const cuentaSchema = new mongoose.Schema({
    nombre: String,
    codigo: String,
    tipo: String,
    saldo: Number,
    calcular: [String]
});

module.exports = mongoose.model('Cuenta', cuentaSchema);
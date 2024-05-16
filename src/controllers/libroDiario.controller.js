// libroDiarioController.js
const LibroDiario = require('../models/libroDiario.model');
const Cuenta = require('../models/cuentas.model');

// Registrar una nueva transacción en el libro diario
async function registrarTransaccion  (req, res)  {
    try {
        const nuevaTransaccion = new LibroDiario(req.body);
        await nuevaTransaccion.save();

        // Actualizar el saldo de la cuenta correspondiente
        await actualizarSaldoCuenta(nuevaTransaccion.cuenta_id, nuevaTransaccion.debe, nuevaTransaccion.haber);

        res.status(201).json(nuevaTransaccion);
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar la transacción' });
    }
};

// Función para actualizar el saldo de una cuenta
async function actualizarSaldoCuenta(cuentaId, debe, haber) {
    try {
        const cuenta = await Cuenta.findById(cuentaId);

        // Actualizar el saldo de la cuenta
        cuenta.saldo += debe - haber;
        await cuenta.save();
    } catch (error) {
        throw new Error('Error al actualizar el saldo de la cuenta');
    }
}


module.exports = {
    registrarTransaccion
}

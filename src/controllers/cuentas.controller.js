// cuentaController.js
const Cuenta = require('../models/cuentas.model');

// Crear una nueva cuenta
async function crearCuenta  (req, res) {
    try {
        const nuevaCuenta = new Cuenta(req.body);
        await nuevaCuenta.save();
        res.status(201).json(nuevaCuenta);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la cuenta' });
    }
};


// Actualizar una cuenta
async function actualizarCuenta  (req, res)  {
    try {
        await Cuenta.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({ mensaje: 'Cuenta actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la cuenta' });
    }
};

// Obtener el saldo de una cuenta
async function obtenerSaldoCuenta  (req, res)  {
    try {
        const cuenta = await Cuenta.findById(req.params.id);
        res.status(200).json({ saldo: cuenta.saldo });
    } catch (error) {
        res.status(404).json({ error: 'Cuenta no encontrada' });
    }
};



module.exports = {
    crearCuenta,
    actualizarCuenta,
    obtenerSaldoCuenta
};


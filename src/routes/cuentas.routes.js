const express = require('express');
const router = express.Router();
const Cuenta = require('../models/cuentas.model');

// Crear una nueva cuenta
router.post('/', async (req, res) => {
    try {
        const { nombre, tipo, saldo } = req.body;
        const nuevaCuenta = new Cuenta({ nombre, tipo, saldo  });
        await nuevaCuenta.save();
        console.log(req.body)
        res.status(201).json(nuevaCuenta);

    } catch (error) {
        res.status(500).json({ message: 'Error al crear la cuenta', error });
    }
});

// Obtener todas las cuentas
router.get('/', async (req, res) => {
    try {
        const cuentas = await Cuenta.find();
        res.status(200).json(cuentas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las cuentas', error });
    }
});

module.exports = router;

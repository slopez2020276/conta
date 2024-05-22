const express = require('express');
const router = express.Router();
const Partida = require('../models/Partida.model');
const Cuenta = require('../models/cuentas.model');

// Crear una nueva partida
router.post('/', async (req, res) => {
    try {
        const { descripcion, asientos } = req.body;

        // Crear la nueva partida
        const nuevaPartida = new Partida({ descripcion, asientos });
        await nuevaPartida.save();

        // Actualizar los saldos de las cuentas involucradas
        for (const asiento of asientos) {
            const cuenta = await Cuenta.findById(asiento.cuenta);
            if (asiento.debe > 0) {
                cuenta.saldo += asiento.debe;
            } else if (asiento.haber > 0) {
                cuenta.saldo -= asiento.haber;
            }
            await cuenta.save();
        }

        res.status(201).json(nuevaPartida);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la partida', error });
    }
});

// Obtener todas las partidas
router.get('/', async (req, res) => {
    try {
        const partidas = await Partida.find().populate('asientos.cuenta');
        res.status(200).json(partidas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las partidas', error });
    }
});

module.exports = router;

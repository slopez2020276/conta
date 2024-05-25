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
        
        const partidasConTotales = partidas.map(partida => {
            let totalDebe = 0;
            let totalHaber = 0;

            partida.asientos.forEach(asiento => {
                totalDebe += asiento.debe || 0;
                totalHaber += asiento.haber || 0;
            });

            return {
                ...partida._doc, // Obtener los datos originales de la partida
                totalDebe,
                totalHaber
            };
        });

        res.status(200).json(partidasConTotales);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las partidas', error });
    }
});




// Crear una contrapartida
router.post('/contrapartida/:id', async (req, res) => {
    try {
        const partidaOriginal = await Partida.findById(req.params.id).populate('asientos.cuenta');

        if (!partidaOriginal) {
            return res.status(404).json({ message: 'Partida no encontrada' });
        }

        // Invertir los asientos
        const asientosInvertidos = partidaOriginal.asientos.map(asiento => ({
            cuenta: asiento.cuenta._id,
            debe: asiento.haber,
            haber: asiento.debe
        }));

        // Crear la contrapartida
        const contrapartida = new Partida({
            descripcion: `Contrapartida de: ${partidaOriginal.descripcion}`,
            asientos: asientosInvertidos
        });

        await contrapartida.save();

        // Actualizar los saldos de las cuentas involucradas
        for (const asiento of asientosInvertidos) {
            const cuenta = await Cuenta.findById(asiento.cuenta);
            if (asiento.debe > 0) {
                cuenta.saldo += asiento.debe;
            } else if (asiento.haber > 0) {
                cuenta.saldo -= asiento.haber;
            }
            await cuenta.save();
        }

        res.status(201).json(contrapartida);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la contrapartida', error });
    }
});
module.exports = router;

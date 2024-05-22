// controllers/libroMayorController.js
const Partida = require('../models/Partida.model');
const Cuenta = require('../models/cuentas.model')

const generarLibroMayor = async (req, res) => {
  try {
    const partidas = await Partida.find().populate('asientos.cuenta');
    const libroMayor = {};

    partidas.forEach(partida => {
      partida.asientos.forEach(asiento => {
        const cuentaId = asiento.cuenta._id.toString();
        if (!libroMayor[cuentaId]) {
          libroMayor[cuentaId] = {
            cuenta: asiento.cuenta.nombre,
            tipo: asiento.cuenta.tipo,
            saldoInicial: asiento.cuenta.saldo,
            movimientos: []
          };
        }
        libroMayor[cuentaId].movimientos.push({
          fecha: partida.fecha,
          descripcion: partida.descripcion,
          debe: asiento.debe,
          haber: asiento.haber
        });
      });
    });

    for (let cuentaId in libroMayor) {
      let saldo = libroMayor[cuentaId].saldoInicial;
      libroMayor[cuentaId].movimientos.forEach(mov => {
        saldo += mov.debe - mov.haber;
        mov.saldo = saldo;
      });
      libroMayor[cuentaId].saldoFinal = saldo;
    }

    res.json(libroMayor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { generarLibroMayor };

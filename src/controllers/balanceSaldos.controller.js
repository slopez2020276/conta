// controllers/balanceController.js
const Partida = require('../models/Partida.model');
const Cuenta = require('../models/cuentas.model');

const generarBalanceSaldos = async (req, res) => {
  try {
    const cuentas = await Cuenta.find();
    const partidas = await Partida.find().populate('asientos.cuenta');

    const balanceSaldos = cuentas.map(cuenta => ({
      cuenta: cuenta.nombre,
      tipo: cuenta.tipo,
      saldoInicial: cuenta.saldo,
      debe: 0,
      haber: 0,
      saldoFinal: cuenta.saldo
    }));

    const cuentasMap = balanceSaldos.reduce((map, item) => {
      map[item.cuenta] = item;
      return map;
    }, {});

    partidas.forEach(partida => {
      partida.asientos.forEach(asiento => {
        const cuentaNombre = asiento.cuenta.nombre;
        cuentasMap[cuentaNombre].debe += asiento.debe;
        cuentasMap[cuentaNombre].haber += asiento.haber;
      });
    });

    balanceSaldos.forEach(item => {
      item.saldoFinal = item.saldoInicial + item.debe - item.haber;
    });

    res.json(balanceSaldos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { generarBalanceSaldos };

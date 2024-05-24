// controllers/balanceController.js
const Partida = require('../models/Partida.model');
const Cuenta = require('../models/cuentas.model');

const generarBalanceGeneral = async (req, res) => {
  try {
    const cuentas = await Cuenta.find();
    const partidas = await Partida.find().populate('asientos.cuenta');

    const balanceGeneral = {
      activos: {},
      pasivos: {},
      patrimonio: {},
      totalActivos: 0,
      totalPasivos: 0,
      totalPatrimonio: 0
    };

    partidas.forEach(partida => {
      partida.asientos.forEach(asiento => {
        const cuentaNombre = asiento.cuenta.nombre;
        const tipoCuenta = asiento.cuenta.tipo;

        if (tipoCuenta === 'Activo') {
          if (!balanceGeneral.activos[cuentaNombre]) {
            balanceGeneral.activos[cuentaNombre] = 0;
          }
          balanceGeneral.activos[cuentaNombre] += asiento.debe - asiento.haber;
          balanceGeneral.totalActivos += asiento.debe - asiento.haber;
        } else if (tipoCuenta === 'Pasivo') {
          if (!balanceGeneral.pasivos[cuentaNombre]) {
            balanceGeneral.pasivos[cuentaNombre] = 0;
          }
          balanceGeneral.pasivos[cuentaNombre] += asiento.haber - asiento.debe;
          balanceGeneral.totalPasivos += asiento.haber - asiento.debe;
        } else if (tipoCuenta === 'Capital') {
          if (!balanceGeneral.patrimonio[cuentaNombre]) {
            balanceGeneral.patrimonio[cuentaNombre] = 0;
          }
          balanceGeneral.patrimonio[cuentaNombre] += asiento.haber - asiento.debe;
          balanceGeneral.totalPatrimonio += asiento.haber - asiento.debe;
        }
      });
    });

    res.json(balanceGeneral);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { generarBalanceGeneral };

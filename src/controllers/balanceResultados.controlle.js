// controllers/balanceController.js
const Partida = require('../models/Partida.model');
const Cuenta = require('../models/cuentas.model');

const generarBalanceResultados = async (req, res) => {
  try {
    const cuentas = await Cuenta.find();
    const partidas = await Partida.find().populate('asientos.cuenta');

    let ingresos = 0;
    let gastos = 0;
    const ingresosPorCuenta = {};
    const gastosPorCuenta = {};

    partidas.forEach(partida => {
      partida.asientos.forEach(asiento => {
        const tipoCuenta = asiento.cuenta.tipo;
        const cuentaNombre = asiento.cuenta.nombre;
        
        if (tipoCuenta === 'Ingreso') {
          ingresos += asiento.haber - asiento.debe;
          if (!ingresosPorCuenta[cuentaNombre]) {
            ingresosPorCuenta[cuentaNombre] = 0;
          }
          ingresosPorCuenta[cuentaNombre] += asiento.haber - asiento.debe;
        } else if (tipoCuenta === 'Gasto') {
          gastos += asiento.debe - asiento.haber;
          if (!gastosPorCuenta[cuentaNombre]) {
            gastosPorCuenta[cuentaNombre] = 0;
          }
          gastosPorCuenta[cuentaNombre] += asiento.debe - asiento.haber;
        }
      });
    });

    const resultado = ingresos - gastos;

    const balanceResultados = {
      ingresos: {
        total: ingresos,
        cuentas: ingresosPorCuenta
      },
      gastos: {
        total: gastos,
        cuentas: gastosPorCuenta
      },
      resultado
    };

    res.json(balanceResultados);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { generarBalanceResultados };

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

    // Obtener el balance de resultados
    const balanceResultados = await obtenerBalanceResultados();

    // Ajustar el patrimonio según el resultado del balance de resultados
    if (balanceResultados.resultado < 0) {
      balanceGeneral.patrimonio['Pérdidas'] = balanceResultados.resultado;
      balanceGeneral.totalPatrimonio += balanceResultados.resultado; // restar porque es negativo
    } else {
      balanceGeneral.patrimonio['Utilidades'] = balanceResultados.resultado;
      balanceGeneral.totalPatrimonio += balanceResultados.resultado;
    }

    res.json(balanceGeneral);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Función auxiliar para obtener el balance de resultados
const obtenerBalanceResultados = async () => {
  try {
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

    return {
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
  } catch (err) {
    throw new Error('Error al obtener el balance de resultados');
  }
};


module.exports = { generarBalanceGeneral };

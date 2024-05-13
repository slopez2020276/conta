const { LibroDiario, LibroMayor } = require('../models/modelos'); // Suponiendo que tus modelos estén en un archivo models.js

// Función para agregar una entrada al Libro Diario
async function agregarEntradaLibroDiario(req, res) {
    try {
      const { fecha, descripcion, monto } = req.body; // Suponiendo que los datos se envían en el cuerpo de la solicitud
  
      const nuevaEntrada = new LibroDiario({ fecha, descripcion, monto });
      await nuevaEntrada.save();
  
      res.status(201).json({ mensaje: 'Entrada agregada al Libro Diario correctamente', nuevaEntrada });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al agregar entrada al Libro Diario' });
    }
  }
  
// Función para generar el Libro Mayor
async function generarLibroMayor(req, res) {
    try {
      // Obtener todas las entradas del Libro Diario
      const entradasLibroDiario = await LibroDiario.find();
  
      // Procesar las entradas y calcular el saldo para cada cuenta en el Libro Mayor
      const libroMayor = {};
      entradasLibroDiario.forEach(entrada => {
        if (!libroMayor[entrada.descripcion]) {
          libroMayor[entrada.descripcion] = entrada.monto;
        } else {
          libroMayor[entrada.descripcion] += entrada.monto;
        }
      });
  
      // Guardar o actualizar las cuentas en el Libro Mayor
      const cuentas = Object.keys(libroMayor);
      await Promise.all(cuentas.map(async cuenta => {
        const saldo = libroMayor[cuenta];
        // Buscar si la cuenta ya existe en el Libro Mayor
        const cuentaExistente = await LibroMayor.findOne({ cuenta });
        if (cuentaExistente) {
          // Si existe, actualizar el saldo
          cuentaExistente.saldo = saldo;
          await cuentaExistente.save();
        } else {
          // Si no existe, crear una nueva entrada
          await LibroMayor.create({ cuenta, saldo });
        }
      }));
  
      res.status(200).json({ mensaje: 'Libro Mayor generado correctamente', libroMayor });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al generar el Libro Mayor' });
    }
  }
  

module.exports = {
  agregarEntradaLibroDiario,
  generarLibroMayor
};
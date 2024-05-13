const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const libroDiarioSchema = new Schema({
  fecha: { type: Date, default: Date.now },
  descripcion: String,
  monto: Number,
  // Otros campos necesarios
});

const LibroDiario = mongoose.model('LibroDiario', libroDiarioSchema);

// Modelo para el Libro Mayor
const libroMayorSchema = new Schema({
  cuenta: String,
  saldo: Number,
  // Otros campos necesarios
});

const LibroMayor = mongoose.model('LibroMayor', libroMayorSchema);

module.exports = {
  LibroDiario,
  LibroMayor
};
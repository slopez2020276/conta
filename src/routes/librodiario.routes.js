const express = require('express');
const Controller = require('../controllers/librodiarioEntrada.controller');

const api = express.Router();

api.post('/nuevaEntrada',Controller.agregarEntradaLibroDiario)
api.post('/generarLibroDiario',Controller.generarLibroMayor)


module.exports = api; 
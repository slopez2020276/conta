const express = require('express');
const Controller = require('../controllers/cuentas.controller');

const api = express.Router();

api.post('/nuevaEntrada',Controller.crearCuenta)
api.put('/actualizarCuenta/:id',Controller.actualizarCuenta)
api.get('/saldoCuenta/:id',Controller.obtenerSaldoCuenta)	


module.exports = api; 
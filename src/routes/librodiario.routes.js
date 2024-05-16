const express = require('express');
const Controller = require('../controllers/libroDiario.controller');

const api = express.Router();

api.post('/nuevaEntrada',Controller.registrarTransaccion)


module.exports = api; 
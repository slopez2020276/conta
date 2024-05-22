// routes/libroDiarioRoutes.js
const express = require('express');
const router = express.Router();
const libroDiarioController = require('../controllers/libroDiario.controller');

router.post('/registrarEntrada', libroDiarioController.registrarTransaccion);

module.exports = router;

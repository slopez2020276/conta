// routes/balance.js
const express = require('express');
const router = express.Router();
const { generarBalanceResultados } = require('../controllers/balanceResultados.controlle');

router.get('/resultados', generarBalanceResultados);

module.exports = router;

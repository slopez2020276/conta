// routes/balance.js
const express = require('express');
const router = express.Router();
const { generarBalanceResultados } = require('../controllers/balanceController');

router.get('/resultados', generarBalanceResultados);

module.exports = router;

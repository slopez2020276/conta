// routes/balance.js
const express = require('express');
const router = express.Router();
const { generarBalanceGeneral } = require('../controllers/balanceGeneral.controller');

router.get('/general', generarBalanceGeneral);

module.exports = router;

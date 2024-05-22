// routes/balance.js
const express = require('express');
const router = express.Router();
const { generarBalanceSaldos } = require('../controllers/balanceSaldos.controller');

router.get('/saldos', generarBalanceSaldos);

module.exports = router;

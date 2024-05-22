// routes/cuentaRoutes.js
const express = require('express');
const router = express.Router();
const cuentaController = require('../controllers/cuentas.controller');

router.post('/', cuentaController.crearCuenta);
router.get('/:id/saldo', cuentaController.obtenerSaldoCuenta);

module.exports = router;

// routes/libroMayor.js
const express = require('express');
const router = express.Router();
const { generarLibroMayor } = require('../controllers/LibroMayor.contriller');

router.get('/', generarLibroMayor);

module.exports = router;

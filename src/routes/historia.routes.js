const express = require('express');
const historriaController = require('../controllers/historia.controller');
const md_auteticacion = require('../middlewares/autenticacion');
const multer = require('../../libs/multer');
const api = express.Router();


api.get('/mostrarHistoria',historriaController.obtenerHistoria);
api.put('/editarHistoria/:idHistoria',multer.single('imgPathPrincipal'),historriaController.editarhistoria)
api.delete('/eliminarHistoria/:idHistoria',md_auteticacion.Auth,historriaController.eliminarhistoria)
api.post('/agregarHistoria',multer.single('image') ,historriaController.createHistoria)
api.put('/editarFondo/:idHistoria',multer.single('imgPathFondo'),historriaController.EditarFondo)
api.put('/editarPortada/:idHistoria',multer.single('imgPathPortada'),historriaController.EditarPortada)
api.put('/editarMobilFondo/:idHistoria',multer.single('imgPathMobilFondo'),historriaController.editarFondoMovile)
api.put('/editarMobilPortada/:idHistoria',multer.single('imgPathMobilPortada'),historriaController.EditarPortadamovle)
module.exports = api; 
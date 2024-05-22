const express = require('express')

const controller = require('../controllers/usuario.controller')


const api = express.Router();

api.post('/crearUsario',controller.createNewUser);


module.exports = api
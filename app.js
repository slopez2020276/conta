const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require('path')
const app = express();

// IMPORTACION RUTAS
const librodiario = require('./src/routes/librodiario.routes');

// MIDDLEWARES


app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.json());

// CABECERAS
app.use(cors());

// CARGA DE RUTAS localhost:3000/api/productos

app.use("/api",librodiario)

app.use('/uploads',express.static(path.resolve('uploads')));
app.use('/imgsDefult',express.static(path.resolve('imgsDefult')));
app.use('/optimize',express.static(path.resolve('optimize')));



module.exports = app;


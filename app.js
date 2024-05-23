const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require('path')
const app = express();

// IMPORTACION RUTAS

const librodiario = require('./src/routes/librodiario.routes');
const cuentas = require('./src/routes/cuentas.routes');
const usuario = require('./src/routes/usuario.routes');
const partida = require('./src/routes/partida.routes');	



const partidasRoutes = require('./src/routes/partida.routes');
const cuentasRoutes = require('./src/routes/cuentas.routes');
const libroMayorRoutes = require('./src/routes/libroMayor.routes');
const balanceSaldosRoutes = require('./src/routes/balanceSaldos.routes');
const estadoResultadosRoutes = require('./src/routes/balanceResultados..routes');
const balanceGenealRoutes = require('./src/routes/balanceGenral.routes');

// MIDDLEWARES


app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.json());

// CABECERAS
app.use(cors());

// Importar y usar rutas

app.use('/api/partidas', partidasRoutes);
app.use('/api/cuentas', cuentasRoutes);
app.use('/api/libroMayor', libroMayorRoutes);
app.use('/api/estadoResultados', estadoResultadosRoutes);
app.use('/api/balance', balanceSaldosRoutes);
app.use('/api/balance', estadoResultadosRoutes);
app.use('/api/balance', balanceGenealRoutes);


// CARGA DE RUTAS localhost:3000/api/productos


app.use('/uploads',express.static(path.resolve('uploads')));
app.use('/imgsDefult',express.static(path.resolve('imgsDefult')));
app.use('/optimize',express.static(path.resolve('optimize')));



module.exports = app;


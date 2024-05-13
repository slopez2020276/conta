const express = require('express');
const mongoose = require('mongoose');
const Estados = require('../models/estados.model');
const Cola = require('../models/cola.model');
const mongoose2 = require('mongoose');


exports.VerPeticion = function (req, res, next) {
    if (req.method === 'PUT' || req.method === 'POST') {
      // Actualizar la disponibilidad
      Estados.updateOne({},{estado:'disponible'},{new:true, upsert:true},(err,estadoUpdates)=>{
        if(err){
          console.log('error al actializar',err);
        }else if(estadoUpdates){
         console.log( 'se actualizo correctamente', estadoUpdates);
        }else{
          console.log('No se encontro el estado');
        }
      })
      // Guardar la información de la petición en la tabla de estado
      const nuevaPeticion = {
        metodo: req.method,
        ruta: req.originalUrl,
        fecha: new Date()
      };

      // Guardar el cuerpo de la respuesta en res.locals.responseBody
      const originalSend = res.send;
      res.send = function (body) {
        res.locals.responseBody = body;
        originalSend.apply(res, arguments);
      };

      // Capturar la respuesta de la petición
      res.on('finish', function() {
        // Convertir la respuesta a un objeto si es una cadena de texto
        let respuesta = res.locals.responseBody;
        if (typeof respuesta === 'string') {
          try {
            respuesta = JSON.parse(respuesta);
          } catch (error) {
            // Si hay un error al analizar JSON, se mantiene como cadena de texto
          }
        }
        // Guardar la respuesta en la cola
        nuevaPeticion.respuesta = respuesta;
        // Guardar la nueva petición en la base de datos
        Cola.findOneAndUpdate({}, {$push: { cola: nuevaPeticion } }, { upsert: true })
          .then(() => {
            console.log('Peticion guardada en la cola');
            console.log(nuevaPeticion);
          })
          .catch(error => {
            console.error('Error al guardar la petición en la cola:', error);
          });
      });
    }
    next();
};

const Estado2 = require('../models/estados.model');
const { es } = require('date-fns/locale');

exports.EjecutarCola = function () {
    // Configurar la conexión a la segunda base de datos
    mongoose2.connect('mongodb://localhost:27017/segundaBaseDatos', { useNewUrlParser: true, useUnifiedTopology: true });
    
    // Obtener la cola de la segunda base de datos
    Estado2.findOne({}, (err, estado) => {
        if (err) {
            console.error('Error al obtener la cola:', err);
            return;
        }

        if (!estado || !estado.cola || estado.cola.length === 0) {
            console.log('No hay funciones en la cola para ejecutar');
            return;
        }

        // Iterar sobre cada elemento de la cola
        estado.cola.forEach(peticion => {
            // Aquí ejecutas la función correspondiente según el contenido de la peticion
            // Por ejemplo, si peticion.metodo es 'POST', ejecutar la función correspondiente al método POST
            console.log('Ejecutando función de la cola en la segunda base de datos:', peticion);
        });

        // Una vez que se han ejecutado todas las funciones de la cola, vaciamos la cola
        estado.cola = [];

        // Guardar el estado actualizado en la segunda base de datos
        estado.save()
            .then(() => {
                console.log('Cola ejecutada y vaciada correctamente en la segunda base de datos');
                // Cerrar la conexión a la segunda base de datos después de guardar el estado actualizado
                mongoose2.connection.close();
            })
            .catch(error => {
                console.error('Error al guardar el estado actualizado en la segunda base de datos:', error);
                // Cerrar la conexión a la segunda base de datos en caso de error
                mongoose2.connection.close();
            });
    });
};


const { id } = require("date-fns/locale");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const historia = Schema({
  EncalceVideo: String,
  DescripcionHistoria: String,

  imgPathPrincipalLarge: String,
  imgPathPrincipalMedium: String,
  imgPathPrincipalSmall: String,
  imgPathFondoLarge: String,
  imgPathFondoMedion:String,
  imgPathPrincipalSmall:String,
  colorFondo: String,
  backgroundTipo :  Boolean,
  imgPathFondo:String,
  idPulicFondo: String,
  imgPathPrincipal:String,
  idPulicPortada: String,
  imgPathPrincipalMobil: String,
  idPulicMobilPortada: String,
  
  imgPathFondoMobil: String,
  idPulicMobilFondo: String,
});



module.exports = mongoose.model("historia", historia);

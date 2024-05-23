const mongoose = require("mongoose");
const app = require("./app");




mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);  // Añade esta línea para evitar la advertencia


//BASE DE DATOS DEL INTERNO 
//const destinoURI = 'mongodb+srv://desjr:desjr@interno.g3fzrlc.mongodb.net/?retryWrites=true&w=majority&appName=Interno';



mongoose.connect('mongodb+srv://dev:dev@umgcontable.kenlbmj.mongodb.net/?retryWrites=true&w=majority&appName=UmgContable', {
    //'mongodb://localhost/procasa'
    //mongodb+srv://desjr:desjr@cluster0.qmiwvug.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
        //mongodb+srv://desjr:desjr@interno.g3fzrlc.mongodb.net/?retryWrites=true&w=majority&appName=Interno


    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Se ha conectado correctamente a la base de datos.");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, function () {
      console.log(
        'El servidor está levantado en el puerto ' + PORT
      );
    });
  })
  .catch((error) => console.log(error));




const Usuario = require('../models/usuarios.model')

async function createNewUser (req,res){
    const UsuarioModel = new Usuario();
    UsuarioModel.nombre = req.body.nombre;
    UsuarioModel.apellido = req.body.apellido;
    UsuarioModel.email = req.body.email;

    UsuarioModel.save( (err,usuarioSaved)=>{
        if(err){
            return res.status(500).send({ message: 'error en la peticion 1' })
        }else if(usuarioSaved){

            return res.status(200).send({ message: 'el usuario se guardo correctamente' })

        }else{
            return res.status(500).send({ message: 'error al guardar el usuario' })
        }


    })
} 

module.exports = {
    createNewUser
}
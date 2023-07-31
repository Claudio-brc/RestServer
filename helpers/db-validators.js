const Role = require('../models/rol');
const Usuario = require ('../models/usuario');

const esRolValido = async  (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if ( !existeRol){
      throw new Error (`el rol ${rol} no está registrado en la DB`)
    }  

  }


  const existeEmail = async (correo) =>{
  
  await Usuario.findOne({ correo });
  if (existeEmail){
    throw new Error (`correo ya registrado!`)

   // return res.status(400).json(
   //   {msg: 'correo ya registrado'}
   // )
  }

}


const existeUsuarioID = async (id ) =>{
  
  const existeUsuario =  await Usuario.findById(id);
  if (!existeUsuario){
    throw new Error (`el ID No existe!`)

   // return res.status(400).json(
   //   {msg: 'correo ya registrado'}
   // )
  }

}
  

module.exports = {
    esRolValido,
    existeEmail,
    existeUsuarioID
}  
const Role = require('../models/rol');
const {Usuario, Categoria} = require ('../models');

const esRolValido = async  (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if ( !existeRol){
      throw new Error (`el rol ${rol} no está registrado en la DB`)
    }  

  }


  const existeEmail = async (correo = '') =>{
   
  const existeEmail = await Usuario.findOne({ correo });

  if (existeEmail){
    throw new Error (`correo ya registrado!`)

  }

}


const existeUsuarioID = async (id ) =>{
  
  const existeUsuario =  await Usuario.findById(id);
  if (!existeUsuario){
    throw new Error (`el ID No existe!`)

  }

}
  
const existeCategoriaPorId = async (id ) =>{
  
  const existeCategoria =  await Categoria.findById(id);
  if (!existeCategoria){
    throw new Error (`el ID No existe!`)

  }

}
  


module.exports = {
    esRolValido,
    existeEmail,
    existeUsuarioID,
    existeCategoriaPorId
}  
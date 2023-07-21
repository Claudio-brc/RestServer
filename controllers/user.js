const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require ('../models/usuario');


const usuariosGet = (req = request, res = response)  => {

    const {q, nombre = 'no_name', apikey, page, limit} = query = req.query;
      
    res.json(
        {
          msg: 'get API - Controlador',
          q, nombre, apikey, page, limit
        }
        )
  }

const usuariosPut = async (req, res) => {
    const { id} = req.params;
    const { password, google,  ...resto} = req.body;

    if ( password ) {
      const salt = bcryptjs.genSaltSync();
      resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto);
    
    res.status(400).json(
        {
          msg: 'put API - Controlador',
          usuario
        }
        )
  } 
  
const usuariosPost = async (req, res) => {


    const { nombre, correo, password, rol} = req.body;
    const usuario = new Usuario( {nombre, correo, password, rol} );
    //Verificar si el correo existe
    
    
   /* const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail){
      return res.status(400).json(
        {msg: 'correo ya registrado'}
      )
    }*/
    
    // encriptar la contraseña
    const  salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync( password, salt);
    // guardar en DB

    await usuario.save();


    res.status(201).json(
        {
          msg: 'post API ', 
          usuario
        }
        )
  }  

const usuariosDelete =  (req, res) => {
    res.status(201).json(
        {
          msg: 'delete API - controller'
        }
        )
  }

  module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete 
  }
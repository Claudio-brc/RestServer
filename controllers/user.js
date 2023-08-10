const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require ('../models/usuario');


const usuariosGet = async (req = request, res = response)  => {

   // const {q, nombre = 'no_name', apikey, page, limit} = query = req.query;
   const { limite = 5, desde = 0} = req.query;

   const [ total, usuarios] = await Promise.all([
    Usuario.countDocuments({ estado: true}),
    Usuario.find({ estado: true})
    .skip(Number(desde))
    .limit(Number(limite))
   ]);

   res.json(
        {
         total,
         usuarios
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

const usuariosDelete = async (req, res) => {
  const { id } = req.params;  

  // Fisiciamente lo borramos
  // const usuario = await Usuario.findByIdAndDelete( id );

  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false} );
  
  res.status(201).json(
        usuario
        )
  }

  module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete 
  }
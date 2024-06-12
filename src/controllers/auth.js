const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require ('bcryptjs');
const { generarJWT } = require ('../helpers/generarJWT') 

const login = async (req, res = response) => {

  const { correo, password} = req.body;



  try {
    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      return res.status(400).json(
        { msg: 'Usuario / Password no correctos - correo'}
      )
    }

    if (!usuario.estado) {
      return res.status(400).json(
        { msg: 'Usuario / Password no correctos - estado: false'}
      )
    }   

    const validPassword = bcryptjs.compareSync( password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({
        msg: 'Usuario / password no son correctos - password'
      });
    }
    
    const token = await generarJWT( usuario.id);

    res.json({
      usuario,
      token
    });

  } catch (error) {
    console.log(error)
    return res.json ({
      msg: 'algo salió mal.'
    }) 
  }
  
}

module.exports = {
    login
}